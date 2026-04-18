interface PinIconProps {
  isPinned: boolean;
  handlePin: () => void;
}

export default function PinIcon({ isPinned, handlePin }: PinIconProps) {
  const handleOnClick = (e: any) => {
    handlePin();
    e.stopPropagation();
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={isPinned ? "gray" : "none"}
      stroke="gray"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      className={`${isPinned ? "visible" : "invisible"} hover:stroke-black group-hover:visible`}
      onClick={handleOnClick}
    >
      <desc>Pin 1 Streamline Icon: https://streamlinehq.com</desc>
      <g id="pin-1--pin-push-thumbtack">
        <path
          id="Vector 48"
          d="m17.0001 12 4.5 -2.5 -7 -7 -2.5 4.5L3.5 10.5l10 10 3.5001 -8.5Z"
          strokeWidth="2"
        ></path>
        <path id="Vector 118" d="m1.5 22.5 7 -7" strokeWidth="2"></path>
      </g>
    </svg>
  );
}
