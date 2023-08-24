import Layout from "@/components/layout";
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
      <form onSubmit={createProduct}>
        <h1>New products</h1>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Product description</label>
        <textarea
          placeholder="Product description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Price in USD</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button className="btn-primary">Save</button>
      </form>
    </Layout>
  );
}
