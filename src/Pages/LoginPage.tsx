import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBuildings } from "@tabler/icons-react";
import React, { useState } from "react";
import { loginUser } from "../Service/UserService";
import {
  errorNotification,
  successNotification,
} from "../Utility/NotificationUtil";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setJwt } from "../Slices/JwtSlice";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      //checking the email and password
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value: string) => (!value ? "Password is required" : null),
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);
    loginUser(values)
      .then((_data) => {
        console.log("✅ Response from backend:", _data);

        const token = _data?.accessToken;
        const user = _data?.user;

        if (!token) throw new Error("No accessToken found in response");
        if (!user) throw new Error("No user data found in response");

        successNotification("Login successfully.");

        // Lưu token và user vào Redux
        dispatch(setJwt(token));
        dispatch(setUser(user));

        console.log("✅ User info:", user);
        console.log("✅ Token:", token);
      })
      .catch((error) => {
        errorNotification(error?.response?.data?.errorMessage);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div
      style={{ background: 'url("/background2.jpg")' }}
      className="w-screen h-screen !bg-cover !bg-center !bg-no-repeat flex items-center justify-end" //important(!)
    >
      <div className="w-[450px] px-8 py-5 mr-10 backdrop-blur-xl bg-zinc-600/20 rounded-xl">
        <div className="flex items-end text-cyan-300 gap-1">
          <IconBuildings size={30} stroke={1.5} />
          <h1 className="font-bold text-xl">LMS</h1>
        </div>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="self-center font-extrabold text-3xl text-zinc-300">
            Login
          </div>
          <TextInput
            variant="filled"
            size="md"
            label="Email"
            styles={{
              label: {
                color: "white",
                fontWeight: 400,
              },
            }}
            withAsterisk
            placeholder="Enter the email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            variant="filled"
            size="md"
            label="Password"
            styles={{
              label: {
                color: "white",
                fontWeight: 400,
              },
            }}
            withAsterisk
            placeholder="Enter the password"
            {...form.getInputProps("password")}
          />
          <Button
            styles={{ root: { width: 100 } }}
            loading={loading}
            radius="md"
            size="md"
            type="submit"
            color="teal"
            className="self-center mt-2"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
