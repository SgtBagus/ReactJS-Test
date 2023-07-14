import React, { Component } from "react";

import InputText from "./InputText";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: []
    };
  }

  componentDidMount = () => {
    const { data } = this.props;

    this.setState({
      dataList: data
    });
  };

  componentDidUpdate = ({ data: pData }) => {
    const { data } = this.props;

    if (data !== pData) {
      this.setState({
        dataList: data
      });
    }
  };

  render() {
    const { dataList } = this.state;
    const { closeHandel, openClass } = this.props;

    let total = 0;

    return (
      <nav className={openClass === "open" ? "opneSidebar" : ""}>
        <div className="row align-items-center justify-content-between m-3">
          <div className="col">
            <h3>Keranjang</h3>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-light border position-relative"
              style={{ float: "right" }}
              onClick={closeHandel}
            >
              Tutup
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {dataList.map((x) => {
              const { nama, harga, gambar } = x;
              total += harga;

              return (
                <div class="card">
                  <div class="row card-body">
                    <img
                      style={{
                        height: "10vw",
                        objectFit: "contain"
                      }}
                      class="col-sm-6"
                      src={gambar}
                      alt="sans"
                    />
                    <div class="col-sm-6">
                      <h5 class="card-title">
                        <b>{nama}</b>
                      </h5>
                      <p class="card-text">
                        <b>Rp. </b> {harga}.00,-
                      </p>
                    </div>
                  </div>
                  <div className="row mx-3 my-2">
                    <div class="col-sm-12">
                      <InputText
                        placeholder="Masukan Catatan disini...!"
                        value=""
                        changeEvent={(val, e) =>
                          this.changeInputHandler("email", val, e)
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div class="col-sm-12">
            <InputText
              label="Tambah Voucher"
              placeholder="Masukan Voucher mu disini...!"
              value=""
              changeEvent={() => {}}
            />
          </div>
          <div class="col-sm-12">
            <b>Total: Rp.{total}.00.-</b>
          </div>
          <div class="col-sm-12">
            <button onClick={() => {}} class="btn w-100 btn-primary">
              Buat Pesanan
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default SideBar;
