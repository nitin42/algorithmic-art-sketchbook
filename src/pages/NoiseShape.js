import React from 'react'
import { createShaderCanvas } from 'react-shader-canvas'

const noiseShape = props => `
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

// My own port of this processing code by @beesandbombs
// https://dribbble.com/shots/1696376-Circle-wave

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

vec3 colorA = vec3(sin(u_time * 0.45), cos(u_time * 0.25), 0.25);
vec3 colorB = vec3(cos(u_time * 0.15), sin(u_time * 0.75), 0.45);

float parabola( float x, float k ) {
  return pow(4.0 * x * (1.0-x), k);
}

float shape(vec2 st, float radius) {
	vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f = abs(cos(a*2.5))*radius+.3;
    float m = abs(mod(a+u_time*2.,3.14*2.)-3.14)/3.6;
    m += noise(st+u_time*0.1)*.5;
    a *= 1.+abs(atan(u_time*0.2))*.1;
    a *= 1.+noise(st+u_time*0.1)*0.1;
    f += sin(a*50.)*noise(st+u_time*.2)*.1;
    f += (sin(a*20.)*.1*pow(m,2.));
    return 1.-smoothstep(f,f+0.007,r);
}

float shapeBorder(vec2 st, float radius, float width) {
    return parabola(shape(st,radius)-shape(st,radius-width), 5.);
}

void main() {
	  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  vec3 color = vec3(1.0) * shapeBorder(st, sin(u_time) * 0.5, cos(u_time));
  
  color = mix(colorA, colorB, 1.0-smoothstep(.4,.41,color));

  gl_FragColor = vec4(color,1.0);
}
`

const NoiseShape = createShaderCanvas(noiseShape)

// Add a toggle button for switching off max field vector
export default function NoiseGainShape(props) {
  return (
    <div className="shader-grid-container">
      <div>
        <h1 id="shader-name">Noise & Shapes</h1>
      </div>
      <div>
        <NoiseShape id="noise-shape" />
      </div>
    </div>
  )
}
