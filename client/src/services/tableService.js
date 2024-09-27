import axios from "axios";


const tableKey = process.env.REACT_APP_TABLE_API_KEY;

const fetchTableData = async () => {
    const response = await axios.get(tableKey);
    console.log("provider data of Patient////*", response)
    return response.data;
};

export default fetchTableData;