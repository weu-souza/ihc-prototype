
import { createBrowserRouter } from "react-router-dom";
import { ProductsBag } from "@/page/ProductsBag";
import { ProductsFeed } from "@/page/ProductsFeed";
import { RegisterProducts } from "@/page/RegisterProducts";
import { User } from "@/page/User";
import Login from "@/page/Login";
import Register from "@/page/Register";
import { App } from "@/App";
import ProtectedRoutes from "./protectedRoutes";
import { GlobalStorage } from "@/context/Search.context";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <GlobalStorage><ProductsFeed /></GlobalStorage>,
        },
        {
          path: "product-bag",
          element: <ProtectedRoutes/>,
          children:[{path:"",element:<ProductsBag/>}]
        },
        {
          path: "register-product",
          element: <ProtectedRoutes/>,
          children:[{path:"", element:<RegisterProducts/>}]
        },
        {
          path: "user",
          element: <ProtectedRoutes/>,
          children:[{path:"",element:<User/>}]
        },
       
      ],
     
    }, {
      path: "/login",
      element: <Login />,
    }
    , {
      path: "/register",
      element: <Register />,
    }
  ]);