import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/Input";

const Edit = () => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();
  const [imgPreview, setImgPreview] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [status, setStatus] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/product/${id}`)
      .then((res) => {
        const data = res.data.data;

        if (data.image_url !== "") {
          setImgPreview(`http://localhost:5000/${data.image_url}`);
        } 
        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
        setStatus(data.status);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(status)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);
    formData.append("status", status);
    axios({
      method: "put",
      url: `http://localhost:5000/api/v1/product/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        window.alert("ubah data success");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  if (loading) {
    return (
      <div className="main">
        <h1>loading</h1>
      </div>
    );
  }
  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit} method="post">
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <Input name="status" type="checkbox" label="Active" defaultChecked={status} onChange={e=> setStatus(e.target.checked)}/>
          <img src={imgPreview} alt="" />
          <input
            type="file"
            onChange={(e) => {
              setImgPreview(URL.createObjectURL(e.target.files[0]));
              setImage({ image: e.target.files[0] });
            }}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
