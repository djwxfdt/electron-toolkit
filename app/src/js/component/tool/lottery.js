
import React from 'react'

require('../../../css/component/lottery.less')


export default class Lottery extends React.Component{
      state = {
          "current_active":0,
          "current_page":0,
          "commonData":[],
          "highData":[],
          "lowData":[],
          "lotteryCode": "",
          "lotteryName": "",
          "openTime": "",
          "expect" : "",
          "openCode" : "",
          "detailData": []
      };
      static defaultProps = {
          categories : [{name:'全国彩',lotterytype:"1"},
                        {name:'高频彩',lotterytype:"2"},
                        {name:'低频彩',lotterytype:"3"}],

      };
      componentDidMount(){
          this._getData();


      };
      _getData(){

          fetch("http://apis.baidu.com/apistore/lottery/lotterylist?lotterytype=1",{
              headers: {
                 'Accept': 'application/json',
                 'apikey': '6d7510a2333b6b649c40055c1d0d5915',
             }})
              .then((response) => response.json())
              .then((responseData) => {

                  if(responseData.retMsg == "success"){
                      this.setState({commonData:responseData.retData});

                  }
              }).catch((error) => {
                  console.warn(error);
              });

          fetch("http://apis.baidu.com/apistore/lottery/lotterylist?lotterytype=2",{
              headers: {
                 'Accept': 'application/json',
                 'apikey': '6d7510a2333b6b649c40055c1d0d5915',
             }})
              .then((response) => response.json())
              .then((responseData) => {

                  if(responseData.retMsg == "success"){
                      this.setState({highData:responseData.retData});

                  }
              }).catch((error) => {
                  console.warn(error);
              });

          fetch("http://apis.baidu.com/apistore/lottery/lotterylist?lotterytype=3",{
              headers: {
                 'Accept': 'application/json',
                 'apikey': '6d7510a2333b6b649c40055c1d0d5915',
             }})
              .then((response) => response.json())
              .then((responseData) => {

                  if(responseData.retMsg == "success"){
                      this.setState({lowData:responseData.retData});

                  }
              }).catch((error) => {
                  console.warn(error);
              });
      };
      lottery_categories_click(index){
          this.setState({current_active:index});
          this.setState({current_page:0});
      };

      goLotteryDetail(lotteryCode,lotteryName){

          this.setState({lotteryCode:"", lotteryName:"", openTime:"", expect:"", openCode:"", detailData:"" });

          let url = "http://apis.baidu.com/apistore/lottery/lotteryquery?lotterycode=" + lotteryCode + "&recordcnt=20";

          fetch(url,{
                headers: {
                  'Accept': 'application/json',
                  'apikey': '6d7510a2333b6b649c40055c1d0d5915',
                }})
                  .then((response) => response.json())
                  .then((responseData) => {
                      if(responseData.retMsg == "success"){

                          this.setState({detailData:responseData.retData.data});

                          if(this.state.detailData.length > 0)
                          {
                            var openCode = this.state.detailData[0].openCode;
                            var expect = "第" + this.state.detailData[0].expect + "期";
                            var openTime = this.state.detailData[0].openTime;

                            this.setState({openCode: openCode, expect: expect, openTime: openTime});
                          }
                      }
                  }).catch((error) => {
                      console.warn(error);
                  });

          this.setState({lotteryCode:lotteryCode,lotteryName:lotteryName,current_page:1});
      };
      closeBtnClick(){
          if (this.state.current_page == 0){
              window.location.href="#/tool";
              // close();
          }else if (this.state.current_page == 1) {
              this.setState({current_page: 0});
          }
      }
      render () {
          return (
              <div className="lottery">
                  <div className="content">
                      <div className="top-content">
                          <div className="logo-text">彩票查询</div>
                          <div className="close-btn" onClick={this.closeBtnClick.bind(this)}></div>
                      </div>
                      <div className="category">
                          {this.props.categories.map(function(value,index){
                              var cl = index == this.state.current_active?'active':'';
                              return <a href="javascript:void(0)" className={cl} key={'lottery_categories' + index } onClick={this.lottery_categories_click.bind(this,index)}>{value.name}</a>
                          }.bind(this))}
                      </div>
                      {
                        (() => {
                          if (this.state.current_page == 0){
                              return <div className="query">
                                      {
                                          (() => {
                                              if (this.state.current_active == 0 && this.state.commonData.length > 0){
                                                return <div className="common-lottery">
                                                        {this.state.commonData.map(function(value,index){
                                                            var img_url = "url(src/images/" + value.lotteryCode + ".png)";
                                                            return <div className="common-li" key={index}>
                                                                        <span className="icon" style={{backgroundImage:img_url}} onClick={this.goLotteryDetail.bind(this,value.lotteryCode,value.lotteryName)}></span>
                                                                        <span className="name" onClick={this.goLotteryDetail.bind(this,value.lotteryCode,value.lotteryName)}>{value.lotteryName}</span>
                                                                   </div>
                                                        }.bind(this))}
                                                      </div>

                                              }else {
                                                let list = [];
                                                if (this.state.current_active == 1){
                                                    list = this.state.highData;
                                                }else if (this.state.current_active == 2) {
                                                    list = this.state.lowData;
                                                }
                                                if (list.length > 0){
                                                  return  <div className="other-lottery">
                                                              {list.map((value,index)=>{
                                                                  var lotteryName = value.lotteryName;
                                                                  if (this.state.current_active == 1){
                                                                      lotteryName = lotteryName.split(" - 高频");
                                                                  }
                                                                  return(
                                                                      <div className="other-li" key={index} onClick={this.goLotteryDetail.bind(this,value.lotteryCode,value.lotteryName)}>
                                                                          {lotteryName}
                                                                      </div>
                                                                  )
                                                              })}
                                                          </div>
                                                }
                                              }
                                          })()
                                      }
                                  </div>
                          }
                          else if (this.state.current_page == 1) {
                              return <div className="detail">
                                        <div className="detail-top">
                                          {
                                            (() => {
                                              if (this.state.current_active == 0){
                                                var img_url = "url(src/images/" + this.state.lotteryCode + ".png)";
                                                return <div className="icon-div"><span className="icon" style={{backgroundImage:img_url}}></span></div>
                                              }
                                            })()
                                          }
                                          <div className="info">
                                              <div className="name">{this.state.lotteryName}</div>
                                              <div className="other-info">
                                                  <span className="time">{this.state.openTime}</span>
                                                  <span className="expect">{this.state.expect}</span>
                                              </div>
                                          </div>

                                        </div>
                                        <div className="detail-middle">
                                             <div className="num-text">开奖号码</div>
                                             <div className="open-code">
                                              {
                                                (() => {
                                                  if (this.state.openCode != "")
                                                  {
                                                      var openCode = this.state.openCode.split("+");
                                                      if (openCode.length > 1){

                                                          return <div className="redblue-code">
                                                                  {openCode.map(function(code_value,code_index){
                                                                    var num = code_value.split(",");
                                                                    var cl = code_index == 0? "red-code": "blue-code";

                                                                    return <span className="code-span" key={code_index}>
                                                                              {num.map(function(vv,ii){
                                                                                return <span className={cl} key={ii}>{vv}</span>
                                                                              })}
                                                                          </span>
                                                                  })}
                                                                </div>

                                                      }else if (openCode.length == 1) {
                                                        var splitCode = this.state.openCode.split(",");
                                                        var cl = "red-code";
                                                        if (this.state.openCode.length > 22){
                                                            cl = "red-code less-left";
                                                        }
                                                        return <div className="code-div">
                                                            {splitCode.map(function(code_value,code_index){
                                                              return <span className={cl} key={code_index}>{code_value}</span>
                                                            })}
                                                        </div>
                                                      }
                                                  }
                                                })()
                                              }
                                             </div>
                                        </div>
                                        <div className="detail-bottom-head">
                                            <div className="expect-char">期号</div>
                                            <div className="code-char">号码</div>
                                            <div className="expect-char">期号</div>
                                            <div className="code-char">号码</div>
                                        </div>
                                        {
                                            (() => {
                                                  if (this.state.detailData.length > 0 ){
                                                  return  <div className="detail-bottom">

                                                            {this.state.detailData.map(function(value,index){

                                                                var expect = "第" + value.expect + "期";
                                                                var openCode = value.openCode.split("+");

                                                                return <div className="opencode-div" key={index}>
                                                                            <div className="expect">{expect}</div>
                                                                            <div className="code">
                                                                                {
                                                                                  (() => {
                                                                                      if (openCode.length > 1){
                                                                                          return <div >
                                                                                                  {openCode.map(function(code_value,code_index){
                                                                                                    var num = code_value.split(",");
                                                                                                    var cl = code_index == 0? "redcode": "bluecode";

                                                                                                    return <span className="code-span" key={code_index}>
                                                                                                              {num.map(function(vv,ii){
                                                                                                                return <span className={cl} key={ii}>{vv}</span>
                                                                                                              })}
                                                                                                          </span>
                                                                                                  })}
                                                                                                </div>
                                                                                      }
                                                                                      else if (openCode.length == 1){
                                                                                        var splitCode = value.openCode.split(",");
                                                                                        return <div className="allred-div">
                                                                                            {splitCode.map(function(code_value,code_index){
                                                                                              return <span className="allred" key={code_index}>{code_value}</span>
                                                                                            })}
                                                                                        </div>
                                                                                      }
                                                                                  })()
                                                                                }
                                                                            </div>
                                                                       </div>

                                                            }.bind(this))}
                                                      </div>
                                                  }
                                            })()
                                        }

                                     </div>
                          }
                        })()
                      }

                  </div>

              </div>
          )
      }
}
