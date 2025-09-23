import { useState } from "react";
import batikData from "../config/DataSet/batik.json"; // sesuaikan path

const useFetchBatik = () => {
  const [batik] = useState(batikData);
  const [error] = useState(null);

  return { batik, error };
};

export default useFetchBatik;
