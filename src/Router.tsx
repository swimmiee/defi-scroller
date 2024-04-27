import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/Main";
import { SearchedPage } from "pages/SearchedPage";
import { PositionDetailsPage } from "pages/Details";

export const ROUTES = {
  MAIN: "/",
  SEARCHED: "/:address",
  POSITION: "/position/:id",
}

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.SEARCHED} element={<SearchedPage />} />
        <Route path={ROUTES.POSITION} element={<PositionDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
