import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

// Vertex shader for the distortion plane
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader for liquid water distortion effect
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Calculate distance from mouse
    vec2 mouseUV = uMouse;
    float dist = length(uv - mouseUV);
    
    // Create ripple effect from mouse position
    float ripple = sin(dist * 30.0 - uTime * 3.0) * exp(-dist * 4.0) * uIntensity * 0.15;
    
    // Mouse velocity-based distortion
    vec2 velocity = uMouse - uPrevMouse;
    float velocityMag = length(velocity) * 10.0;
    
    // Liquid noise distortion
    float noise1 = snoise(vec3(uv * 3.0, uTime * 0.3)) * 0.02;
    float noise2 = snoise(vec3(uv * 5.0 + 100.0, uTime * 0.2)) * 0.015;
    float noise3 = snoise(vec3(uv * 8.0 + 200.0, uTime * 0.4)) * 0.01;
    
    // Combine noises
    float totalNoise = (noise1 + noise2 + noise3) * (1.0 + velocityMag);
    
    // Calculate displacement
    vec2 displacement = vec2(
      totalNoise + ripple * cos(atan(uv.y - mouseUV.y, uv.x - mouseUV.x)),
      totalNoise + ripple * sin(atan(uv.y - mouseUV.y, uv.x - mouseUV.x))
    );
    
    // Mouse attraction distortion
    vec2 toMouse = normalize(mouseUV - uv);
    float attraction = smoothstep(0.5, 0.0, dist) * uIntensity * 0.05;
    displacement += toMouse * attraction * velocityMag;
    
    // Apply displacement
    vec2 distortedUV = uv + displacement;
    
    // Chromatic aberration based on distortion
    float aberrationAmount = length(displacement) * 2.0;
    vec4 colorR = texture2D(uTexture, distortedUV + vec2(aberrationAmount * 0.003, 0.0));
    vec4 colorG = texture2D(uTexture, distortedUV);
    vec4 colorB = texture2D(uTexture, distortedUV - vec2(aberrationAmount * 0.003, 0.0));
    
    vec4 finalColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    
    // Add subtle glow around mouse
    float glow = smoothstep(0.3, 0.0, dist) * uIntensity * 0.1;
    vec3 glowColor = vec3(0.4, 0.9, 0.9); // Teal glow
    finalColor.rgb += glowColor * glow;
    
    gl_FragColor = finalColor;
  }
`;

interface DistortionPlaneProps {
  texture: THREE.Texture | null;
  mousePos: { x: number; y: number };
}

const DistortionPlane = ({ texture, mousePos }: DistortionPlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });
  
  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uPrevMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 },
    uIntensity: { value: 1.0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [texture, size]);
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      
      // Smooth mouse interpolation
      const targetX = mousePos.x;
      const targetY = 1 - mousePos.y;
      
      const currentMouse = material.uniforms.uMouse.value;
      prevMouseRef.current.x = currentMouse.x;
      prevMouseRef.current.y = currentMouse.y;
      
      currentMouse.x += (targetX - currentMouse.x) * 0.1;
      currentMouse.y += (targetY - currentMouse.y) * 0.1;
      
      material.uniforms.uPrevMouse.value.set(prevMouseRef.current.x, prevMouseRef.current.y);
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uTexture.value = texture;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

const WebGLDistortion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const mousePos = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const [normalizedMouse, setNormalizedMouse] = useState({ x: 0.5, y: 0.5 });
  
  // Capture the page content as texture
  useEffect(() => {
    const captureScreen = async () => {
      try {
        // Create a gradient texture as base
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d')!;
        
        // Create a deep space gradient
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.8
        );
        gradient.addColorStop(0, 'hsla(270, 40%, 15%, 1)');
        gradient.addColorStop(0.3, 'hsla(250, 35%, 8%, 1)');
        gradient.addColorStop(0.6, 'hsla(260, 35%, 6%, 1)');
        gradient.addColorStop(1, 'hsla(240, 40%, 3%, 1)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some subtle aurora-like effects
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = 100 + Math.random() * 300;
          
          const auroraGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          const hue = [170, 270, 340][i % 3];
          auroraGradient.addColorStop(0, `hsla(${hue}, 60%, 50%, 0.15)`);
          auroraGradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = auroraGradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        setTexture(tex);
      } catch (error) {
        console.log('Using fallback texture');
        const loader = new THREE.TextureLoader();
        const fallbackTexture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
        setTexture(fallbackTexture);
      }
    };
    
    captureScreen();
    
    const handleResize = () => {
      captureScreen();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Update normalized mouse position
  useEffect(() => {
    setNormalizedMouse({
      x: mousePos.x / window.innerWidth,
      y: mousePos.y / window.innerHeight,
    });
  }, [mousePos]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: 'screen' }}
    >
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <DistortionPlane texture={texture} mousePos={normalizedMouse} />
      </Canvas>
    </div>
  );
};

export default WebGLDistortion;
