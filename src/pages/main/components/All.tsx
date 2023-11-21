import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchCart } from "../../../store/thunk/AddCartThunk";
import {
  fetchGoodsComputers_peripherals,
  fetchGoodsElectronics,
  fetchGoodsFurniture,
  fetchGoodsHobbies,
} from "../../../store/thunk/GoodsThunk";
import { fetchUserInfo } from "../../../store/thunk/UserInfoThunk";
import { useAppDispatch, useAppSelector } from "../../../utils/helpers/Helpers";
import styles from "./all.module.scss";
import Offers from "./offers/Offers";
import PopularGoods from "./popular/PopularGoods";
import { ALlNames } from "./utils/const/AllNames";

const All = () => {
  const [fulfilled, setFufilled] = useState([]);
  const [num, setNum] = useState<number>(0);
  const [sort, setSort] = useState<string>("item");
  const [offset, setOffest] = useState(0);
  const userInfo = useAppSelector((state) => state.userInfo.true);
  const dispatch = useAppDispatch();

  const onHandleOffsetNext = () => {
    setOffest(offset + 1494);
    if (offset >= 2988) {
      setOffest(0);
    }
  };
  const onHandleOffsetPrev = () => {
    setOffest(offset - 1494);
    if (offset <= 0) {
      setOffest(2988);
    }
  };
  const func = () => {
    setNum(num + 1);
  };

  const onCartAdd = (id: string) => {
    dispatch(fetchCart({id: id}));
    func();
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [num]);

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        dispatch(
          fetchGoodsComputers_peripherals({ comp: ALlNames.comp, sort })
        ),
        dispatch(fetchGoodsElectronics({ elec: ALlNames.elec, sort })),
        dispatch(fetchGoodsFurniture({ fur: ALlNames.fur, sort })),
        dispatch(fetchGoodsHobbies({ hobby: ALlNames.hobby, sort })),
      ]).then((values) => {
        setFufilled(values);
      });
    }

    fetchData();
  }, [sort, dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p className={styles.discount}>Все акций</p>
      </div>
      <div className={styles.desc}>
        <button
          onClick={() => {
            setSort("raing");
          }}
          className={styles.btn}
        >
          Все
        </button>
        <button
          onClick={() => {
            setSort("price");
          }}
          className={styles.btn}
        >
          Товары со скидкой
        </button>

        <button
          onClick={() => {
            setSort("rating");
          }}
          className={styles.btn}
        >
          Товыры с подарками
        </button>

        <button
          onClick={() => {
            setSort("price");
          }}
          className={styles.btn}
        >
          Суперцена
        </button>
        <button
          onClick={() => {
            setSort("availableAmount");
          }}
          className={styles.btn}
        >
          Уценненые товары
        </button>
      </div>

      <div className={styles.wrapperInner}>
        <button
          className={`${styles.btns} ${styles.margin}`}
          onClick={onHandleOffsetPrev}
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
                        <img src={smt.imageUrls[0]} />
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
                    <div>
                      <p className={styles.orderTime}>
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
                        onClick={() => onCartAdd(smt.id)}
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
          className={`${styles.btns} ${styles.right}`}
          onClick={onHandleOffsetNext}
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
