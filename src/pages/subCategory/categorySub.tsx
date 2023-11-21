import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  setSortLowPrice,
  setSortRating,
} from "../../store/slice/GetSubCategory";
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
  const onAddCart = (id: string) => {
    dispatch(fetchCart({ id: id }));
    func();
  };

  const onChange = (e: string) => {
    if (e === "rating") {
      dispatch(setSortRating());
      console.log(goods);
    } else {
      dispatch(setSortLowPrice());
    }
  };


  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [num]);
  return (
    <div className={styles.wrapper}>
      <div>
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
                    userInfo.data?.cart.filter((item) => item === smt.id)
                      .length > 0
                      ? styles.chosen
                      : styles.btn
                  }
                  onClick={() => onAddCart(smt.id)}
                >
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.sort}>
        <p>Сортировка</p>
        <select
          className={styles.select}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="rating" className={styles.option}>
            По популярности
          </option>
          <option value="price" className={styles.option}>
            Сначало дешевые
          </option>
          <option value="" className={styles.option}>
            Сначало дорогие
          </option>
        </select>
      </div>
    </div>
  );
};
export default SubCategoryItems;
