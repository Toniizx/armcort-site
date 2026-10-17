import * as THREE from "three";

// Geometria de vergalhão feita por código: tubo com nervuras transversais inclinadas
// e duas nervuras longitudinais, como o CA-50. Nenhum arquivo 3D é baixado.

export type Qualidade = { porUnidade: number; radial: number };
export const QUALIDADE_ALTA: Qualidade = { porUnidade: 90, radial: 14 };
export const QUALIDADE_BAIXA: Qualidade = { porUnidade: 40, radial: 8 };

function comprimento(pts: THREE.Vector3[]) {
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += pts[i].distanceTo(pts[i - 1]);
  return L;
}

/** Monta o tubo nervurado ao longo de uma lista densa de pontos. */
export function geometriaVergalhao(pts: THREE.Vector3[], raio: number, q: Qualidade, alvo?: THREE.TubeGeometry) {
  const curva = new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.5);
  const L = comprimento(pts);
  const segs = Math.max(8, Math.round(L * q.porUnidade));
  const geo = new THREE.TubeGeometry(curva, segs, raio, q.radial, false);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const passo = raio * 1.5;
  const centro = new THREE.Vector3();
  const v = new THREE.Vector3();
  for (let i = 0; i <= segs; i++) {
    const u = i / segs;
    curva.getPointAt(u, centro);
    const fase = (u * L) / passo;
    for (let j = 0; j <= q.radial; j++) {
      const a = (j / q.radial) * Math.PI * 2;
      const idx = i * (q.radial + 1) + j;
      v.fromBufferAttribute(pos, idx).sub(centro);
      // nervura transversal inclinada (meia volta por passo)
      const f = fase + (Math.sin(a) > 0 ? a / (Math.PI * 2) : -a / (Math.PI * 2)) * 0.6;
      const fr = f - Math.floor(f);
      const nerv = Math.exp(-Math.pow((fr - 0.5) / 0.12, 2));
      // nervuras longitudinais em 0 e 180 graus
      const d0 = Math.min(Math.abs(Math.sin(a)), 1);
      const longi = Math.exp(-Math.pow(d0 / 0.16, 2));
      const k = 1 + 0.11 * nerv * (1 - longi) + 0.09 * longi;
      v.multiplyScalar(k).add(centro);
      pos.setXYZ(idx, v.x, v.y, v.z);
    }
  }
  geo.computeVertexNormals();
  if (alvo) alvo.dispose();
  return geo;
}

/** Barra reta ao longo do eixo X, centrada. */
export function pontosReta(L: number, n = 24) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= n; i++) pts.push(new THREE.Vector3(-L / 2 + (L * i) / n, 0, 0));
  return pts;
}

/**
 * Caminho de uma barra dobrada: trechos retos com dobras no plano XY.
 * angulos[k] é o ângulo atual da dobra entre o trecho k e o k+1 (radianos).
 * subida: deslocamento em Z ao longo do caminho, para os ganchos do estribo não se cruzarem.
 */
export function pontosDobrados(trechos: number[], angulos: number[], raioDobra: number, subida = 0, dirInicial = 0) {
  const pts: THREE.Vector3[] = [];
  const p = new THREE.Vector3(0, 0, 0);
  let dir = dirInicial;
  const total = trechos.reduce((a, b) => a + b, 0);
  let andado = 0;
  const push = () => pts.push(new THREE.Vector3(p.x, p.y, (andado / total) * subida));
  push();
  trechos.forEach((len, k) => {
    const passos = Math.max(2, Math.ceil(len * 8));
    for (let s = 1; s <= passos; s++) {
      const d = len / passos;
      p.x += Math.cos(dir) * d;
      p.y += Math.sin(dir) * d;
      andado += d;
      push();
    }
    const ang = angulos[k];
    if (ang !== undefined && ang > 0.0001) {
      const arcos = Math.max(3, Math.ceil(ang * 6));
      const cx = p.x - Math.sin(dir) * raioDobra;
      const cy = p.y + Math.cos(dir) * raioDobra;
      const ini = dir - Math.PI / 2;
      for (let s = 1; s <= arcos; s++) {
        const t = ini + (ang * s) / arcos;
        p.x = cx + Math.cos(t) * raioDobra;
        p.y = cy + Math.sin(t) * raioDobra;
        push();
      }
      dir += ang;
    }
  });
  // centraliza pelo centro da caixa
  const caixa = new THREE.Box3().setFromPoints(pts);
  const c = caixa.getCenter(new THREE.Vector3());
  pts.forEach((q) => q.sub(c));
  return pts;
}

/** Estribo retangular a x b com ganchos de 135°. progresso 0 = barra reta, 1 = estribo pronto. */
export function pontosEstribo(a: number, b: number, gancho: number, progresso: number, raioDobra: number, subida: number) {
  const trechos = [gancho, a, b, a, b, gancho];
  const finais = [(3 * Math.PI) / 4, Math.PI / 2, Math.PI / 2, Math.PI / 2, (3 * Math.PI) / 4];
  const n = finais.length;
  const angulos = finais.map((alvo, k) => {
    const t = THREE.MathUtils.clamp(progresso * n - k, 0, 1);
    const suave = t * t * (3 - 2 * t);
    return alvo * suave;
  });
  // o primeiro lado fica parado na horizontal, como na máquina; o gancho é que gira
  return pontosDobrados(trechos, angulos, raioDobra, subida * THREE.MathUtils.clamp(progresso * 1.2, 0, 1), -angulos[0]);
}
