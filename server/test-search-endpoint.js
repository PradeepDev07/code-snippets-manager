import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001/api/v1';

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
    const data = await response.json().catch(() => ({}));
    return { status: response.status, data };
  } catch (error) {
    console.error(`Network error: ${error.message}`);
    return { status: 500, data: null };
  }
}

async function testSearch() {
  console.log("🚀 Starting Search API Tests...");

  // 1. Register/Login to get token
  const user = {
    firstName: "Search",
    lastName: "Tester",
    userName: `searchtester_${Date.now()}`,
    email: `search_${Date.now()}@test.com`,
    password: "password123"
  };

  console.log("1. Registering user...");
  let res = await request('POST', '/auth/register', null, user);
  if (res.status !== 201) {
    console.error("Failed to register:", res.data);
    return;
  }
  console.log("User registered.");

  console.log("2. Logging in...");
  res = await request('POST', '/auth/login', null, { email: user.email, password: user.password });
  if (res.status !== 200) {
    console.error("Failed to login:", res.data);
    return;
  }
  const token = res.data.token;
  console.log("Logged in. Token received.");

  // 2. Create Snippets
  const snippet1 = {
    title: "JS Search Test",
    description: "Testing search",
    code: "console.log('search')",
    language: "javascript",
    tags: ["search-test", "js"],
    isPublic: true
  };

  const snippet2 = {
    title: "Python Search Test",
    description: "Testing search python",
    code: "print('search')",
    language: "python",
    tags: ["search-test", "py"],
    isPublic: true
  };

  console.log("3. Creating snippets...");
  await request('POST', '/snippets', token, snippet1);
  await request('POST', '/snippets', token, snippet2);
  console.log("Snippets created.");

  // 3. Test Search
  console.log("\n--- Testing Search Endpoints ---");

  // Search by Language
  console.log("Testing Search by Language (javascript)...");
  res = await request('GET', '/snippets/search?language=javascript', token);
  if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
    console.log(`✅ Found ${res.data.length} snippets for language=javascript`);
    const match = res.data.every(s => s.language === 'javascript');
    if(match) console.log("   All snippets match language.");
    else console.error("   ❌ Some snippets do not match language.");
  } else {
    console.error("❌ Failed to search by language:", res.data);
  }

  // Search by Tag
  console.log("Testing Search by Tag (search-test)...");
  res = await request('GET', '/snippets/search?tag=search-test', token);
  if (res.status === 200 && Array.isArray(res.data) && res.data.length >= 2) {
    console.log(`✅ Found ${res.data.length} snippets for tag=search-test`);
  } else {
    console.error("❌ Failed to search by tag:", res.data);
  }

  // Search by Username
  console.log(`Testing Search by Username (${user.userName})...`);
  res = await request('GET', `/snippets/search?userName=${user.userName}`, token);
  if (res.status === 200 && Array.isArray(res.data) && res.data.length >= 2) {
    console.log(`✅ Found ${res.data.length} snippets for userName=${user.userName}`);
  } else {
    console.error("❌ Failed to search by username:", res.data);
  }
  
  // Search by Non-existent Tag
  console.log("Testing Search by Non-existent Tag...");
  res = await request('GET', '/snippets/search?tag=nonexistenttag12345', token);
  if (res.status === 200 && Array.isArray(res.data) && res.data.length === 0) {
    console.log("✅ Correctly found 0 snippets for non-existent tag");
  } else {
    console.error("❌ Failed (should be empty array):", res.data);
  }

}

testSearch();
