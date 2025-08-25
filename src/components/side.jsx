import { useState } from "react";
import { useGlobal } from "../context/globalContext";

const Sidebar = () => {
  const [specificIndex, setSpecificIndex] = useState(null);
  const { path } = useGlobal()
  const array = [
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwalhydbusoe2o1pzxfwj.png",
      img: "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwalhydbusoe2o1pzxfwj.png",
      txt: "Forem Feed",
      descp:
        "A space to discuss and keep up software development and manage your software career",
    },
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png",
      img: "https://media2.dev.to/dynamic/image/width=440,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F3otvb2z646ytpt1hl2rv.jpg",
      txt: "DEV community",
      descp:
        "A space to discuss and keep up software development and manage your software career",
    },
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F9xjsbjb3ulcgpx932599.png",
      img: "https://media2.dev.to/dynamic/image/width=440,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Frnip9mvroe4n1spfm43q.png",
      txt: "Future",
      descp:
        "News and discussion of science and technology such as AI, VR, cryptocurrency, quantum computing, and more.",
    },
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fd89n749pwv3d05i93pfd.png",
      img: "https://media2.dev.to/dynamic/image/width=440,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fgg6i5z7ureeu96cayz19.png",
      txt: "Gamers Forem",
      descp: "An inclusive community for gaming enthusiasts",
    },
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fmkwem77uxpvir9vy9eeu.png",
      img: "https://media2.dev.to/dynamic/image/width=440,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fi8rwbqi6l4wln8kbx606.png",
      txt: "Popcorn movies and tv",
      descp: "Movie and TV enthusiasm, criticism and everything in-between.",
    },
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Finbbclsxtvxdfo0p2n66.png",
      img: "https://media2.dev.to/dynamic/image/width=440,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fvb6sq9t5ehunzj4r4695.png",
      txt: "DUMB DEV community",
      descp: "Memes and software development shitposting",
    },
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Feyc812o5ed0he648y218.png",
      img: "https://media2.dev.to/dynamic/image/width=440,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fqji7l84bi520qypekh4t.png",
      txt: "Music Forem",
      descp:
        "From composing and gigging to gear, hot music takes, and everything in between.",
    },
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzhktp1xvmpf29y860wd3.png",
      img: "https://media2.dev.to/dynamic/image/width=440,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fetixkjcs50ddkp6wlv4p.png",
      txt: "Vibe Coding Forem",
      descp:
        "Discussing AI software development, and showing off what we're building.",
    },
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F7mwsgj74kx4dn0fliwh7.png",
      img: "https://media2.dev.to/dynamic/image/width=440,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F01bkopv3unqemfs036vr.png",
      txt: "Maker Forem",
      descp:
        "A community for makers, hobbyists, and professionals to discuss Arduino, Raspberry Pi, 3D printing, and much more.",
    },
    {
      profile:
        "https://media2.dev.to/dynamic/image/width=65,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fupzbzgpb13b3e0dfxf51.png",
      img: "https://media2.dev.to/dynamic/image/width=440,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F7qi7bzwq9yok35no2owa.png",
      txt: "Forem Open Source Core",
      descp:
        "Discussing the core forem software project — features, bugs, performance, self-hosting..",
    },
  ];
  return (
    <>
      <div className={`min-h-screen w-[4%] fixed hidden lg:block  space-y-1 px-1 bg-white ${path === "/new" ? "lg:hidden" : ""}`}>
        {array.map((a, index) => (
          <div key={index}>
            <div
              onMouseOver={() => {
                setSpecificIndex(index);
              }}
              onMouseOut={() => {
                setSpecificIndex(null);
              }}
              className="py-1 cursor-pointer border-b border-gray-200"
            >
              <img
                src={a.profile}
                className="rounded-xl h-13.5 w-full"
                alt=""
              />
            </div>
            {specificIndex === index && (
              <div
                onMouseOver={() => {
                  setSpecificIndex(index);
                }}
                onMouseOut={() => {
                  setSpecificIndex(null);
                }}
                className={`bg-white ml-12.5 cursor-pointer  shadow-2xl border border-gray-300 absolute w-90 z-50 rounded-md  overflow-hidden ${
                  specificIndex === 6 ||
                  specificIndex === 7 ||
                  specificIndex === 8 ||
                  specificIndex === 9
                    ? "-mt-84"
                    : "-mt-15 z-10"
                } ${specificIndex === 0 ? "z-70" : ""}`}
              >
                <div>
                  <img
                    src={a.img}
                    className="w-full h-50 object-cover"
                    alt=""
                  />
                </div>
                <div className="p-3">
                  <h2 className="font-bold">{a.txt}</h2>
                  <div className="py-1.5">
                    <button className="py-2 hover:bg-blue-700 cursor-pointer bg-blue-500 text-white w-full rounded-md">
                      Follow
                    </button>
                  </div>
                  <p className="text-sm">{a.descp}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
