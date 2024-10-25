import {useAuth} from "react-oidc-context";



export const ReceiveUserProfile = async () => {
    const auth = useAuth()
    const token = auth.user?.access_token
    console.log("Test")
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/userprofiles`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(await response.json())
        return await response.json()

    }
    catch (error) {
        console.error('Failed send or receive Token-Verification:', error);
        throw error;  // Re-throw to handle it in the component
    }
}




