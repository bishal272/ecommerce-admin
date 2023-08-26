import Layout from "@/components/layout";
import ProductForm from "@/components/productForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function editProduct() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    axios.get("/api/products?id=" + id).then((Response) => {
      setProductInfo(Response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
