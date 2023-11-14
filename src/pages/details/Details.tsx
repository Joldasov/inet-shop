import {
  CaretRightOutlined,
  CheckCircleOutlined,
  PieChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchCart } from "../../store/thunk/AddCartThunk";
import { fetchGetItem } from "../../store/thunk/GetItemThunk";
import { fetchUserInfo } from "../../store/thunk/UserInfoThunk";
import { useAppDispatch, useAppSelector } from "../../utils/helpers/Helpers";
import styles from "./details.module.scss";

const Detail = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const id = name?.slice(1);
  const fulfilled = useAppSelector((state) => state.get.status);
  const userInfo = useAppSelector((state) => state.userInfo.true);
  const [num, setNum] = useState(0);
  const onClick = () => {
    setNum(num + 1);
  };

  useEffect(() => {
    dispatch(fetchGetItem({ id }));
  }, [name, num]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [num]);

  return (
    <div className={styles.wrapper}>
      <NavLink to="/">
        <p>Главная</p>
      </NavLink>
      <h1 className={styles.name}>{fulfilled?.name}</h1>
      <div className={styles.details}>
        <div className={styles.box0}>
          <button className={styles.playBtn}>
            <CaretRightOutlined style={{ color: "white", fontSize: "50px" }} />
          </button>
          <button className={styles.imgBtn}>
            <img
              src={
                fulfilled?.imageUrls?.length > 0 ? fulfilled.imageUrls[0] : ""
              }
              width={65}
              height={65}
            />
          </button>
        </div>
        <img
          src={fulfilled?.imageUrls?.length > 0 ? fulfilled.imageUrls[0] : ""}
          style={{ margin: "0px 150px" }}
        />
        <div className={styles.price}>
          <h1>
            {fulfilled?.price} <span> р.</span>
          </h1>
          <p>
            <PieChartOutlined className={styles.checkAndPieIcon} />
            От {Math.floor(fulfilled?.price / 12)} р./месяц
            <br /> при оплате частями
          </p>
          <p>
            <CheckCircleOutlined className={styles.checkAndPieIcon} />В наличий{" "}
            {fulfilled.availableAmount} штук
          </p>
        </div>
        <div className={styles.add}>
          <button className={styles.favor}>
            <StarOutlined />
            Добавить в избранное
          </button>
          {userInfo.data?.cart.filter((item) => item === fulfilled.id).length >
          0 ? (
            <NavLink to="/basket">
              <button
                onClick={() => {
                  dispatch(fetchCart(id));
                  onClick();
                }}
                className={styles.added}
                style={{ textDecoration: "underline" }}
              >
                В корзину
              </button>
            </NavLink>
          ) : (
            <button
              onClick={() => {
                dispatch(fetchCart(id));
                onClick();
              }}
              className={styles.cart}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
      <div className={styles.moreDetails}>
        <h1>О таваре</h1>
        <p>{fulfilled?.description}</p>
      </div>
    </div>
  );
};
export default Detail;
