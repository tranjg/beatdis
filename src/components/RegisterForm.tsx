"use client";

import { toast, useToast } from "@/components/ui/use-toast.ts";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    artistName: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.artistName || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.retypePassword) {
      setError("Passwords must match.");
      return;
    }

    try {
      const resUserExists = await axios.post("/api/userExists", {
        email: form.email,
      });

      const { user } = await resUserExists.data;

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await axios.post("/api/register", { ...form });

      if (res.data) {
        setError("");
        toast({
          variant: "success",
          title: "Registration successful",
          duration: 3000,
        });
        router.push("/login");
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      return "Error during registration: " + error;
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary/40">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type="text"
            name="artistName"
            placeholder="Artist Name"
            className="w-[400px] border rounded-md border-gray-300 py-2 px-6 bg-zinc-200/20 focus:outline-none focus:ring-primary focus:ring-1"
          />
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
          <input
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type="password"
            name="retypePassword"
            placeholder="Re-type password"
            className="w-[400px] border rounded-md border-gray-300 py-2 px-6 bg-zinc-200/20 focus:outline-none focus:ring-primary focus:ring-1"
          />
          <button className="bg-primary border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-primary  hover:bg-white hover:text-primary">
            Register
          </button>

          {error && (
            <div className="bg-red-500 rounded-md text-white w-fit text-sm py-1 px-3 mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
