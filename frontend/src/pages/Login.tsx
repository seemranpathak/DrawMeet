import { useNavigate } from "react-router-dom";
import { loginUser } from "./authApi";
import type { FormEvent } from "react";
import { toast } from "sonner";


export const Login =()=>{

const navigate = useNavigate();
 const goToRegister =()=>{
navigate("/register");
 }
async function handleLogin(e:FormEvent<HTMLFormElement>) {
  e.preventDefault();
  try {
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    const data = await loginUser({ email, password });
    console.log(data)
    if (data.token) {
      localStorage.setItem("token", data.token); // save token
      navigate("/dashboard");
    } else {
      toast.error(data.message || "Login failed");
    }

  } catch (error) {
     toast.error("An error occurred while loging.");
    console.error(error);
  }
  
}

 return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-inter dark:bg-gray-900">
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          Login
        </p>
      </section>
      <form onSubmit={handleLogin}
      className=" p-10">
        
        <div className="mb-6 w-96">
          <label
           // htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
           
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="codebook@example.com"
            required
            //autoComplete="off"
          />
        </div>
        <div className="mb-6 w-96">
          <label
           // htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
           
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
           // minLength="7"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>

      </form>

      <p className="mt-4 text-center text-white">
   Don't have an account?
  <span
    onClick={goToRegister}
    className="text-blue-600 cursor-pointer ml-1 p-4"
  >
    Register
  </span>
</p>
    </main>
  );
};



