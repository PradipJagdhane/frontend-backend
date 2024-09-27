import { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableRequest } from "../../redux/slice/userDataSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const UserTable = () => {

    const dispatch = useDispatch();
    const { user, isloading } = useSelector((state) => state.userlist);

console.log("data from userData(client)....",user);
  useEffect(() => {
   

    dispatch(fetchTableRequest());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", // Replace with the actual field name from your API response
        header: "Name",
      },
      {
        accessorKey: "email", // Replace with the actual field name from your API response
        header: "Email",
      },
      {
        accessorKey: "role", // Replace with the actual field name from your API response
        header: "Role",
      },
      {
       id: "actions",
       header: "Actions",
       Cell: ({ row }) => (
        <div>
          <IconButton >
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </div>
       )
      }
    ],
    []
  );

  return (
    <>
    <h3>Users data</h3>
  
    <MaterialReactTable
      columns={columns}
      data={user}
      enableRowSelection
      state={{
        isloading: isloading,
        showSkeletons: isloading,
      }}
      muiTablePaperProps={{
        elevation: 3,
      }}
      
      

      
    />
      </>
  );
};

export default UserTable;
