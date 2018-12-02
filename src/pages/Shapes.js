import React from 'react'
import { createShaderCanvas } from 'react-shader-canvas'

const mixedShapeShader = props => `
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(sin(u_time * 0.25), cos(u_time * 0.65), 0.25);
vec3 colorB = vec3(tan(u_time * 0.65), sin(u_time * 0.35), 0.48);

float parabola( float x, float k ) {
  return pow(4.0 * x * (1.0-x), k);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  vec3 color = vec3(0.0);
  float d = 0.0;

  st = st *2.-1.;

  int N = 3;

  float a = atan(st.x,st.y)+ 1.5 * PI;
  float r = parabola(TWO_PI/float(N), cos(u_time));

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);

  color = mix(colorA, colorB, 1.0-smoothstep(.4,.41,d));

  gl_FragColor = vec4(color,1.0);
}
`

const MixedShapes = createShaderCanvas(mixedShapeShader)

export default function Shapes(props) {
  return (
    <div className="shader-grid-container">
      <div>
        <h1 id="shader-name">Mixed Shapes</h1>
      </div>
      <div>
        <MixedShapes id="mixed-shapes" />
      </div>
    </div>
  )
}
