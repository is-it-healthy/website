import { useEffect } from "react";
import { FoodInfo } from "./components/FoodInfo";

const Home = () => {

  useEffect(() => {
    document.title = `Home`
  })

  return (
    <>
      <FoodInfo />
    </>
  );
};

export { Home }