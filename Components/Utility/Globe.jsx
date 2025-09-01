"use client"
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Globe = ({
    size = "w-full max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
    className = "",
    animate = true
}) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const globeRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const container = mountRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup - adjusted for much larger globe
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 0, 7.0); // Moved back further for much larger globe (was 5.5)
        camera.lookAt(0, 0, 0); // Look at center of scene

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.style.display = 'block';
        renderer.domElement.style.margin = '0 auto';
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '50%';
        renderer.domElement.style.left = '50%';
        renderer.domElement.style.transform = 'translate(-50%, -50%)';
        rendererRef.current = renderer;
        container.appendChild(renderer.domElement);

        // Globe geometry and material - FURTHER INCREASED SIZE with your color scheme
        const geometry = new THREE.SphereGeometry(3.5, 128, 128); // Increased from 2.8 to 3.5 (25% larger)
        
        // Create extraordinary shader material with YOUR CSS COLORS
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                opacity: { value: 0.8 },
                textColor: { value: new THREE.Color(0.15, 0.15, 0.25) }, // --text: oklch(0.15 0.1 254) for light mode
                textMuted: { value: new THREE.Color(0.5, 0.5, 0.65) }, // --text-muted: oklch(0.5 0.1 254) for light mode
                highlight: { value: new THREE.Color(0.25, 0.35, 0.55) }, // --highlight: oklch(0.35 0.15 254) for light mode
                primary: { value: new THREE.Color(0.4, 0.4, 0.6) }, // --primary: oklch(0.4 0.1 254)
                secondary: { value: new THREE.Color(0.4, 0.35, 0.25) }, // --secondary: oklch(0.4 0.1 74)
                pulseSpeed: { value: 2.0 },
                gridIntensity: { value: 2.0 } // Increased for better light mode visibility
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;
                uniform float time;
                
                void main() {
                    vUv = uv;
                    vPosition = position;
                    vNormal = normalize(normalMatrix * normal);
                    
                    // Add subtle vertex animation for organic feel
                    vec3 pos = position;
                    float wave = sin(pos.x * 4.0 + time) * cos(pos.y * 4.0 + time) * 0.015;
                    pos += normal * wave;
                    
                    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float opacity;
                uniform vec3 textColor;
                uniform vec3 textMuted;
                uniform vec3 highlight;
                uniform vec3 primary;
                uniform vec3 secondary;
                uniform float pulseSpeed;
                uniform float gridIntensity;
                varying vec2 vUv;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;
                
                void main() {
                    // Enhanced grid system with YOUR COLOR SCHEME
                    vec2 grid1 = fract(vUv * 32.0); // More detailed grid
                    vec2 grid2 = fract(vUv * 16.0 + time * 0.1);
                    vec2 grid3 = fract(vUv * 64.0 - time * 0.05);
                    
                    // Primary grid lines with your highlight color
                    float line1 = smoothstep(0.0, 0.15, grid1.x) * smoothstep(0.0, 0.15, grid1.y);
                    line1 += smoothstep(0.85, 1.0, grid1.x) + smoothstep(0.85, 1.0, grid1.y);
                    
                    // Secondary animated grid with primary color
                    float line2 = smoothstep(0.0, 0.1, grid2.x) * smoothstep(0.0, 0.1, grid2.y);
                    line2 += smoothstep(0.9, 1.0, grid2.x) + smoothstep(0.9, 1.0, grid2.y);
                    
                    // Tertiary fine grid with text-muted color
                    float line3 = smoothstep(0.0, 0.05, grid3.x) * smoothstep(0.0, 0.05, grid3.y);
                    line3 += smoothstep(0.95, 1.0, grid3.x) + smoothstep(0.95, 1.0, grid3.y);
                    
                    // Fresnel effect for rim lighting
                    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
                    float fresnel = 1.0 - abs(dot(viewDirection, vNormal));
                    fresnel = pow(fresnel, 2.0);
                    
                    // Pulsing energy waves
                    float pulse = sin(time * pulseSpeed + vPosition.y * 8.0) * 0.5 + 0.5;
                    float energyWave = sin(time * 3.0 + length(vPosition.xz) * 10.0) * 0.3 + 0.7;
                    
                    // Combine all effects with YOUR COLORS
                    float lineAlpha1 = (1.0 - line1) * 0.9; // Main structure - highlight color
                    float lineAlpha2 = (1.0 - line2) * 0.5 * pulse; // Secondary - primary color
                    float lineAlpha3 = (1.0 - line3) * 0.3 * energyWave; // Fine details - text-muted
                    
                    // Color mixing using your CSS color scheme
                    vec3 finalColor = highlight * lineAlpha1 + primary * lineAlpha2 + textMuted * lineAlpha3;
                    
                    // Add fresnel glow with secondary color
                    finalColor += secondary * fresnel * 0.4 * pulse;
                    
                    // Add energy pulse with text color
                    finalColor = mix(finalColor, textColor, pulse * 0.2);
                    
                    float totalAlpha = (lineAlpha1 + lineAlpha2 + lineAlpha3) * gridIntensity;
                    totalAlpha += fresnel * 0.6 * pulse;
                    
                    totalAlpha *= opacity;
                    gl_FragColor = vec4(finalColor, totalAlpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });

        const globe = new THREE.Mesh(geometry, material);
        globe.position.set(0, 0, 0); // Ensure globe is centered
        globeRef.current = globe;
        scene.add(globe);

        // Removed wireframe overlay to have only single color grid lines from shader

        // Add extraordinary orbital rings with glow effects
        const createGlowRing = (innerRadius, outerRadius, color, opacity, rotationX, rotationY) => {
            const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);
            const ringMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color: { value: new THREE.Color(color) },
                    opacity: { value: opacity }
                },
                vertexShader: `
                    varying vec2 vUv;
                    varying vec3 vPosition;
                    uniform float time;
                    
                    void main() {
                        vUv = uv;
                        vPosition = position;
                        
                        // Add rotation animation
                        vec3 pos = position;
                        float angle = time * 0.5;
                        float c = cos(angle);
                        float s = sin(angle);
                        // Manual 2D rotation instead of mat2
                        float newX = c * pos.x - s * pos.z;
                        float newZ = s * pos.x + c * pos.z;
                        pos.x = newX;
                        pos.z = newZ;
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    uniform vec3 color;
                    uniform float opacity;
                    varying vec2 vUv;
                    varying vec3 vPosition;
                    
                    void main() {
                        float dist = length(vUv - 0.5);
                        float pulse = sin(time * 3.0 + dist * 20.0) * 0.5 + 0.5;
                        
                        // Create glow effect
                        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
                        glow = pow(glow, 2.0);
                        
                        float alpha = glow * pulse * opacity;
                        gl_FragColor = vec4(color, alpha);
                    }
                `,
                transparent: true,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = rotationX;
            ring.rotation.y = rotationY;
            return ring;
        };

        // Create multiple glowing rings with YOUR COLOR SCHEME - updated for better light mode contrast
        const ring1 = createGlowRing(4.5, 4.6, 0x405989, 0.5, Math.PI / 3, 0); // increased opacity for light mode
        const ring2 = createGlowRing(5.0, 5.1, 0x666699, 0.45, -Math.PI / 4, Math.PI / 6); // increased opacity for light mode  
        const ring3 = createGlowRing(5.5, 5.6, 0x665940, 0.35, Math.PI / 6, -Math.PI / 4); // increased opacity for light mode
        
        scene.add(ring1);
        scene.add(ring2);
        scene.add(ring3);

        // Enhanced particle system with MORE particles close to globe
        const createParticleSystem = () => {
            const particleCount = 1500; // Increased from 800 to 1500
            const positions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);
            
            for (let i = 0; i < particleCount; i++) {
                // Create multiple particle layers around the globe
                let radius;
                const layerType = Math.random();
                
                if (layerType < 0.4) {
                    // Close layer - 40% of particles very close to globe surface
                    radius = 3.6 + Math.random() * 0.3; // 3.6 to 3.9
                } else if (layerType < 0.7) {
                    // Medium layer - 30% of particles slightly further
                    radius = 3.9 + Math.random() * 0.4; // 3.9 to 4.3
                } else {
                    // Outer layer - 30% of particles at edge
                    radius = 4.3 + Math.random() * 0.3; // 4.3 to 4.6
                }
                
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                
                positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i * 3 + 2] = radius * Math.cos(phi);
                
                // Add orbital velocities
                velocities[i * 3] = (Math.random() - 0.5) * 0.02;
                velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
                velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
                
                // Assign YOUR CSS COLORS - much darker for better light mode contrast
                const colorIndex = Math.floor(Math.random() * 5);
                switch(colorIndex) {
                    case 0: colors[i * 3] = 0.1; colors[i * 3 + 1] = 0.2; colors[i * 3 + 2] = 0.4; break; // much darker highlight
                    case 1: colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.2; colors[i * 3 + 2] = 0.45; break; // much darker primary
                    case 2: colors[i * 3] = 0.25; colors[i * 3 + 1] = 0.15; colors[i * 3 + 2] = 0.1; break; // much darker secondary
                    case 3: colors[i * 3] = 0.25; colors[i * 3 + 1] = 0.25; colors[i * 3 + 2] = 0.4; break; // much darker text-muted
                    default: colors[i * 3] = 0.05; colors[i * 3 + 1] = 0.05; colors[i * 3 + 2] = 0.15; break; // much darker text
                }
                
                sizes[i] = Math.random() * 0.08 + 0.03; // Increased particle size for better visibility
            }
            
            const particleGeometry = new THREE.BufferGeometry();
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
            particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            
            const particleMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    pointTexture: { value: null }
                },
                vertexShader: `
                    attribute float size;
                    attribute vec3 customColor;
                    varying vec3 vColor;
                    varying float vSize;
                    uniform float time;
                    
                    void main() {
                        vColor = customColor;
                        vSize = size;
                        
                        vec3 pos = position;
                        
                        // Add orbital motion
                        float angle = time * 0.3 + length(pos) * 0.1;
                        float c = cos(angle);
                        float s = sin(angle);
                        // Manual 2D rotation instead of mat2
                        float newX = c * pos.x - s * pos.z;
                        float newZ = s * pos.x + c * pos.z;
                        pos.x = newX;
                        pos.z = newZ;
                        
                        // Add floating motion
                        pos.y += sin(time * 2.0 + pos.x * 5.0) * 0.1;
                        
                        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                        gl_PointSize = size * (300.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    varying vec3 vColor;
                    varying float vSize;
                    
                    void main() {
                        float dist = distance(gl_PointCoord, vec2(0.5));
                        if (dist > 0.5) discard;
                        
                        float pulse = sin(time * 4.0) * 0.3 + 0.7;
                        float alpha = (1.0 - dist * 2.0) * pulse * 1.5; // Increased opacity by 50%
                        
                        gl_FragColor = vec4(vColor, alpha);
                    }
                `,
                transparent: true,
                vertexColors: true,
                blending: THREE.AdditiveBlending
            });
            
            return new THREE.Points(particleGeometry, particleMaterial);
        };
        
        const particles = createParticleSystem();
        scene.add(particles);

        // Enhanced animation loop with extraordinary effects
        const animateGlobe = () => {
            if (animate && globeRef.current) {
                const time = Date.now() * 0.001;
                
                // Smooth globe rotation
                globeRef.current.rotation.y += 0.003;
                globeRef.current.rotation.x += 0.001;
                
                // Animate particles with orbital motion
                particles.rotation.y += 0.002;
                particles.rotation.x += 0.0005;
                
                // Dynamic ring rotations
                ring1.rotation.z += 0.004;
                ring1.rotation.y += 0.001;
                ring2.rotation.z -= 0.003;
                ring2.rotation.x += 0.002;
                ring3.rotation.z += 0.002;
                ring3.rotation.y -= 0.001;
                
                // Update all shader uniforms
                material.uniforms.time.value = time;
                
                // Update ring shader times
                ring1.material.uniforms.time.value = time;
                ring2.material.uniforms.time.value = time;
                ring3.material.uniforms.time.value = time;
                
                // Update particle shader time
                particles.material.uniforms.time.value = time;
                
                // Add subtle camera orbit for dynamic perspective
                const radius = 8;
                const cameraAngle = time * 0.05;
                camera.position.x = Math.cos(cameraAngle) * radius;
                camera.position.z = Math.sin(cameraAngle) * radius;
                camera.position.y = Math.sin(cameraAngle * 0.3) * 2;
                camera.lookAt(0, 0, 0);
            }
            
            if (rendererRef.current && sceneRef.current) {
                rendererRef.current.render(sceneRef.current, camera);
            }
            
            animationFrameRef.current = requestAnimationFrame(animateGlobe);
        };

        animateGlobe();

        // Handle resize
        const handleResize = () => {
            if (!container || !camera || !rendererRef.current) return;
            
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            rendererRef.current.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            
            if (container && rendererRef.current) {
                container.removeChild(rendererRef.current.domElement);
            }
            
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            
            // Clean up geometries and materials
            geometry.dispose();
            material.dispose();
            
            // Clean up rings
            ring1.geometry.dispose();
            ring1.material.dispose();
            ring2.geometry.dispose();
            ring2.material.dispose();
            ring3.geometry.dispose();
            ring3.material.dispose();
            
            // Clean up particles
            particles.geometry.dispose();
            particles.material.dispose();
        };
    }, [animate]);

    return (
        <div className={`relative ${size} ${className} hidden lg:block`}>
            <div className="w-full aspect-square relative">
                {/* Three.js container - centered with reduced glow */}
                <div 
                    ref={mountRef}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ 
                        width: '100%', 
                        height: '100%',
                        position: 'relative',
                        filter: 'drop-shadow(0 0 10px var(--highlight))' // Reduced from 30px and 60px
                    }}
                />
                
                {/* Center Logo Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <img 
                        src="/logo.png" 
                        alt="Nova Coders Logo" 
                        className="w-56 h-56 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72 object-contain"
                        style={{
                            filter: 'drop-shadow(0 0 15px var(--highlight)) drop-shadow(0 0 30px rgba(0, 0, 0, 0.5))'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Globe;
