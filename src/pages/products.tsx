import { Button } from "@/components/ui/button";
import React from "react";

interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductsPageProps {
  products: Products[];
  error?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, error }) => {
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="flex flex-wrap gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden w-64 "
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-lg font-medium text-teal-500">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <Button className="mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700 text-white">
        Load More...
      </Button> */}
    </div>
  );
};

export default ProductsPage;

export const getServerSideProps = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Products Not Found!");
    }
    const result = await response.json();
    return { props: { products: result.products } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [], error: "Failed to fetch products" } };
  }
};
