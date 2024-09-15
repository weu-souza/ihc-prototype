import { IProducts } from "@/service/api/Model/Products.model";
import { createContext, ReactNode, useState } from "react";
import {products} from "@/json/db.json"

type context = {
getSearch: (search:string) => void;
filteredProducts:IProducts[];

}
type contextProps ={
    children:ReactNode;
}

export const GlobalContext = createContext<context |null>(null);


export const GlobalStorage = ({children}:contextProps) =>{

    const [search,setSearch] = useState<string>("")

    const getSearch = (n:string) =>{
        setSearch(n)
    }
    const filteredProducts = search === '' ? products : products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));

return(
<GlobalContext.Provider value={{getSearch:getSearch,filteredProducts:filteredProducts}}>
{children}
</GlobalContext.Provider>
)
}