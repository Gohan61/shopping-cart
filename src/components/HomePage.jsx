import StorePic from "../assets/general-store-269539_1280.jpg";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <>
      <div className="homePage">
        <h2>Welcome to the Random Store</h2>
        <h3>For all your random needs</h3>
        <div className="imageDesc">
          <img src={StorePic} alt="Picture of our store front" />
          <p>
            Here at the Random Store we provide all kinds of random things. We
            might not provide all the necessary items in your life but you might
            stumble on to something that might provide useful. Check our shop to
            see if you encounter something random that might be a valuable
            addition to your already large stockpile of unused things at home.
          </p>
        </div>
      </div>
    </>
  );
}
