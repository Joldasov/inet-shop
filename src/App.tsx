import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayOut from "./layOuts/mainLayOut";
import Basket from "./pages/cart/Korzinka";
import Catalog from "./pages/catalog/Catalog";
import Detail from "./pages/details/Details";
import Main from "./pages/main/main";

import SubCategoryItems from "./pages/subCategory/categorySub";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayOut />}>
        <Route index element={<Main />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/detail/:name" element={<Detail />} />
        <Route path="/catalogs" element={<Catalog />} />
        <Route path="/subCategory" element={<SubCategoryItems />} />
      </Route>
    </Routes>
  );
}

export default App;
