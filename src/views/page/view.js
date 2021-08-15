import React, { Component } from 'react';
import './main.css';
import axios from 'axios';

class view extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data : [],
        date : ""
    }
  }

  componentWillMount() {
    this._getData()
  }

  _getData = async function() {
    const board_id = this.props.match.params.data;

    const getData = await axios('/get/board_data', {
      method : 'POST',
      headers: new Headers(),
      data : { id : board_id }
    });

    const date = getData.data[0].date.slice(0, 10) + ' ' + getData.data[0].date.slice(11, 16);
    console.log(getData)

    return this.setState({ data : getData, date : date })
    
  }


  render() {

    const { data, date } = this.state;

    return (
        <div className='Write'>
          {data.data 
          ? <div>

              <div className='top_title'>
                <input type='text' id='title_txt' name='title' defaultValue={data.data[0].title} readOnly/>

                <div className='date_div'>
                  {date}
                </div>
              </div>
              
              <div>
                <textarea id='content_txt' name='contents' defaultValue={data.data[0].contents} readOnly></textarea>
              </div>
            </div>
          : null}
        </div>

    );
  }
}

export default view;


