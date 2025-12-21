import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { FaCode, FaLayerGroup, FaSearch, FaStar } from 'react-icons/fa';
import Cookies from "js-cookies"

const Home = () => {
  const navigate = useNavigate();
  //if user is logged in, redirect to dashboard
  useEffect(() => {

    const token = Cookies.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Manage Your Code <br />
              <span className="text-blue-200">Snippets Efficiently</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-lg mx-auto md:mx-0">
              Store, organize, and share your code snippets with ease. Never lose a useful function again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/signup" className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg transform hover:-translate-y-1">
                Get Started for Free
              </Link>
              <Link to="/explore" className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
                Explore Snippets
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gray-900 p-6 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500 max-w-md w-full">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                <code>
                  {`function helloWorld() {
  console.log("Hello, SnippetManager!");
  return "Organized Code";
}

// Save your snippets today!`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* What is it? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What is SnippetManager?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SnippetManager is the ultimate tool for developers to save their favorite code blocks,
              algorithms, and configurations. It's your personal library of reusable code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-blue-600 text-2xl">
                <FaCode />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Syntax Highlighting</h3>
              <p className="text-gray-600 text-center">
                Beautiful syntax highlighting for over 100 languages. Your code looks as good as it does in your IDE.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-purple-600 text-2xl">
                <FaLayerGroup />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Smart Organization</h3>
              <p className="text-gray-600 text-center">
                Tag and categorize your snippets. Find exactly what you need in seconds with our powerful search.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-green-600 text-2xl">
                <FaSearch />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Public Discovery</h3>
              <p className="text-gray-600 text-center">
                Discover snippets from the community. Learn new patterns and solutions from other developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

            <div className="text-center bg-white p-8 rounded-lg shadow-lg relative z-10">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-2">Create</h3>
              <p className="text-gray-600">Write or paste your code snippet. Add a title, description, and select the language.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-lg relative z-10">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-2">Tag & Save</h3>
              <p className="text-gray-600">Add relevant tags to make it easy to find later. Choose to keep it private or make it public.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-lg relative z-10">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-2">Retrieve</h3>
              <p className="text-gray-600">Access your snippets from anywhere. Search by tag, language, or keyword.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">What Developers Say</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-gray-700 italic mb-6 text-lg">"This app changed how I organize my gist. It's so much faster to find what I need! The syntax highlighting is spot on."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">SJ</div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Jenkins</div>
                  <div className="text-sm text-gray-500">Frontend Developer</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-gray-700 italic mb-6 text-lg">"Simple, clean, and effective. Exactly what I was looking for to store my complex SQL queries and regex patterns."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">MT</div>
                <div>
                  <div className="font-bold text-gray-900">Mike Thompson</div>
                  <div className="text-sm text-gray-500">Backend Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create CTA */}
      <section className="py-20 bg-indigo-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to start coding?</h2>
          <p className="mb-10 text-xl text-indigo-200 max-w-2xl mx-auto">Join thousands of developers managing their code better. It's free and easy to get started.</p>
          <Link to="/signup" className="bg-blue-500 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg text-lg">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
