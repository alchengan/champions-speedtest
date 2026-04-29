import { useState } from "react";
import AboutDialog from "../components/AboutDialog";

export default function AboutIcon() {
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleAboutOpen = () => {
    setAboutOpen(true);
  };

  const handleAboutClose = () => {
    setAboutOpen(false);
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="gray"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        className="hover:fill-black"
        onClick={handleAboutOpen}
      >
        <g id="info">
          <path
            id="Union"
            d="M12 2c5.5228 0 10 4.47715 10 10 0 5.5228 -4.4772 10 -10 10 -5.52285 0 -10 -4.4772 -10 -10C2 6.47715 6.47715 2 12 2m0 2c-4.41828 0 -8 3.58172 -8 8 0 4.4183 3.58172 8 8 8 4.4183 0 8 -3.5817 8 -8 0 -4.41828 -3.5817 -8 -8 -8m0 7c0.5523 0 1 0.4477 1 1v3h0.5c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1h-3c-0.55228 0 -1 -0.4477 -1 -1s0.44772 -1 1 -1h0.5v-2h-0.5c-0.55228 0 -1 -0.4477 -1 -1s0.44772 -1 1 -1zm-0.25 -4c0.6904 0 1.25 0.55964 1.25 1.25s-0.5596 1.25 -1.25 1.25 -1.25 -0.55964 -1.25 -1.25S11.0596 7 11.75 7"
            strokeWidth="1"
          ></path>
        </g>
      </svg>
      <AboutDialog aboutOpen={aboutOpen} handleAboutClose={handleAboutClose} />
    </>
  );
}
