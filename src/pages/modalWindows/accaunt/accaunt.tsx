import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { addLogin, addPassword } from "../../../store/slice/Login";
import {
  addRegisterLogin,
  addRegisterName,
  addRegisterPassword,
  addRegisterSurname,
} from "../../../store/slice/Register";
import { fetchLogin } from "../../../store/thunk/LoginThunk";
import { fetchRegister } from "../../../store/thunk/RegisterThunk";
import { useAppDispatch, useAppSelector } from "../../../utils/helpers/Helpers";
import styles from "./accaunt.module.scss";
interface Iactive {
  active: boolean;
  setActive: (boolean: boolean) => void;
}
const Accaunt = ({ active, setActive }: Iactive) => {
  const dispatch = useAppDispatch();
  const login = useAppSelector((state) => state.login.login);
  const password = useAppSelector((state) => state.login.password);
  const [registerActive, setRegisterActive] = useState<boolean>(false);
  const [notFilled, setNotFilled] = useState(false);
  const name = useAppSelector((state) => state.register.name);
  const surname = useAppSelector((state) => state.register.surname);
  const registerLogin = useAppSelector((state) => state.register.login);
  const registerPassword = useAppSelector((state) => state.register.password);
  const [partTimeValueLogin, setPartTimeValueLogin] = useState<string>("");
  const [partTimeValuePassword, setPartTimeValuePassword] =
    useState<string>("");
  const fulfilled = useAppSelector((state) => state.login.status);

  const handleBtn = () => {
    if (login.length > 0 && password.length > 0) {
      setNotFilled(false);
      dispatch(fetchLogin({ login, password }));
    } else {
      setNotFilled(true);
    }
  };

  useEffect(() => {
    if (fulfilled) {
      setActive(false);
      setRegisterActive(false);
      setPartTimeValueLogin("");
      setPartTimeValuePassword("");
    }
  }, [fulfilled]);

  return (
    <div
      className={active ? `${styles.active} ${styles.modal}` : styles.modal}
      onClick={() => {
        setActive(false);
        setNotFilled(false);
        setRegisterActive(false);
        setPartTimeValueLogin("");
        setPartTimeValuePassword("");
      }}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {registerActive ? (
          <div>
            <div className={` ${styles.positioning}`}>
              <h1 className={styles.registerText}>Регистрация</h1>
              <Form>
                <Form.Item  name="name">
                  <div className={styles.labels}>
                    <label>Имя</label>
                  </div>
                  <Input
                    className={styles.input}
                    onChange={(e) => dispatch(addRegisterName(e.target.value))}
                  />
                </Form.Item>

                <Form.Item name="surname">
                  <div className={styles.labels}>
                    <label>Фамилия</label>
                  </div>
                  <Input
                    className={styles.input}
                    onChange={(e) =>
                      dispatch(addRegisterSurname(e.target.value))
                    }
                  />
                </Form.Item>
                <Form.Item  name="login">
                  <div className={styles.labels}>
                    <label>Логин</label>
                  </div>
                  <Input
                    className={styles.input}
                    onChange={(e) => dispatch(addRegisterLogin(e.target.value))}
                  />
                </Form.Item>
                <Form.Item  name="password">
                  <div className={styles.labels}>
                    <label>Пароль</label>
                  </div>
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className={styles.input}
                    onChange={(e) =>
                      dispatch(addRegisterPassword(e.target.value))
                    }
                  />
                </Form.Item>
              </Form>
            </div>
            <div className={styles.btn}>
              <button
                className={styles.registerBtn}
                onClick={() => {
                  dispatch(
                    fetchRegister({
                      name,
                      surname,
                      registerLogin,
                      registerPassword,
                    })
                  );
                  setActive(false);
                  setRegisterActive(false);
                  setNotFilled(false);
                }}
              >
                Click
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Вход</h1>
            <div className={`${styles.email} ${styles.positioning}`}>
              <label className={notFilled ? styles.notFilled : styles.labels}>
                {notFilled ? "Введите Логин " : "Логин"}
              </label>
              <input
                type="text"
                className={styles.input}
                onChange={(e) => {
                  dispatch(addLogin(e.target.value));
                  setPartTimeValueLogin(e.target.value);
                }}
                value={partTimeValueLogin}
              />
            </div>
            <div className={`${styles.password} ${styles.positioning}`}>
              <div className={styles.labels}>
                <label className={notFilled ? styles.notFilled : ""}>
                  {notFilled ? "Введите пароль" : " Пароль"}
                </label>
                <label className={styles.forget}>Забыли пароль</label>
              </div>
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className={styles.input}
                onChange={(e) => {
                  dispatch(addPassword(e.target.value));
                  setPartTimeValuePassword(e.target.value);
                }}
                value={partTimeValuePassword}
              />
            </div>
            <div className={styles.btn}>
              <button
                className={styles.entranceBtn}
                onClick={() => {
                  handleBtn();
                }}
              >
                Войти
              </button>
            </div>
            <div className={styles.text}>
              <p
                className={styles.register}
                onClick={() => {
                  setRegisterActive(true);
                  setPartTimeValueLogin("");
                  setPartTimeValuePassword("");
                }}
              >
                Регистрация
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Accaunt;
