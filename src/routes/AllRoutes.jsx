import { Route, Routes } from "react-router-dom"
import { Home, Landing, PageNotFound } from "../pages"

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Main (for General Public) */}
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Home />} />

        {/* Errors */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export { AllRoutes }
