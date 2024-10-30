import  APIClient from "../../../utils/APIClient";

export const createFpf = async (data: { name: string; isPublic: boolean }) => {
    try {
        //const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/organizations`, {
        const apiClient = new APIClient();
        const response = await apiClient.post("/fpf", data);
    }
    catch (error) {
        console.error("Error: " + error);
    }
};