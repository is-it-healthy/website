import { useEffect } from "react";
// import { FoodInfo } from "./components/FoodInfo";

const Home = () => {

  useEffect(() => {
    document.title = `Home`
  })

  return (
    <>
      <div className="min-h-screen">
        {/* <FoodInfo /> */}
        <div className="btn">Test</div>
      </div>
    </>
  );
};

export { Home }