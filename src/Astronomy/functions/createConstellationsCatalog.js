import A from "aladin-lite";

import constellationsData from "../assets/constellations.json";

const createConstellationsCatalog = (aladinInit) => {
  const newAladinInit = aladinInit;

  const constellationsCatalog = A.catalog({
    name: "Noms des constellations",
    displayLabel: true,
    labelColumn: "name",
    labelColor: "#ae4",
    labelFont: "12px sans-serif",
    color: "transparent",
  });

  newAladinInit.addCatalog(constellationsCatalog);

  const constellationsOverlay = A.graphicOverlay({
    color: "rgb(0, 255, 255,0.2)",
    lineWidth: 3,
  });

  newAladinInit.addOverlay(constellationsOverlay);

  constellationsData.forEach((constellation) => {
    constellation.lines.forEach((segment) => {
      const [[ra1, dec1], [ra2, dec2]] = segment;
      constellationsOverlay.add(
        A.polyline([
          [ra1, dec1],
          [ra2, dec2],
        ])
      );
    });

    // Calculer le centre géométrique pour positionner le nom
    const allPoints = constellation.lines.flat();
    const pointsInRadian = allPoints.map((point) => [
      (point[0] * Math.PI) / 180,
      (point[1] * Math.PI) / 180,
    ]);

    // Calcul des composantes x et y
    const xRA = pointsInRadian.map((point) => Math.cos(point[0]));
    const yRA = pointsInRadian.map((point) => Math.sin(point[0]));
    const xDec = pointsInRadian.map((point) => Math.cos(point[1]));
    const yDec = pointsInRadian.map((point) => Math.sin(point[1]));

    // Calcul des moyennes des composantes
    const xRAMoyen = xRA.reduce((acc, val) => acc + val, 0) / xRA.length;
    const yRAMoyen = yRA.reduce((acc, val) => acc + val, 0) / yRA.length;
    const xDecMoyen = xDec.reduce((acc, val) => acc + val, 0) / xDec.length;
    const yDecMoyen = yDec.reduce((acc, val) => acc + val, 0) / yDec.length;

    // Calcul de l'angle moyen en radians puis conversion en degrés
    const angleMoyenRAEnRadians = Math.atan2(yRAMoyen, xRAMoyen);
    let angleMoyenRAEnDegres = (angleMoyenRAEnRadians * 180) / Math.PI;
    const angleMoyenDecEnRadians = Math.atan2(yDecMoyen, xDecMoyen);
    let angleMoyenDecEnDegres = (angleMoyenDecEnRadians * 180) / Math.PI;

    // Assure que l'angle est dans la plage [0°, 360°)
    if (angleMoyenRAEnDegres < 0) {
      angleMoyenRAEnDegres += 360;
    }
    if (angleMoyenDecEnDegres < 0) {
      angleMoyenDecEnDegres += 360;
    }

    constellationsCatalog.addSources(
      A.source(angleMoyenRAEnDegres, angleMoyenDecEnDegres, {
        name: constellation.name_fr,
      })
    );
  });

  return newAladinInit;
};

export default createConstellationsCatalog;
