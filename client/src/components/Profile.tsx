export default function Profile(props: any) {
  /**
   * Props used
   */
  // cssClass, name, role, occupation, education, githubLink, linkedinLink, portfolioLink

  return (
    <div className="z-10 text-xl font-fuzzy-bubbles">
      <div
        className={
          "h-40 w-40 border-2 border-amber-50 rounded-full " + props.cssClass
        }
      />
      <div className="text-center font-bold text-amber-50 italic">
        <span className="font-righteous font-medium">{props.name}</span>
        <br />
        <span className="font-medium font-righteous">{props.role}</span>
        <br />
        <div className="text-sm font-normal w-40">{props.occupation}</div>
        <div className="text-sm w-40 font-normal">{props.education}</div>
      </div>
      <div className="flex justify-around">
        <a
          href={props.githubLink}
          className="text-amber-50 text-3xl"
          target="_blank"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href={props.linkedinLink}
          className="text-amber-50 text-3xl"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a
          href={props.portfolioLink}
          className="text-amber-50 text-3xl"
          target="_blank"
        >
          <i className="fa-solid fa-file"></i>
        </a>
      </div>
    </div>
  );
}
