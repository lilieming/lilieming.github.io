// casey conchinha - @kcconch ( https://github.com/kcconch )
// louise lessel - @louiselessel ( https://github.com/louiselessel )
// more p5.js + shader examples: https://itp-xstory.github.io/p5js-shaders/
// this is a modification of a shader by adam ferriss
// https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/2_texture-coordinates/2-1_basic

precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;//uv

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// we need the sketch resolution to perform some calculations
uniform vec2 resolution;
uniform float time;
uniform float mouse;

// our texture coming from p5
uniform sampler2D tex0;



#define N 8.

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    //st.x *= resolution.x/resolution.y;
    st -= .5;
    st /= .5;
    vec3 color = vec3(0.);
    
    vec2 u = st;
    float t = time,
    r = length(u), 
    a = atan(u.y,u.x),
    i = floor(r*N);

    a *= floor(pow(128.,i/N)); 	
    a += t+137.5;//*abs(sin(3.1415*abs(sin(2.5*t))))+137.5*i;
    r +=  (.5+.5*cos(a)) / N;    
    r = floor(N*r)/N;
	color = (1.- r)*vec4(1.,random(vec2(N)),random(vec2(N/2.)),1).rgb;
    gl_FragColor = vec4(vec3(st.x),1.0);
}

