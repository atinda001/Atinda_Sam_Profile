import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform float isDark;
  
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    
    // Base color based on theme
    vec3 baseColor = mix(vec3(0.96, 0.96, 0.96), vec3(0.07, 0.07, 0.07), isDark);
    
    // Subtle noise pattern
    float n = fbm(uv * 100.0 + time * 0.05);
    n = mix(n, fbm(uv * 200.0 + time * 0.02), 0.3);
    
    // Very subtle grain effect
    vec3 color = baseColor + n * 0.015;
    
    // Add very subtle flow
    float flow = sin(uv.x * 8.0 + time * 0.1) * sin(uv.y * 8.0 + time * 0.15) * 0.008;
    color += flow;
    
    // Add subtle radial gradient
    float radial = 1.0 - length(uv - 0.5) * 0.5;
    color *= mix(0.98, 1.02, radial);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function ShaderBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const materialRef = useRef<THREE.ShaderMaterial>();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      premultipliedAlpha: false 
    });
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        isDark: { value: document.body.classList.contains('dark') ? 1.0 : 0.0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    function animate() {
      if (!materialRef.current) return;
      
      materialRef.current.uniforms.time.value += 0.008;
      materialRef.current.uniforms.isDark.value = document.body.classList.contains('dark') ? 1.0 : 0.0;
      
      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    // Resize handler
    const handleResize = () => {
      if (rendererRef.current && materialRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        rendererRef.current.setSize(width, height);
        materialRef.current.uniforms.resolution.value.set(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0"
      style={{ 
        pointerEvents: 'none',
        opacity: 0.6 
      }}
    />
  );
}
