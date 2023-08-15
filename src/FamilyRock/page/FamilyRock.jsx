import { useState } from "react";

// style
import "../style/family-rock.css";

// Data
import playlistData from "../assets/playlist.json";

// component
import Playlist from "../components/Playlist";
import Player from "../components/Player";

const FamilyRock = () => {
  const [titleToPlay, setTitleToPlay] = useState(playlistData[0]);
  return (
    <div className="family-rock-page">
      <main className="family-rock">
        <div className="empty"></div>
        <div className="family-rock-content">
          <Player titleToPlay={titleToPlay} />
          <Playlist
            playlistData={playlistData}
            titleToPlay={titleToPlay}
            setTitleToPlay={setTitleToPlay}
          />
        </div>
      </main>
    </div>
  );
};

export default FamilyRock;
