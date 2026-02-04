import { useEffect } from "react";
import { FoodInfo } from "./components/FoodInfo";

const Home = () => {

  useEffect(() => {
    document.title = `Home | is it healthy?`
  })

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/40 to-white text-slate-900">
        <div className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
          <FoodInfo />
        </div>
      </div>
    </>
  );
};

export { Home }
