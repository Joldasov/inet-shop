import {
  ClockCircleOutlined,
  CommentOutlined,
  DownOutlined,
  EnvironmentOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import styles from "./headerStyle.module.scss";

const items: MenuProps["items"] = [
  {
    label: (
      <p>
        {" "}
        <span className={styles.telegramSpan}>:)</span>+375 25 502 10 21
      </p>
    ),
    key: "1",
  },
  {
    label: (
      <p>
        <span className={styles.telegramSpan}>
          <MobileOutlined />
        </span>
        +375 25 502 10 21
      </p>
    ),
    key: "2",
  },
  {
    label: (
      <p>
        <span className={styles.telegramSpan}>
          <i className="fa-brands fa-telegram"></i>
        </span>
        Telegram
      </p>
    ),
    key: "3",
  },
  {
    label: (
      <p>
        <span className={styles.telegramSpan}>
          <i className="fa-solid fa-envelope"></i>
        </span>
        Почта
      </p>
    ),
    key: "4",
  },
  {
    label: (
      <p>
        <span className={styles.telegramSpan}>
          <i className="fa-solid fa-phone"></i>
        </span>
        Заказный звонок
      </p>
    ),
    key: "5",
  },
  {
    label: (
      <p>
        <span className={styles.telegramSpan}>
          <CommentOutlined />
        </span>
        Написать нам
      </p>
    ),
    key: "6",
  },
  {
    type: "divider",
  },
  {
    label: "Контакты",
    key: "7",
  },
];

const Header = () => {
  return (
    <div className={styles.header}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className={styles.headerBox}>
        <div>
          <EnvironmentOutlined />
          <span>г.Минск</span>
        </div>
        <div className={styles.items}>
          <p>Оплата частями</p>
          <p>Бонусная программа</p>
          <div className={styles.divider}></div>
          <div className={styles.vibers}>
            <i className={`fa-brands fa-viber ${styles.viberColorPurple}`}></i>
            <span className={styles.viber}>Viber</span>
            <i className={`fa-solid fa-a ${styles.viberColorRed}`}></i>
            <span className={styles.A}>+375 29 302 10 21</span>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              className={styles.dropdown}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Ещё
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.timer}>
            <ClockCircleOutlined />
            <p className={styles.contactCenter}>
              контакт-центр <br /> с 8:00 до 22:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
