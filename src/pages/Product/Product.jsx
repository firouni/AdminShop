import React, { useEffect, useMemo, useState } from "react";
import "./product.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Chart from "../../components/Chart/Chart";
import { updateProduct } from "../../Redux/apiCalls";
import { userRequest } from "../../requestMethods";
import { Publish } from "@mui/icons-material";

export default function Product() {
  const PF = "http://localhost:5000/images/";
  const dispatch = useDispatch(updateProduct);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [updateMode, setUpdateMode] = useState(true);
    console.log(updateMode);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(() => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(PF , updateProduct);
      setSuccess(true);
      dispatch();
      return res.data
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            {product.productPic && (
              <img
                className="productInfoImg"
                src={PF + product.productPic}
                alt=""
              />
            )}
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form
          className="productForm"
          onSubmit={handleSubmit}
          method="POST"
          action="/upload"
          enctype="multipart/form-data"
        >
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Product Description</label>
            <input
              type="text"
              placeholder={product.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Product Brand</label>
            <input
              type="text"
              placeholder={product.brand}
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <label>Price</label>
            <input
              type="number"
              placeholder={product.price}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="productFormRight">
            <div className="productUpload">
              <img
                className="productUploadImg"
                src={file ? URL.createObjectURL(file) : PF + product.productPic}
                alt=""
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                name="image"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button
              className="productButton"
              onClick={() => setUpdateMode(true)}
            >
              Update
            </button>
            {success && (
              <span
                style={{
                  color: "coral",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Product updated...
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
