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
    
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
  
  float flow(vec2 p, float t) {
    float angle = fbm(p * 0.5 + t * 0.1) * 6.28318;
    return sin(angle) * 0.5 + 0.5;
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 center = vec2(0.5, 0.5);
    
    // Base color based on theme
    vec3 baseColor = mix(vec3(0.95, 0.95, 0.95), vec3(0.05, 0.05, 0.05), isDark);
    
    // Create flowing patterns
    float flowPattern = flow(uv * 2.0, time);
    float flowPattern2 = flow(uv * 3.0 + vec2(100.0), time * 0.7);
    
    // Noise layers
    float n1 = fbm(uv * 8.0 + time * 0.05);
    float n2 = fbm(uv * 16.0 + time * 0.03);
    float n3 = fbm(uv * 32.0 + time * 0.02);
    
    // Combine noise with flow
    float combined = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    combined = mix(combined, flowPattern, 0.3);
    combined = mix(combined, flowPattern2, 0.2);
    
    // Create depth with radial gradient
    float radial = 1.0 - length(uv - center) * 0.8;
    
    // Wave patterns
    float wave1 = sin(uv.x * 12.0 + time * 0.5) * cos(uv.y * 8.0 + time * 0.3);
    float wave2 = sin(uv.x * 6.0 + time * 0.7) * cos(uv.y * 10.0 + time * 0.4);
    
    // Combine all elements
    float final = combined * 0.7 + wave1 * 0.15 + wave2 * 0.15;
    final *= radial;
    
    // Apply to base color
    vec3 color = baseColor + final * 0.08;
    
    // Add subtle gradient overlay
    float gradient = mix(1.0, 0.95, uv.y);
    color *= gradient;
    
    // Enhance contrast slightly
    color = mix(color, smoothstep(0.0, 1.0, color), 0.3);
    
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
        opacity: 0.8 
      }}
    />
  );
}
