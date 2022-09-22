import styled from "@emotion/styled";
import { BiUserCircle } from "react-icons/bi";
import { Button, Form, Sidebar } from "../../components";
import { AppLayout, MainLayout } from "../../layouts";
import { useContext, useState } from "react";
import { UserContext } from "../../context";
import { apifetch } from "../../services/apifetch";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const handleSubmit = async (inputs: {}) => {
    console.log(user?.token);
    console.log(inputs);
    if (user) {
      apifetch
        .patch(`/users/${user.id}`, inputs, {
          headers: {
            Authorization: `Token token=${user.token}`,
          },
        })
        .then(({ data }) => {
          console.log(data);
          setUser(data);
          sessionStorage.setItem("user", JSON.stringify(data));
        })
        .catch((e) => console.log(e.message));
    }
  };
  return (
    <AppLayout>
      <Sidebar />
      <MainLayout title="My Profile">
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="username"
              placeholder="username"
              name="username"
              defaultValue={user?.username}
              icon={<BiUserCircle />}
            />
            <Form.Input
              label="email"
              placeholder="email"
              type="email"
              name="email"
              defaultValue={user?.email}
              icon={<BiUserCircle />}
            />
            <Form.Input
              label="first name"
              placeholder="firstname"
              name="first_name"
              defaultValue={user?.firstName}
              icon={<BiUserCircle />}
            />
            <Form.Input
              label="last name"
              placeholder="lastname"
              name="last_name"
              defaultValue={user?.lastName}
              icon={<BiUserCircle />}
            />
            <Button
              type="submit"
              text="UPDATE PROFILE"
              button_style="primary"
            />
            <Button text="DELETE ACCOUNT" button_style="secondary" />
          </Form>
        </FormWrapper>
      </MainLayout>
    </AppLayout>
  );
};
