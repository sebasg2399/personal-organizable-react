// import { Button } from "../../components"

import { Button, Form } from "../../components";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineKey } from "react-icons/hi";
import { useContext } from "react";
import { UserContext } from "../../context";
import { apifetch } from "../../services/apifetch";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../layouts/";


export const Login = () => {
  const { setUser } = useContext(UserContext);
  return (
    <AuthLayout>
      <header>
        <h2>{"{ organizable }"}</h2>
        <h1>Login</h1>
      </header>
      
      <Form
        onSubmit={(inputs) => {
          apifetch
            .post("/login", inputs)
            .then(({ data }) => {
              setUser(data);
              sessionStorage.setItem("user", JSON.stringify(data));
              window.location.replace("/myboards");
            })
            .catch((e) => console.log(e.message));
        }}
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
        <Button type="submit" text="Login" button_style="secondary" />
      </Form>
      <footer>
        <Link to="/register">Create Account</Link>
      </footer>
    </AuthLayout>
  );
};
