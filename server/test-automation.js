import fetch from 'node-fetch'; // Fallback if global fetch isn't available, but in ESM node 18+ it is.
// Actually, since type: module is set, we can use top-level await and global fetch if Node is new enough.
// If node-fetch is not installed, we rely on global fetch.

const BASE_URL = 'http://localhost:3001'; // Adjust port if needed

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m"
};

const log = (msg, color = colors.reset) => console.log(`${color}${msg}${colors.reset}`);
const success = (msg) => log(`✅ ${msg}`, colors.green);
const fail = (msg) => log(`❌ ${msg}`, colors.red);
const info = (msg) => log(`ℹ️ ${msg}`, colors.blue);

async function request(method, endpoint, token = null, body = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json().catch(() => ({})); // Handle empty responses
    return { status: response.status, data };
  } catch (error) {
    fail(`Network error: ${error.message}`);
    return { status: 500, data: null };
  }
}

async function runTests() {
  log("🚀 Starting Automated API Tests...\n", colors.yellow);

  // --- 1. Authentication ---
  info("--- Testing Authentication ---");
  
  const timestamp = Date.now();
  const user1 = {
    firstName: "Test",
    lastName: "User1",
    userName: `user1_${timestamp}`,
    email: `user1_${timestamp}@test.com`,
    password: "password123",
    role: "user"
  };

  const user2 = {
    firstName: "Test",
    lastName: "User2",
    userName: `user2_${timestamp}`,
    email: `user2_${timestamp}@test.com`,
    password: "password123",
    role: "user"
  };

  // Register User 1
  let res = await request('POST', '/api/v1/auth/register', null, user1);
  if (res.status === 201) success("User 1 Registered");
  else fail(`User 1 Registration failed: ${res.status} - ${JSON.stringify(res.data)}`);

  // Login User 1
  res = await request('POST', '/api/v1/auth/login', null, { email: user1.email, password: user1.password });
  let token1;
  if (res.status === 200 && res.data.token) {
    token1 = res.data.token;
    success("User 1 Logged In");
  } else {
    fail("User 1 Login failed");
    return; // Stop if login fails
  }

  // Register User 2
  res = await request('POST', '/api/v1/auth/register', null, user2);
  if (res.status === 201) success("User 2 Registered");
  else fail(`User 2 Registration failed: ${res.status}`);

  // Login User 2
  res = await request('POST', '/api/v1/auth/login', null, { email: user2.email, password: user2.password });
  let token2;
  if (res.status === 200 && res.data.token) {
    token2 = res.data.token;
    success("User 2 Logged In");
  } else {
    fail("User 2 Login failed");
    return;
  }

  // --- 2. Snippet Management (User 1) ---
  info("\n--- Testing Snippet CRUD (User 1) ---");

  // Create Private Snippet
  const privateSnippetData = {
    title: "Private Algo",
    code: "console.log('secret')",
    language: "javascript",
    tags: ["secret", "algo"],
    isPublic: false
  };

  res = await request('POST', '/api/v1/snippets', token1, privateSnippetData);
  let privateSnippetId;
  if (res.status === 201) {
    privateSnippetId = res.data._id;
    success("Private Snippet Created");
  } else fail(`Create Private Snippet failed: ${res.status}`);

  // Create Public Snippet
  const publicSnippetData = {
    title: "Public Helper",
    code: "console.log('hello world')",
    language: "javascript",
    tags: ["helper", "demo"],
    isPublic: true
  };

  res = await request('POST', '/api/v1/snippets', token1, publicSnippetData);
  let publicSnippetId;
  if (res.status === 201) {
    publicSnippetId = res.data._id;
    success("Public Snippet Created");
  } else fail(`Create Public Snippet failed: ${res.status}`);

  // Get My Snippets
  res = await request('GET', '/api/v1/snippets/me', token1);
  if (res.status === 200 && Array.isArray(res.data) && res.data.length >= 2) {
    success("Get My Snippets (Found created snippets)");
  } else fail("Get My Snippets failed or count mismatch");

  // Update Snippet
  res = await request('PUT', `/api/v1/snippets/${privateSnippetId}`, token1, { title: "Updated Private Algo" });
  if (res.status === 200 && res.data.title === "Updated Private Algo") {
    success("Update Snippet Successful");
  } else fail(`Update Snippet failed: ${res.status}`);

  // --- 3. Authorization & Access Control ---
  info("\n--- Testing Authorization (User 2 accessing User 1) ---");

  // User 2 tries to view User 1's Private Snippet (Should fail? Or 404?)
  // Note: The current middleware might return 403 or 404 depending on implementation details.
  // Based on your middleware: if (!snippet) 404. if (!isPublic && !isOwner) 403.
  // Since User 2 can find it by ID but shouldn't see it.
  
  // Wait, the middleware does `Snippet.findById(id)`. If it exists, it checks permissions.
  // So User 2 finding User 1's private snippet should return 403.
  
  // However, we need a route to "Get Snippet By ID". 
  // Looking at routes... I don't see a generic `GET /:id` in your snippet.routes.js!
  // You have `GET /me`, `GET /tags/:tag`, `GET /search`.
  // You DO NOT have `GET /:id` implemented in the routes you showed me recently.
  // You have `PUT /:id` and `DELETE /:id`.
  
  // Let's test Update/Delete protection instead since `GET /:id` might be missing.
  
  // User 2 tries to UPDATE User 1's snippet
  res = await request('PUT', `/api/v1/snippets/${privateSnippetId}`, token2, { title: "Hacked" });
  if (res.status === 403) {
    success("User 2 cannot update User 1's snippet (403 Forbidden)");
  } else fail(`Security Breach: User 2 updated User 1's snippet! Status: ${res.status}`);

  // User 2 tries to DELETE User 1's snippet
  res = await request('DELETE', `/api/v1/snippets/${privateSnippetId}`, token2);
  if (res.status === 403) {
    success("User 2 cannot delete User 1's snippet (403 Forbidden)");
  } else fail(`Security Breach: User 2 deleted User 1's snippet! Status: ${res.status}`);

  // --- 4. Search & Filtering ---
  info("\n--- Testing Search ---");

  // Search by Tag
  res = await request('GET', `/api/v1/snippets/search?tag=helper`, token1);
  if (res.status === 200 && res.data.length > 0) {
    success("Search by Tag found results");
  } else fail("Search by Tag failed");

  // Search by Username
  res = await request('GET', `/api/v1/snippets/search?userName=${user1.userName}`, token1);
  if (res.status === 200) {
    // Should only find PUBLIC snippets
    const publicOnly = res.data.every(s => s.isPublic);
    if (publicOnly && res.data.length > 0) success("Search by Username found public snippets");
    else if (res.data.length === 0) fail("Search by Username found nothing (expected public snippet)");
    else fail("Search by Username returned private snippets!");
  } else fail("Search by Username failed");

  // --- 5. Cleanup ---
  info("\n--- Cleanup ---");
  
  // User 1 deletes their snippets
  res = await request('DELETE', `/api/v1/snippets/${privateSnippetId}`, token1);
  if (res.status === 200) success("User 1 deleted private snippet");
  else fail("Failed to delete private snippet");

  res = await request('DELETE', `/api/v1/snippets/${publicSnippetId}`, token1);
  if (res.status === 200) success("User 1 deleted public snippet");
  else fail("Failed to delete public snippet");

  log("\n✨ Test Run Complete", colors.yellow);
}

runTests();
