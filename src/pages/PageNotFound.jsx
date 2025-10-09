import { useEffect } from "react";
import { ArrowLeft } from "react-bootstrap-icons";

const PageNotFound = () => {

  useEffect(() => {
    document.title = `Page Not Found! | is it healthy?`
  })

  return (
    <>
      <div className="hero bg-base-100 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">404 | Not Found</h1>
            <p className="py-6">
              The page that you are looking for does not exist!
            </p>
            <button className="btn btn-neutral"><ArrowLeft className="text-lg" />Home</button>
          </div>
        </div>
      </div>
    </>
  );
};

export { PageNotFound }
