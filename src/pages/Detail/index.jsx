import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams,Link } from "react-router-dom";
import './index.scss';

const Detail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/product/${id}`).then((res) => {
      setData(res.data.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })
    .catch((err) => console.log(err));
  }, [id])
  if(loading){
    return <div className="main">
      <h1>loading</h1>
    </div>
  }
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>
      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {data._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {data.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {data.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {data.stock}</td>
          </tr>
          <tr>
            <td>image</td>
            <td>: <img src={`http://localhost:5000/${data.image_url}`} alt="" /> </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  )
}

export default Detail;