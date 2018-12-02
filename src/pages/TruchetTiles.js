import React from 'react'
import { createShaderCanvas } from 'react-shader-canvas'

const tileShader = props => `
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vUv;

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec3 colorA = vec3(sin(u_time * 0.001), cos(u_time), 0.85);
vec3 colorB = vec3(tan(u_time), sin(u_time), 0.35);

vec2 rotateTilePattern(vec2 _st){

  _st *= 2.0;

  float index = 0.0;
  index += step(1., mod(_st.x,2.0));
  index += step(1., mod(_st.y,2.0))*2.0;

  _st = fract(_st);

  // Rotate each cell according to the index
  if(index == 1.0){
    //  Rotate cell 1 by 90 degrees
    _st = rotate2D(_st,PI*${props.timeSync ? 'u_time/4.0' : '0.5'});
  } else if(index == 2.0){
    //  Rotate cell 2 by -90 degrees
    _st = rotate2D(_st,PI*-${props.timeSync ? 'u_time/2.0' : '0.5'});
  } else if(index == 3.0){
    //  Rotate cell 3 by 180 degrees
    _st = rotate2D(_st,PI);
  }

  return _st;
}

void main (void) {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  st = tile(st,3.0);
  st = rotateTilePattern(st);
  st = rotate2D(st,PI*u_time*0.25);

  gl_FragColor = vec4(vec3(mix(colorA, colorB, step(st.x - st.y + 2., st.x + st.y + .1))),1.0);
}
`

const TileDesign = createShaderCanvas(tileShader)

export default function TruchetTiles(props) {
  return (
    <div className="shader-grid-container">
      <div>
        <h1 id="shader-name">Truchet Tiles</h1>
      </div>
      <div>
        <TileDesign id="tiles" />
      </div>
    </div>
  )
}
