import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/header";
import PostHeader from "./components/postHeader/postHeader";
import styles from './mainLayout.module.scss'

const MainLayOut = () => {
  return (
    <>
      <header className={styles.header}>
        <Header />
        <PostHeader />
      </header>
      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
};
export default MainLayOut;
