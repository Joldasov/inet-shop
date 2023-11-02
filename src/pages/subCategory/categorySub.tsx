import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../helpers/helpers";
import { fetchCart } from "../../store/slice/addCart";
import { fetchUserInfo } from "../../store/slice/userInfo";
import styles from "./style.module.scss";
const SubCategoryItems = () => {
  useEffect(() => {}, []);
  const goods = useAppSelector((state) => state.subItem.status);
  console.log(goods);
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo.true);
  const [num, setNum] = useState<number>(0);
  const func = () => {
    setNum(num + 1);
  };
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [num]);
//   console.log(userInfo.data.cart)
  return (
    <div className={styles.wrapper}>
        <div style={{paddingTop: "10px"}}>
            <NavLink to='/'><p style={{color: "gray"}}>Главная <span></span> </p></NavLink>
        </div>
      <div className={styles.goods}>
        {goods?.data?.map((smt) => (
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
            <div style={{textAlign: 'center'}}>
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
