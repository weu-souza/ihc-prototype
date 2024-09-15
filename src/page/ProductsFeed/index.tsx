import ProductsCard from "@/components/Feed/ProductsCard";
import Search from "@/components/Feed/Search";

export function ProductsFeed() {
  return (
    <main>
    <div className="border-b border-cor-9F9F9F flex flex-col h-[70px]  items-center justify-center">
      <Search/>
    </div>
    <div>
      <ProductsCard/>
    </div>
    </main>
  );
}