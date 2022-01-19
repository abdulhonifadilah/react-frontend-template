import {useState} from 'react';
import Input from '../../components/Input';
import axios from 'axios';
import './index.scss';

const Tambah = () => {
  const [image, setImage] = useState()
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const handleSubmit =(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image', image);
    formData.append('status', true);
    axios({
      method: 'post',
      url: "http://localhost:5000/api/v1/product",
      data: formData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
  }
  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form method='post' onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" onChange={e=> setName(e.target.value)}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga"  onChange={e=> setPrice(e.target.value)}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" onChange={e=> setStock(e.target.value)}/>
          <Input name="status" type="checkbox" label="Active" checked  />
          <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;