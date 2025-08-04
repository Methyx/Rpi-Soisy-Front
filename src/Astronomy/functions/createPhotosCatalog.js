import A from "aladin-lite";

import myPhotos from "../assets/myPhotos.json";

const createPhotosCatalog = (aladinInit, setTarget) => {
  const newAladinInit = aladinInit;

  const photosCatalog = A.catalog({
    name: "Position de mes photos",
    shape: "circle",
    color: "red",
    labelColumn: "name",
    displayLabel: true,
    onClick: (item) => {
      setTarget(item.data.target);
      aladinInit.gotoObject(item.data.target, {
        success: () => {
          aladinInit.setFov(80);
        },
      });
    },
  });

  newAladinInit.addCatalog(photosCatalog);

  // const photosOverlay = A.graphicOverlay({
  //   color: "rgb(0, 255, 255,0.2)",
  //   lineWidth: 3,
  // });

  // newAladinInit.addOverlay(photosOverlay);

  for (let i = 0; i < myPhotos.length; i++) {
    photosCatalog.addSources(
      A.source(myPhotos[i].coordinates[0], myPhotos[i].coordinates[1], {
        name: myPhotos[i].name,
        target: myPhotos[i].target,
      })
    );
  }

  return newAladinInit;
};

export default createPhotosCatalog;
