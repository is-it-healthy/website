import { useEffect } from "react";
import { FoodInfo } from "./components/FoodInfo";

const Home = () => {

  useEffect(() => {
    document.title = `Home | is it healthy?`
  })

  return (
    <>
      <div className="min-h-screen bg-black text-slate-100">
        <div className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
          <FoodInfo />
        </div>
      </div>
    </>
  );
};

export { Home }
