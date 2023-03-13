async function getBids() {
    //gettoken
    const userInfoObject = localStorage.getItem("user");
    const userInfo = JSON.parse(userInfoObject);
    console.log(userInfo);
    try {
      const data = await fetch(
        "https://us-central1-terp-338409.cloudfunctions.net/app/api/getbids",
        {
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
      return e;
    }
  }


  export default getBids