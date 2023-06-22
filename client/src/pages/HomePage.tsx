import { useNavigate } from "react-router-dom";
// import Routes from "../components/archived-components/Routes";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-max screen">
      <div>
        <div className="h-60vh w-full opacity-80 bg-neutral-800 absolute"></div>
        <div className="hero h-60vh w-full flex flex-col justify-center">
          <div className="text-white font-fuzzy-bubbles text-5xl text-center z-10 italic">
            Anaxi
            <br />
            <button
              className="text-white font-fuzzy-bubbles text-2xl border-1 rounded-lg z-10 italic mt-6 bg-opacity-10 bg-black w-20 pr-1 transition-all ease-out duration-300 hover:scale-125 hover:bg-black hover:bg-opacity-30"
              onClick={() => {
                navigate("/search");
              }}
            >
              start
            </button>
          </div>
        </div>
      </div>
      <div className="h-60vh w-full opacity-40 bg-red-50 absolute"></div>
      <div className="about h-60vh w-full grid grid-cols-6 divide-x divide-sky-800 text-sky-800 content-center italic font-fuzzy-bubbles ">
        <div className="text-2xl text-right pt-4 px-10 z-10">About</div>
        <div className="col-span-4 w-full h-full bg-white bg-opacity-70 flex items-center justify-center rounded-2xl shadow-xl shadow-zinc-900">
          <div className="text-lg text-left col-span-4 px-12 z-10 py-2">
            Anaxi exists to provide the ultimate map experience, designed with
            features such as 3d rendered overlay and data visualizations. The
            primary functionality revolves around location based searches, which
            will let you find the best places to eat, drink, and shop in any
            area. To start, simply enter a location you would like to explore,
            and from there, you can enter more parameters to find the places of
            interest you are looking for in your area. Our application features
            route visualization and 3d model imports for a more enjoyable and
            immersive user experience, with further visualization features like
            animations and arc layer mapping to come in future releases!
          </div>
        </div>
      </div>
      <div className="h-60vh w-full opacity-90 bg-slate-900 absolute"></div>
      <div className="promo h-60vh w-full flex flex-row justify-evenly pt-28">
        {/* brandon promo card */}
        <div className="z-10 text-xl font-fuzzy-bubbles">
          <div className="brandon h-40 w-40 border-2 border-amber-50 rounded-full" />
          <div className="text-center font-bold text-amber-50 italic">
            <span className="font-righteous font-medium">Brandon Ly</span>
            <br />
            <span className="font-medium font-righteous">Lead Developer</span>
            <br />
            <div className="text-sm font-normal w-40">Fullstack Developer,</div>
            <div className="text-sm w-40 font-normal">B.S. - Biochemistry</div>
          </div>
          <div className="flex justify-around">
            <a
              href="https://github.com/brandonkylely"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/brandon-ly-7300b1205/"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://brandonkylely.github.io/r3-portfolio/"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-solid fa-file"></i>
            </a>
          </div>
        </div>
        {/* logan promo card */}
        <div className="z-10 text-xl font-fuzzy-bubbles">
          <div className="logan h-40 w-40 border-2 border-amber-50 rounded-full" />
          <div className="text-center font-bold text-amber-50 italic">
            <span className="font-righteous font-medium">Logan Senn</span>
            <br />
            <span className="font-medium font-righteous">
              Co-Lead Dev.
            </span>
            <br />
            <div className="text-sm font-normal w-40">Fullstack Developer</div>
            <div className="text-sm w-40 font-normal">B.B.A. - Finance</div>
          </div>
          <div className="flex justify-around">
            <a
              href="https://github.com/Lsenn404"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/logansenn/"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://main--lambent-sopapillas-e0299b.netlify.app/" className="text-amber-50 text-3xl" target="_blank">
              <i className="fa-solid fa-file"></i>
            </a>
          </div>
        </div>
        {/* mirjanas promo card */}
        <div className="z-10 text-xl font-fuzzy-bubbles">
          <div className="mirjana h-40 w-40 border-2 border-amber-50 rounded-full" />
          <div className="text-center font-bold text-amber-50 italic">
            <span className="font-righteous font-medium">Mirjana Dukic</span>
            <br />
            <span className="font-medium font-righteous w-40">
              Software Dev.
            </span>
            <br />
            <div className="text-sm font-normal w-40">Fullstack Developer </div>
            <div className="text-sm w-40 font-normal">B.A - Psychology</div>
          </div>
          <div className="flex justify-around">
            <a
              href="https://github.com/MjDukic?tab=repositories"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/mirjanadukic/"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://mirjanadukicportfolio.netlify.app"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-solid fa-file"></i>
            </a>
          </div>
        </div>
        {/* empty promo card */}
        <div className="z-10 text-xl font-fuzzy-bubbles">
          <div className="hannah h-40 w-40 border-2 border-amber-50 rounded-full" />
          <div className="text-center font-bold text-amber-50 italic">
            <span className="font-righteous font-medium">Hannah Kim</span>
            <br />
            <span className="font-medium font-righteous w-40">
              Software Dev.
            </span>
            <br />
            <div className="text-sm font-normal w-40">Fullstack Developer </div>
            <div className="text-sm w-40 font-normal">B.F.A - Graphic Design</div>
            <div className="text-sm w-40 font-normal"></div>
          </div>
          <div className="flex justify-around">
            <a
              href="https://github.com/hannahsykim"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/kimhannah1/"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://portfolio-hannahkim.netlify.app/"
              className="text-amber-50 text-3xl"
              target="_blank"
            >
              <i className="fa-solid fa-file"></i>
            </a>
          </div>
        </div>
      </div>
      {/* <Routes /> */}
      <footer></footer>
    </div>
  );
}
