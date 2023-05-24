import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { HiPencil } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { deleteCampaigns, getCampaigns } from "../redux/apiCalls";

function CampaignList() {
  const dispatch = useDispatch();
  const user = useSelector(function (state) {
    return state.user.currentUser;
  });
  const campaign = useSelector(function (state) {
    return state.campaign;
  });

  useEffect(() => {
    getCampaigns(dispatch, user);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteCampaigns(dispatch, id, user);
  };
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="flex">
            <img
              className="w-8 h-8 rounded-full my-auto"
              src={params.row.img[0]}
            ></img>
            <div className="my-auto ml-2 font-semibold">{params.row.title}</div>
          </div>
        );
      },
    },
    { field: "perPrice", headerName: "Price (INR)", width: 200 },
    {
      field: "current",
      headerName: "Completion %",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {Math.round(
              ((params.row.current * 100) / params.row.target) * 100
            ) / 100}
          </div>
        );
      },
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 200,
      renderCell: (params) => {
        return <div>{format(params.row.deadline)}</div>;
      },
    },
    {
      field: "availability",
      headerName: "Status",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex">
            <Link to={`/campaign/${params.row._id}`}>
              <button className="flex bg-gray-200 p-1 rounded-xl hover:bg-gray-300">
                <HiPencil className="my-auto mr-1"></HiPencil>
                <div>Edit</div>
              </button>
            </Link>
            <MdDeleteOutline
              className="my-auto mx-2 text-xl text-red-500 cursor-pointer"
              onClick={() => handleDelete(params.row._id)}
            ></MdDeleteOutline>
          </div>
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
          <Link to="/newcampaign">
            <button className="rounded-lg p-2 bg-teal-500 text-white">
              Create
            </button>
          </Link>
          <div className="mt-4" style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={campaign.campaigns}
              columns={columns}
              pageSize={8}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[8]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignList;
