"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { SteelStage, useSteelMaterial } from "./Steel";
import { geometriaVergalhao, pontosReta, QUALIDADE_ALTA, QUALIDADE_BAIXA } from "./rebar";

// Armação de estaca soldada, como a que a máquina laranja da ARM-CORT produz:
// barras longitudinais em círculo e uma espiral soldada que vai sendo "enrolada" por um anel laranja.

type Props = { leve: boolean; variante?: "hero" | "final" };

const RAIO = 0.82;
const ALTURA = 6.6;
const PASSO = 0.3;

function Estaca({ leve, variante = "hero" }: Props) {
  const nLong = leve ? 8 : 10;
  const q = leve ? QUALIDADE_BAIXA : QUALIDADE_ALTA;
  const mat = useSteelMaterial();
  const grupo = useRef<THREE.Group>(null);
  const anel = useRef<THREE.Group>(null);
  const luz = useRef<THREE.PointLight>(null);
  const barras = useRef<(THREE.Mesh | null)[]>([]);
  const estado = useRef({ espiral: 0, entrada: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const { longa, espiral, segmentosEspiral, radial } = useMemo(() => {
    const longa = geometriaVergalhao(pontosReta(ALTURA + 0.5, 32), 0.055, q);
    longa.rotateZ(Math.PI / 2);
    const voltas = ALTURA / PASSO;
    const porVolta = leve ? 28 : 44;
    const pts: THREE.Vector3[] = [];
    const total = Math.round(voltas * porVolta);
    for (let i = 0; i <= total; i++) {
      const t = i / total;
      const a = t * voltas * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * (RAIO - 0.02), -ALTURA / 2 + t * ALTURA, Math.sin(a) * (RAIO - 0.02)));
    }
    const curva = new THREE.CatmullRomCurve3(pts);
    const radial = leve ? 5 : 8;
    const segmentosEspiral = total * 2;
    const espiral = new THREE.TubeGeometry(curva, segmentosEspiral, 0.022, radial, false);
    return { longa, espiral, segmentosEspiral, radial };
  }, [leve, q]);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bs = barras.current.filter(Boolean) as THREE.Mesh[];
    if (reduz) {
      estado.current.espiral = 1;
      estado.current.entrada = 1;
      return;
    }
    bs.forEach((b) => (b.scale.y = 0.001));
    const tl = gsap.timeline({ delay: variante === "hero" ? 0.6 : 0.1, paused: variante === "final" });
    tl.to(estado.current, { entrada: 1, duration: 1.4, ease: "expo.out" }, 0);
    tl.to(bs.map((b) => b.scale), { y: 1, duration: 1.5, ease: "expo.out", stagger: 0.06 }, 0);
    tl.to(estado.current, { espiral: 1, duration: variante === "hero" ? 4.2 : 3, ease: "power1.inOut" }, 0.5);
    if (variante === "final") {
      const alvo = document.querySelector("[data-final-canvas]");
      const obs = new IntersectionObserver(([e]) => e.isIntersecting && tl.play(), { threshold: 0.35 });
      if (alvo) obs.observe(alvo);
      return () => {
        obs.disconnect();
        tl.kill();
      };
    }
    return () => {
      tl.kill();
    };
  }, [variante]);

  useEffect(() => {
    const mover = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", mover);
    return () => window.removeEventListener("pointermove", mover);
  }, []);

  useFrame((state, dt) => {
    const g = grupo.current;
    if (!g) return;
    const { espiral: e, entrada } = estado.current;
    // a espiral aparece até onde o anel já passou
    espiral.setDrawRange(0, Math.floor(segmentosEspiral * e) * radial * 6);
    const yAnel = -ALTURA / 2 + e * ALTURA;
    if (anel.current) {
      anel.current.position.y = yAnel;
      anel.current.rotation.y += dt * 2.4;
      const fim = THREE.MathUtils.clamp((e - 0.96) / 0.04, 0, 1);
      anel.current.scale.setScalar(Math.max(0.001, (1 - fim) * entrada));
    }
    if (luz.current) {
      if (e < 1) {
        luz.current.position.y = yAnel;
        luz.current.intensity = 7;
      } else {
        const t = (state.clock.elapsedTime * 0.16) % 1;
        luz.current.position.y = -ALTURA / 2 + t * ALTURA;
        luz.current.intensity = Math.sin(t * Math.PI) * 4;
      }
    }
    g.rotation.y += dt * (e < 1 ? 0.22 : 0.07);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.16 + mouse.current.y * 0.06, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -0.32 - mouse.current.x * 0.05, 0.04);
  });

  const escala = size.width < 768 ? 0.62 : 1;

  return (
    <group ref={grupo} scale={escala} rotation={[0.16, 0.4, -0.32]}>
      {Array.from({ length: nLong }, (_, i) => {
        const a = (i / nLong) * Math.PI * 2;
        return (
          <mesh
            key={i}
            ref={(m) => {
              barras.current[i] = m;
            }}
            geometry={longa}
            material={mat}
            position={[Math.cos(a) * (RAIO - 0.1), 0, Math.sin(a) * (RAIO - 0.1)]}
          />
        );
      })}
      <mesh geometry={espiral} material={mat} />
      <group ref={anel}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[RAIO + 0.2, 0.07, 12, 96]} />
          <meshStandardMaterial color="#ff6b16" metalness={0.3} roughness={0.45} emissive="#ff6b16" emissiveIntensity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[RAIO + 0.36, 0.025, 8, 96]} />
          <meshBasicMaterial color="#ff8a3d" toneMapped={false} />
        </mesh>
      </group>
      <pointLight ref={luz} color="#ff6b16" distance={2.8} decay={1.3} intensity={0} />
    </group>
  );
}

export default function HeroScene({ leve, variante = "hero" }: Props) {
  return (
    <Canvas
      dpr={leve ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 10], fov: 34 }}
      gl={{ antialias: !leve, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden
    >
      <SteelStage />
      <Estaca leve={leve} variante={variante} />
    </Canvas>
  );
}
