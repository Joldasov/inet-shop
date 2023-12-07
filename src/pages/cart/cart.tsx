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
import { useAppDispatch, useAppSelector } from "../../utils/helpers/Helpers";
import { useAddFavorite, useBuy, useDeleteCart } from "../services/mutations";
import { useFetchGetUserInfo, useGetCartItems } from "../services/queries";
import styles from "./cart.module.scss";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useFetchGetUserInfo();
  const otherData = useAppSelector((state) => state.cart.data);
  const [open, setOpen] = useState(false);
  const items = useAppSelector((state) => state.cart.items);
  const addFavor = useAddFavorite();
  const order = useBuy();
  const deleteCart = useDeleteCart();
  const uniqueGoods = Array.from(new Set(data?.data.cart))
  console.log(uniqueGoods)
  const getCartItems = useGetCartItems({ arr: uniqueGoods as string[] });

  console.log(getCartItems);
  let AllAmount = 0;
  let AllPrice = 0;
  otherData.map((item) => {
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
    phone: string;
    comment: string;
  }) => {
    order.mutate({
      items,
      details: {
        name: values.name,
        address: values.address,
        phone: values.phone,
        timeToDeliver: values.timeToDeliver,
        comment: values.comment,
      },
    });

    setOpen(false);
    refetch();
  };

  const onIncrement = (id: string) => {
    dispatch(Increament(id));
  };
  const onDiscrement = (id: string) => {
    dispatch(Discreament(id));
  };

  const onFetchCartDelete = (id: string) => {
    deleteCart.mutate(id);
    refetch();
  };
  const onFavorites = (id: string) => {
    addFavor.mutate({ id });
    refetch();
  };

  useEffect(() => {
    dispatch(DataAdd(getCartItems));
    dispatch(Items(getCartItems));
  }, [data?.data.cart, dispatch, AllAmount]);

  return (
    <div className={styles.box}>
      <h1>Kорзина</h1>
      <div className={styles.divider}></div>
      {data?.data?.cart?.length > 0 ? (
        <div className={styles.good}>
          <div>
            {getCartItems.map((item) =>
              item.data?.data.isInCart === true ? (
                ""
              ) : (
                <div className={styles.goodInner}>
                  <img
                    src={
                      item?.data?.data.imageUrls?.length > 0
                        ? item?.data?.data.imageUrls[0]
                        : ""
                    }
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
                            item?.data?.data.amount > 1
                              ? styles.btn
                              : `${styles.btn} ${styles.active}`
                          }
                          onClick={() => onDiscrement(item.data?.data.id)}
                          disabled={item.data?.data.amount > 1 ? false : true}
                        >
                          <MinusOutlined
                            className={
                              item?.data?.data.amount > 1 ? styles.black : ""
                            }
                          />
                        </button>
                        <p>{item?.data?.data.amount}</p>
                        <button
                          className={styles.btn}
                          onClick={() => onIncrement(item.data?.data.id)}
                        >
                          <PlusOutlined className={styles.plusIcon} />
                        </button>
                      </div>
                      <p className={styles.priceText}>
                        {item.data?.data.price}
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
                        onClick={() => onFetchCartDelete(item.data?.data.id)}
                      >
                        <DeleteOutlined className={styles.deleteIcon} />
                        Удалить
                      </button>
                      {data?.data?.favorites?.filter(
                        (id: string) => id === item?.data?.data.id
                      ).length > 0 ? (
                        <button className={styles.favor}>
                          <HeartOutlined className={styles.favorIcon} />В
                          избранное
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            onFavorites(item.data?.data.id as string)
                          }
                          className={styles.add}
                        >
                          <HeartOutlined className={styles.addIcon} />В
                          избранное
                        </button>
                      )}
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
            <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Адрес"
              name="address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Время доставки"
              name="timeToDeliver"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Номер телефона"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Коментаний"
              name="comment"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item className={styles.formItem}>
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
                  loading={order.isLoading}
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
