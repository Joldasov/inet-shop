import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { changeDisplayFalse } from "../../store/slice/Search";
import { fetchCatalog } from "../../store/thunk/CatalogThunk";
import { fetchGetSubItems } from "../../store/thunk/SubItemsThunk";
import { useAppDispatch, useAppSelector } from "../../utils/helpers/Helpers";
import styles from "./catalog.module.scss";

const Catalog = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.catalog.status);
  const [num, setNum] = useState<number>(0);
  const [category, setCategory] = useState("appliances");
  const categoryHandle = (name: string) => {
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
  const onChosen = (name: string, id: string) => {
    categoryHandle(name);
    setCategory(id);
  };

  const onNavLinkClick = (category: string, id: string) => {
    dispatch(fetchGetSubItems({ category, id}));
    dispatch(changeDisplayFalse());
  };
  useEffect(() => {
    dispatch(fetchCatalog());
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.categories}>
        {categories.map(
          (item: {
            id: string;
            name: string;
            subCategories: [
              {
                id: string;
                name: string;
              }
            ];
          }) => (
            <div
              className={styles.box}
              onClick={() => onChosen(item.name, item.id)}
            >
              <p>{item.name}</p>
            </div>
          )
        )}
      </div>
      <div className={styles.subCategories}>
        {categories[num]?.subCategories.map(({ name, id }) => (
          <NavLink
            to="/subCategory"
            className={styles.noTextDecoration}
            onClick={() => onNavLinkClick(category, id)}
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
