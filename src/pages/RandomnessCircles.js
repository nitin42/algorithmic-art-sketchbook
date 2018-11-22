import React from 'react'
import { createShaderCanvas } from "react-shader-canvas";

const pseudoRandomShader = props => `
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(sin(u_time * 0.45), cos(u_time * 0.25), 0.25);
vec3 colorB = vec3(tan(u_time * 0.05), sin(u_time * 0.75), 0.45);

float random (vec2 st) {
  return fract(tan(dot(st.xy,
                         st.xy*4.0)*
        ${props.random || "43758.409"})*cos(dot(st.xy,
                         st.xy*4.0)*
        ${props.random || "43758.409"}));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    float rnd = random( st );
    gl_FragColor = vec4(mix(colorA, colorB, vec3(rnd)),1.0);
}
`;

const Randomness = createShaderCanvas(pseudoRandomShader);

export default function RandomnessCircles(props) {
  return (
    <div>
    <div className="shader-grid-container">
      <div>
        <h1 id="shader-name">RANDOMNESS</h1>
      </div>
      <div style={{ marginTop: '20%', }}>
        <Randomness id="randomness" width="600" height="600" random={Math.random() * 20000.0} />
      </div>
    </div>
    <div className="center" style={{ marginTop: 50 }}>
      <a href="./TilesArcs" id="explore-link">Tiles & Arcs &rarr;</a>
    </div>
    </div>
  )
}