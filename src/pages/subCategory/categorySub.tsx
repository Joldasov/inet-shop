import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchCart } from "../../store/thunk/AddCartThunk";
import { fetchUserInfo } from "../../store/thunk/UserInfoThunk";
import { useAppDispatch, useAppSelector } from "../../utils/helpers/Helpers";
import styles from "./categorySub.module.scss";
const SubCategoryItems = () => {
  const goods = useAppSelector((state) => state.subItem.status);
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo.true);
  const [num, setNum] = useState<number>(0);
  const func = () => {
    setNum(num + 1);
  };

  const onAddCart = () => {
    dispatch(fetchCart(smt.id));
    func();
  };
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [num]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <NavLink to="/">
          <p className={styles.main}>Главная</p>
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
                className={styles.noTextDecoration}
              >
                <p className={styles.textLength}>
                  {smt.name.length > 40
                    ? `${smt.name.slice(0, 40)}...`
                    : smt.name}
                </p>
              </NavLink>
            </div>
            <div>
              <p className={styles.orderTime}>
                Курьером – 23 Окт <br /> Самовывоз – 22 Окт
              </p>
            </div>
            <div className={styles.btns}>
              <button
                className={
                  userInfo.data?.cart.filter((item) => item === smt.id).length >
                  0
                    ? styles.chosen
                    : styles.btn
                }
                onClick={onAddCart}
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
