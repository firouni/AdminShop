import { useEffect } from "react";
import "./productList.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, updateProduct } from "../../Redux/apiCalls";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@mui/icons-material";

export default function ProductList() {
  const dispatch = useDispatch();
  const PF = "http://localhost:5000/images/";
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const handleUpdate = (id) => {
    updateProduct(id, dispatch)
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={PF + params.row.productPic}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 200
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit"
                onClick={()=> handleUpdate(params.row._id)}>Edit</button>
            </Link>
            <DeleteOutlined
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
