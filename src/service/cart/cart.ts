import { ICart } from "../api/Model/Products.model";

let itens: ICart[] = [];

export const AddCart = (produto: ICart) => {
 const itens: ICart[] = JSON.parse(localStorage.getItem("carrinho") || "[]");
 const produtoExistenteIndex = itens.findIndex(item => item.id === produto.id);

 if (produtoExistenteIndex !== -1) {
   itens[produtoExistenteIndex].quantity += produto.quantity;
 } else {
   itens.push(produto);
 }

 localStorage.setItem("carrinho", JSON.stringify(itens));
};


export const GetCart = () => {
  itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
  return itens;
};


export const DeleteCart = (produtoID: number) => {
  let itens: ICart[] = JSON.parse(localStorage.getItem("carrinho") || "[]");
  itens = itens.filter((item) => item.id !== produtoID);
  localStorage.setItem("carrinho", JSON.stringify(itens));
  return itens
};

export const LimparCart = () => {
  itens = [];
  localStorage.clear();
}