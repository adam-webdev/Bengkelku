import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useStateContext, baseUrl } from "./Store";

const useDaerah = (id, name) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useStateContext();

  const fetchDaerah = async () => {
    // const token = state?.userInfo
    //   ? state?.userInfo?._j?.token
    //   : state?.userInfo?.user?.token;
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/nama-daerah/${name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const result = await res.json();
      console.log("userdaerah", result?.data[0].name);
      setData(result.data[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDaerah();
  }, []);

  return data;
};

export default useDaerah;
