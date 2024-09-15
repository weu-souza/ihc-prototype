import { ICart } from "@/service/api/Model/Products.model";

type cartType = {
  cart: ICart;
  deleteCart: (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  quantidade: number;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
};

const Cart = ({
  cart,
  deleteCart,
  quantidade,
  onIncrease,
  onDecrease,
}: cartType) => {
 

  return (
    <div className="flex w-ful gap-5 p-5  items-center border-b-2 ">
      <div className="w-[105px] h-[105px] col-span-1">
        <img
          src={cart.images.mainImage}
          alt="img"
          className=" w-full rounded-xl object-cover "
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 w-full items-center gap-5">
        <h1 className="font-Poppins font-normal text-base text-cor-9F9F9F   md:col-span-1 ">
          {cart.title}
        </h1>
        <p className="font-Poppins font-normal text-base text-cor-9F9F9F ">
          R$. {cart.normalPrice}
        </p>
        <div className="flex border border-cor-9F9F9F px-1 w-[120px] py-1 h-12 rounded-xl gap-4 items-cente ">
          <button
            onClick={() => onDecrease(cart.id)}
            className="font-Poppins font-normal text-base text-black p-2"
          >
            -
          </button>
          <p className="font-Poppins font-normal text-base text-black p-2">
            {quantidade}
          </p>
          <button
            onClick={() => onIncrease(cart.id)}
            className="font-Poppins font-normal text-base text-black p-2"
          >
            +
          </button>
        </div>
        <button
          className=" border-2 border-cor-9F9F9F text-cor-9F9F9F font-Poppins font-bold px-2 py-3 rounded-lg"
          onClick={(e) => deleteCart(cart.id, e)}
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default Cart;
