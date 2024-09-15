import { GlobalContext } from "@/context/Search.context"
import {products} from "@/json/db.json"
import { ICart, IProducts } from "@/service/api/Model/Products.model"
import { AddCart } from "@/service/cart/cart"
import { useContext, useState } from "react"

type cardProps ={
    products:IProducts
}
const Card = ({products}:cardProps) =>{

    const handleAddCart = (
        products: IProducts,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        e.stopPropagation();
        const produto: ICart = {
          ...products,
          quantity: 1,
        };
        AddCart(produto);
      };

    return(
        <section className="w-[200px] flex flex-col gap-6">
        <img src={products.images.mainImage} className="w-52 rounded-sm" alt={products.title} />
        <div className="flex flex-col gap-4">
        <h3 className="font-Poppins  text-[#333] font-semibold text-lg">{products.title} </h3>
        <div className="cart-scrool p-2">
        <p className="font-Poppins text-base text-[#737373] font-normal">{products.description.short}</p>
        </div>
        <p className="font-Poppins text-sm text-[#333] font-semibold">R$ {products.normalPrice}</p>
        </div>
        <button onClick={(e)=>handleAddCart(products,e)} className="font-Poppins text-base font-semibold text-[#737373] bg-white border border-cor-9F9F9F px-6 py-4">add to cart</button>
    </section>
    )
}

const ProductsCard = () => {
  const [visibleProducts, setVisibleProducts] = useState(10);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 10);
  };
const productsContext = useContext(GlobalContext)
  return (
    <main className="max-w-screen-xl mx-auto my-10 flex flex-wrap justify-center gap-10">
        {productsContext?.filteredProducts.slice(0,visibleProducts).map((prod) =>(
            <Card key={prod.id} products={prod}/>
        ))}

        <div className="flex  justify-center w-full">
        {visibleProducts < products.length && (
        <button
          onClick={loadMoreProducts}
          className=" py-4 px-32 mx-auto text-[#333] border border-cor-9F9F9F font-Poppins font-bold rounded-lg"
        >
          Ver Mais
        </button>
      )}
        </div>
    </main>
  )
}

export default ProductsCard
