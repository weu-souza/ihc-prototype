import Cart from "@/components/productsBag";
import { ICart } from "@/service/api/Model/Products.model";
import { DeleteCart, GetCart, LimparCart } from "@/service/cart/cart";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export function ProductsBag() {
  const [itensCarrinho, setItensCarrinho] = useState<ICart[]>([]);
  const [totalCart, setTotalCart] = useState(0);
  const navigate = useNavigate();

  const exibeCart = () => {
    const itens = GetCart();
    setItensCarrinho(itens);
  };
  useEffect(() => {
    exibeCart();
  }, []);

  const calculaTotal = useCallback(() => {
    return Number(
      itensCarrinho
        .reduce((prev, curr) => prev + curr.normalPrice * curr.quantity, 0)
        .toFixed(2)
    );
  }, [itensCarrinho]);

  useEffect(() => {
    const total = calculaTotal();
    setTotalCart(total);
  }, [itensCarrinho, calculaTotal]);

  const deleteCart = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    DeleteCart(id);
    exibeCart();
    calculaTotal();
  };

  const handleIncrease = (id: number) => {
    const updatedItems = itensCarrinho.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItensCarrinho(updatedItems);
    localStorage.setItem("carrinho", JSON.stringify(updatedItems));
  };

  const handleDecrease = (id: number) => {
    const updatedItems = itensCarrinho.map((item) =>
      item.id === id && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItensCarrinho(updatedItems);
    localStorage.setItem("carrinho", JSON.stringify(updatedItems));
  };
  const notify = () => toast.success("Comprado com sucesso!");
  const handleClick = () => {
    LimparCart();
    notify();
    navigate("/");
  };

  return (
    <main>
      <div className="border-b border-cor-9F9F9F flex flex-col h-[70px]   items-center justify-center">
        <h1 className="font-Poppins text-xl  font-bold text-[#333]">
          Carrinho
        </h1>
      </div>
      <div className=" flex flex-col justify-center lg:w-[1500px] mx-auto pt-20  ">
        {itensCarrinho.length > 0?(
          <div className="overflow-y-auto flex flex-col gap-5 h-[500px]">
          {itensCarrinho.map((cart) => (
            <Cart
              key={cart.id}
              quantidade={cart.quantity}
              cart={cart}
              deleteCart={deleteCart}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />
          ))}
        </div>):(
        <div>
          
          <img src="/public/images/undraw_empty_cart_co35.svg" className=" mx-auto " alt="" />
        </div>
      )
      }
        
        <div className="flex flex-col mx-auto md:mx-0 md:flex-row items-center md:justify-between">
          <p className="font-Poppins text-xl font-bold text-[#333]">
            Total: R$ {totalCart}
          </p>
          <button
            onClick={handleClick}
            disabled={itensCarrinho.length < 1}
            className="bg-black  py-4 px-20 self-end rounded-md text-white font-Poppins font-medium text-md my-5"
          >
            Comprar
          </button>
        </div>
      </div>
    </main>
  );
}
