// React Imports
import { FC, Fragment, useState } from "react";

// Custom Component Imports
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { setCookieClientSideFn } from "@/utils/storage.util";
import next from "next";

interface ISignInViewProps {}

const SignInView: FC<ISignInViewProps> = () => {
  const router = useRouter();

  // State to manage form values and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  /**
   * @description Handles the login process for the user
   *
   * @returns {void}
   */
  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // Clear any previous errors
    setError(null);

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    try {
      // Make API call
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email, // Use `email` as `username` based on the API
          password: password,
          //expiresInMins: 30, // Optional parameter
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data); // Optionally log the response
        setCookieClientSideFn("accessToken", data.token, { maxAge: 3600 });
        router.push("/");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <Fragment>
      <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
        <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2">
          <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
            <div className="my-4">
              <h1 className="text-3xl font-semibold">Login</h1>
              <p className="mt-2 text-xs text-slate-400">
                Dummy Project NextJs.
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <Label htmlFor="email">Email*</Label>
              <Input
                className="mt-2 mb-4 bg-transparent rounded-full"
                type="username"
                id="username"
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Label htmlFor="password">Password*</Label>
              <Input
                className="mt-2 mb-4 bg-transparent rounded-full"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <Button
                type="submit"
                className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
              >
                Login
              </Button>
            </form>
            <p className="mt-4 text-xs text-slate-200">
              @2024 All Rights Reserved
            </p>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default SignInView;
