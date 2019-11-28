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
precision mediump float;

float random(float p){
    return fract(sin(p)*10000.);
}

float noise(vec2 p){
    return random(p.x+p.y*10000.);
}

vec2 sw(vec2 p){return vec2(floor(p.x),floor(p.y));}
vec2 se(vec2 p){return vec2(ceil(p.x),floor(p.y));}
vec2 nw(vec2 p){return vec2(floor(p.x),ceil(p.y));}
vec2 ne(vec2 p){return vec2(ceil(p.x),ceil(p.y));}

float smoothNoise(vec2 p){
    vec2 inter=smoothstep(0.,1.,fract(p));
    float s=mix(noise(sw(p)),noise(se(p)),inter.x);
    float n=mix(noise(nw(p)),noise(ne(p)),inter.x);
    return mix(s,n,inter.y);
    return noise(nw(p));
}

float movingNoise(vec2 p){
    float total=0.;
    total+=smoothNoise(p-time);
    total+=smoothNoise(p*2.+time)/2.;
    total+=smoothNoise(p*4.-time)/4.;
    total+=smoothNoise(p*8.+time)/8.;
    total+=smoothNoise(p*16.-time)/16.;
    total/=1.+1./2.+1./4.+1./8.+1./16.;
    return total;
}

float nestedNoise(vec2 p){
    float x=movingNoise(p);
    float y=movingNoise(p+100.);
    return movingNoise(p+vec2(x,y));
}

void main(){
    vec2 p=vTexCoord*2.;
    float brightness=nestedNoise(p);
    gl_FragColor.rgb=vec3(brightness);
    gl_FragColor.a=1.;
}