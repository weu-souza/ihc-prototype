import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "@/service/api/Model/User.model";
import { FaGoogle } from "react-icons/fa";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/service/firebase/firebase.config"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const [signInWithGoogle, userEmail] =
    useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, userGoogle] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const onSubmit: SubmitHandler<ILogin> = (data, e) => {
    e?.preventDefault();
    signInWithEmailAndPassword(data.email, data.password);
  };

  const handleLoginGoogle = () => {
    signInWithGoogle();

  };
  useEffect(()=>{
    if (userGoogle || userEmail) {
      navigate('/');
    }
  },[userGoogle,userEmail])
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-[350px] md:w-[400px] lg:w-[650px] shadow-2xl shadow-cor-shadow py-10 px-5 md:px-20 rounded-xl"
      >
        <label className="label flex flex-col gap-2">
          Email address
          <input
            className="input"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
            placeholder="Abc@def.com"
          />
        </label>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label className="label flex flex-col gap-2">
          Password
          <input
            className="input" type="password"
            {...register("password", { required: true })}
            placeholder="password"
          />
        </label>
        {errors.password && (
          <span className="text-red-500">This field is required</span>
        )}
        <div className="flex flex-col gap-4 justify-between">
          <p className=" flex gap-2 font-Poppins font-normal text-base self-end">não tem uma conta? <Link to={"/register"} className="text-cor-9F9F9F"> Clique aqui </Link></p>
          <input
            type="submit"
            value={"Login"}
            className="py-3 px-20 bg-black rounded-lg font-Poppins font-normal text-base text-white  cursor-pointer"
          />
          <p className="mx-auto font-Poppins font-bold text-base ">ou</p>
          <button
            type="button"
            className=" flex gap-2 justify-center bg-red-600 py-3 px-10  rounded-lg font-Poppins font-normal text-base text-white"
            onClick={handleLoginGoogle}
          >
            <FaGoogle className="text-xl "/> <span>Google</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;