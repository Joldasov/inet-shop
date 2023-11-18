import { Dropdown, MenuProps } from "antd";
import { useEffect } from "react";
import { fetchUserInfo } from "../../store/thunk/UserInfoThunk";
import { useAppDispatch, useAppSelector } from "../../utils/helpers/Helpers";
import styles from "./listOfShopping.module.scss";

const ListOfShoppings = () => {
  const items: MenuProps["items"] = [
    {
      label: <p>Удалить</p>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: "Изменить",
      key: "1",
    },
  ];
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo.true);
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  console.log(userInfo);
  return (
    <div className={styles.wrapper}>
      <h1>Все заказы</h1>
      <div className={styles.box}>
        {userInfo.data?.orders.map((item) => (
          <div className={styles.details}>
            <div className={styles.UserInfo}>
              <p>Имя: {item.details.name} </p>
              <p>Номер Телефона: {item.details.phone}</p>
              <p>Время заказа: {item.details.timeToDeliver}</p>
              <p>Адресс: {item.details.address}</p>
              <p>Коммент: {item.details.comment}</p>
              <p>Количество покупок: {item.details.items?.length}</p>
            </div>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              className={styles.Dropdown}
            >
              <a onClick={(e) => e.preventDefault()}>
                <p className={styles.p}>:</p>
              </a>
            </Dropdown>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListOfShoppings;

{
  /* <div className={styles.details}>
  <div className={styles.UserInfo}>
    <p>Имя: </p>
    <p>Фамилия: </p>
    <p>Номер Телефона:</p>
    <p>Время заказа:</p>
  </div>
  <Dropdown menu={{ items }} trigger={["click"]} className={styles.Dropdown}>
    <a onClick={(e) => e.preventDefault()}>
      <p className={styles.p}>:</p>
    </a>
  </Dropdown>
</div>; */
}
