// components
import MenuBox from "../components/MenuBox";

// style
import "../style/home.css";

const Home = () => {
  return (
    <div className="home-page">
      <h1>Bienvenue chez Methyx !!!</h1>
      <div className="menu">
        <MenuBox />
      </div>
    </div>
  );
};

export default Home;
