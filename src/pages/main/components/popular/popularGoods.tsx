import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAddCart } from "../../../services/mutations";
import { useFetchGetUserInfo, useGetItems } from "../../../services/queries";
import styles from "./popularGoods.module.scss";

const PopularGoods = () => {
  const [height, setHeight] = useState<number>(914);
  const [sort, setSort] = useState<string>("item");
  const { data, refetch } = useFetchGetUserInfo();
  const arr = ["computers-peripherals", "electronics", "furniture", "hobbies"];
  const getItems = useGetItems({ arr, sort });

  const addCart = useAddCart();

  const onAddHeigth = () => {
    if (height > 1306) {
      setHeight(1805);
    } else {
      setHeight(height + 416);
    }
  };

  const onAddCart = (id: string) => {
    addCart.mutate({ id });
    refetch();
  };

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
        {getItems?.map((item) =>
          item.data?.data.map((smt) => (
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
                    data?.data?.cart.filter((item: string) => item === smt.id).length >
                    0
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
