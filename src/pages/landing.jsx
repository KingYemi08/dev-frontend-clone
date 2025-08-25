import LandMiddle from "../components/landMiddle";
import LandSide from "../components/landSide";
import { useGlobal } from "../context/globalContext";

const Landing = () => {
  const { token, currentUser } = useGlobal()
  return (
    <>
      <div className="lg:flex lg:space-x-3.5 w-full ">
        <div className="w-[20%]">
          <LandSide />
        </div>
        <div className="lg:w-[55%] w-full">
          <LandMiddle/>
        </div>
        <div className="w-[25%] hidden lg:block">
          <div className="bg-white rounded-md cc border border-gray-200">
            <div className="border-b border-gray-200 py-3.5">
              <div className="px-3.5">
                <h2 className="text-gray-700 font-bold">#discuss</h2>
                <p className="text-gray-600 text-[11px]">
                  Discussion threads targeting the whole community
                </p>
              </div>
            </div>
            <div className="border-b border-gray-200 py-3.5">
              <div className="px-3.5">
                <h2 className="text-gray-700">Meme Monday</h2>
                <p className="text-gray-600 text-[11px]">34 comments</p>
              </div>
            </div>
            <div className="border-b border-gray-200 py-3.5">
              <div className="px-3.5">
                <h2 className="text-gray-700">
                  What are your goals for the week? #139
                </h2>
                <button className="text-gray-600 text-[11px] bg-[#fcd34d] rounded-md py-0.5 px-1.5">
                  New
                </button>
              </div>
            </div>
            <div className="border-b border-gray-200 py-3.5">
              <div className="px-3.5">
                <h2 className="text-gray-700">Best Advice for a New Mac</h2>
                <p className="text-gray-600 text-[11px]">2 comments</p>
              </div>
            </div>
            <div className="border-b border-gray-200 py-3.5">
              <div className="px-3.5">
                <h2 className="text-gray-700">
                  How Much BandWidth Do You Need for an API in 2025
                </h2>
                <p className="text-gray-600 text-[11px]">3 comments</p>
              </div>
            </div>
            <div className="border-b border-gray-200 py-3.5">
              <div className="px-3.5">
                <h2 className="text-gray-700">What are your favorite Anime</h2>
                <button className="text-gray-600 text-[11px] bg-[#fcd34d] rounded-md py-0.5 px-1.5">
                  New
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <h4 className="pb-2 mt-11 text-sm font-semibold font-serif">
              trending guides/resources
            </h4>
            <div className="border-b border-gray-400 pb-4.5">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
                <div key={i}>
                  <p className="hover:bg-white p-3.5 text-gray-600 hover:text-blue-800 cursor-pointer">
                    Coding Interviews were HARD, until I learned these Patterns
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
