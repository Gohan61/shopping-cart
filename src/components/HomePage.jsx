import StorePic from "../assets/general-store-269539_1280.jpg";

export default function HomePage() {
  return (
    <>
      <h1>Welcome to the Random Store</h1>
      <h2>For all your random needs</h2>

      <img src={StorePic} alt="Picture of our store front" width={600} />
    </>
  );
}
