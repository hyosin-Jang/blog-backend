import React, { Component } from 'react';
import './views/App.css';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
//import { Home, Test } from './inc';
import { Head } from './views/inc';
import { Main } from './views/page/index.js';
import queryString from 'query-string';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login : false,
      admin : false,
      user_ip : "",
      signup : false,
      login_modal : false,
      list_data : [],
      list_page : 1,
      list_limit : 10,
      list_all_page : [],
      list_search : "",
      category : "",
      user_id : "",
      data : "",
      date : "",
      pre_view : "",
      next_view : "",
      category_data : [],
      select_category : "",

    }
  }

  componentDidMount() {
    this._getListData();
    this._getAllCategoryData();

    if(sessionStorage.login && sessionStorage.IP) {
      this.setState({ 
        login : JSON.parse(sessionStorage.login).id, 
        admin : JSON.parse(sessionStorage.login).admin,
        //user_ip : JSON.parse(sessionStorage.IP),
        user_id : JSON.parse(sessionStorage.login).m_id, 
      })
    }
  }

  _getData = async (b_id) => {
    
    const getData = await axios('/get/board_data', {
      method : 'POST',
      headers: new Headers(),
      data : { id : b_id }
    });

    // 날짜 구하기
    const date = getData.data[0].date.slice(0, 10) + ' ' + getData.data[0].date.slice(11, 16);

    return this.setState({ data : getData, date : date })
  }

  _setPage = function() {
    if(sessionStorage.page) {
      this.setState({ list_page : Number(sessionStorage.page) })
      return Number(sessionStorage.page);
    }

    this.setState({ list_page : 1 })
    return 1;
  }

  _changePage = (el) => {
    this.setState({ list_page : el })
    sessionStorage.setItem('page', el);

    return this._getListData();
  }

  _getListData = async function() {
    const { list_limit } = this.state;
    const list_pages = this._setPage();

    let categorys = '';
    if(sessionStorage.getItem('category')) {
      categorys = sessionStorage.getItem('category')
    }

    /*
    let search = "";
    if(queryString.parse(this.props.location.search)) {
      search = queryString.parse(this.props.location.search).search;
    }
    */

    
    // Board 테이블 데이터 전체 수
    const total_cnt = await axios('/get/board_cnt', {
      method : 'POST',
      headers: new Headers(),
      //data : { search : search, category : categorys }
    });

    // 데이터 가져오기
    const total_list = await axios('/get/board', {
      method : 'POST',
      headers: new Headers(),
      data : { 
        limit : list_limit, 
        page : list_pages, 
        //search : search, 
        category : categorys }
    })

    // 전체 페이지 수 구하기
    let page_arr = [];

    for(let i = 1; i <= Math.ceil(total_cnt.data.cnt / list_limit); i++) {
      page_arr.push(i);
    }

    this.setState({ list_data : JSON.stringify(total_list.data), 
                    list_all_page : page_arr})
                    //, 
                    //list_search : search })
  }

  _login = (data) => {
    sessionStorage.setItem('login', JSON.stringify(data.suc))
    //sessionStorage.setItem('IP', JSON.stringify(data.ip))

    this.setState({ login : JSON.parse(sessionStorage.login).id,  
                    admin : JSON.stringify(data.suc).admin,
                   
                    user_id : JSON.parse(sessionStorage.login).user_id
    })
    return window.location.reload()
  }

  _logout = () => {
    this.setState({ login : false, admin : false })

    sessionStorage.removeItem('login')
    //sessionStorage.removeItem('IP')
  }
 
  // 카테고리 변동
  _changeCatgory = (target) => {
    sessionStorage.setItem('category', target);
    return window.location.href = '/';
  }

  _getPreAndNextData = async (b_id) => {
    const category = sessionStorage.getItem('category');

    const res = await axios('/get/pre_and_next', {
      method : 'POST',
      headers: new Headers(),
      data : { board_id : b_id, category : category }
    })

    this.setState({
      pre_view : res.data.pre,
      next_view : res.data.next
   })
  }

  _getAllCategoryData = async function() {
    const getData = await axios('/get/category');

    this.setState({ category_data : getData.data })
  }

  _selectCategoryData = async (b_id) => {
    let category = document.getElementsByName('select_category')[0].value;

    if(b_id) {
      // 수정 페이지일 경우 카테고리 변경
      const getData = await axios('/get/board_data', {
        method : 'POST',
        headers: new Headers(),
        data : { id : b_id }
      });

      return this.setState({ select_category : getData.data[0].cat_id })
    }

    this.setState({
      select_category : category
    })
  }
  

  render() {
    const { 
      login, admin, login_modal,
      list_data, list_all_page, list_page, user_id,
      data, pre_view, next_view, category_data, select_category
    } = this.state;

    const { 
      _login, _logout, _changePage,
      _changeCatgory, _getData, _getPreAndNextData, _selectCategoryData
    } = this;


    return(
    <div>
      <div>
        <Head 
          login = {login}
          admin = {admin}

          _login = {_login}
          _logout = {_logout}
          login_modal= {login_modal}

        />
      </div>

      <div>
        <Main
          admin = {admin}

          login = {login}
          login_modal = {login_modal}
         
          list_data = {list_data}
          list_all_page = {list_all_page} 
         
          list_page = {list_page}
          _changePage = {_changePage}
          _changeCatgory = {_changeCatgory}
          user_id = {user_id}
          data = {data}

          _getData = {_getData}

          pre_view = {pre_view}
          next_view = {next_view}
          _getPreAndNextData = {_getPreAndNextData}
          category_data = {category_data}
          select_category = {select_category}
          _selectCategoryData = {_selectCategoryData}
          
        />
      </div>
    </div>
    )
  }
}

export default App;

/* 원래

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name : '',
      list : [],
      update : false,
    }
  }

  
  render() {
    return(
      <div>
        <div>
            <Head />
        </div>

        <div>
            <Main />
        </div>
      </div>
      )  
  }
}



export default App;
*/

/*
componentDidMount() {
  this._getData();
}

_addData = async(e) => {
  const { name } = this.state;
  e.preventDefault();
  
  const res = await axios('/add/data', {
    method : 'POST',
    data : { 'data' : name },
    headers: new Headers()
  })

  if(res.data) {
    alert('데이터를 추가했습니다.');
    return window.location.reload();
  }
}

_nameUpdate(e) {
  this.setState({ name : e.target.value })
}

_getData = async () => {
  const res = await axios.get('/get/data');

  if(res.data[0] === undefined) {
    let cover = [];
    cover.push(res.data);

    return this.setState({ list : cover })
  }
  this.setState({ list : res.data });
}

_modify = async (el) => {
  const modify = prompt(el.name + '을 어떤 이름으로 변경할까요?')

  if(modify !== null) {
    const body = {
      name : modify,
      id : el.id
    }

    const res = await axios('/modify/data', {
      method : 'POST',
      data : { 'modify' : body },
      headers: new Headers()
    })

    if(res.data) {
      alert('데이터를 수정했습니다.')
      return window.location.reload();
    }
  }
}

_delete = async (el) => {
  const remove = window.confirm(el.name + '을 삭제합니까?');

  if(remove) {
    const body = { id : el.id }
    const res = await axios('/delete/data', {
      method : 'POST',
      data : { 'delete' : body },
      headers: new Headers()
    })
    
    if(res.data) {
      alert('데이터를 삭제했습니다.')
      return window.location.reload();
    }
  }
}

render() {
  const { list } = this.state;

  return(
    <div className='App'>
      <h3> Welcome to <u> mj </u> Blog! </h3>
      <h5> https://mj.blog.me/ </h5>

      <br />
      <form method='POST' onSubmit={this._addData}>
        <input type='text' maxLength='10' onChange={(e) => this._nameUpdate(e)}/>
        <input type='submit' value='Add' />
      </form>

      <br /> <br />
        <div style={{ height : '250px', overflow : 'auto' }}>
          <h4 style={{ color : '#ababab'}}> Teachers List </h4>

            <div style={{ border : 'solid 1px black', width : '50%', marginLeft : '25%', textAlign : 'left' }}>
              <div style={{ display : 'grid', gridTemplateColumns : '32% 35% 30%', textAlign : 'center' }}>
                <div> Number </div>
                <div> Name </div>
                <div> Other </div>
              </div>
            </div>

          {list.length !== 0
            ? list.map( (el, key) => {
              return(
                <div key={key} style={{ display : 'grid', lineHeight : '40px', gridTemplateColumns : '32% 35% 20% 0%', width : '50%', marginLeft : '25%'}}>
                  <div> {el.id} </div>
                  <div> {el.name} </div>
                  <div
                    style={{ color : '#ababab' }} 
                    onClick={() => this._modify(el)}> Modify </div>
                  <div
                    style={{ color : '#ababab' }} 
                    onClick={() => this._delete(el)}> Delete </div>
                </div>
              )
            })
          
            : null}
        </div>
    </div>
  )
}
}

export default App;


*/


/*
  componentDidMount() {
    this._getData();
  }

  _addData = async(e) => {
    const { name } = this.state;
    e.preventDefault();
    
    const res = await axios('/add/data', {
      method : 'POST',
      data : { 'data' : name },
      headers: new Headers()
    })

    if(res.data) {
      alert('데이터를 추가했습니다.');
      return window.location.reload();
    }
  }

  _nameUpdate(e) {
    this.setState({ name : e.target.value })
  }

  _getData = async () => {
    const res = await axios.get('/get/data');

    if(res.data[0] === undefined) {
      let cover = [];
      cover.push(res.data);

      return this.setState({ list : cover })
    }
    this.setState({ list : res.data });
  }

  _modify = async (el) => {
    const modify = prompt(el.name + '을 어떤 이름으로 변경할까요?')

    if(modify !== null) {
      const body = {
        name : modify,
        id : el.id
      }

      const res = await axios('/modify/data', {
        method : 'POST',
        data : { 'modify' : body },
        headers: new Headers()
      })

      if(res.data) {
        alert('데이터를 수정했습니다.')
        return window.location.reload();
      }
    }
  }

  _delete = async (el) => {
    const remove = window.confirm(el.name + '을 삭제합니까?');

    if(remove) {
      const body = { id : el.id }
      const res = await axios('/delete/data', {
        method : 'POST',
        data : { 'delete' : body },
        headers: new Headers()
      })
      
      if(res.data) {
        alert('데이터를 삭제했습니다.')
        return window.location.reload();
      }
    }
  }



  render() {
    const { list } = this.state;

    return(
      <div className='App'>
        <h3> Welcome to <u> mj </u> Blog! </h3>
        <h5> https://min.blog.me/ </h5>

        <br />
        <form method='POST' onSubmit={this._addData}>
          <input type='text' maxLength='10' onChange={(e) => this._nameUpdate(e)}/>
          <input type='submit' value='Add' />
        </form>

        <br /> <br />
          <div style={{ height : '250px', overflow : 'auto' }}>
            <h4 style={{ color : '#ababab'}}> Teachers List </h4>

              <div style={{ border : 'solid 1px black', width : '50%', marginLeft : '25%', textAlign : 'left' }}>
                <div style={{ display : 'grid', gridTemplateColumns : '32% 35% 30%', textAlign : 'center' }}>
                  <div> Number </div>
                  <div> Name </div>
                  <div> Other </div>
                </div>
              </div>

            {list.length !== 0
              ? list.map( (el, key) => {
                return(
                  <div key={key} style={{ display : 'grid', lineHeight : '40px', gridTemplateColumns : '32% 35%', width : '50%', marginLeft : '25%'}}>
                    <div> {el.id} </div>
                    <div> {el.name} </div>
                    <div
                      style={{ color : '#ababab' }} 
                      onClick={() => this._modify(el)}> Modify </div>
                    <div
                      style={{ color : '#ababab' }} 
                      onClick={() => this._modify(el)}> Modify </div>
                  </div>
                )
              })
            
              : null}
          </div>
      </div>
    )
  }
}

export default App;
*/


/*
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    //this.state = {
     // host : '',
    //}
  }

  //api 사용할 수 있는 코드
  componentDidMount() {
    this._addData();
  }

  _addData = async(e) => {
    console.log(await axios('/add/data', {
      method : 'POST',
      data : { 'test' : 'Complete!' },
      headers: new Headers()
    }))
  }


  componentDidMount() {
    this._getHost();
  }

  componentDidMount() {
    this._dbTest();
  }
  
  _dbTest = async() => {
    const res = await axios.get('/api/test');
    console.log(res.data)
  }

  _getHost = async() => {
    const res = await axios.get('/api/host');
    this.setState({ host : res.data.host })
  }

  render() {
    return(
      <div className='App'>
        <h3> Welcome to <u> {this.state.host} </u> Blog! </h3>
      </div>
    )
  }
}

export default App;
*/
//
