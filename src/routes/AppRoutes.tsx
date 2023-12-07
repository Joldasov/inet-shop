import { Route, Routes } from "react-router-dom";
import MainLayOut from "../layOuts/MainLayOut";
import Cart from "../pages/cart/Cart";
import Catalog from "../pages/catalog/Catalog";
import Detail from "../pages/details/Details";
import Main from "../pages/main/Main";
import SubCategoryItems from "../pages/subCategory/CategorySub";
import ListOfShoppings from "../pages/listsOfShopping/ListOfShopping";
const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayOut />}>
        <Route index element={<Main />} />
        <Route path="/basket" element={<Cart />} />
        <Route path="/detail/:name" element={<Detail />} />
        <Route path="/catalogs" element={<Catalog />} />
        <Route path="/subCategory/:category/:id" element={<SubCategoryItems />} />
        <Route path="/listOfShoppings" element = {<ListOfShoppings/>}/>
      </Route>
    </Routes>
  );
};
export default AppRoute;
