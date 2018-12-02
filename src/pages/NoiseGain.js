import React from 'react'
import { createShaderCanvas } from 'react-shader-canvas'

const noiseGainShader = props => `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(sin(u_time * 0.45), cos(u_time * 0.25), 0.25);
vec3 colorB = vec3(tan(u_time * 0.05), sin(u_time * 0.75), 0.45);

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

float gain(float x, float k) {
  float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
  return (x<0.5)?a:1.0-a;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    float t = 1.0;
    t = abs(1.0-sin(u_time*.1))*5.;
    st += gain(noise(st*2.)*t, 1.5); // Animate the coordinate space
    color = vec3(1.) * smoothstep(.18,.2, gain(noise(st), 3.5)); // Big black drops
    ${
      props.maxField
        ? `color += max(distance(st,vec2(gain(noise(st*10.), 1.5))),distance(st,vec2(gain(noise(st*10.), 1.5))));
`
        : `
 color += smoothstep(.15,.2, gain(noise(st*10.), 1.5)); // Black splatter
color -= smoothstep(.35,.4, gain(noise(st*10.), 1.5)); // Holes on splatter
`
    }
    
    
    gl_FragColor = vec4(mix(colorA, colorB, 1.-color),1.0);
}
`

const NoiseGainShader = createShaderCanvas(noiseGainShader)

// Add a toggle button for switching off max field vector
export default function NoiseGainCurve(props) {
  return (
    <div className="shader-grid-container">
      <div>
        <h1 id="shader-name">Noise & Gain Curve</h1>
      </div>
      <div>
        <NoiseGainShader id="noise-gain" maxField />
      </div>
    </div>
  )
}
