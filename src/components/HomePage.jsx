import StorePic from "../assets/general-store-269539_1280.jpg";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <>
      <div className="homePage">
        <h1>Welcome to the Random Store</h1>
        <h2>For all your random needs</h2>
        <img src={StorePic} alt="Picture of our store front" width={600} />
        <p>
          Here at the Random Store we provide all kinds of random things. We
          might not provide all the necessary items in your life but you might
          stumble on to something that might provide useful. Check our shop to
          see if you encounter something random that might be a valuable
          addition to your already large stockpile of unused things at home.
        </p>
      </div>
    </>
  );
}
