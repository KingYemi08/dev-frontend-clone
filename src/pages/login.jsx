import { Link } from "react-router-dom";
import { useGlobal } from "../context/globalContext";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

export default function Login() {
  const array = [
    {
      name: "Apple",
      img: "https://cdn-icons-png.flaticon.com/512/0/747.png",
    },
    {
      name: "Facebook",
      img: "https://thumbs.dreamstime.com/b/facebook-logo-vector-eps-file-squared-coloured-easily-editable-have-white-background-high-resolution-255557233.jpg",
    },
    {
      name: "Forem",
      img: "https://cdn.freebiesupply.com/logos/large/2x/forem-1-logo-svg-vector.svg",
    },
    {
      name: "Github",
      img: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
    },
    {
      name: "Google",
      img: "https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png?v=2025061907",
    },
    {
      name: "Twitter(x)",
      img: "https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      name: "Email",
      img: "https://static.vecteezy.com/system/resources/thumbnails/006/827/459/small_2x/email-icon-sign-symbol-logo-vector.jpg",
    },
  ];
  const { loginForm, loginChange, loginUser } = useGlobal();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!loginForm.email || !loginForm.password) return  toast.error("Please fill all fields", { autoClose: 2000 })
    try {
      setLoading(true)
      await loginUser()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Invalid Email or Password", { autoClose: 2000 });
    }
  };
  return (
    <div className="flex flex-col min-h-screen py-5 items-center">
      <ToastContainer />
      <div>
        <Link to={"/"}>
          <img
            src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            className="h-15 w-19 rounded"
            alt=""
          />
        </Link>
      </div>
      <div className="py-4">
        <h2 className="font-bold text-3xl text-center">
          Join the DEV Community
        </h2>
        <p className="text-gray-600 text-sm">
          DEV Community is a community of 3,396,235 amazing developers
        </p>
      </div>
      <div className="py-2.5 flex flex-col space-y-3">
        {array.map((a, index) => (
          <div
            key={index}
            className="px-2.5 lg:min-w-135 min-w-90 rounded-md border flex hover:bg-gray-200 cursor-pointer justify-between items-center border-gray-300 py-2"
          >
            <div>
              <img src={a.img} className="h-7 w-7" alt="" />
            </div>
            <div>
              <p className="text-sm">Sign up with {a.name}</p>
            </div>
            <div></div>
          </div>
        ))}
      </div>
      <div className="py-3.5 items-center flex space-x-2">
        <div className="border border-gray-300 lg:min-w-62 min-w-50"></div>
        <h2 className="">OR</h2>
        <div className="border border-gray-300 lg:min-w-62 min-w-50"></div>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <label htmlFor="" className="mb-1.5 font-semibold">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={loginForm.email}
              onChange={loginChange}
              className="lg:min-w-135  rounded-md border border-gray-300 ps-2.5 py-2 outline-0 placeholder:text-sm placeholder:text-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mb-1.5 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={loginChange}
              className="lg:min-w-135 min-w-100 rounded-md border border-gray-300 ps-2.5 py-2 outline-0 placeholder:text-sm placeholder:text-gray-600"
            />
          </div>
        </div>
        <div className="pt-3.5 lg:min-w-135 flex justify-between">
          <div className="flex space-x-1 items-center">
            <input type="checkbox" name="" id=""/>
            <span className="">Remember Me</span>
          </div>
          <div>
            <span className="text-blue-700">Forget Password ?</span>
          </div>
        </div>
        <div className="mt-4.5">
          <button
            disabled={loading }
            className={`lg:min-w-135 min-w-full rounded-md  text-white py-3 font-semibold  transition-all  ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 cursor-pointer"
            }`}
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </div>
      </form>
      <div className="py-4 lg:w-90">
        <p className="text-sm italic text-gray-600 text-center">
          By signing up, you are agreeing to our{" "}
          <span className="text-blue-800">privacy policy</span>,{" "}
          <span className="text-blue-800"> terms of use</span>
          and <span className="text-blue-800">code of conduct</span>.
        </p>
      </div>
      <div className="border-b lg:w-135 w-full border-gray-300"></div>
      <div className="py-5">
        <p>
          New to DEV?{" "}
          <Link to="/register" className="text-blue-800">
            Create Account
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
