import {
  AppstoreOutlined,
  CaretDownOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  LoadingOutlined,
  LoginOutlined,
  MonitorOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Input, Space } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Accaunt from "../../../pages/modalWindows/accaunt/Accaunt";
import {
  useFetchGetUserInfo,
  useSearch,
} from "../../../pages/services/queries";
import {
  addRecent,
  addSearch,
  changeDisplayFalse,
  changeDisplayTrue,
  reset,
  textClear,
} from "../../../store/slice/Search";
import { useAppDispatch, useAppSelector } from "../../../utils/helpers/Helpers";
import styles from "./postStyle.module.scss";
import { Goods } from "./utils/const/Goods";

const PostHeader = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalSearchActive, setModalSearchActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { text, recent, visibility } = useAppSelector((state) => state.search);
  const { data, refetch } = useFetchGetUserInfo();
  const search = useSearch({ text });

  const onModalActive = () => {
    setModalActive(true);
    refetch();
  };
  const onChangeDisplayFalse = () => {
    dispatch(changeDisplayFalse());
  };
  const onChangeDisplayTrue = () => {
    dispatch(changeDisplayTrue());
  };
  const onSetModalSearchActive = () => {
    setModalSearchActive(true);
  };
  const onSearch = (e: string) => {
    dispatch(addSearch(e));
  };
  const onPreventDefault = (e) => {
    e.preventDefault();
  };
  const onModalSearchActive = () => {
    setModalSearchActive(false);
  };
  const onStopPropaganation = (e) => {
    e.stopPropagation();
  };
  const onReset = () => {
    dispatch(reset());
  };
  const onAddRecent = (text: string) => {
    dispatch(addRecent(text));
  };
  const onOffSearch = (text: string) => {
    dispatch(addRecent(text));
    setModalSearchActive(false);
    dispatch(textClear());
    dispatch(changeDisplayFalse());
  };

  const items: MenuProps["items"] = [
    {
      label: data?.data ? (
        <div className={styles.accauntText}>
          <h1>Аккаунт</h1>
        </div>
      ) : (
        <UserOutlined className={styles.userIcon} />
      ),
      key: "0",
      type: "group",
    },
    {
      label: data?.data.name ? (
        <div className={styles.name}>
          <p>
            name: <span className={styles.bold}>{data.data?.name}</span>
          </p>
          <p>
            surname: <span className={styles.bold}>{data.data?.surname}</span>
          </p>
        </div>
      ) : (
        <div className={styles.smt}>
          <button onClick={onModalActive} className={styles.loginBtn}>
            Войти
          </button>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <NavLink className={styles.noTextDexoration} to="/basket">
          <p className={styles.text}>
            <ShoppingCartOutlined className={styles.margin} /> Корзинка
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
        <NavLink to="/listOfShoppings">
          <p className={styles.text}>
            <i className="fa-solid fa-code-compare"></i>
            <span className={styles.textInner}>Список покупок</span>
          </p>
        </NavLink>
      ),
      key: "3",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div>
            <NavLink
              to="/"
              className={styles.noTextDecoration}
              onClick={onChangeDisplayFalse}
            >
              <h1 className={styles.logo}>21Vek.log</h1>
            </NavLink>
          </div>
          <div className={styles.cotolog}>
            <AppstoreOutlined className={styles.cotologIcon} />
            <NavLink
              to="/catalogs"
              className={styles.noTextDecoration}
              onClick={onChangeDisplayTrue}
            >
              <p className={styles.cotolog_text}>Католог товаров</p>
            </NavLink>
          </div>
          <div>
            <Input
              placeholder="Поиск товаров"
              allowClear
              className={styles.input}
              prefix={
                search.isLoading ? (
                  <LoadingOutlined className={styles.loadingIcon} />
                ) : (
                  <MonitorOutlined className={styles.monitorIcon} />
                )
              }
              onFocus={onSetModalSearchActive}
              onChange={(e) => onSearch(e.target.value)}
              value={text}
            />
          </div>
          <div className={styles.logIN}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => onPreventDefault(e)}>
                <Space>
                  <LoginOutlined />
                  <p>Аккаунт</p>
                  <CaretDownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div>
            <NavLink to="/basket" onClick={onChangeDisplayFalse}>
              <button className={styles.basket}>
                <ShoppingCartOutlined className={styles.shopIcon} /> Корзинка
              </button>
            </NavLink>
          </div>
          <Accaunt active={modalActive} setActive={setModalActive} />
        </div>
        <div
          className={
            modalSearchActive ? `${styles.searchWrapper}` : styles.searchActive
          }
          onClick={onModalSearchActive}
        >
          <div
            className={styles.search}
            onClick={(e) => onStopPropaganation(e)}
          >
            <div className={styles.searchInner}>
              {text.length > 0 && search.data?.length === 0 ? (
                <div className={styles.nothingFound}>
                  <p>Ничего не найдено</p>
                </div>
              ) : text.length === 0 ? (
                <>
                  {recent.length > 0 ? (
                    <>
                      <div className={`${styles.suggestion} ${styles.last}`}>
                        <p className={`${styles.well_known_word}`}>
                          Последние запросы
                          <p className={styles.active} onClick={onReset}>
                            Очистить
                          </p>
                        </p>
                        <div className={styles.suggestion_box}>
                          <p onClick={() => onAddRecent(recent[0])}>
                            <ClockCircleOutlined className={styles.clockIcon} />
                            {recent[0]}
                          </p>
                        </div>
                      </div>
                      {recent.slice(1).map((smt) => (
                        <div className={`${styles.suggestion} ${styles.last}`}>
                          <p
                            className={`${styles.well_known_word} ${styles.recent}`}
                          ></p>
                          <div className={styles.suggestion_box}>
                            <ClockCircleOutlined className={styles.clockIcon} />

                            <p onClick={() => onOffSearch(smt)}>{smt}</p>
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
                      <p onClick={() => onAddRecent("Шкафы")}>Шкафы</p>
                    </div>
                  </div>
                  {Goods.map((item) => (
                    <div className={styles.suggestion}>
                      <p className={styles.well_known_word}></p>
                      <div className={styles.suggestion_box}>
                        <p onClick={() => onAddRecent(item.good)}>
                          {item.good}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                search.data?.map((items) => (
                  <div className={styles.suggestion}>
                    <p className={styles.well_known_word}>
                      <img src={items.imageUrls[0]} width={50} height={50} />
                    </p>
                    <div className={styles.suggestion_box}>
                      <NavLink
                        to={`/detail/:${items.id}`}
                        className={styles.noTextDecoration}
                      >
                        <p onClick={() => onOffSearch(items?.name)}>
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
        className={visibility ? `${styles.catalogs} ${styles.hide}` : styles.catalogs}
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
