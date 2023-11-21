import { Button, Drawer, Input } from "antd";
import { useEffect, useState } from "react";
import { fetchOrderChange } from "../../store/thunk/ChangeOrderThunk";
import { fetchOrderDelete } from "../../store/thunk/DeleteOrderThunk";
import { fetchUserInfo } from "../../store/thunk/UserInfoThunk";
import { useAppDispatch, useAppSelector } from "../../utils/helpers/Helpers";
import styles from "./listOfShopping.module.scss";

const ListOfShoppings = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo.true);
  const replyDeleteOrder = useAppSelector((state) => state.deleteOrder.status);
  const {status} =  useAppSelector(state => state.orderChange)
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");

  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState("");

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onOrderChange = (id: string) => {
    dispatch(
      fetchOrderChange({
        id: id,
        details: {
          name: name,
          address: address,
          comment: comment,
          timeToDeliver: time,
          phone: phone,
        },
      })
    );
    onClose();
  };

  const onDeleteOrder = (id: string) => {
    dispatch(fetchOrderDelete({ id }));
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch, replyDeleteOrder, status]);

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
            <div className={styles.buttons}>
              <Button danger onClick={() => onDeleteOrder(item.id)}>
                Удалить
              </Button>
              <Button onClick={showDrawer}>Изменить</Button>
            </div>
            <Drawer placement="bottom" onClose={onClose} open={open} height={400}>
              <p>
                Имя:{" "}
                <Input
                  placeholder={item.details.name}
                  onChange={(e) => setName(e.target.value)}
                />{" "}
              </p>
              <p>
                Номер Телефона:{" "}
                <Input
                  placeholder={item.details.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />{" "}
                {}
              </p>
              <p>
                Время заказа:{" "}
                <Input
                  placeholder={item.details.timeToDeliver}
                  onChange={(e) => setTime(e.target.value)}
                />
              </p>
              <p>
                Адресс:{" "}
                <Input
                  placeholder={item.details.address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </p>
              <p>
                Коммент:{" "}
                <Input
                  placeholder={item.details.comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </p>
              <Button
                type="primary"
                className={styles.btn}
                onClick={() => onOrderChange(item.id)}
              >
                Submit
              </Button>
            </Drawer>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListOfShoppings;

