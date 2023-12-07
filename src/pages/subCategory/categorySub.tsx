import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useFetchGetUserInfo, useFetchSubItems } from "../services/queries";
import styles from "./categorySub.module.scss";
import { useAddCart } from "../services/mutations";

const SubCategoryItems = () => {
  
  const { id, category } = useParams();
  
  const [sort, setSort] = useState<string>("price");
  const { data, refetch } = useFetchGetUserInfo();
  const addCart = useAddCart()
  const subItems = useFetchSubItems({
    id: id as string,
    category: category as string,
    sort: sort,
  });
  

  const onAddCart = (id: string) => {
    addCart.mutate({id})
    refetch()
  };

  const onChange = (e: string) => {
    if (e === "rating") {
      setSort("rating");
    } else if (e === "price") {
      setSort("price");
    } else {
      setSort("availableAmount");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.wrapperInner}>
          <NavLink to="/">
            <p className={styles.main}>Главная</p>
          </NavLink>
        </div>
        <div className={styles.goods}>
          {subItems.data?.data.map((smt) => (
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
                    data?.data.cart.filter((item) => item === smt.id).length > 0
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
            По доступности
          </option>
        </select>
      </div>
    </div>
  );
};
export default SubCategoryItems;
