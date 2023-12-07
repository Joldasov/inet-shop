import {
  CaretRightOutlined,
  CheckCircleOutlined,
  PieChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {  useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "./details.module.scss";
import { useFetchGetItem, useFetchGetUserInfo } from "../services/queries";
import { useAddCart } from "../services/mutations";

const Detail = () => {
  const { name } = useParams();
  const id = name?.slice(1);
  const addCart = useAddCart()
  const {data, refetch} = useFetchGetUserInfo()
  const [num, setNum] = useState(0);
  const getItemData = useFetchGetItem({id: id as string})

  const onClick = () => {
    setNum(num + 1);
  };
  const onAddCart = (id: string) => {
    addCart.mutate({id: id})
    onClick();
    refetch()
  };

 
 

  return (
    <div className={styles.wrapper}>
      <NavLink to="/">
        <p>Главная</p>
      </NavLink>
      <h1 className={styles.name}>{getItemData.data?.name}</h1>
      <div className={styles.details}>
        <div className={styles.box0}>
          <button className={styles.playBtn}>
            <CaretRightOutlined className={styles.caretRigth} />
          </button>
          <button className={styles.imgBtn}>
            <img
              src={
                getItemData.data?.imageUrls?.length > 0 ? getItemData.data.imageUrls[0] : ""
              }
              width={65}
              height={65}
            />
          </button>
        </div>
        <img
          src={getItemData.data?.imageUrls?.length > 0 ? getItemData.data.imageUrls[0] : ""}
          
        />
        <div className={styles.price}>
          <h1>
            {getItemData.data?.price} <span> р.</span>
          </h1>
          <p>
            <PieChartOutlined className={styles.checkAndPieIcon} />
            От {Math.floor(getItemData.data?.price / 12)} р./месяц
            <br /> при оплате частями
          </p>
          <p>
            <CheckCircleOutlined className={styles.checkAndPieIcon} />В наличий{" "}
            {getItemData.data?.availableAmount} штук
          </p>
        </div>
        <div className={styles.add}>
          <button className={styles.favor}>
            <StarOutlined />
            Добавить в избранное
          </button>
          {data?.data?.cart.filter((item) => item === getItemData.data?.id).length >
          0 ? (
            <NavLink to="/basket">
              <button
                onClick={() => onAddCart(id as string) }
                className={styles.added}
              >
                В корзину
              </button>
            </NavLink>
          ) : (
            <button
              onClick={() => onAddCart(id as string)}
              className={styles.cart}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
      <div className={styles.moreDetails}>
        <h1>О таваре</h1>
        <p>{getItemData.data?.description}</p>
      </div>
    </div>
  );
};
export default Detail;
