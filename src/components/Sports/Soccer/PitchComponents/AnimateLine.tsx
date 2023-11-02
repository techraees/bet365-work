import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface AnimateLineProps {
  [key: string]: any;
}

const AnimateLine: React.FC<AnimateLineProps> = (props: any) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  console.log("----animated----", props);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathRef]);

  console.log("----path length----", pathLength);

  return (
    <Wrapper
      pathLength={pathLength}
    >
      <path
        ref={pathRef}
        d={`M${props.from.x} ${props.from.y} L${props.to.x} ${props.to.y}`}
        fill='none'
        stroke='#000'
        strokeWidth={0.265}
      />
    </Wrapper>
  );
};

const draw = keyframes<{ pathLength: number }>`
    from {
    stroke-dashoffset: ${(props) => props.pathLength};
    }
    to {
    stroke-dashoffset: 0;
    }
`;

const Wrapper = styled.svg<{ pathLength: number }>`
    width: 100%;
    height: 100%;
    stroke-dasharray: ${(props) => props.pathLength};
    stroke-dashoffset: ${(props) => props.pathLength};
    animation: ${draw} 0.5s linear forwards;
`

export default AnimateLine;