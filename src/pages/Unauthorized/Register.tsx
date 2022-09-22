import { Form } from "../../components/form/Form";
import { BiUserCircle } from "react-icons/bi";
import { apifetch } from "../../services/apifetch";
import { useContext } from "react";
import { UserContext } from "../../context";
import { AuthLayout } from "../../layouts/";
import { Link } from "react-router-dom";
import { Button } from "../../components";
export const Register = () => {
  const { setUser } = useContext(UserContext);
  return (
    <AuthLayout>
      <header>
        <h2>{"{ organizable }"}</h2>
        <h1>Create Account</h1>
      </header>
      <Form
        onSubmit={(inputs) => {
          apifetch
            .post("/users", inputs)
            .then(({ data }) => setUser(data))
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
          label="email"
          placeholder="email"
          type="email"
          name="email"
          icon={<BiUserCircle />}
        />
        <Form.Input
          label="first name"
          placeholder="firstname"
          name="first_name"
          icon={<BiUserCircle />}
        />
        <Form.Input
          label="last name"
          placeholder="lastname"
          name="last_name"
          icon={<BiUserCircle />}
        />
        <Form.Input
          label="password"
          placeholder="******"
          name="password"
          type="password"
          icon={<BiUserCircle />}
        />
        <Button type="submit" text="Create Account" button_style="secondary" />
      </Form>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </AuthLayout>
  );
};
