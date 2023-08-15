import { useState, useRef, useEffect } from "react";

import PlaylistTitle from "./PlaylistTitle";

// style
import "../style/metal.css";
import "../style/playlist.css";

const Playlist = ({ playlistData, titleToPlay, setTitleToPlay }) => {
  // functions
  const handleNextSong = () => {
    let nextAngle = rotate - rotationAngle;
    setRotate(nextAngle);
    let nextSongIndex = playlistData.indexOf(titleInFront) + 1;
    if (nextSongIndex > playlistData.length - 1) {
      nextSongIndex = 0;
    }
    setTitleInFront(playlistData[nextSongIndex]);
  };
  const handlePrevSong = () => {
    let nextAngle = rotate + rotationAngle;
    setRotate(nextAngle);
    let prevSongIndex = playlistData.indexOf(titleInFront) - 1;
    if (prevSongIndex < 0) {
      prevSongIndex = playlistData.length - 1;
    }
    setTitleInFront(playlistData[prevSongIndex]);
  };
  const handlePlaySong = (song) => {
    setTitleToPlay(null);
    setTimeout(() => {
      setTitleToPlay(song);
    }, 100);
  };

  // init
  const [titleInFront, setTitleInFront] = useState(playlistData[0]);
  const [rotate, setRotate] = useState(0);
  const carousel = useRef(null);
  const [carouselItemHeight, setCarouselItemHeight] = useState(0);
  const nbSongs = playlistData.length;
  const rotationAngle = 360 / nbSongs;
  const translationZ =
    1.2 *
    (carouselItemHeight / 2 / Math.tan(((rotationAngle / 2) * Math.PI) / 180));

  // useEffect
  useEffect(() => {
    setCarouselItemHeight(carousel.current.clientHeight);
    window.addEventListener("resize", () => {
      setCarouselItemHeight(carousel.current.clientHeight);
    });
  }, []);

  // Return
  return (
    <div className="playlist">
      <h1>JUKEBOX</h1>
      <div
        className="songs-container"
        style={{ height: `${2.4 * translationZ}px` }}
      >
        <div
          className="songs-carousel"
          ref={carousel}
          style={{
            transform: `translateZ(-${translationZ}px) rotateX(${rotate}deg)`,
          }}
        >
          {playlistData.map((item, index) => {
            return (
              <div
                className="song"
                key={index}
                style={{
                  transform: `rotateX(${
                    rotationAngle * index
                  }deg) translateZ(${translationZ}px)`,
                }}
                onClick={() => {
                  handlePlaySong(item);
                }}
              >
                <PlaylistTitle
                  item={item}
                  ledOn={item.title === titleToPlay?.title}
                  front={item.title === titleInFront?.title}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="control">
        <button className="metal round" onClick={handlePrevSong}>
          {"⏮"}
        </button>
        <button
          className="metal rectangle"
          onClick={() => {
            handlePlaySong(titleInFront);
          }}
        >
          Play
        </button>
        <button className="metal round" onClick={handleNextSong}>
          {"⏭"}
        </button>
      </div>
    </div>
  );
};

export default Playlist;
