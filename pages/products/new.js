import Layout from "@/components/layout";
import ProductForm from "@/components/productForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProducts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  const createProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data).then(router.push("/products"));
  };
  return (
    <Layout>
      <h1>New products</h1>
      <ProductForm />
    </Layout>
  );
}
