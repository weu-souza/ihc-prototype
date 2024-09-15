import { RegisterForm } from "@/components/Register";

const Register = () => {
  return(
    <div className="flex flex-col gap-10 justify-between mt-10 pb-10">
      <div className="flex flex-col gap-16 max-w-screen-xl mx-auto">
      <div className="mx-auto">
      <img src="" alt="logo" />
      </div>
      <RegisterForm />
    </div>
    </div>
  )
};

export default Register;