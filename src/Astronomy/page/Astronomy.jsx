import { useEffect, useState } from "react";
import A from "aladin-lite";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

import { Button, TextField, Box } from "@mui/material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

import myPhotos from "../assets/myPhotos.json";

// functions
import createConstellationsCatalog from "../functions/createConstellationsCatalog";
import createPhotosCatalog from "../functions/createPhotosCatalog";

// style
import "../style/astronomy.css";
import { PanoramaFishEye } from "@mui/icons-material";

const Astronomy = () => {
  const [aladin, setAladin] = useState();
  const [target, setTarget] = useState("Polaris");
  const [indexPhoto, setIndexPhoto] = useState(-1);

  useEffect(() => {
    A.init.then(() => {
      const aladinInit = A.aladin("#aladin-lite-div", {
        survey: "P/DSS2/color",
        cooFrame: "ICRSd",
        showCooGrid: false,
        showCooGridControl: false,
        showProjectionControl: false,
        showLayersControl: false,
        showGotoControl: false,
        showFullscreenControl: false,
        showFrame: false,
        showReticle: false,
        showZoomControl: true,
        showSimbadPointerControl: true,
        fov: 310,
        target: target,
      });

      const newAladinInit = createConstellationsCatalog(aladinInit);
      const newAladinInit2 = createPhotosCatalog(newAladinInit, setTarget);

      setAladin(newAladinInit2);
    });
  }, []);

  return (
    <div className="astronomy">
      <h1>Ma galerie de photos (VESPERA II)</h1>
      <div className="photos-album">
        <Box sx={{ width: "100%", mx: "auto", backgroundColor: "#f0f0f0" }}>
          <RowsPhotoAlbum
            photos={myPhotos.map((item) => {
              return {
                src: "./assets/astrophotos/" + item.photo,
                alt: item.surname,
                title: item.name,
                label: item.surname,
                width: 2500,
                height: 1300,
              };
            })}
            targetRowHeight={200}
            rowConstraints={{ maxPhotos: 4 }}
            spacing={10}
            padding={10}
            onClick={({ index }) => {
              setIndexPhoto(index);
              setTarget(myPhotos[index].target);
              aladin.gotoObject(myPhotos[index].name, {
                success: () => {
                  aladin.setFov(80);
                },
              });
            }}
            render={{
              extras: (_, { index }) => {
                return <p className="photo-title">{myPhotos[index].name}</p>;
              },
            }}
          />
        </Box>
        <Lightbox
          slides={myPhotos.map((item) => {
            return {
              src: "./assets/astrophotos/" + item.photo,
              title: item.name,
              description: item.surname + "\n" + item.dist,
            };
          })}
          open={indexPhoto >= 0}
          index={indexPhoto}
          close={() => setIndexPhoto(-1)}
          // enable optional lightbox plugins
          plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </div>
      <div className="aladin-mycontainer">
        <h1>Aladin : le Google Earth du ciel</h1>
        <div className="actions">
          <TextField
            value={target}
            label="Search"
            size="small"
            onChange={(event) => {
              setTarget(event.target.value);
              let found = true;
              A.catalogFromSimbad(event.target.value, 0.1, () => {
                found = false;
              });
              if (found) {
                aladin.gotoObject(event.target.value, {
                  success: () => {
                    aladin.setFov(80);
                  },
                });
              }
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              aladin.showReticle(false);
              aladin.setFov(2.5);
            }}
          >
            Vespera View
          </Button>
        </div>
        <br />
        <p className="legend">
          <span className="red-circle">
            <PanoramaFishEye color="error" fontSize="14px" />
          </span>
          objets photographiés
        </p>
        <div id="aladin-lite-div" className="aladin"></div>
      </div>
    </div>
  );
};

export default Astronomy;
