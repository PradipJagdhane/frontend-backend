import { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableRequest } from "../../redux/slice/tableSlice";


const Example = () => {

  const dispatch =  useDispatch();
  const  {data, isloading } = useSelector((state) => state.table);

  useEffect(() => {
    dispatch(fetchTableRequest());
  },[dispatch]);



  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "address.street",
        header: "Street",
      },
      {
        accessorKey: "address.city",
        header: "City",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      state={{
        isLoading: isloading,
        showSkeletons: isloading,

      }}

      muiTablePaperProps={{
        elevation: 3,
      }}

    />
  );
};

export default Example;
