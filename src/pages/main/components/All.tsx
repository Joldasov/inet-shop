import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../helpers/helpers";
import { fetchCart } from "../../../thunk/addCartThunk";
import {
  fetchGoodsComputers_peripherals,
  fetchGoodsElectronics,
  fetchGoodsFurniture,
  fetchGoodsHobbies,
} from "../../../thunk/goodsThunk";
import { fetchUserInfo } from "../../../thunk/userInfoThunk";
import styles from "./AllStyle.module.scss";
import Offers from "./offers/Offers";
import PopularGoods from "./popular/popularGoods";

const All = () => {
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const [fulfilled, setFufilled] = useState([]);

  const func1 = () => {
    setActive1(true);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive5(false);
  };

  const func2 = () => {
    setActive1(false);
    setActive2(true);
    setActive3(false);
    setActive4(false);
    setActive5(false);
  };
  const func3 = () => {
    setActive1(false);
    setActive2(false);
    setActive3(true);
    setActive4(false);
    setActive5(false);
  };
  const func4 = () => {
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(true);
    setActive5(false);
  };
  const func5 = () => {
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive5(true);
  };

  const dispatch = useAppDispatch();
  const comp = "computers-peripherals";
  const elec = "electronics";
  const fur = "furniture";
  const hobby = "hobbies";
  const [sort, setSort] = useState<string>("item");

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        dispatch(fetchGoodsComputers_peripherals({ comp, sort })),
        dispatch(fetchGoodsElectronics({ elec, sort })),
        dispatch(fetchGoodsFurniture({ fur, sort })),
        dispatch(fetchGoodsHobbies({ hobby, sort })),
      ]).then((values) => {
        setFufilled(values);
      });
    }

    fetchData();
  }, [sort, dispatch]);

  console.log;

  console.log(fulfilled);
  const [offset, setOffest] = useState(0);

  const handleOffsetNext = () => {
    setOffest(offset + 1494);
    if (offset >= 2988) {
      setOffest(0);
    }
  };
  const handleOffsetPrev = () => {
    setOffest(offset - 1494);
    if (offset <= 0) {
      setOffest(2988);
    }
  };
  const [num, setNum] = useState<number>(0);
  const func = () => {
    setNum(num + 1);
  };
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [num]);

  const userInfo = useAppSelector((state) => state.userInfo.true);

  console.log(offset);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p style={{ fontWeight: "600", fontSize: "24px" }}>Все акций</p>
        <p
          style={{ fontSize: "18px", color: "#07c" }}
          className={styles.cursor}
        >
          Смотреть все
        </p>
      </div>
      <div className={styles.desc}>
        <button
          onClick={() => {
            func1();
            setSort("raing");
          }}
          className={active1 ? `${styles.btn} ${styles.active}` : styles.btn}
        >
          Все
        </button>
        <button
          onClick={() => {
            func2();
            setSort("price");
          }}
          className={active2 ? `${styles.btn} ${styles.active}` : styles.btn}
        >
          Товары со скидкой
        </button>

        <button
          onClick={() => {
            func3();
            setSort("rating");
          }}
          className={active3 ? `${styles.btn} ${styles.active}` : styles.btn}
        >
          Товыры с подарками
        </button>

        <button
          onClick={() => {
            func4();
            setSort("price");
          }}
          className={active4 ? `${styles.btn} ${styles.active}` : styles.btn}
        >
          Суперцена
        </button>
        <button
          onClick={() => {
            func5();
            setSort("availableAmount");
          }}
          className={active5 ? `${styles.btn} ${styles.active}` : styles.btn}
        >
          Уценненые товары
        </button>
      </div>

      <div className={styles.wrapperInner}>
        <button
          className={styles.btns}
          style={{ marginRight: "20px" }}
          onClick={() => handleOffsetPrev()}
        >
          <LeftOutlined />
        </button>

        <div className={styles.goods_wrapper}>
          <div className={styles.swiper}>
            <div
              className={styles.swiper_content}
              style={{ left: `${-offset}px` }}
            >
              {fulfilled.map((item) =>
                item.payload?.data.map((smt) => (
                  <div className={styles.box}>
                    <div className={styles.imgBox}>
                      <NavLink to={`/detail/:${smt.id}`}>
                        <img
                          src={smt.imageUrls[0]}
                          style={{ width: "128px", height: "128px" }}
                        />
                      </NavLink>
                    </div>
                    <div>
                      <h1
                        style={{
                          fontSize: "19px",
                          fontWeight: "600",
                          marginTop: "10px",
                        }}
                      >
                        {smt.price} <span>р.</span>
                      </h1>
                      <NavLink
                        to={`/detail/:${smt.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <p
                          style={{ fontSize: "15px", marginTop: "5px" }}
                          className={styles.navLink}
                        >
                          {smt.name.length > 40
                            ? `${smt.name.slice(0, 40)}...`
                            : smt.name}
                        </p>
                      </NavLink>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "gray",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >
                        Курьером – 23 Окт <br /> Самовывоз – 22 Окт
                      </p>
                    </div>
                    <div>
                      <button
                        className={
                          userInfo.data?.cart.filter((item) => item === smt.id)
                            .length > 0
                            ? styles.added
                            : styles.btn
                        }
                        onClick={() => {
                          dispatch(fetchCart(smt.id));
                          func(smt.id);
                        }}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <button
          className={styles.btns}
          style={{ marginLeft: "30px" }}
          onClick={() => handleOffsetNext()}
        >
          <RightOutlined />
        </button>
      </div>
      <Offers />

      <PopularGoods />
    </div>
  );
};
export default All;
