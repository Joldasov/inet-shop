import { Route, Routes } from "react-router-dom";
import "./App.css";
import Catalog from "./componets/catalog/Catalog";
import Detail from "./componets/details/Details";
import Footer from "./componets/footer/Footer";
import Header from "./componets/header/header";
import Basket from "./componets/korzinka/Korzinka";
import Main from "./componets/main/main";
import PostHeader from "./componets/postHeader/postHeader";
import SubCategoryItems from "./componets/subCategory Category/categorySub";
function App() {
  return (
    <div>
      <header style={{ backgroundColor: "#f7f8fa" }}>
        <Header />
        <PostHeader />
      </header>
      <main style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/detail/:name" element={<Detail />} />
          <Route path="/catalogs" element={<Catalog />} />
          <Route path="/subCategory" element = {<SubCategoryItems/>}/>
        </Routes>
      </main>
      <footer style={{ backgroundColor: "#f7f8fa" }}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
