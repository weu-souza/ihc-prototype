import { GlobalContext } from "@/context/Search.context";
import { useContext } from "react";
const Search = () => {
  const searchProd = useContext(GlobalContext)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
   e.preventDefault() 
  }

const handleChange= (e:React.ChangeEvent<HTMLInputElement>) =>{
  searchProd?.getSearch(e.target.value) 
}

  return (
    <form onSubmit={handleSubmit}>
      <label className="">
        
        <input
          type="text"
          className="outline-none border bg-[#f7f1f1] flex gap-3 p-2 rounded-lg  lg:w-[500px] font-Poppins text-cor-9F9F9F "
          placeholder="Busque o seu produto..."
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

export default Search;
