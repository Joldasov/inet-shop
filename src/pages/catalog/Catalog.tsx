import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchCatalog } from "../../store/slice/catalog";
import { changeDisplayFalse } from "../../store/slice/search";
import { fetchGetSubItems } from "../../store/thunk/subItemsThunk";
import { useAppDispatch, useAppSelector } from "../../utils/helpers/helpers";
import styles from "./catalog.module.scss";

const Catalog = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.catalog.status);
  const [num, setNum] = useState<number>(0);
  const [category, setCategory] = useState("appliances");

  const categoryHandle = (name) => {
    if (name === "Appliances") {
      setNum(0);
    } else if (name === "Electronics") {
      setNum(1);
    } else if (name === "Computers and Peripherals") {
      setNum(2);
    } else if (name === "Furniture") {
      setNum(3);
    } else {
      setNum(4);
    }
  };
  useEffect(() => {
    dispatch(fetchCatalog());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.categories}>
        {categories.map((item) => (
          <div
            className={styles.box}
            onClick={() => {
              categoryHandle(item?.name);
              setCategory(item.id);
            }}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className={styles.subCategories}>
        {categories[num]?.subCategories.map(({ name, id }) => (
          <NavLink
            to="/subCategory"
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => {
              dispatch(fetchGetSubItems({ category, id }));
              dispatch(changeDisplayFalse());
            }}
          >
            <div className={styles.subCategoryBox}>
              <p>{name}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
export default Catalog;
