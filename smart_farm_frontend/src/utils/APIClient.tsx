import {useAuth} from "react-oidc-context";

class APIClient {
      public auth = useAuth()


    async get(APIEndpoint:string){

        const token = this.auth.user?.access_token
        try {

            //const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api${APIEndpoint}`, {
                const response = await fetch(`http://127.0.0.1:8000/api${APIEndpoint}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if(!response.ok){
                throw new Error("Network response not ok")
            }
            return response.json()
        }
        catch (error){
            console.error("Failed to receive UserProfile: " + error)
        }

    }

    async post(APIEndpoint:string, data: any){
        const token = this.auth.user?.access_token
        try {

            //const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api${APIEndpoint}`, {
            const response = await fetch(`http://127.0.0.1:8000/api${APIEndpoint}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    method: 'POST',
                    body: JSON.stringify(data),
                }
            )

            if(!response.ok){
                throw new Error("Network response not ok")
            }
            return response.json()
        }
        catch (error){
            console.error("Error: " + error)
            }
        }
}
export default APIClient
