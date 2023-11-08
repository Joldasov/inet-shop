import {
  AppstoreOutlined,
  CaretDownOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  HeartOutlined,
  LoadingOutlined,
  LoginOutlined,
  MonitorOutlined,
  QuestionOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Input, Space } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Accaunt from "../../../pages/modalWindows/accaunt/accaunt";
import {
  addRecent,
  addSearch,
  changeDisplayFalse,
  changeDisplayTrue,
  reset,
  textClear,
} from "../../../store/slice/search";
import { fetchSearch } from "../../../store/thunk/searchThunk";
import { useAppDispatch, useAppSelector } from "../../../utils/helpers/helpers";
import styles from "./postStyle.module.scss";
const PostHeader = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalSearchActive, setModalSearchActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.search.text);
  const fulfilled = useAppSelector((state) => state.search.status);
  const isLoading = useAppSelector((state) => state.search.isLoading);

  const items: MenuProps["items"] = [
    {
      label: (
        <UserOutlined
          style={{
            fontSize: "50px",
            textAlign: "center",
            position: "relative",
            padding: "10px 60px",
          }}
          className={styles.sign}
        />
      ),
      key: "0",
      type: "group",
    },
    {
      label: (
        <div className={styles.smt}>
          <button
            onClick={() => setModalActive(true)}
            className={styles.loginBtn}
          >
            Войти
          </button>
        </div>
      ),
      key: "1",
      // type: ""
    },
    {
      label: (
        <NavLink style={{ textDecoration: "none" }} to="/basket">
          <p className={styles.text}>
            <ShoppingCartOutlined style={{ marginRight: "5px" }} /> Корзинка
          </p>
        </NavLink>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <p className={styles.text}>
          <HeartOutlined style={{ marginRight: "5px" }} />
          Избранные товары
        </p>
      ),
      key: "3",
    },
    {
      label: (
        <p className={styles.text}>
          <EyeOutlined style={{ marginRight: "5px" }} />
          Просмотренные
        </p>
      ),
      key: "4",
    },
    {
      label: (
        <p className={styles.text}>
          <i
            className="fa-solid fa-code-compare"
            style={{ marginRight: "5px" }}
          ></i>
          Списки Сравнения
        </p>
      ),
      key: "5",
    },
  ];
  const Goods = [
    {
      good: "Зимние шины",
    },
    {
      good: "Телевизоры",
    },
    {
      good: "Комоды, тумбы",
    },
    {
      good: "Диваны",
    },
    {
      good: "Пылесосы вертикальные",
    },
    {
      good: "Матрасы",
    },
    {
      good: "Смаптфоны iPhone",
    },
  ];
  const recent = useAppSelector((state) => state.search.recent);
  const smt = useAppSelector((state) => state.search.smt);
  return (
    <div className={styles.wrapper}>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div>
            <NavLink
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(changeDisplayFalse())}
            >
              <h1 className={styles.logo}>21Vek.log</h1>
            </NavLink>
          </div>
          <div className={styles.cotolog}>
            <AppstoreOutlined
              style={{
                backgroundColor: "#e52e6b",
                padding: "6px",
                color: "white",
                borderRadius: "50%",
                fill: "white",
              }}
            />
            <NavLink
              to="/catalogs"
              style={{ textDecoration: "none", color: "black" }}
              onClick={() => dispatch(changeDisplayTrue())}
            >
              <p className={styles.cotolog_text}>Католог товаров</p>
            </NavLink>
          </div>
          <div>
            <Input
              placeholder="Поиск товаров"
              allowClear
              style={{
                width: "650px",
                outline: "none",
                padding: "11px",
                paddingLeft: "15px",
              }}
              className={styles.input}
              prefix={
                isLoading ? (
                  <LoadingOutlined style={{ fontSize: "18px" }} />
                ) : (
                  <MonitorOutlined
                    style={{ fontSize: "18px", marginRight: "5px" }}
                  />
                )
              }
              onFocus={() => setModalSearchActive(true)}
              onChange={(e) => {
                dispatch(addSearch(e.target.value));
                dispatch(fetchSearch({ text }));
              }}
              value={text}
            />
          </div>
          <div className={styles.logIN}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <LoginOutlined />
                  <p>Аккаунт</p>
                  <CaretDownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div>
            <NavLink
              to="/basket"
              onClick={() => dispatch(changeDisplayFalse())}
            >
              <button className={styles.basket}>
                <ShoppingCartOutlined style={{ marginRight: "5px" }} /> Корзинка
              </button>
            </NavLink>
          </div>
          <Accaunt active={modalActive} setActive={setModalActive} />
        </div>
        <div
          className={
            modalSearchActive ? `${styles.searchWrapper}` : styles.searchActive
          }
          onClick={() => setModalSearchActive(false)}
        >
          <div className={styles.search} onClick={(e) => e.stopPropagation()}>
            <div className={styles.searchInner}>
              {text.length > 0 && fulfilled.length === 0 ? (
                <div className={styles.nothingFound}>
                  <QuestionOutlined
                    style={{ display: "block", fontSize: "22px" }}
                  />
                  <p>Ничего не найдено</p>
                </div>
              ) : text.length === 0 ? (
                <>
                  {recent.length > 0 ? (
                    <>
                      <div className={`${styles.suggestion} ${styles.last}`}>
                        <p
                          style={{ display: "block" }}
                          className={`${styles.well_known_word}`}
                        >
                          Последние запросы{" "}
                          <p
                            className={styles.active}
                            style={{
                              color: "#07c",
                              marginLeft: "90px",
                              marginTop: "4px",
                            }}
                            onClick={() => dispatch(reset())}
                          >
                            Очистить
                          </p>
                        </p>
                        <div className={styles.suggestion_box}>
                          <p onClick={() => dispatch(addRecent(recent[0]))}>
                            <ClockCircleOutlined
                              style={{ color: "gray", marginRight: "7px" }}
                            />

                            {recent[0]}
                          </p>
                        </div>
                      </div>
                      {recent.slice(1).map((smt) => (
                        <div className={`${styles.suggestion} ${styles.last}`}>
                          <p
                            style={{ display: "block", width: "167px" }}
                            className={`${styles.well_known_word}`}
                          ></p>
                          <div className={styles.suggestion_box}>
                            <p onClick={() => dispatch(addRecent(smt))}>
                              <ClockCircleOutlined
                                style={{ color: "gray", marginRight: "7px" }}
                              />
                              {smt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                  <div className={styles.suggestion}>
                    <p className={styles.well_known_word}>Популярное</p>
                    <div className={styles.suggestion_box}>
                      <p onClick={() => dispatch(addRecent("Шкафы"))}>Шкафы</p>
                    </div>
                  </div>
                  {Goods.map((item) => (
                    <div className={styles.suggestion}>
                      <p className={styles.well_known_word}></p>
                      <div className={styles.suggestion_box}>
                        <p onClick={() => dispatch(addRecent(item.good))}>
                          {item.good}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                fulfilled?.map((items) => (
                  <div className={styles.suggestion}>
                    <p className={styles.well_known_word}></p>
                    <div className={styles.suggestion_box}>
                      <NavLink
                        to={`/detail/:${items.id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <p
                          onClick={() => {
                            dispatch(addRecent(items.name));
                            setModalSearchActive(false);
                            dispatch(textClear());
                            dispatch(changeDisplayFalse());
                          }}
                        >
                          {items?.name}
                        </p>
                      </NavLink>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={smt ? `${styles.catalogs} ${styles.hide}` : styles.catalogs}
      >
        <div className={styles.catalogs_inner}>
          <p>Все акций </p>
          <div className={styles.divider}></div>
          <p>Уценка</p>
          <p>Шины</p>
          <p>Холодильник</p>
          <p>Обогреватели</p>
          <p>Стиральные машины</p>
          <p>Котлы</p>
          <p>Смартфоны</p>
          <p>Телевизоры</p>
          <p>Пылесосы</p>
          <p>Матрасы</p>
          <p>Диваны</p>
        </div>
      </div>
    </div>
  );
};
export default PostHeader;
