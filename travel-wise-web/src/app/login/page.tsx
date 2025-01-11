import React from "react";

const Login = () => {
    return (
      <section className="min-h-screen flex items-center justify-center bg-teal-50 p-4">
        <div className="bg-white shadow-lg rounded p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-teal-800">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-teal-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-teal-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    );
  };

export default Login;
