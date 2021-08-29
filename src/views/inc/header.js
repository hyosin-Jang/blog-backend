import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Modal from "react-awesome-modal";
import GoogleLogin from "react-google-login";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      id: "", // 로그인 유저 고유번호
      name: "", // 로그인 유저 이름
      password: "",
      login: false,
      imageUrl: "",
      tokenid: "", // 서버 전송용 tokenId
      profile: {} // 서버 전송용 프로파일 객체
    };
    this._logout = this._logout.bind(this);
    this._googleLogin = this._googleLogin.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.login) {
      this.setState({ login: true });
    }
  }

  //modal 실행
  _openModal = function () {
    this.setState({
      visible: true
    });
  };

  _logout = function () {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("login");
      this.setState({ login: false });
    }
  };

  //modal 종료
  _closeModal = function () {
    this.setState({
      visible: false
    });
  };

  _changeID = function () {
    const id_v = document.getElementsByName("id")[0].value;
    //console.log(id)
    this.setState({
      id: id_v
    });
  };

  _changePW = function () {
    const pw_v = document.getElementsByName("password")[0].value;

    this.setState({
      password: pw_v
    });
  };

  // Google Login
  responseGoogle = async res => {
    // 구글 res 로 state 상태 변화
    this.setState({
      visible: false, // ?
      id: res.profileObj.googleId, // 로그인 유저 고유번호
      name: res.profileObj.name, // 로그인 유저 이름
      password: "",
      login: true,
      tokenid: res.tokenId,
      imageUrl: res.profileObj.imageUrl,
      profile: res.profileObj
    });
    sessionStorage.setItem("login", res.profileObj.googleId);
    console.log(res.profileObj.googleId);
    console.log(res.profileObj.name);
    console.log(res.profileObj.imageUrl);

    const googleId = res.profileObj.googleId;
    const profile = res.profileObj;

    // googleId
    // console.log(res.tokenId);
    console.log(res.profileObj);

    // 서버로 유저 데이터 전송
    this._googleLogin(googleId, profile);
  };

  _googleLogin = async (googleId, profile) => {
    await axios
      .post("http://localhost:4000/api/auth/google", {
        googleId: googleId, // 토큰 Id
        profile: profile // profile Obj
      })
      .then(response => {
        console.log(response); // TODO: res.json 잘 받는지 확인
        const send_test = response.data.send_test;
        const { title, contents } = send_test;
        console.log(title, contents);
      });
  };

  // Google Login
  responseFail = err => {
    console.error(err);
  };

  _selectUserData = async e => {
    const id = this.state.id.trim();
    const password = this.state.password.trim();

    if (id === "") {
      return alert("아이디를 입력해주세요.");
    } else if (password === "") {
      return alert("비밀번호를 입력해주세요.");
    }

    /* local login
      --- id: admin
      --- pw: admin
    */
    if (id === "admin" && password === "admin") {
      this.setState({ login: true });
      this._closeModal();

      return alert("로그인되었습니다.");
    }
  };

  render() {
    return (
      <div className="header_grid">
        <div className="acenter">
          {this.state.login ? (
            <h5>
              <Link to={`/write/${this.state.login}`}>Write Posts</Link>
            </h5>
          ) : null}
        </div>
        <div> </div>
        <div className="acenter">
          <Route path="/" />
          <Link className="link_tit" to="/">
            <h3> MJ's Blog </h3>
          </Link>
        </div>
        <div className="profile">
          <li>{this.state.login && this.state.name}</li>
          {/*<li>{this.state.login && this.state.imageUrl}</li>*/}
        </div>

        <div className="acenter">
          {!this.state.login && (
            <h5 onClick={() => this._openModal()}> Login </h5>
          )}
          {this.state.login ? (
            <h5 onClick={this._logout}>Logout</h5>
          ) : (
            <GoogleLogin
              clientId="761604607478-u6t8vtsdeo7s1targd13gcnogb93gemn.apps.googleusercontent.com"
              buttonText="Log in with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseFail}
            />
          )}

          <Modal
            visible={this.state.visible}
            width="400"
            height="500"
            effect="fadeInDown"
            onClickAway={() => this._closeModal()}
          >
            <form>
              <div className="login_div">
                <div className="login_input_div">
                  <p> ID </p>
                  <input
                    type="text"
                    name="id"
                    onChange={() => this._changeID()}
                  />
                </div>

                <div className="login_input_div" style={{ marginTop: "40px" }}>
                  <p> Password</p>
                  <input
                    type="text"
                    name="password"
                    onChange={() => this._changePW()}
                  />
                </div>
                <div className="submit_div">
                  <div>
                    <input
                      type="button"
                      value="로그인"
                      onClick={() => this._selectUserData()}
                    />
                  </div>
                  <div>
                    <input
                      type="button"
                      value="닫기"
                      onClick={() => this._closeModal()}
                    />{" "}
                  </div>
                </div>
              </div>
            </form>

            <div className="acenter">
              {this.state.login ? (
                <h5 className="btn_cursor" onClick={() => this._logout()}>
                  {" "}
                  로그아웃
                </h5>
              ) : (
                <h5 className="btn_cursor" onClick={() => this._openModal()}>
                  {" "}
                  로그인{" "}
                </h5>
              )}
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default header;
