
import LoginForm from "@/components/Login"

const Login = () => {
  return (
    <div className="flex flex-col gap-10 justify-between mt-32">
      <div className="flex flex-col gap-16 max-w-screen-xl mx-auto">
        <div className="mx-auto">
          <img src="" alt="Logo" />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
