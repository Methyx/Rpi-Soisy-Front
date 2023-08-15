import { useState } from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import PlaylistTitle from "./PlaylistTitle";

// style
import "../style/player.css";

const Player = ({ titleToPlay }) => {
  const [onplay, setOnplay] = useState(false);
  return (
    <div className="player">
      <div className={onplay ? "player-head onplay" : "player-head"}>
        <PlaylistTitle item={titleToPlay} ledOn={null} front={true} />
      </div>
      <div className="audio-player">
        <AudioPlayer
          src={titleToPlay?.link}
          onPlay={(e) => {
            setOnplay(true);
          }}
          onPause={(e) => {
            setOnplay(false);
          }}
        />
      </div>
    </div>
  );
};

export default Player;
