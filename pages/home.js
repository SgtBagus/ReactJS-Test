import axios from "axios";
import React, { PureComponent } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Card from "./components/Card";
import SideBar from "./components/Sidebar";
import update from "immutability-helper";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      cartDataList: [],
      openSideBar: false
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    axios
      .get("https://tes-mobile.landa.id/api/menus")
      .then((res) => {
        const {
          data: { datas }
        } = res;

        this.setState({
          dataList: datas
        });
      })
      .catch((error) => {
        NotificationManager.error("Terjadi Kesalahan !", error, 5000);
      });
  };

  openSideBar = () => {
    const { openSideBar } = this.state;

    this.setState({
      openSideBar: !openSideBar
    });
  };

  setToCard = (id) => {
    const { dataList, cartDataList } = this.state;
    const dataGet = dataList.find((x) => x.id === id);

    const newCartDataList = update(cartDataList, { $push: [dataGet] });

    this.setState({
      cartDataList: newCartDataList
    });
  };

  render() {
    const { dataList, cartDataList, openSideBar } = this.state;

    return (
      <div className="card w-100">
        <div className="row justify-content-between m-3">
          <div className="col-md-4">
            <h2>Main Course</h2>
          </div>
          <div className="col-md-8">
            <button
              type="button"
              className="btn btn-light border position-relative"
              style={{ float: "right" }}
              onClick={() => this.openSideBar()}
            >
              Keranjang
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartDataList.length}
              </span>
            </button>
          </div>
        </div>
        <div className="row">
          {dataList.map((x) => {
            const { id, nama, harga, gambar } = x;
            return (
              <div
                key={id}
                className="col-sm-3  mb-3 d-flex align-items-stretch"
              >
                <Card
                  nama={nama}
                  harga={harga}
                  gambar={gambar}
                  changeEvent={() => this.setToCard(id)}
                />
              </div>
            );
          })}
        </div>

        {openSideBar && (
          <SideBar
            openClass="open"
            data={cartDataList}
            closeHandel={() => this.openSideBar()}
          />
        )}
        <NotificationContainer />
      </div>
    );
  }
}

export default Login;
