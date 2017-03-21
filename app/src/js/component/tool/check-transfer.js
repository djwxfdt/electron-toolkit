import React from 'react'
// require('../../../css/component/check-transfer.less')

let json_list = require('../../../json/express-list.json');

import localforage from 'localforage'

var store = localforage.createInstance({
  name: "transfer"
});

export default class CheckTransfer extends React.Component{

    state={
        result:{},
        expresses:json_list.result,
        float:false,
        history:[],
        current_select:{
            name:"圆通",
            type:"YTO"
        }
    };

    componentDidMount(){
        let list = [];
        store.iterate((value,key,number)=>{
            list.push(value);
            console.warn(value);

        },()=>{
            this.setState({history:list});
        });
    }

    _handlePost(){

        let number = this.refs.input.value;
        let type = this.state.current_select.type;

        fetch("http://apis.baidu.com/netpopo/express/express1?type="+type + "&number=" + number,{
            headers: {
               'Accept': 'application/json',
               'apikey': '6d7510a2333b6b649c40055c1d0d5915',
           }})
            .then((response) => response.json())
            .then((responseData) => {

                if(responseData.status == "0"){
                    store.setItem(number,{name:this.state.current_select.name,result:responseData.result});
                }
                this.setState({result:responseData});
            }).catch((error) => {
                console.warn(error);
            });
    }
    _handleFloatClick(show){
        this.setState({float:show});
    }
    _expressSelect(item){
        this.refs.input.value = "";
        this.setState({current_select:{name:item.name,type:item.type}})
    }
    _expressHistory(item){
      this.setState({current_select:{name:item.name,type:item.result.type}})
      this.refs.input.value = item.result.number;
    }
    render(){
        return(
            <div className="check-transfer">

                <div className="content-container">
                    <div className="normal">
                        <div className="title">物流查询</div>
                        <div className="done-list">
                            <div className="label">已查询内容</div>
                            {(()=>{
                                if(this.state.history.length != 0){
                                    return <div className="list">
                                            {this.state.history.map((item,index)=>{
                                              if (index < 10)
                                              {
                                                  return(
                                                      <div className="item" key={index} onClick={this._expressHistory.bind(this,item)}>
                                                          <div className="name">{item.name}</div>
                                                          <div className="number">{item.result.number}</div>
                                                          <div className={"status status" + item.result.issign}></div>
                                                      </div>
                                                  )
                                              }

                                        })}
                                    </div>
                                }
                            })()}

                        </div>
                        <div className="input-area">
                            <input className="input" type="text" required value={this.state.current_select.name} readOnly style={{cursor:"pointer"}} onClick={this._handleFloatClick.bind(this,true)}/>
                            <input className="input" type="text" required placeholder="快递单号"  ref="input"/>

                            <a href="javascript:void(0)" className="post-btn" onClick={this._handlePost.bind(this)}>开始查询</a>
                        </div>
                    </div>
                    {(()=>{
                        if(this.state.result.status == "0" ){
                            return(
                                <div className="detail">
                                    <div className="line" style={{width:"40px"}}>
{/*666418804141*/}
                                        {this.state.result.result.list.map((item,index)=>{
                                            return(
                                                <div className="item" key={index}>
                                                    <div className="circle"></div>
                                                    {(()=>{
                                                        // if(index != this.state.result.result.list.length -1){
                                                            return <div className="v-line"></div>
                                                        // }
                                                    })()}
                                                </div>
                                            )
                                        })}

                                    </div>
                                    <div className="list">
                                        {this.state.result.result.list.map((item,index)=>{
                                            return(
                                                <div className="item" key={index}>
                                                    <div className="text">{item.status}</div>
                                                    <div className="time">{item.time}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        }
                    })()}

                </div>



                {(()=>{
                    if(this.state.float){
                        return(
                            <div className="float-blur" onClick={this._handleFloatClick.bind(this,false)}>
                                <div className="list">
                                    {this.state.expresses.map((item,index)=>{
                                        return(
                                            <div key={index} className={item.type + " list-item"} onClick={this._expressSelect.bind(this,item)}>
                                                {item.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }
                })()}


            </div>
        )
    }


}
