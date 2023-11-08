import { Route, Routes } from "react-router-dom";
import MainLayOut from "../layOuts/mainLayOut";
import Cart from "../pages/cart/cart";
import Catalog from "../pages/catalog/catalog";
import Detail from "../pages/details/details";
import Main from "../pages/main/main";
import SubCategoryItems from "../pages/subCategory/categorySub";
const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayOut />}>
        <Route index element={<Main />} />
        <Route path="/basket" element={<Cart />} />
        <Route path="/detail/:name" element={<Detail />} />
        <Route path="/catalogs" element={<Catalog />} />
        <Route path="/subCategory" element={<SubCategoryItems />} />
      </Route>
    </Routes>
  );
};
export default AppRoute;
