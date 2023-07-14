import React from "react";

const Card = (props) => {
  const { nama, harga, gambar, changeEvent } = props;

  return (
    <div className="card w-100 m-3">
      <img
        className="card-img-top"
        src={gambar}
        alt="image"
        style={{
          height: "15vw",
          objectFit: "contain"
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 class="card-title">
          <b>{nama}</b>
        </h5>
        <p class="card-text">
          <b>Rp. </b> {harga}.00,-
        </p>
        <button onClick={changeEvent} class="btn w-100 btn-primary">
          + Tambah Ke Keranjang
        </button>
      </div>
    </div>
  );
};

export default Card;
