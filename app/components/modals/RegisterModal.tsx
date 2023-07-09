"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import {signIn} from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsloading] = useState(false);
  const loginModal = useLoginModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
        toast.success("Success");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  const toggle = useCallback(()=>{
    loginModal.onOpen();
    registerModal.onClose();

},[registerModal,loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subTitle="Register your account"
        center
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with google" onClick={() => {signIn("google")}} />
      <Button outline label="Continue with Github" onClick={() => {signIn("github")}} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items justify-center center gap-2">
          <p>
            Already have an account?{" "}
            <span onClick={toggle} className="text-rose-500 cursor-pointer hover:underline">
              Log in!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
