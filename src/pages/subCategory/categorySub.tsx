import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchCart } from "../../store/thunk/AddCartThunk";
import { fetchUserInfo } from "../../store/thunk/UserInfoThunk";
import { useAppDispatch, useAppSelector } from "../../utils/helpers/helpers";
import styles from "./categorySub.module.scss";
const SubCategoryItems = () => {
  const goods = useAppSelector((state) => state.subItem.status);
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo.true);
  const [num, setNum] = useState<number>(0);
  const func = () => {
    setNum(num + 1);
  };
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [num]);
  return (
    <div className={styles.wrapper}>
      <div style={{ paddingTop: "10px" }}>
        <NavLink to="/">
          <p style={{ color: "gray" }}>
            Главная <span></span>{" "}
          </p>
        </NavLink>
      </div>
      <div className={styles.goods}>
        {goods?.data?.map((smt) => (
          <div className={styles.box}>
            <div className={styles.imgBox}>
              <NavLink to={`/detail/:${smt.id}`}>
                <img src={smt.imageUrls[0]} />
              </NavLink>
            </div>
            <div>
              <h1>
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
                  userInfo.data?.cart.filter((item) => item === smt.id).length >
                  0
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
        ))}
      </div>
    </div>
  );
};
export default SubCategoryItems;
