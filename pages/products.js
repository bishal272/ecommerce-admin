import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <Layout>
      <Link href={"/products/new"} className="bg-blue-900 text-white py-1 px-2 rounded-md">
        Add new products
      </Link>
      <table>
        <thead>
          <tr>
            <td>Product Name</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.title}</td>
              <td>button</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
