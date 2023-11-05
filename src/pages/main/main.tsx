import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import All from "./components/All";
import Brands from "./components/brands/brands";
import styles from "./mainStyle.module.scss";
const Main = () => {
  const [offset, setOffset] = useState<number>(0);

  const handleOffsetNext = () => {
    setOffset(offset + 1500);
    if (offset >= 7500) {
      setOffset(0);
    }
  };
  const handleOffsetPrev = () => {
    setOffset(offset - 1500);
    if (offset <= 0) {
      setOffset(7500);
    }
  };
  return (
    <div className={styles.mainBox}>
      <div className={styles.sliderBox}>
        <button className={styles.prev} onClick={() => handleOffsetPrev()}>
          <LeftOutlined style={{ color: "#e52e6b" }} />
        </button>
        <div className={styles.slider}>
          <div className={styles.slider_inner} style={{ left: `${-offset}px` }}>
            <div className={styles.example1}></div>
            <div className={styles.example2}></div>
            <div className={styles.example3}></div>
            <div className={styles.example4}></div>
            <div className={styles.example5}></div>
            <div className={styles.example6}></div>
          </div>
        </div>
        <button className={styles.next} onClick={() => handleOffsetNext()}>
          <RightOutlined style={{ color: "#e52e6b" }} />
        </button>
      </div>
      <Brands />
      <All />
    </div>
  );
};
export default Main;
