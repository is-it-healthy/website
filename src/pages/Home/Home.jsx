import { useEffect } from "react";
import { FoodInfo } from "./components/FoodInfo";

const Home = () => {

  useEffect(() => {
    document.title = `Home | is it healthy?`
  })

  return (
    <>
      <div className="min-h-screen">
        <FoodInfo />
      </div>
    </>
  );
};

export { Home }