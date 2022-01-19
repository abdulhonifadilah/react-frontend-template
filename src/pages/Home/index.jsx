import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const fetchData= ()=>{
    fetch("http://localhost:5000/api/v1/product")
    .then((res) => res.json())
    .then((res) => {
      setData(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })
    .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchData()
    return () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
  }, [search]);
  const handleDelete = (id) => {
    if (window.confirm("apakah akan dihapus")) {
      fetch(`http://localhost:5000/api/v1/product/${id}`, {
        method: "DELETE",
      }).then(() => {alert("data berhasil dihapus")
    fetchData()});
    }
  };
  let message;
  const handleData = () => {
    const newData = data.filter((e) =>
      e.name.includes(search.toLocaleLowerCase())
    );
    if (loading) {
      message = <h1>loading</h1>;
    } else {
      if (newData.length < 1) {
        message = <h1>data kosong</h1>;
      } else {
        return newData.map((e, i) => (
          <tr key={i}>
            <td>{e._id}</td>
            <td>{e.name}</td>
            <td className="text-right">RP {e.price}</td>
            <td className="text-center">
              <Link to={`/detail/${e._id}`} className="btn btn-sm btn-info">
                Detail
              </Link>
              <Link to={`/edit/${e._id}`} className="btn btn-sm btn-warning">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(e._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ));
      }
    }
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tamah Produk
      </Link>
      <div className="search">
        <input
          type="text"
          placeholder="Masukan kata kunci..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {handleData()}
          {/* <tr>
            <td>1</td>
            <td>Laptop</td>
            <td className="text-right">RP. 20.000.000</td>
            <td className="text-center">
              <Link to="/detail" className="btn btn-sm btn-info">
                Detail
              </Link>
              <Link to="/edit" className="btn btn-sm btn-warning">
                Edit
              </Link>
              <Link to="#" className="btn btn-sm btn-danger">
                Delete
              </Link>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Monitor</td>
            <td className="text-right">RP. 10.000.000</td>
            <td className="text-center">
              <Link to="/detail" className="btn btn-sm btn-info">
                Detail
              </Link>
              <Link to="/edit" className="btn btn-sm btn-warning">
                Edit
              </Link>
              <Link to="#" className="btn btn-sm btn-danger">
                Delete
              </Link>
            </td>
          </tr> */}
        </tbody>
      </table>
      {message}
    </div>
  );
};

export default Home;
