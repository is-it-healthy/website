import { useEffect } from "react";
import { FoodInfo } from "./components/FoodInfo";

const Home = () => {

  useEffect(() => {
    document.title = `Home | is it healthy?`
  })

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-300/40 blur-3xl" />
          <div className="pointer-events-none absolute left-0 top-40 h-64 w-64 rounded-full bg-fuchsia-200/40 blur-3xl" />
          <FoodInfo />
        </div>
      </div>
    </>
  );
};

export { Home }
