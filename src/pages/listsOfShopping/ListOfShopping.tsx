import { Button } from "antd";
import styles from "./listOfShopping.module.scss";
import { useFetchGetUserInfo } from "../services/queries";
import { useDeleteOrder } from "../services/mutations";

const ListOfShoppings = () => {
  const {data, refetch} = useFetchGetUserInfo()
  const deleteOrder = useDeleteOrder()

  const onDeleteOrder = (id: string) => {
    deleteOrder.mutate(id)
    refetch()
  };

  

  return (
    <div className={styles.wrapper}>
      <h1>Все заказы</h1>
      <div className={styles.box}>
        {data?.data.orders.map((item) => (
          <div className={styles.details}>
            <div className={styles.UserInfo}>
              <p>Имя: {item.details.name} </p>
              <p>Номер Телефона: {item.details.phone}</p>
              <p>Время заказа: {item.details.timeToDeliver}</p>
              <p>Адресс: {item.details.address}</p>
              <p>Коммент: {item.details.comment}</p>
              <p>Количество покупок: {item.details.items?.length}</p>
            </div>
            <div className={styles.buttons}>
              <Button danger onClick={() => onDeleteOrder(item.id)}>
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListOfShoppings;
