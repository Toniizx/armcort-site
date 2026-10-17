"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SteelStage, useSteelMaterial, useCageGeometry } from "./Steel";
import { geometriaVergalhao, pontosEstribo, pontosReta, QUALIDADE_ALTA, QUALIDADE_BAIXA } from "./rebar";

// A barra que vira estrutura. O progresso (0 a 1) vem da rolagem:
// 0–0,16 barra reta · 0,16–0,30 corte · 0,30–0,58 dobra em estribo · 0,58–0,80 estribos repetidos · 0,80–1 armação completa
const A = 1.2;
const G = 0.28;
const R = 0.045;
const N = 9;
const ALTURA = 5;

const faixa = (p: number, a: number, b: number) => THREE.MathUtils.clamp((p - a) / (b - a), 0, 1);
const suave = (t: number) => t * t * (3 - 2 * t);

function Cena({ progresso, leve }: { progresso: MutableRefObject<number>; leve: boolean }) {
  const q = leve ? QUALIDADE_BAIXA : QUALIDADE_ALTA;
  const mat = useSteelMaterial();
  const barra = useRef<THREE.Mesh>(null);
  const sobra = useRef<THREE.Mesh>(null);
  const lamina = useRef<THREE.Mesh>(null);
  const faisca = useRef<THREE.PointLight>(null);
  const pecaGiro = useRef<THREE.Group>(null);
  const tudo = useRef<THREE.Group>(null);
  const copias = useRef<(THREE.Mesh | null)[]>([]);
  const longas = useRef<(THREE.Mesh | null)[]>([]);
  const ultimaDobra = useRef(-1);
  const { size } = useThree();
  const desktop = size.width >= 768;

  const desenvolvido = 4 * A + 2 * G;
  const geoSobra = useMemo(() => geometriaVergalhao(pontosReta(1.4, 10), R, q), [q]);
  const { longa, rL } = useCageGeometry(A, ALTURA + 0.6, q);
  const estribo = useMemo(() => {
    const g = geometriaVergalhao(pontosEstribo(A, A, G, 1, R * 3, R * 2.2), R, q);
    g.rotateX(-Math.PI / 2);
    return g;
  }, [q]);
  const geoInicial = useMemo(() => geometriaVergalhao(pontosReta(desenvolvido, 30), R, q), [desenvolvido, q]);
  const cantos = useMemo(() => {
    const d = A / 2 - R - rL * 0.6;
    return [
      [d, d],
      [-d, d],
      [-d, -d],
      [d, -d],
    ];
  }, [rL]);

  useFrame((state, dt) => {
    const p = progresso.current;
    const b = barra.current;
    if (!b || !tudo.current || !pecaGiro.current) return;

    // 1. entrada da barra
    const entra = suave(faixa(p, 0, 0.12));
    pecaGiro.current.position.x = (1 - entra) * -6;

    // 2. corte: lâmina laranja desce, a sobra cai
    const corte = faixa(p, 0.16, 0.3);
    if (lamina.current) {
      const m = lamina.current.material as THREE.MeshBasicMaterial;
      lamina.current.position.y = THREE.MathUtils.lerp(1.6, 0, suave(faixa(corte, 0, 0.45)));
      m.opacity = corte > 0 && corte < 0.9 ? 0.95 * (1 - faixa(corte, 0.5, 0.9)) : 0;
    }
    if (faisca.current) faisca.current.intensity = corte > 0.35 && corte < 0.7 ? 14 * Math.sin(faixa(corte, 0.35, 0.7) * Math.PI) : 0;
    if (sobra.current) {
      const cai = suave(faixa(corte, 0.45, 1));
      sobra.current.position.set(desenvolvido / 2 + 0.72 + cai * 1.4, -cai * 3.2, cai * 0.6);
      sobra.current.rotation.z = -cai * 0.9;
      sobra.current.visible = cai < 0.99;
    }

    // 3. dobra
    const dobra = faixa(p, 0.3, 0.58);
    const chave = Math.round(dobra * 240);
    if (chave !== ultimaDobra.current) {
      ultimaDobra.current = chave;
      const pts = dobra <= 0 ? null : pontosEstribo(A, A, G, dobra, R * 3, R * 2.2);
      const nova = pts ? geometriaVergalhao(pts, R, q) : geoInicial;
      if (b.geometry !== geoInicial && b.geometry !== nova) b.geometry.dispose();
      b.geometry = nova;
    }

    // 4. o estribo deita e se repete ao longo da altura
    const deita = suave(faixa(p, 0.56, 0.66));
    pecaGiro.current.rotation.x = -deita * (Math.PI / 2 - 0.0001);
    const repete = faixa(p, 0.6, 0.8);
    copias.current.forEach((c, i) => {
      if (!c) return;
      const t = suave(faixa(repete, i / (N + 2), i / (N + 2) + 0.35));
      const yFinal = -ALTURA / 2 + (ALTURA / (N - 1)) * i;
      c.position.y = THREE.MathUtils.lerp(0, yFinal, t);
      c.scale.setScalar(Math.max(0.001, t));
      c.visible = t > 0.001;
    });

    // 5. barras longitudinais entram e a câmera recua
    const monta = faixa(p, 0.8, 0.95);
    longas.current.forEach((l, i) => {
      if (!l) return;
      const t = suave(faixa(monta, i * 0.12, i * 0.12 + 0.6));
      l.position.y = (1 - t) * 7;
      l.visible = t > 0.001;
    });

    const vista = suave(faixa(p, 0.56, 0.9));
    tudo.current.rotation.x = THREE.MathUtils.lerp(0, 0.32, vista);
    tudo.current.rotation.y += dt * 0.12 * vista;
    if (vista < 0.01) tudo.current.rotation.y = THREE.MathUtils.lerp(tudo.current.rotation.y, 0, 0.1);
    const cam = state.camera as THREE.PerspectiveCamera;
    cam.position.z = THREE.MathUtils.lerp(7.2, 11.5, vista);
    cam.lookAt(0, 0, 0);
  });

  return (
    <group ref={tudo} position={desktop ? [1.9, 0, 0] : [0, 1.1, 0]} scale={desktop ? 1 : 0.62}>
      <group ref={pecaGiro}>
        <mesh ref={barra} geometry={geoInicial} material={mat} />
        <mesh ref={sobra} geometry={geoSobra} material={mat} position={[desenvolvido / 2 + 0.72, 0, 0]} />
      </group>
      <mesh ref={lamina} position={[desenvolvido / 2, 1.6, 0]}>
        <planeGeometry args={[0.012, 1.4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} toneMapped={false} />
      </mesh>
      <pointLight ref={faisca} position={[desenvolvido / 2, 0, 0.3]} color="#ff7a2a" distance={3} intensity={0} />
      {Array.from({ length: N }, (_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            copias.current[i] = m;
          }}
          geometry={estribo}
          material={mat}
          visible={false}
          rotation={[0, (i % 2) * Math.PI, 0]}
        />
      ))}
      {cantos.map(([x, z], i) => (
        <mesh
          key={`l${i}`}
          ref={(m) => {
            longas.current[i] = m;
          }}
          geometry={longa}
          material={mat}
          position={[x, 7, z]}
          visible={false}
        />
      ))}
    </group>
  );
}

export default function StoryScene({ progresso, leve }: { progresso: MutableRefObject<number>; leve: boolean }) {
  return (
    <Canvas
      dpr={leve ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 7.2], fov: 36 }}
      gl={{ antialias: !leve, alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
      aria-hidden
    >
      <SteelStage />
      <Cena progresso={progresso} leve={leve} />
    </Canvas>
  );
}
