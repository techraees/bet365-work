import React from "react";

type Props = {
  team: string;
  handicap: string;
  status: string;
};

// background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='13' viewBox='0 0 13 13'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='6.5' cy='6.5' r='6.5' fill='%23189970'/%3E%3Cpath fill='%23FFF' fill-rule='nonzero' stroke='%23FFF' stroke-width='.3' d='M2.167 6.376L5.34 9.75l5.493-5.756-.663-.744-4.83 5.011-2.463-2.58z'/%3E%3C/g%3E%3C/svg%3E");

export default function BetPartHeaderTitle({ team, handicap, status }: Props) {
  // console.log({ svg: status });
  return (
    <div className="relative flex justify-start">
      {status === "Open" && (
        <>
          <div className='w-[13px] h-[13px] absolute bg-no-repeat bg-[50%] left-[-18px] top-1 after:content-[""] after:absolute after:w-[7px] after:h-[7px] after:bg-[#ddd] after:rounded-[50%] after:border-[none] after:right-[3px] after:top-[3px]'></div>
        </>
      )}
      {(status === "WON" ||
        status === "HALF WON" ||
        status === "HALF LOST") && (
        <>
          <div className="absolute w-[13px] h-[13px] absolute bg-no-repeat bg-[50%] left-[-20px] top-[3px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
            >
              <g fill="none" fillRule="evenodd">
                <circle cx="6.5" cy="6.5" r="6.5" fill="#189970"></circle>
                <path
                  fill="#FFF"
                  fillRule="nonzero"
                  stroke="#FFF"
                  strokeWidth="0.3"
                  d="M2.167 6.376L5.34 9.75l5.493-5.756-.663-.744-4.83 5.011-2.463-2.58z"
                ></path>
              </g>
            </svg>
          </div>
        </>
      )}
      {status === "LOST" && (
        <>
          <div className="absolute w-[13px] h-[13px] absolute bg-no-repeat bg-[50%] left-[-20px] top-[3px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
            >
              <g fill="none" fillRule="evenodd">
                <circle cx="6.5" cy="6.5" r="6.5" fill="#D05858"></circle>
                <path
                  fill="#FFF"
                  d="M8.995 3.25l.766.766-2.489 2.49 2.49 2.49-.767.765-2.489-2.489-2.49 2.49-.766-.767 2.49-2.489-2.49-2.49.766-.766 2.49 2.49 2.49-2.49z"
                ></path>
              </g>
            </svg>
          </div>
        </>
      )}

      <div className="inline-flex items-center min-h-[20px] mb-[3px];">
        <span className="text-sm text-white font-bold leading-5">
          {team} {handicap}
          <div></div>
        </span>
      </div>
    </div>
  );
}
