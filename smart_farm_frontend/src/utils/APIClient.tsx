
class APIClient {

    async get(URL: string, header: { Authorization: string }) {
        try {
            const response = await fetch(URL, {
                headers: header
            });

            if (!response.ok) {
                throw new Error("Network response not ok");
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to receive Response: " + error);
        }
    }

    async post(URL: string, data: any, header: { Authorization: string }) {
        try {
            const response = await fetch(URL, {
                headers: {
                    ...header,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Network response not ok");
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to receive Response: " + error);
        }
    }
}

export default APIClient;