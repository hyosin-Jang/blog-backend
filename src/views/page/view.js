import React, { Component } from "react";
import "./main.css";
import API from "../../api";

// 게시물 클릭 시, 상세 페이지
class view extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: ""
    };
  }

  componentWillMount() {
    this._getData();
  }

  _getData = async function () {
    const id = this.props.match.params.data;
    console.log("id", id);

    // id: 1
    const getData = await API.post("/api/get/board_data", { num: id });

    console.log("getData", getData);
    console.log("getData keys", getData.data.keys(0));
    const title = getData.data.keys(0).title;
    console.log(title);

    return this.setState({ data: getData.data, id: id });
  };

  render() {
    const data = this.state.data;
    console.log("data title:", data);

    return (
      <div className="Write">
        <div>
          <div className="top_title">
            제목:
            <input type="text" id="title_txt" name="title" readOnly />
            <div className="date_div">{this.state.date}</div>
          </div>

          <div>
            내용:
            <textarea id="content_txt" name="contents" readOnly></textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default view;
