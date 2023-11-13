import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import PostHeader from "./components/postHeader/PostHeader";
import styles from './mainLayout.module.scss'

const MainLayOut = () => {
  return (
    <>
      <header className={styles.header}>
        <Header />
        <PostHeader />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
};
export default MainLayOut;
