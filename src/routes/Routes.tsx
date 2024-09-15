import { createHashRouter } from "react-router-dom";
import { ProductsBag } from "@/page/ProductsBag";
import { ProductsFeed } from "@/page/ProductsFeed";
import { RegisterProducts } from "@/page/RegisterProducts";
import { User } from "@/page/User";
import Login from "@/page/Login";
import Register from "@/page/Register";
import { App } from "@/App";
import ProtectedRoutes from "./protectedRoutes";
import { GlobalStorage } from "@/context/Search.context";


export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <GlobalStorage>
            <ProductsFeed />
          </GlobalStorage>
        ),
      },
      {
        path: "product-bag",
        element: <ProtectedRoutes />,
        children: [{ path: "", element: <ProductsBag /> }],
      },
      {
        path: "register-product",
        element: <ProtectedRoutes />,
        children: [{ path: "", element: <RegisterProducts /> }],
      },
      {
        path: "user",
        element: <ProtectedRoutes />,
        children: [{ path: "", element: <User /> }],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
//se for usar o createBrowserRouter precisa disso para funcionar o deploy no github pages porem quando atualiza da erro de
// 404, porem com o hashrouter não tem esse problema e não precisa tambem do basename
// no package.json tem que estar assim se for browser router =  "homepage": "https://seu-nome-github.github.io/" e ter o {basename:"/repositorio-nome/"} nas rotas
// com o createHashRouter tem que ta assim  "homepage": "https://seu-nome-github.github.io/repositorio-nome" e sem o basename no hashRouter