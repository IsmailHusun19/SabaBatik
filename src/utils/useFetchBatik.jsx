import { useEffect, useState } from "react";

const useFetchBatik = () => {
  const [batik, setBatik] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("../../src/config/DataSet/batik.json")
      .then((response) => response.json())
      .then((data) => setBatik(data))
      .catch((error) => setError(error));
  }, []);

  return { batik, error };
};

export default useFetchBatik;
