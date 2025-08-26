"use client"
import React, { useEffect, useRef, useState } from 'react';
import GradientButton from './Utility/GradientButton';
import { FiArrowRight, FiUsers } from 'react-icons/fi';

const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const startTime = Date.now();
                    const step = () => {
                        const progress = Math.min((Date.now() - startTime) / duration, 1);
                        setCount(Math.floor(progress * end));
                        if (progress < 1) {
                            requestAnimationFrame(step);
                        }
                    };
                    requestAnimationFrame(step);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [end, duration]);

    return { count, ref };
};

const HeroSection = () => {
    const mountRef = useRef(null);
    const statsDevelopers = useCountUp(1200);
    const statsProjects = useCountUp(50);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        let scene, camera, renderer, globe, logoPlane, animationFrameId;
        let handleResize;

        import('three').then(THREE => {
            try {
                const containerWidth = currentMount.clientWidth;
                const containerHeight = currentMount.clientHeight;
                if (containerWidth === 0 || containerHeight === 0) return;

                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
                renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(containerWidth, containerHeight);
                currentMount.appendChild(renderer.domElement);
                camera.position.z = 5;

                const globeGeometry = new THREE.SphereGeometry(2.5, 32, 32);
                
                const isDark = document.documentElement.classList.contains('dark');
                const globeMaterial = new THREE.MeshBasicMaterial({ 
                    color: isDark ? 0x2563eb : 0x1d4ed8,
                    transparent: true,
                    opacity: isDark ? 0.8 : 0.9
                });
                globe = new THREE.Mesh(globeGeometry, globeMaterial);
                scene.add(globe);
                
                const wireframeMaterial = new THREE.MeshBasicMaterial({
                    color: isDark ? 0x64ffda : 0x0284c7,
                    wireframe: true,
                    transparent: true,
                    opacity: isDark ? 0.4 : 0.6
                });
                const wireframeGlobe = new THREE.Mesh(globeGeometry, wireframeMaterial);
                scene.add(wireframeGlobe);
                
                const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
                const glowMaterial = new THREE.ShaderMaterial({
                    vertexShader: `
                        varying vec3 vNormal;
                        void main() {
                            vNormal = normalize(normalMatrix * normal);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vNormal;
                        void main() {
                            float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), ${isDark ? '1.2' : '1.5'});
                            vec3 glowColor = ${isDark 
                                ? 'vec3(0.39, 1.0, 0.85)'
                                : 'vec3(0.11, 0.31, 0.85)'
                            };
                            gl_FragColor = vec4(glowColor, intensity * ${isDark ? '0.8' : '0.5'});
                        }
                    `,
                    blending: THREE.AdditiveBlending,
                    side: THREE.BackSide,
                    transparent: true,
                });
                const glowGlobe = new THREE.Mesh(glowGeometry, glowMaterial);
                glowGlobe.scale.set(isDark ? 1.15 : 1.1, isDark ? 1.15 : 1.1, isDark ? 1.15 : 1.1);
                scene.add(glowGlobe);
                
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load('/logo.png', (logoTexture) => {
                    const logoGeometry = new THREE.PlaneGeometry(1.8, 1.8);
                    const logoMaterial = new THREE.MeshBasicMaterial({
                        map: logoTexture,
                        transparent: true,
                        alphaTest: 0.1,
                        depthTest: false,
                        depthWrite: false
                    });
                    logoPlane = new THREE.Mesh(logoGeometry, logoMaterial);
                    logoPlane.position.set(0, 0, 2.6);
                    logoPlane.renderOrder = 1;
                    scene.add(logoPlane);
                });
                
                const animate = () => {
                    animationFrameId = requestAnimationFrame(animate);
                    if (globe) {
                        globe.rotation.y += 0.003;
                    }
                    if (wireframeGlobe) {
                        wireframeGlobe.rotation.y += 0.003;
                        wireframeGlobe.rotation.x += 0.001;
                    }
                    if (glowGlobe) {
                        glowGlobe.rotation.y += 0.002;
                        glowGlobe.rotation.x += 0.0005;
                    }
                    if (logoPlane) {
                        logoPlane.lookAt(camera.position);
                    }
                    renderer.render(scene, camera);
                };
                animate();

                handleResize = () => {
                    if (currentMount) {
                        const newWidth = currentMount.clientWidth;
                        const newHeight = currentMount.clientHeight;
                        camera.aspect = newWidth / newHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(newWidth, newHeight);
                    }
                };
                window.addEventListener('resize', handleResize);

            } catch (error) {
                console.error('Error initializing Three.js scene:', error);
            }
        }).catch(error => {
            console.error('Error importing Three.js:', error);
        });

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (handleResize) window.removeEventListener('resize', handleResize);
            if (currentMount && renderer && renderer.domElement) {
                currentMount.innerHTML = '';
            }
            if (renderer) renderer.dispose();
        };
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-gray-100 dark:bg-black">
            <div className="absolute inset-0 z-0 opacity-75">
                <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-blue-500/30 dark:bg-sky-400/30 rounded-full animate-pulse"></div>
                <div className="absolute top-[20%] right-[10%] w-48 h-48 bg-purple-500/30 dark:bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-[15%] left-[25%] w-24 h-24 bg-teal-500/30 dark:bg-teal-400/30 rounded-full animate-pulse delay-500 hidden sm:block"></div>
                <div className="absolute bottom-[25%] right-[20%] w-40 h-40 bg-pink-500/30 dark:bg-pink-400/30 rounded-full animate-pulse delay-1500 hidden sm:block"></div>
                 <div className="absolute bottom-[50%] left-[40%] w-20 h-20 bg-indigo-500/30 dark:bg-indigo-400/30 rounded-full animate-pulse delay-2000 hidden sm:block"></div>
            </div>

            <div className="container relative z-10 mx-auto h-full px-6">
                <div className="grid h-full grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight animate-fade-in-down">
                            <span className="text-gray-800 dark:text-white">Ignite Your Code.</span>
                            <span className="text-gray-800 dark:text-white block">Connect. Create.</span>
                            <span className="bg-gradient-to-r from-blue-600 to-sky-400 dark:to-[#64ffda] text-transparent bg-clip-text">Conquer.</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-[#8892b0] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            Your next great project starts here. Connect with a passionate community of developers and designers dedicated to learning, sharing, and innovating together.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-8 w-full max-w-lg sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <GradientButton href="#" size="lg" className="flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap">
                                Join Now <FiArrowRight />
                            </GradientButton>
                            <a href="/about" className="py-3 px-8 md:py-4 md:px-10 rounded-full text-base md:text-lg font-bold bg-gray-200/80 dark:bg-[#112240]/80 text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-300 dark:hover:bg-[#233554] flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap">
                                View Community <FiUsers />
                            </a>
                        </div>
                    </div>

                    <div className="relative w-full h-full hidden md:flex items-center justify-center">
                        <div ref={mountRef} className="absolute z-0 h-[600px] w-[600px]"></div>
                    </div>
                </div>
            </div>

            <div ref={statsDevelopers.ref} className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                <div className="flex justify-center items-center gap-8 text-gray-700 dark:text-[#8892b0]">
                    <div><span className="text-2xl font-bold text-gray-800 dark:text-white">{statsDevelopers.count.toLocaleString()}+</span><p className="text-sm">Developers</p></div>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <div ref={statsProjects.ref}><span className="text-2xl font-bold text-gray-800 dark:text-white">{statsProjects.count}+</span><p className="text-sm">Projects</p></div>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <div><span className="text-2xl font-bold text-gray-800 dark:text-white">24/7</span><p className="text-sm">Active</p></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
