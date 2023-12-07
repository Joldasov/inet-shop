import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useLogin, useRegister } from "../../services/mutations";
import styles from "./accaunt.module.scss";
interface Iactive {
  active: boolean;
  setActive: (boolean: boolean) => void;
}
const Accaunt = ({ active, setActive }: Iactive) => {
  const [registerActive, setRegisterActive] = useState<boolean>(false);
  const uselogin = useLogin();
  const useregister = useRegister();

  const onTurnigFalse = () => {
    setActive(false);
    setRegisterActive(false);
  };
  const onStopPropaganation = (e) => {
    e.stopPropagation();
  };

  const onActiveRegister = () => {
    setRegisterActive(true);
  };

  const onCompleteRegister = (values: {
    name: string;
    surname: string;
    login: string;
    password: string;
  }) => {
    useregister.mutate({
      name: values.name,
      surname: values.surname,
      login: values.login,
      password: values.password,
    });
    if (useregister.isSuccess) {
      setActive(false);
      setRegisterActive(false);
    }
  };

  const onFinish = (values: { login: string; password: string }) => {
    if (values.login && values.password) {
      uselogin.mutate({
        login: values.login,
        password: values.password,
      });
    }
    if (uselogin.isSuccess) {
      setActive(false);
    } else {
      if (!uselogin.isError) {
        alert("Непрваильный пароль или логин");
      }
    }
  };

  return (
    <div
      className={active ? `${styles.active} ${styles.modal}` : styles.modal}
      onClick={onTurnigFalse}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => onStopPropaganation(e)}
      >
        {registerActive ? (
          <div>
            <div className={` ${styles.positioning}`}>
              <h1 className={styles.registerText}>Регистрация</h1>
              <Form onFinish={onCompleteRegister}>
                <Form.Item
                  name="name"
                  label="Имя"
                  rules={[{ required: true, message: "Обязательно" }]}
                >
                  <Input type="text" />
                </Form.Item>

                <Form.Item
                  name="surname"
                  label="Фамилия"
                  rules={[{ required: true, message: "Обязательно" }]}
                >
                  <Input type="text" />
                </Form.Item>

                <Form.Item
                  name="login"
                  label="Логин"
                  rules={[{ required: true, message: "Обязательно" }]}
                >
                  <Input width={350} />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Пароль"
                  rules={[{ required: true, message: "Обязательно" }]}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <div className={styles.btn}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={useregister.isLoading}
                    >
                      Регистрация
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Вход</h1>
            <Form onFinish={onFinish}>
              <Form.Item
                name="login"
                rules={[{ required: true, message: "Обязательно" }]}
                label="Логин"
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Обязательно" }]}
                label="Пароль"
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item>
                <div className={styles.btn}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={uselogin.isLoading}
                  >
                    Войти
                  </Button>
                </div>
              </Form.Item>
              <div className={styles.text}>
                <p className={styles.register} onClick={onActiveRegister}>
                  Регистрация
                </p>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};
export default Accaunt;
