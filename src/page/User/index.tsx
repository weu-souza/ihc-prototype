import PerfilForm from "@/components/Perfil";

export function User() {
  return (
    <main>
      <div className="border-b border-cor-9F9F9F flex flex-col h-[70px]  items-center justify-center">
      <h1 className="font-Poppins text-xl  font-bold text-[#333]">Perfil</h1>
    </div>
      <div className="py-10">
        <PerfilForm/>
      </div>
    </main>
  );
}