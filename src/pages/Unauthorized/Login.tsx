// import { Button } from "../../components"

import { Form } from "../../components";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineKey } from "react-icons/hi";
import { useContext } from "react";
import { UserContext } from "../../context";
import { apifetch } from "../../services/apifetch";

export const Login = () => {
  const { setUser } = useContext(UserContext);
  return (
    <Form
      onSubmit={(inputs) => {
        apifetch
          .post("/login", inputs)
          .then(({ data }) => {
            setUser(data)
            sessionStorage.setItem("user", JSON.stringify(data))
            window.location.replace("/myboards")
          })
          .catch((e) => console.log(e.message));
      }}
      to="/register"
      subject="Login"
    >
      <Form.Input
        label="username"
        placeholder="username"
        name="username"
        icon={<BiUserCircle />}
      />
      <Form.Input
        label="password"
        placeholder="******"
        name="password"
        icon={<HiOutlineKey />}
        type="password"
      />
    </Form>
  );
};
