import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAddCart } from "../../services/mutations";
import { useFetchGetUserInfo, useGetItems } from "../../services/queries";
import styles from "./all.module.scss";
import Offers from "./offers/Offers";
import PopularGoods from "./popular/PopularGoods";

const All = () => {
  const [sort, setSort] = useState<string>("item");
  const [offset, setOffest] = useState(0);
  const { data, refetch } = useFetchGetUserInfo();
  const addCart = useAddCart();
  const arr = ["computers-peripherals", "electronics", "furniture", "hobbies"];
  const getItems = useGetItems({ arr, sort });
  
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

  const onCartAdd = (id: string) => {
    addCart.mutate({ id: id });
    refetch();
  };

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
              {getItems.map((item) =>
                item.data?.data.map((smt) => (
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
                          data?.data.cart.filter((item) => item === smt.id)
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
