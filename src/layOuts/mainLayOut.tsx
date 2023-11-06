import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/header";
import PostHeader from "./components/postHeader/postHeader";

const MainLayOut = () => {
  return (
    <>
      <header style={{ backgroundColor: "#f7f8fa" }}>
        <Header />
        <PostHeader />
      </header>
      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <footer style={{ backgroundColor: "#f7f8fa" }}>
        <Footer />
      </footer>
    </>
  );
};
export default MainLayOut;
