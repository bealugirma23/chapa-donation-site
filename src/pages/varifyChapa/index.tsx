import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

const VarifyChapa = ({ user }) => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const confirmPayment = async () => {
      try {
        setloading(true);
        const { tnx_ref } = router.query;
        const url = `http://localhost:3000/api/verify`;
        const header = {
          headers: { "Content-Type": "application/json" },
        };
        const data = { tnx_ref: tnx_ref };
        let response = await axios.post(url, data, header);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        window.location.href = "http://localhost:3000/";
        setloading(false);
      }
    };

    confirmPayment();
  }, [router.query]);

  return (
    <>
      <div className="row align-items-center">
        <div className="col-lg-12 col-md-12">
          <h1>it works thanks for your donation</h1>
          {loading && <Loading />}
          <h3>{data && data.message}</h3>
        </div>
      </div>
    </>
  );
};

export default VarifyChapa;
