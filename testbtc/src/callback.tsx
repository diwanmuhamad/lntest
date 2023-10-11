import { useEffect, useState } from "react";
import axios from "axios";

const Callback = () => {
  const location = window.location;
  const [token, setToken] = useState("");

  console.log(location.search.replace("?code=", ""));

  useEffect(() => {
    axios
      .post(
        "https://api.getalby.com/oauth/token",
        {
          code: location.search.replace("?code=", ""),
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:5173/callback/",
        },
        {
          auth: {
            username: "5bB4Ht9HxO",
            password: "M4M0UwTg1Sy0xGM940Fu",
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setToken(response.data.access_token);
          axios
            .get("https://api.getalby.com/user/value4value", {
              headers: {
                Authorization: "Bearer " + response.data.access_token,
              },
            })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const pay = () => {
    axios.post(
      "https://api.getalby.com/payments/keysend",
      {
        amount: 1,
        destination:
          "030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3",
        custom_records: {
          "696969":
            "I'm taking over this billboard again this time with postman",
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    console.log(token);
  };
  return (
    <div>
      <button onClick={pay}>Pay</button>
    </div>
  );
};

export default Callback;
