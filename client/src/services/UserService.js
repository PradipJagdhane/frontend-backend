import AppDataService from "./AppDataService"

const userDataService = async () => {
    try{
const response = await AppDataService.get('/usersdata');
return response.data;
    }catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
    
}

export default userDataService;