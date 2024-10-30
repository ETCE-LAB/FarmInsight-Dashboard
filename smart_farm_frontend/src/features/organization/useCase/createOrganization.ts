import  APIClient from "../../../utils/APIClient";

export const createOrganization = async (data: { name: string; isPublic: boolean }) => {
    try {
        //const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/organizations`, {
        const apiClient = new APIClient();
        const response = await apiClient.post("/organizations", data);
}
    catch (error) {
        console.error("Error: " + error);
    }
};