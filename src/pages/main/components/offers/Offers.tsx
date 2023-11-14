import styles from "./offers.module.scss";

const Offers = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Предложения</h1>
      <div className={styles.box_inner}>
        <div className={`${styles.box} ${styles.orange}`}>
          <p className={styles.fontWeight}>Более 90 пунктов самовывоза</p>
          <p className={styles.text}>
            Получите заказ в кратчайшие сроки
          </p>

          <img
            src="https://static.21vek.by/desktop/_next/static/images/pickupPoints3x.76c12c04.png"
            width={168}
            height={168}
          />
        </div>
        <div className={`${styles.box} ${styles.pink}`}>
          <p className={styles.fontWeight}>Доставка в любую точку Беларуси</p>
          <p className={styles.text}>
            Заказывайте товары прямо к себе домой
          </p>

          <img
            src="https://static.21vek.by/desktop/_next/static/images/delivery3x.f7100d09.png"
            width={168}
            height={168}
          />
        </div>
        <div className={`${styles.box} ${styles.blue}`}>
          <p className={styles.fontWeight}>Оплата частями</p>
          <p className={styles.text}>
            Покупайте больше сейчас – платите частями
          </p>

          <img
            src="https://static.21vek.by/desktop/_next/static/images/installmentPayment3x.ae6544a2.png"
            width={168}
            height={168}
          />
        </div>
        <div className={`${styles.box} ${styles.green}`}>
          <p className={styles.fontWeight}>Бонусная программа</p>
          <p className={styles.text}>
            Накапливайте бонусные баллы и оплачивайте ими покупки
          </p>

          <img
            src="https://static.21vek.by/desktop/_next/static/images/bonusProgram3x.018082c4.png"
            width={168}
            height={168}
          />
        </div>
        <div className={`${styles.box} ${styles.violet}`}>
          <p className={styles.fontWeight}>Подарочные сертификаты</p>
          <p className={styles.text}>
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
