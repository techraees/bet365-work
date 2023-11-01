import * as React from "react"
const SoccerField = () => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={13}
            fill="#2c6d36"
            fillRule="evenodd"
            viewBox='0 0 22 13'
        >
            <rect width={21} height={12} x={0.5} y={0.5} stroke="#ccc" rx={1} />
            <path
                fill="#ccc"
                fillRule="nonzero"
                d="M10.45.542h1.101v3.791H10.45zm0 8.125h1.101v3.791H10.45z"
            />
            <path
                stroke="#ccc"
                d="M1.1 3.25h3.3v6.5H1.1m19.8 0h-3.3v-6.5h3.3M8.8 6.5c0-1.264.973-2.167 2.2-2.167 1.262 0 2.2.903 2.2 2.167 0 1.129-.973 2.167-2.2 2.167A2.197 2.197 0 0 1 8.8 6.5z"
            />
        </svg>
    )



}
export default SoccerField