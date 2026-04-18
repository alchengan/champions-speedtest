import { useState, MouseEvent } from "react";

interface PokeballIconProps {
  handleRemoveFromTeam: () => void;
}

export default function PokeballIcon({
  handleRemoveFromTeam,
}: PokeballIconProps) {
  const [showX, setShowX] = useState(false);

  const handleShowX = (e: MouseEvent<HTMLElement>) => {
    setShowX(true);
  };

  const handleHideX = () => {
    setShowX(false);
  };

  const handleXClick = (e: any) => {
    handleRemoveFromTeam();
    e.stopPropagation();
  };

  const x = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      stroke-linecap="round"
      stroke-linejoin="round"
      id="X--Streamline-Tabler"
      height="24"
      width="24"
      onClick={handleXClick}
    >
      <desc>X Streamline Icon: https://streamlinehq.com</desc>
      <path d="M18 6 6 18" stroke-width="2"></path>
      <path d="m6 6 12 12" stroke-width="2"></path>
    </svg>
  );

  const pokeball = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="24"
      width="24"
    >
      <desc>Pokeball Streamline Icon: https://streamlinehq.com</desc>
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0 -18 0" strokeWidth="2"></path>
      <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" strokeWidth="2"></path>
      <path d="M3 12h6" strokeWidth="2"></path>
      <path d="M15 12h6" strokeWidth="2"></path>
    </svg>
  );

  return (
    <div onMouseEnter={handleShowX} onMouseLeave={handleHideX}>
      {showX ? x : pokeball}
    </div>
  );
}
