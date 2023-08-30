import axios from "axios";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { BounceLoader } from "react-spinners";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDesc,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDesc || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setcategory] = useState(assignedCategory || "");
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);
  const saveProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price, images, category };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };
  if (goToProducts) {
    router.push("/products");
  }
  const uploadImages = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  };
  function updateImagesOrder(images) {
    setImages(images);
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(ev) => setcategory(ev.target.value)}>
        <option value={new mongoose.Types.ObjectId("41224d776a326fb40f000001")}>
          Uncategorized
        </option>
        {categories.length > 0 && categories.map((c) => <option value={c._id}>{c.name}</option>)}
      </select>
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap">
          {!!images.length &&
            images.map((link) => (
              <div key={link} className="h-24">
                <img src={link} alt="" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24  flex items-center ">
            <BounceLoader color="#36d7b7" />
          </div>
        )}
        <label className="w-24 h-24  flex justify-center items-center text-sm text-gray-500 gap-1 rounded-lg bg-gray-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          {/* to open file choser use input with type file and make it hidden to hide the button */}
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
      </div>
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
  );
}
