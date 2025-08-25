export default function Loader() {
  return (
    <div className="min-h-[83vh] flex flex-col animate-pulse items-center justify-center">
      {/* <p className="mb-3">Loading ...</p> */}
      <div className="flex space-x-3  ease ro">
        <div className="border-l-4 border-black hin"></div>
        <div className="border-l-4 border-black hib"></div>
        <div className="border-l-4 border-black hic"></div>
      </div>
      <p className="mt-2">Loading...</p>
    </div>
  );
}
