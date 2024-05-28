"use client";

import { signIn } from "next-auth/react";
import Link from "next/link.js";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        ...form,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid email or password");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary/40">
        <h1 className="text-xl font-bold my-4">Enter your details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type="text"
            name="email"
            placeholder="Email"
            className="w-[400px] border rounded-md border-gray-300 py-2 px-6 bg-zinc-200/20 focus:outline-none focus:ring-primary focus:ring-1"
          />
          <input
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type="password"
            name="password"
            placeholder="Password"
            className="w-[400px] border rounded-md border-gray-300 py-2 px-6 bg-zinc-200/20 focus:outline-none focus:ring-primary focus:ring-1"
          />
          <button className="bg-primary border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-primary  hover:bg-white hover:text-primary">
            Login
          </button>

          {error && (
            <div className="bg-red-500 rounded-md text-white w-fit text-sm py-1 px-3 mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
