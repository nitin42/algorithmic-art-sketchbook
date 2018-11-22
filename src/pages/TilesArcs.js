import React from 'react'
import { createShaderCanvas } from "react-shader-canvas";

const randomTwoShader = props => `
// Author @patriciogv - 2015
// Title: Truchet - 10 print

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index-0.5)*2.0));
    if (_index > 0.75) {
        _st = vec2(1.0) - _st;
    } else if (_index > 0.5) {
        _st = vec2(1.0-_st.x,_st.y);
    } else if (_index > 0.25) {
        _st = 1.0-vec2(1.0-_st.x,_st.y);
    }
    return _st;
}

vec3 colorA = vec3(sin(u_time * 0.45), cos(u_time * 0.25), 0.25);
vec3 colorB = vec3(tan(u_time * 0.05), sin(u_time * 0.75), 0.45);

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 15.0;
    // st = (st-vec2(5.0))*(abs(sin(u_time*0.2))*5.);
    // st.x += u_time*3.0;

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    vec2 tile = truchetPattern(fpos, random( ipos ));

    float color = 0.0;

    // // Circles
    color = (step(length(tile), sin(u_time) + cos(u_time)) -
             step(length(tile), cos(u_time) * sin(u_time)) ) -
            (step(length(tile-vec2(sin(u_time))), cos(u_time)) -
             step(length(tile-vec2(cos(u_time))), sin(u_time)) );

    gl_FragColor = vec4(mix(colorA, colorB, color),1.0);
}
`;

const TilesArcs = createShaderCanvas(randomTwoShader);

export default function TilesWithArcs(props) {
  return (
    <div>
    <div className="shader-grid-container">
      <div>
        <h1 id="shader-name">TILES & ARCS</h1>
      </div>
      <div style={{ marginTop: '20%', }}>
        <TilesArcs id="tiles-arcs" width="600" height="600" />
      </div>
    </div>
    <div className="center" style={{ marginTop: 50 }}>
      <a href="./NoiseGain" id="explore-link">Noise & Gain Curve &rarr;</a>
    </div>
    </div>
  )
}