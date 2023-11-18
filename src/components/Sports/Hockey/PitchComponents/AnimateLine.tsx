import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface AnimateLineProps {
  [key: string]: any;
}

type Point = {
  x: number,
  y: number
}

interface AnimateLineInterface {
  from: any;
  to: any
}

const AnimateLine: React.FC<AnimateLineInterface> = ({ from, to }) => {

  return (
    <svg>
      <line x1={`${from.x}`} y1={`${from.y}`} x2={`${to.x}`} y2={`${to.y}`} style={{ stroke: "#343434", strokeWidth: 1 }} >
        <animate attributeName="x2" attributeType="XML" begin="0s" dur="0.5s" fill="freeze" from={`${from.x}`} to={`${to.x}`} />
        <animate attributeName="y2" attributeType="XML" begin="0s" dur="0.5s" fill="freeze" from={`${from.y}`} to={`${to.y}`} />
      </line>
    </svg>
  )
}

export default AnimateLine;