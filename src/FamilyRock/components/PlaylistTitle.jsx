// style
import "../style/playlist-title.css";

// img
import boulon from "../img/boulon.gif";

const PlaylistTitle = ({ item, ledOn, front }) => {
  return item === null ? (
    <></>
  ) : (
    <div className="title-item">
      <img className="boulon number1" src={boulon} alt="boulon" />
      <img className="boulon number2" src={boulon} alt="boulon" />
      <img className="boulon number3" src={boulon} alt="boulon" />
      <img className="boulon number4" src={boulon} alt="boulon" />
      <div className="title-content">
        <div className="title-logo">
          <img src={item.image} alt={`logo de ${item.author}`} />
        </div>
        <div className="title-authors">
          <section
            className={
              front ? "title-authors-content front" : "title-authors-content"
            }
          >
            <p>{item.author.toUpperCase()}</p>
            {front
              ? item.featuring?.map((p, i) => {
                  return <p key={i}>{p}</p>;
                })
              : null}
          </section>
        </div>
        <div
          className={ledOn === null ? "led" : ledOn ? "led on" : "led off"}
        ></div>
        <div className="title-title">{item.title}</div>
      </div>
    </div>
  );
};

export default PlaylistTitle;
