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
import type { DrawerProps } from "antd/es/drawer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../helpers/helpers";
import { fetchBuy } from "../../store/slice/Buy";
import {
  DataAdd,
  Discreament,
  Increament,
  Items,
  fetchCartDelete,
  fetchInFavor,
} from "../../store/slice/addCart";
import { fetchGetItem } from "../../store/slice/get";
import { fetchUserInfo } from "../../store/slice/userInfo";
import styles from "./KrozinkaStyle.module.scss";

const Basket = () => {
  const dispatch = useAppDispatch();
  const fulfilled = useAppSelector((state) => state.userInfo.true);
  const data = useAppSelector((state) => state.cart.data);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [timeToDeliver, setTimeToDeliver] = useState("");
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const items = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchUserInfo());
    console.log(data);
  }, [dispatch]);

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
          dispatch(Items(res));
        });
    }
  }, [fulfilled.data?.cart, dispatch]);

  const SubmitOrder = () => {
    dispatch(
      fetchBuy({
        items: items,
        details: {
          name: name,
          address: address,
          phone: phone,
          timeToDeliver: timeToDeliver,
          comment: comment,
        },
      })
    );
    onClose();
    setName("");
    setAddress("");
    setComment("");
    setPhone("");
  };

  return (
    <div className={styles.box}>
      <h1 style={{ fontWeight: "620", paddingBottom: "10px" }}>Kорзина</h1>
      <div className={styles.divider}></div>
      {fulfilled.data?.cart.length > 0 ? (
        <div className={styles.good}>
          <div>
            {data.map((item) =>
              item?.isInCart === true ? (
                ""
              ) : (
                <div className={styles.goodInner}>
                  <img
                    src={item?.imageUrls?.length > 0 ? item?.imageUrls[0] : ""}
                    style={{ width: "88px", height: "88px" }}
                  />
                  <div style={{ marginLeft: "30px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "880px",
                      }}
                    >
                      <p style={{ fontSize: "18px", width: "292px" }}>
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
                          onClick={() => dispatch(Discreament(item.id))}
                          disabled={item.amount > 1 ? false : true}
                        >
                          <MinusOutlined
                            className={item?.amount > 1 ? styles.black : ""}
                          />
                        </button>
                        <p>{item?.amount}</p>
                        <button
                          className={styles.btn}
                          onClick={() => {
                            dispatch(Increament(item.id));
                          }}
                        >
                          <PlusOutlined style={{ color: "black" }} />
                        </button>
                      </div>
                      <p style={{ fontWeight: "600", fontSize: "22px" }}>
                        {Math.trunc(item?.price * 100) / 100}
                      </p>
                    </div>
                    <div className={styles.orderTime}>
                      <p>
                        <span style={{ fontWeight: "600" }}>Доставка:</span>
                        <CarOutlined style={{ marginLeft: "10px" }} />
                        <span style={{ margin: "0px 5px" }}>
                          Курьером 02.11
                        </span>
                        <EnvironmentOutlined
                          style={{ marginRight: "5px", marginLeft: "20px" }}
                        />
                        Самовывоз 01.11
                      </p>
                    </div>
                    <div className={styles.AddDelete}>
                      <button
                        className={styles.delete}
                        onClick={() => dispatch(fetchCartDelete(item.id))}
                      >
                        <DeleteOutlined style={{ marginRight: "5px" }} />
                        Удалить
                      </button>

                      <button
                        className={item?.isFavorite ? styles.favor : styles.add}
                        onClick={() => dispatch(fetchInFavor(item.id))}
                      >
                        <HeartOutlined
                          style={{ marginRight: "5px" }}
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
              <h1>{AllPrice}</h1>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.amount}>
              <p>
                Товары - <span>{AllAmount}</span>
              </p>
              <p style={{ fontWeight: "600" }}>{AllPrice}</p>
            </div>
            <div className={styles.bonus}>
              <CreditCardOutlined
                style={{
                  color: "#7b3eb8",
                  fontSize: "21px",
                  marginRight: "20px",
                }}
              />
              <p style={{ color: "#7b3eb8" }}>
                <span style={{ fontWeight: "600" }}>
                  от 1,31 бонусных баллов
                </span>{" "}
                на следующие покупки
              </p>
            </div>
            <div className={styles.aply}>
              <button onClick={() => showDrawer()}>Оформить заказ</button>
            </div>
            <div className={styles.someText}>
              <p style={{ color: "gray", fontSize: "18px" }}>
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
            style={{ maxWidth: 900, marginLeft: "20px", maxHeight: "600px" }}
          >
            <div className={styles.someText}>
              <h1 style={{ fontWeight: "600" }}>Oформление заказа</h1>
              <p>
                Для оформления заказа войдите в ваш аккаунт или продолжите
                <br /> как новый клиент
              </p>
            </div>
            <Form.Item label="name" name="name" rules={[{ required: false }]}>
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="address"
              name="address"
              rules={[{ required: false }]}
            >
              <Input onChange={(e) => setAddress(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="timeToDeliver"
              name="timeToDeliver"
              rules={[{ required: false }]}
            >
              <Input onChange={(e) => setTimeToDeliver(e.target.value)} />
            </Form.Item>
            <Form.Item label="phone" name="phone" rules={[{ required: false }]}>
              <Input onChange={(e) => setPhone(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="comment"
              name="comment"
              rules={[{ required: false }]}
            >
              <Input onChange={(e) => setComment(e.target.value)} />
            </Form.Item>

            <Form.Item
              label=" "
              style={{
                textAlign: "center",
                marginTop: "50px",
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "560px",
                  marginTop: "2px",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    textAlign: "left",
                  }}
                >
                  {AllPrice} р.
                  <br />
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "15px",
                      color: "gray",
                    }}
                  >
                    Стоимость заказа
                  </span>
                </p>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginRight: "0px",
                    width: "180px",
                    height: "48px",
                    fontSize: "18px",
                    backgroundColor: "#e52e6b",
                  }}
                  onClick={() => SubmitOrder()}
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
export default Basket;
