import { Route, Routes } from "react-router-dom"
import { Home, Landing, Help, License, Legal, PageNotFound } from "../pages"

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Main (for General Public) */}
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/license" element={<License />} />
        <Route path="/legal" element={<Legal />} />

        {/* Errors */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export { AllRoutes }
