import styles from "./offers.module.scss";

const Offers = () => {
  return (
    <div className={styles.wrapper}>
      <h1
        
      >
        Предложения
      </h1>
      <div className={styles.box_inner}>
        <div className={`${styles.box} ${styles.orange}`}>
          <p style={{ fontWeight: "650" }}>Более 90 пунктов самовывоза</p>
          <p style={{ fontSize: "15px", marginTop: "5px" }}>
            Получите заказ в кратчайшие сроки
          </p>

          <img
            src="https://static.21vek.by/desktop/_next/static/images/pickupPoints3x.76c12c04.png"
            width={168}
            height={168}
          />
        </div>
        <div className={`${styles.box} ${styles.pink}`}>
          <p style={{ fontWeight: "650" }}>Доставка в любую точку Беларуси</p>
          <p style={{ fontSize: "15px", marginTop: "5px" }}>
            Заказывайте товары прямо к себе домой
          </p>

          <img
            src="https://static.21vek.by/desktop/_next/static/images/delivery3x.f7100d09.png"
            width={168}
            height={168}
          />
        </div>
        <div className={`${styles.box} ${styles.blue}`}>
          <p style={{ fontWeight: "650" }}>Оплата частями</p>
          <p style={{ fontSize: "15px", marginTop: "5px" }}>
            Покупайте больше сейчас – платите частями
          </p>

          <img
            src="https://static.21vek.by/desktop/_next/static/images/installmentPayment3x.ae6544a2.png"
            width={168}
            height={168}
          />
        </div>
        <div className={`${styles.box} ${styles.green}`}>
          <p style={{ fontWeight: "650" }}>Бонусная программа</p>
          <p style={{ fontSize: "15px", marginTop: "5px" }}>
            Накапливайте бонусные баллы и оплачивайте ими покупки
          </p>

          <img
            src="https://static.21vek.by/desktop/_next/static/images/bonusProgram3x.018082c4.png"
            width={168}
            height={168}
          />
        </div>
        <div className={`${styles.box} ${styles.violet}`}>
          <p style={{ fontWeight: "650" }}>Подарочные сертификаты</p>
          <p style={{ fontSize: "15px", marginTop: "5px" }}>
            Подарите сертификаты вашим близким
          </p>

          <img
            src="https://static.21vek.by/desktop/_next/static/images/giftCertificates3x.b62a541c.png"
            width={168}
            height={168}
          />
        </div>
      </div>
    </div>
  );
};
export default Offers;
