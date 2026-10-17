"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Environment, Lightformer } from "@react-three/drei";
import { geometriaVergalhao, pontosEstribo, pontosReta, type Qualidade } from "./rebar";

/** Luz de estúdio: o aço como peça exposta numa sala escura. Tudo gerado aqui, sem arquivos HDR. */
export function SteelStage({ laranja = 1 }: { laranja?: number }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[4, 8, 6]} intensity={1.6} color="#dfe8f2" />
      <directionalLight position={[-6, 2, -4]} intensity={0.9 * laranja} color="#ff6b16" />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#05111f"]} />
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 6, 2]} scale={[12, 1.5, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.6} color="#9aa6b2" position={[-6, 1, 3]} scale={[2, 8, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={2.4 * laranja} color="#ff6b16" position={[6, 0, -3]} scale={[1.2, 9, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" intensity={1.2} color="#12345a" position={[0, -3, -6]} scale={6} />
      </Environment>
    </>
  );
}

export function useSteelMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#7a8591"),
        metalness: 0.92,
        roughness: 0.36,
        envMapIntensity: 1.25,
      }),
    [],
  );
}

/** Geometrias prontas de uma armação de pilar: estribo quadrado e barra longitudinal. */
export function useCageGeometry(lado: number, altura: number, q: Qualidade) {
  return useMemo(() => {
    const rE = 0.035;
    const rL = 0.06;
    const estribo = geometriaVergalhao(pontosEstribo(lado, lado, lado * 0.22, 1, rE * 3, rE * 2.2), rE, q);
    estribo.rotateX(-Math.PI / 2);
    const longa = geometriaVergalhao(pontosReta(altura, 32), rL, q);
    longa.rotateZ(Math.PI / 2);
    return { estribo, longa, rL, rE };
  }, [lado, altura, q]);
}
