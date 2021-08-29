import React, { Component } from "react";
import API from "../../api";

class write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true // write하려면 login 된 상태이기 때문에 초기값 true
    };
    this._submitBoard = this._submitBoard.bind(this);
  }

  _submitBoard = async function () {
    const title = document.getElementsByName("title")[0].value.trim();
    const contents = document.getElementsByName("title")[0].value;

    if (title === "") {
      return alert("제목을 입력해주세요.");
    } else if (contents === "") {
      return alert("내용을 입력해주세요.");
    }

    const data = { title: title, contents: contents };
    console.log("title:", title, "contents:", contents); // ok
    console.log(data);

    await API.post("/api/add/board", data)
      .then(response => {
        console.log(response);
        alert("글 등록이 완료되었습니다.");
        //return window.location.replace("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    if (sessionStorage.login) {
      // 로그인 되어 있는 상태라면
      this.setState({ login: true });
    } else {
      this.setState({
        login: false
      });
    }
  }

  render() {
    const { params } = this.props.match;
    return (
      <>
        {params.login ? (
          <div className="Write">
            <div>
              제목
              <input
                type="text"
                id="title_txt"
                name="title"
                placeholder="  제목"
              />
            </div>
            <div>
              내용
              <textarea
                id="content_txt"
                name="contents"
                defaultValue="내용을 입력하세요."
              />
            </div>
          </div>
        ) : null}

        <div>
          <div id="post_submit">
            <button onClick={this._submitBoard}> Register </button>
          </div>
        </div>
      </>
    );
  }
}

export default write;
