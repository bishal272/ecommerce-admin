import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function deleteProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  const goBack = () => {
    router.push("/products");
  };
  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);
    goBack();
  };
  //&nbsp; ->no breaking space
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete product&nbsp;"{productInfo?.title}"?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button onClick={goBack} className="btn-default">
          No
        </button>
      </div>
    </Layout>
  );
}
