import { useEffect } from "react";
import "./userList.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers, updateUsers } from "../../Redux/apiCalls";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@mui/icons-material";

export default function UserList() {
  const dispatch = useDispatch();
  const PF = "http://localhost:5000/images/";
  const users = useSelector((state) => state.user);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUsers(id, dispatch);
  };

  const handleUpdate = (id) => {
    updateUsers(id, dispatch);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={PF + params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button
                className="userListEdit"
                onClick={() => handleUpdate(params.row._id)}
              >
                Edit
              </button>
            </Link>
            <DeleteOutlined
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
