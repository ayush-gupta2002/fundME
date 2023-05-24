import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { rows } from "../dummyData";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

function UserList() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "userName",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex">
            <img
              className="w-8 h-8 rounded-full my-auto"
              src={params.row.avatar}
            ></img>
            <div className="my-auto ml-2 font-semibold">
              {params.row.userName}
            </div>
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
    },
    { field: "transaction", headerName: "Total Transactions", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Link to={`/user/${params.row.id}`}>
            <button className="flex bg-gray-200 p-1 rounded-xl hover:bg-gray-300">
              <CgProfile className="my-auto mr-1"></CgProfile>
              <div>Profile</div>
            </button>
          </Link>
        );
      },
    },
  ];
  return (
    <div>
      <Topbar></Topbar>
      <div className="flex gap-4 w-full justify-between">
        <Sidebar></Sidebar>
        <div className="w-4/5 overflow-scroll">
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
