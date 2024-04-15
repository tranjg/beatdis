"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function RegisterForm() {
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!artistName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const resUserExists = await axios.post("/api/userExists", { email });

      const { user } = await resUserExists.data;

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await axios.post("/api/register", {
        artistName,
        email,
        password,
      });

      if (res.data) {
        const form = e.target as HTMLFormElement;
        form.reset();
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setArtistName(e.target.value)}
            type="text"
            placeholder="Artist Name"
            className="w-[400px] border rounded-md border-gray-300 py-2 px-6 bg-zinc-200/20 focus:outline-none focus:border-purple-600"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-[400px] border rounded-md border-gray-300 py-2 px-6 bg-zinc-200/20 focus:outline-none focus:border-purple-600"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-[400px] border rounded-md border-gray-300 py-2 px-6 bg-zinc-200/20 focus:outline-none focus:border-purple-600"
          />
          <button className="bg-purple-600 border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-purple-600  hover:bg-white hover:text-purple-600">
            Register
          </button>

          {error && (
            <div className="bg-red-500 rounded-md text-white w-fit text-sm py-1 px-3 mt-2">
              {" "}
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
