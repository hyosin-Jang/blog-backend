import React, { Component } from "react";
import "./main.css";
import API from "../../api";

class Right_Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      contents: ""
    };
    this._submitBoard = this._submitBoard.bind(this);
  }

  _submitBoard = async function () {
    const title = document.getElementsByName("title")[0].value.trim();
    const contents = this.props.contents;

    if (title === "") {
      return alert("제목을 입력해주세요.");
    } else if (contents === "") {
      return alert("내용을 입력해주세요.");
    }

    const data = { title: title, contents: contents };

    const res = await API.post("/board/add/board", {
      data: data
    });

    if (res.data) {
      alert("글 등록이 완료되었습니다.");
      return window.location.replace("/");
    }
  };

  render() {
    return (
      <div>
        <div id="post_submit">
          <button onClick={this._submitBoard}> Register </button>
        </div>
      </div>
    );
  }
}

export default Right_Write;
