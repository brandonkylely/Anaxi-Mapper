import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
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
        <Profile
          cssClass="brandon"
          name="Brandon Ly"
          role="Project Lead"
          occupation="Fullstack Developer"
          education="B.S. - Biochemistry"
          githubLink="https://github.com/brandonkylely"
          linkedinLink="https://www.linkedin.com/in/brandon-ly-7300b1205/"
          portfolioLink="https://brandonkylely.github.io/r3-portfolio/"
        />
        {/* logan promo card */}
        <Profile
          cssClass="logan"
          name="Logan Senn"
          role="Project Co-Lead"
          occupation="Fullstack Developer"
          education="B.B.A. - Finance"
          githubLink="https://github.com/Lsenn404"
          linkedinLink="https://www.linkedin.com/in/logansenn/"
          portfolioLink="https://main--lambent-sopapillas-e0299b.netlify.app/"
        />
        {/* mirjanas promo card */}
        <Profile
          cssClass="mirjana"
          name="Mirjana Dukic"
          role="Collaborator"
          occupation="Fullstack Developer"
          education="B.A - Psychology"
          githubLink="https://github.com/MjDukic?tab=repositories"
          linkedinLink="https://www.linkedin.com/in/mirjanadukic/"
          portfolioLink="https://mirjanadukicportfolio.netlify.app"
        />
        {/* hannah promo card */}
        <Profile
          cssClass="hannah"
          name="Hannah Kim"
          role="Collaborator"
          occupation="Fullstack Developer"
          education="B.F.A - Graphic Design"
          githubLink="https://github.com/hannahsykim"
          linkedinLink="https://www.linkedin.com/in/kimhannah1/"
          portfolioLink="https://portfolio-hannahkim.netlify.app/"
        />
      </div>
      {/* <Routes /> */}
      <footer></footer>
    </div>
  );
}
