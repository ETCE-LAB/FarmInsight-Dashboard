import {useAuth} from "react-oidc-context";


class APIClient {
    async get(APIEndpoint:string, header:any ){
        const auth = useAuth()

        const token = auth.user?.access_token

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`,{
            headers: {
                'Authorization': 'Baerer ${token}'
            }
        }
        )

    }
}



export default APIClient
