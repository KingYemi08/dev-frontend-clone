import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { LuTwitch } from "react-icons/lu";
import { SiMcdonalds } from "react-icons/si";
import { PiButterflyFill } from "react-icons/pi";
import { PiDotsThree } from "react-icons/pi";
import { useGlobal } from "../context/globalContext";

export default function LandSide() {
  const { token, currentUser } = useGlobal();
  const array = [
    {
      emo: "🏠",
      text: "Home",
    },
    {
      emo: "🔩",
      text: "Settings",
    },
    {
      emo: "🎙️",
      text: "Podcasts",
    },
    {
      emo: "📽️",
      text: "Videos",
    },
    {
      emo: "🏷️",
      text: "Tags",
    },
    {
      emo: "🎓",
      text: "DEV Education Tracks",
    },
    {
      emo: "🏆",
      text: "DEV Challenges",
    },
    {
      emo: "💡",
      text: "DEV Help",
    },
    {
      emo: "💓",
      text: "Advertise on DEV",
    },
    {
      emo: "✨",
      text: "DEV Showcase",
    },
    {
      emo: "😎",
      text: "About",
    },
    {
      emo: "🎺",
      text: "Contact",
    },
    {
      emo: "🐘",
      text: "Free Postgres Database",
    },
    {
      emo: "🤔",
      text: "Software comparisons",
    },
    {
      emo: "🛍️",
      text: "Forem Shop",
    },
  ];
  return (
    <div className="w-full py-2 px-1.5 hidden lg:block">
      {!token && (
        <div className="bg-white hidden lg:block rounded-lg border p-3 border-gray-300">
          <h2 className="font-bold text-xl">
            DEV Community is a community of 3,396,235 amazing developers
          </h2>
          <p className="pt-3 pb-4 text-sm text-gray-600">
            We're a place where coders share, stay up-to-date and grow their
            careers.
          </p>
          <div className="flex flex-col space-y-1.5">
            <Link to={"/register"} className="border text-center w-full rounded-md border-blue-600 transition-all text-blue-600 hover:bg-blue-600 hover:text-white hover:underline py-1.5 px-3 font-semibold">
              Create Account
            </Link>
            <Link to={"/login"} className="py-2 text-center w-full px-3 rounded-md transition-all hover:bg-blue-100 hover:text-blue-800 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      )}
      <div className={`${!token ? "py-3" : ""}`}>
        <div className="flex flex-col">
          {array.map((a, index) => {
            return (
              <Link
                to={index === 1 ? "/settings" : ""}
                key={index}
                className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800"
              >
                <p>{a.emo}</p>
                <span>{a.text}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="py-3">
        <h3 className="font-bold pb-1.5 text-xl px-3">other</h3>
        <div className="flex flex-col">
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <p>👍</p>
            <span>Code of Conduct</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <p>🤓</p>
            <span>Privacy Policy</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <p>👀</p>
            <span>Terms of Use</span>
          </Link>
        </div>
      </div>
      <div className="py-2 text-2xl text-gray-700">
        <div className="flex space-x-1">
          <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
            <FaXTwitter />
          </div>
          <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
            <FaFacebookSquare />
          </div>
          <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
            <FaGithub />
          </div>
          <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
            <AiFillInstagram />
          </div>
          <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
            <LuTwitch />
          </div>
        </div>
        <div className="pt-4 flex space-x-1">
          <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
            <SiMcdonalds />
          </div>
          <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
            <PiButterflyFill />
          </div>
        </div>
      </div>
      <div className="py-2">
        <h3 className="font-bold pt-1.5 text-md ">Popular Tags</h3>
        <div className="py-2 flex h-60 overflow-y-scroll flex-col text-gray-700">
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#webdev</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#programming</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#javascript</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#ai</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#beginners</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#productivity</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#java</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#totorial</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#rust</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#devops</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#python</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#react</span>
          </Link>
          <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
            <span>#discuss</span>
          </Link>
        </div>
      </div>
      <div className="py-3">
        <div className="bg-white rounded-md border flex flex-col space-y-10 border-gray-200 p-4 h-110 overflow-y-scroll">
          <div className="pb-2">
            <h2 className="font-bold text-gray-800">💎 DEV Diamond Sponsors</h2>
            <p className="text-[12px] text-gray-600 pt-2">
              Thank you to our Diamond Sponsors for supporting the DEV Community
            </p>
          </div>
          <div className="text-center flex flex-col items-center py-3">
            <div>
              <img
                className="w-30"
                src="https://media2.dev.to/dynamic/image/width=880%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fxjlyhbdqehj3akhz166w.png"
                alt=""
              />
            </div>
            <p className="text-[12px] text-gray-600 pt-2 italic">
              Google AI is the official AI Model and Platform Partner of DEV
            </p>
          </div>
          <div className="text-center flex flex-col items-center py-3">
            <div>
              <img
                className="w-30"
                src="https://media2.dev.to/dynamic/image/width=880%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fbnl88cil6afxzmgwrgtt.png"
                alt=""
              />
            </div>
            <p className="text-[12px] text-gray-600 pt-2 italic">
              Neon is the official database partner of DEV
            </p>
          </div>
          <div className="text-center flex flex-col items-center py-3">
            <div>
              <img
                className="w-30"
                src="https://media2.dev.to/dynamic/image/width=880%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fv30ephnolfvnlwgwm0yz.png"
                alt=""
              />
            </div>
            <p className="text-[12px] text-gray-600 pt-2 italic">
              Algolia is the official search partner of DEV
            </p>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="bg-white rounded-md flex flex-col space-y-2 border border-gray-200 p-3">
          <div className="justify-between flex items-center">
            <h2 className="text-gray-600">DEV Community</h2>
            <div className="px-2 py-1 cursor-pointer rounded transition-all hover:bg-gray-100">
              <PiDotsThree size={22} />
            </div>
          </div>
          <div className="py-2">
            <h1 className="font-bold text-gray-700 text-xl">
              Easiest way to help the DEV community feel more like a community?
            </h1>
          </div>
          <div>
            <p className="text-gray-700">
              Head over to our{" "}
              <span className="text-blue-500 underline">Welcome Thread</span>{" "}
              greet some new DEV members!
            </p>
          </div>
        </div>
      </div>
      <div className="py-2.5 px-1 flex flex-col text-gray-600 text-sm space-y-3">
        <div>
          <p>
            <span className="text-blue-500 ">DEV Community</span> A space to
            discuss and keep up software development and manage your software
            career
          </p>
        </div>
        <div>
          <p>
            Built on <span className="text-blue-500 ">Forem</span> — the{" "}
            <span className="text-blue-500 ">open source</span> software that
            powers <span className="text-blue-500 ">DEV</span> and other
            inclusive communities.
          </p>
        </div>
        <div>
          <p>
            Made with love and{" "}
            <span className="text-blue-500 ">Ruby on Rails</span>. DEV Community
            © 2016 - 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
