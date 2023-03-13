class AdminRequestFunctions {
    static async getAllBids() {
        const userInfoObject = localStorage.getItem("user");
        const userInfo = JSON.parse(userInfoObject);
        console.log(userInfo);
        try {
            const data = await fetch(
                "https://us-central1-terp-338409.cloudfunctions.net/app/api/getbids", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            return data.json();
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    static async getBidDetails(bidId) {
        const userInfoObject = localStorage.getItem("user");
        const userInfo = JSON.parse(userInfoObject);
        console.log(userInfo);
        try {
            const data = await fetch(
                `https://us-central1-terp-338409.cloudfunctions.net/app/api/getbid?id=${bidId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            return data.json();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async getCompanies(){
        const userInfoObject = localStorage.getItem("user");
        const userInfo = JSON.parse(userInfoObject);
        console.log(userInfo);
        try {
            const data = await fetch(
                "https://us-central1-terp-338409.cloudfunctions.net/app/api/getcompanies", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            return data.json();
        } catch (e) {
            console.log(e);
            throw e;
        } 
    }

    static async updateBid(bid_update_object, bidId){
        const userInfoObject = localStorage.getItem("user");
        const userInfo = JSON.parse(userInfoObject);
        console.log(userInfo);
        try {
            const data = await fetch(
                `https://us-central1-terp-338409.cloudfunctions.net/app/api/updateBid?id=${bidId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                    body: JSON.stringify(bid_update_object),
                }
            );
            return data.json();
        } catch (e) {
            console.log(e);
            throw e;
        } 
    }

    static async getProjectDetails(id){
        const userInfoObject = localStorage.getItem("user");
        const userInfo = JSON.parse(userInfoObject);
        console.log(userInfo);
        try {
            const data = await fetch(
                `https://us-central1-terp-338409.cloudfunctions.net/app/api/getproject?id=${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            return data.json();
        } catch (e) {
            console.log(e);
            throw e;
        } 
    }

    static async getProjectExpensis(id){
        const userInfoObject = localStorage.getItem("user");
        const userInfo = JSON.parse(userInfoObject);
        console.log(userInfo);
        try {
            const data = await fetch(
                `https://us-central1-terp-338409.cloudfunctions.net/app/api/getProjectExpenses?id=${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            return data.json();
        } catch (e) {
            console.log(e);
            throw e;
        } 
    }
}


export default AdminRequestFunctions;