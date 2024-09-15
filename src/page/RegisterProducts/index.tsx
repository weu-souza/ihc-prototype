import { ProductForm } from "@/components/RegisterProduct";

export function RegisterProducts() {
  return (
    <div className="flex flex-col  justify-between ">
      <div className="border-b border-cor-9F9F9F flex flex-col h-[70px]  items-center justify-center">
      <h1 className="font-Poppins text-xl  font-bold text-[#333]">Registrar produto</h1>
    </div>
      <div className="flex flex-col gap-16 max-w-screen-xl mx-auto py-10">
        <ProductForm />
      </div>
    </div>
  );
}