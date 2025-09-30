import { useEffect, useState } from "react";

const useFetchBatik = () => {
  const [batik, setBatik] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/batik.json")
      .then((res) => res.json())
      .then((data) => setBatik(data))
      .catch((err) => setError(err));
  }, []);

  return { batik, error };
};


export default useFetchBatik;
