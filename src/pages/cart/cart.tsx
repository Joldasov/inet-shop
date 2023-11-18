import {
  CarOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, Input } from "antd";
import { useEffect, useState } from "react";
import {
  DataAdd,
  Discreament,
  Increament,
  Items,
} from "../../store/slice/AddCart";
import { fetchInFavor } from "../../store/thunk/AddFavoriteThunk";
import { fetchBuy } from "../../store/thunk/BuyThunk";
import { fetchCartDelete } from "../../store/thunk/DeleteCartThunk";
import { fetchGetItem } from "../../store/thunk/GetItemThunk";
import { fetchUserInfo } from "../../store/thunk/UserInfoThunk";
import { useAppDispatch, useAppSelector } from "../../utils/helpers/Helpers";
import styles from "./cart.module.scss";

const Cart = () => {
  const dispatch = useAppDispatch();
  const fulfilled = useAppSelector((state) => state.userInfo.true);
  const data = useAppSelector((state) => state.cart.data);
  const [open, setOpen] = useState(false);
  const items = useAppSelector((state) => state.cart.items);
  const {status, error} = useAppSelector((state) => state.buy);
  
  console.log(status);
  console.log(error)

  let AllAmount = 0;
  let AllPrice = 0;
  data.map((item) => {
    AllAmount = item?.amount + AllAmount;
    AllPrice = item?.price + AllPrice;
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values: {
    name: string;
    address: string;
    timeToDeliver: string;
    phone: "s";
    comment: string;
  }) =>
   {
    dispatch(
      fetchBuy({
        items,
        name: values.name,
        address: values.address,
        phone: values.phone,
        timeToDeliver: values.timeToDeliver,
        comment: values.comment,
      })
    );
    onClose()
  };

  

  const onIncrement = (id: string) => {
    dispatch(Increament(id));
  };
  const onDiscrement = (id: string) => {
    dispatch(Discreament(id));
  };
  const onFetchCartDelete = (id: string) => {
    dispatch(fetchCartDelete(id));
  };
  const onFavorites = (id: string) => {
    dispatch(fetchInFavor(id));
  };

  useEffect(() => {
    const newSet = new Set(fulfilled.data?.cart);
    const uniqueGoods = Array.from(newSet);
    if (fulfilled.data?.cart.length > 0) {
      Promise.all(
        uniqueGoods.map((id: string) => {
          return dispatch(
            fetchGetItem({
              id,
            })
          );
        })
      )
        .then((values) => {
          return Promise.all(values.map((data) => data.payload));
        })
        .then((res) => {
          dispatch(DataAdd(res));
        });
    }
  }, [fulfilled.data?.cart, dispatch]);

  useEffect(() => {
    dispatch(Items(data));
  }, [AllAmount]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch, status]);
  return (
    <div className={styles.box}>
      <h1>Kорзина</h1>
      <div className={styles.divider}></div>
      { fulfilled.data?.cart.length > 0  ? (
        <div className={styles.good}>
          <div>
            {data.map((item) =>
              item?.isInCart === true ? (
                ""
              ) : (
                <div className={styles.goodInner}>
                  <img
                    src={item?.imageUrls?.length > 0 ? item?.imageUrls[0] : ""}
                  />
                  <div className={styles.goodInnerPost}>
                    <div className={styles.goodInnerPostInner}>
                      <p className={styles.info}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Minus, quo.
                      </p>
                      <div className={styles.btns}>
                        <button
                          className={
                            item?.amount > 1
                              ? styles.btn
                              : `${styles.btn} ${styles.active}`
                          }
                          onClick={() => onDiscrement(item.id)}
                          disabled={item.amount > 1 ? false : true}
                        >
                          <MinusOutlined
                            className={item?.amount > 1 ? styles.black : ""}
                          />
                        </button>
                        <p>{item?.amount}</p>
                        <button
                          className={styles.btn}
                          onClick={() => onIncrement(item.id)}
                        >
                          <PlusOutlined className={styles.plusIcon} />
                        </button>
                      </div>
                      <p className={styles.priceText}>
                        {Math.trunc(item?.price * 100) / 100}
                      </p>
                    </div>
                    <div className={styles.orderTime}>
                      <p>
                        <span>Доставка:</span>
                        <CarOutlined className={styles.carIcon} />
                        <span>Курьером 02.11</span>
                        <EnvironmentOutlined className={styles.natureIcon} />
                        Самовывоз 01.11
                      </p>
                    </div>
                    <div className={styles.AddDelete}>
                      <button
                        className={styles.delete}
                        onClick={() => onFetchCartDelete(item.id)}
                      >
                        <DeleteOutlined className={styles.deleteIcon} />
                        Удалить
                      </button>

                      <button
                        className={item?.isFavorite ? styles.favor : styles.add}
                        onClick={() => onFavorites(item.id)}
                      >
                        <HeartOutlined
                          className={item?.isFavorite ? styles.favorIcon : ""}
                        />
                        В избранное
                      </button>
                    </div>
                    <div className={styles.divider}></div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className={styles.order}>
            <div className={styles.price}>
              <h1>Итого</h1>
              <h1>{Math.floor(AllPrice)}</h1>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.amount}>
              <p>
                Товары - <span>{AllAmount}</span>
              </p>
              <p className={styles.allPrice}>{Math.floor(AllPrice)}</p>
            </div>
            <div className={styles.bonus}>
              <CreditCardOutlined className={styles.creditIcon} />
              <p>
                <span>от 1,31 бонусных баллов</span> на следующие покупки
              </p>
            </div>
            <div className={styles.aply}>
              <button onClick={() => showDrawer()}>Оформить заказ</button>
            </div>
            <div className={styles.someText}>
              <p>
                * Способ и время доставки можно выбрать при оформлении заказа.
                Дата доставки заказа рассчитывается по максимальной дате
                доставки товаров в корзине.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <img
            src="https://cdn21vek.by/img/checkout/noBasket.jpeg"
            width="350px"
            height="350px"
          />
        </div>
      )}

      <Drawer
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
        height="100vh"
        headerStyle={{ position: "absolute", right: "50px", border: "none" }}
      >
        <div className={styles.logo}></div>
        <div className={styles.drawerWrapper}>
          <img className={styles.order} />

          <Form
            name="wrap"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            onFinish={onFinish}
            className={styles.form}
          >
            <div className={styles.someText}>
              <h1>Oформление заказа</h1>
              <p>
                Для оформления заказа войдите в ваш аккаунт или продолжите
                <br /> как новый клиент
              </p>
            </div>
            <Form.Item label="name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="timeToDeliver"
              name="timeToDeliver"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="phone" name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="comment"
              name="comment"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label=" " className={styles.formItem}>
              <div className={styles.modalOrder}>
                <p>
                  {AllPrice} р.
                  <br />
                  <span>Стоимость заказа</span>
                </p>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.submitBtn}
                >
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};
export default Cart;
