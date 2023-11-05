import { Outlet } from "react-router-dom";
import Header from "../pages/header/header";
import PostHeader from "../pages/postHeader/postHeader";
import Footer from "../pages/footer/Footer";

const MainLayOut = () => {
  return (
    <>
      <header style={{ backgroundColor: "#f7f8fa" }}>
        <Header />
        <PostHeader />
      </header>
      <main  style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <footer style={{ backgroundColor: "#f7f8fa" }}>
        <Footer />
      </footer>
    </>
  );
};
export default MainLayOut;
