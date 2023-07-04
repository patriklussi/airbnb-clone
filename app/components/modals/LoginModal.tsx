"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal"
import {signIn} from "next-auth/react"
import { toast } from "react-hot-toast";
import {useRouter} from "next/navigation"
const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    signIn("credentials",{...data,redirect:false}).then((response) => {
      setIsloading(false);
      if(response?.ok){
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }
      if(response?.error){
        toast.error(response.error);
      }
    })
  };
  const toggle = useCallback(()=>{
      loginModal.onClose();
      registerModal.onOpen();

  },[registerModal,loginModal])
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subTitle="Log in to your account"
        center
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
      <Button outline label="Continue with Github" onClick={() => {signIn()}} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items justify-center center gap-2">
          <p>
            First time using AirBnb?{" "}
            <span onClick={toggle} className="text-rose-500 cursor-pointer hover:underline">
              Create an account?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Log in"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
