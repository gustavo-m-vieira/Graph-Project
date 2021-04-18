/**
 * @name getGraus
 * @description Gets information about the graph nodes' degrees
 * @param {Number[]} edges - an array of edges
 */

export function getGraus(edges) {
  const graus = {};
  for (let i = 0; i < edges.length; i += 1) {
    const [node1, node2] = edges[i];
    graus[node1] = (graus[node1] || 0) + 1;
    graus[node2] = (graus[node2] || 0) + 1;
  }
  const arraydeGraus = Object.values(graus).sort();
  const tamanhoArray = arraydeGraus.length;
  const [menorGrau] = arraydeGraus;
  const [maiorGrau] = arraydeGraus.slice(-1);
  const mediaGrau = arraydeGraus.reduce((a, b) => a + b, 0) / tamanhoArray;
  let medianaGrau;
  if (tamanhoArray % 2 === 0) {
    medianaGrau = (arraydeGraus[tamanhoArray / 2 - 1] + arraydeGraus[tamanhoArray / 2]) / 2.0;
  } else {
    medianaGrau = arraydeGraus[Math.floor(tamanhoArray / 2)];
  }

  return {
    menorGrau,
    maiorGrau,
    mediaGrau,
    medianaGrau,
  };
}
