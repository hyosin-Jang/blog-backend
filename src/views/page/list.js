import React, { Component } from "react";
import "./main.css";
import API from "../../api";
import { Link } from "react-router-dom";

class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      limit: 10,
      all_page: [],
      id: "cdnnnl"
    };
  }

  componentDidMount() {
    this._getListData(); // 컴포넌트 렌더링시 getListData
    this._setPage();
    //window.SessionStorage.getItem("login");
  }

  _getListData = () => {
    const { limit } = this.state;
    const page = this._setPage();
    const send_data = { id: this.state.id, limit: limit, page: page };

    //this.setState({
    //  data: [{ id: "1", title: "제목", date: "2021-08-30" }] //response
    // });

    //데이터 가져오기
    API.post("/api/get/board", send_data)
      .then(response => {
        console.log("list", response); // title: content 찍혀야 됨

        this.setState({ data: response.data });
        //this._makeData(response);
      })
      .catch(error => {
        console.error(error);
      });

    //전체 페이지 수 구하기
    let page_arr = [];

    // this.setState({ data: total_list, all_page: page_arr });
  };

  /*
  _makeData = function (data) {
    data.data.map((el, index) => {
      console.log("el:", el);
      this.setState({
        data: el
      });
    }); // 원소
  };
  */

  _changePage = function (el) {
    this.setState({ page: el });
    sessionStorage.setItem("page", el);

    return this._getListData();
  };

  _setPage = function () {
    if (sessionStorage.page) {
      this.setState({ page: Number(sessionStorage.page) });
      return Number(sessionStorage.page);
    }

    this.setState({ page: 1 });
    return 1;
  };

  render() {
    const list = this.state.data;
    const { all_page, page } = this.state;

    console.log(this.state.data);

    return (
      <div className="List">
        <div className="list_grid list_tit">
          <div> 제목 </div>
          <div className="acenter"> 날짜 </div>
        </div>

        {list
          ? list.map((el, key) => {
              const data = el.num;
              const view_url = `/view/${data}`;

              return (
                <div className="list_grid list_data" key={key}>
                  <div>
                    {" "}
                    <Link to={view_url}> {el.title} </Link>{" "}
                  </div>
                  <div> </div>
                  <div className="acenter"> {el.date.substring(0, 10)} </div>
                </div>
              );
            })
          : null}

        <div className="paging_div">
          <div> </div>
          <div>
            <ul>
              {all_page
                ? all_page.map((el, key) => {
                    return el === page ? (
                      <li key={key} className="page_num">
                        {" "}
                        <b> {el} </b>{" "}
                      </li>
                    ) : (
                      <li
                        key={key}
                        className="page_num"
                        onClick={() => this._changePage(el)}
                      >
                        {" "}
                        {el}{" "}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <div> </div>
        </div>
      </div>
    );
  }
}

export default list;
