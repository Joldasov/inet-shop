import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { addArray } from "../../../../store/slice/Goods";
import { fetchCart } from "../../../../store/thunk/AddCartThunk";
import {
  fetchApplience,
  fetchGoodsComputers_peripherals,
  fetchGoodsElectronics,
  fetchGoodsFurniture,
  fetchGoodsHobbies,
} from "../../../../store/thunk/GoodsThunk";
import { fetchUserInfo } from "../../../../store/thunk/UserInfoThunk";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/helpers/Helpers";
import styles from "./popularGoods.module.scss";
import { GoodsNames } from "./utils/const/GoodsNames";
const PopularGoods = () => {
  const [height, setHeight] = useState<number>(914);
  const [fulfilled, setFufilled] = useState([]);
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState<string>("item");
  const [num, setNum] = useState<number>(0);
  const userInfo = useAppSelector((state) => state.userInfo.true);

  const onAddHeigth = () => {
    if (height > 1306) {
      setHeight(1805);
    } else {
      setHeight(height + 416);
    }
  };

  const onAddCart = (id: string) => {
    dispatch(fetchCart({ id: id }));
    func();
  };

  const func = () => {
    setNum(num + 1);
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [num]);

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        dispatch(
          fetchGoodsComputers_peripherals({ comp: GoodsNames.comp, sort })
        ),
        dispatch(fetchGoodsElectronics({ elec: GoodsNames.elec, sort })),
        dispatch(fetchGoodsFurniture({ fur: GoodsNames.fur, sort })),
        dispatch(fetchGoodsHobbies({ hobby: GoodsNames.hobby, sort })),
        dispatch(fetchApplience({ app: GoodsNames.app, sort })),
      ]).then((values) => {
        setFufilled(values);
        dispatch(addArray(values));
      });
    }
    fetchData();
  }, [sort, dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.textBox}>
        <h1 style={{ fontWeight: "630", fontSize: "26px" }}>Популярное</h1>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.btn}
          onClick={() => {
            setSort("item");
          }}
        >
          Все
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            setSort("price");
          }}
        >
          до 100 р.
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            setSort("rating");
          }}
        >
          Популярное
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            setSort("availableAmount");
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
                  <img src={smt.imageUrls[0]} width={128} height={128} />
                </NavLink>
              </div>
              <>
                <h1 className={styles.price}>
                  {smt.price} <span>р.</span>
                </h1>
                <NavLink
                  to={`/detail/:${smt.id}`}
                  className={styles.noTextDecoration}
                >
                  <p className={styles.text}>
                    {smt.name.length > 40
                      ? `${smt.name.slice(0, 40)}...`
                      : smt.name}
                  </p>
                </NavLink>
              </>
              <>
                <p className={styles.time}>
                  Курьером – 23 Окт <br /> Самовывоз – 22 Окт
                </p>
              </>
              <div className={styles.inCart}>
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
          ))
        )}
      </div>
      <div className={styles.show}>
        <button
          className={height > 1400 ? styles.hide : ""}
          onClick={onAddHeigth}
        >
          Показать еще
        </button>
      </div>
    </div>
  );
};
export default PopularGoods;
