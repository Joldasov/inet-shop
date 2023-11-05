import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../helpers/helpers";
import { addArray } from "../../../../store/slice/goods";
import { fetchCart } from "../../../../thunk/addCartThunk";
import {
  fetchApplience,
  fetchGoodsComputers_peripherals,
  fetchGoodsElectronics,
  fetchGoodsFurniture,
  fetchGoodsHobbies,
} from "../../../../thunk/goodsThunk";
import { fetchUserInfo } from "../../../../thunk/userInfoThunk";
import styles from "./popularStyle.module.scss";

const PopularGoods = () => {
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const func1 = () => {
    setActive1(true);
    setActive2(false);
    setActive3(false);
    setActive4(false);
  };

  const func2 = () => {
    setActive1(false);
    setActive2(true);
    setActive3(false);
    setActive4(false);
  };
  const func3 = () => {
    setActive1(false);
    setActive2(false);
    setActive3(true);
    setActive4(false);
  };
  const func4 = () => {
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(true);
  };
  const dispatch = useAppDispatch();
  const [fulfilled, setFufilled] = useState([]);
  const comp = "computers-peripherals";
  const elec = "electronics";
  const fur = "furniture";
  const hobby = "hobbies";
  const app = "appliances";
  const [sort, setSort] = useState<string>("item");
  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        dispatch(fetchGoodsComputers_peripherals({ comp, sort })),
        dispatch(fetchGoodsElectronics({ elec, sort })),
        dispatch(fetchGoodsFurniture({ fur, sort })),
        dispatch(fetchGoodsHobbies({ hobby, sort })),
        dispatch(fetchApplience({ app, sort })),
      ]).then((values) => {
        setFufilled(values);
        dispatch(addArray(values));
      });
    }

    fetchData();
  }, [sort, dispatch]);
  const [height, setHeight] = useState<number>(914);
  const addHeight = () => {
    if (height > 1306) {
      setHeight(1805);
    } else {
      setHeight(height + 416);
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

  return (
    <div style={{ width: "1500px", margin: "0 auto" }}>
      <div className={styles.textBox}>
        <h1 style={{ fontWeight: "630", fontSize: "26px" }}>Популярное</h1>
        <p className={styles.wathchAll}>Смотреть все</p>
      </div>
      <div className={styles.buttons}>
        <button
          className={active1 ? `${styles.btn} ${styles.active}` : styles.btn}
          onClick={() => {
            setSort("item");
            func1();
          }}
        >
          Все
        </button>
        <button
          className={active2 ? `${styles.btn} ${styles.active}` : styles.btn}
          onClick={() => {
            setSort("price");
            func2();
          }}
        >
          до 100 р.
        </button>
        <button
          className={active3 ? `${styles.btn} ${styles.active}` : styles.btn}
          onClick={() => {
            setSort("rating");
            func3();
          }}
        >
          Популярное
        </button>
        <button
          className={active4 ? `${styles.btn} ${styles.active}` : styles.btn}
          onClick={() => {
            setSort("availableAmount");
            func4();
          }}
        >
          По доступности
        </button>
      </div>
      <div className={styles.goods} style={{ height: `${height}px` }}>
        {fulfilled?.map((item) =>
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
              <div style={{ textAlign: "center" }}>
                <button
                  className={
                    userInfo.data?.cart.filter((item) => item === smt.id)
                      .length > 0
                      ? styles.chosen
                      : styles.btn
                  }
                  onClick={() => {
                    dispatch(fetchCart(smt.id));
                    func();
                  }}
                >
                  В корзину
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.show}>
        <button
          className={height > 1400 ? styles.hide : ""}
          onClick={() => addHeight()}
        >
          Показать еще
        </button>
      </div>
      <div className={styles.all}>
        <p>Смотреть все</p>
      </div>
    </div>
  );
};
export default PopularGoods;

{
  /* <div className={styles.box}>
<div className={styles.imgBox}>
  <img
    src={smt.imageUrls[0]}
    style={{ width: "128px", height: "128px" }}
  />
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
  <p style={{ fontSize: "15px", marginTop: "5px" }}>
    {smt.name.length > 40 ? `${smt.name.slice(0, 40)}...` : smt.name}
  </p>
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
    className={styles.btn}
    style={{
      color: "white",
      border: "none",
      outline: "none",
      padding: "10px 40px",
      borderRadius: "3px",
      marginTop: "50px",
      fontSize: "17px",
    }}
  >
    В корзину
  </button>
</div>
</div> */
}
