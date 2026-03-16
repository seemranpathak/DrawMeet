

import {  useRef,  type FormEvent } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./authApi";


export const Register = () => {
 

const userName = useRef<HTMLInputElement>(null);
const email = useRef<HTMLInputElement>(null);
const password = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
 const goToLogin =()=>{
navigate("/");
 }

//fetching data from backend



async function handleRegister(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    const authDetail = {
      username: userName.current!.value,
      email: email.current!.value,
      password: password.current!.value,
    };
    console.log(authDetail);
    const data = await registerUser(authDetail);

    if (data.token) {
  toast.success("Registration successful. Please login.");
  navigate("/login");
     // navigate("/login");
    } else {
      toast.error(data.message || "Registration failed");
    }

  } catch (error) {
    toast.error("An error occurred while registering.");
    console.error(error);
  }

}
  return (
    <main className="p-10 flex flex-col items-center justify-center min-h-screen bg-gray-50 font-inter antialiased  dark:bg-gray-900">
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          Register
        </p>
      </section>
      <form onSubmit={handleRegister}>
        <div className="mb-6 w-96">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your name
          </label>
          <input
            ref={userName}
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="username"
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-6 w-96">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            ref={email}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="codebook@example.com"
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-6 w-96">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
           ref={password}
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            //minLength={6}
          />
        </div>
        <button
        
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-white">
  Already have an account?
  <span
    onClick={goToLogin}
    className="text-blue-600 cursor-pointer ml-1 p-4"
  >
    Login
  </span>
</p>
    </main>
  );
};
