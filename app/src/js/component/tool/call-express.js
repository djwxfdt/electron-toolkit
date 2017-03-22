import React from 'react'
require('../../../css/component/call-express.less')

export default class CallExpress extends React.Component{

    state = {
        result:0,
        call_status:0,
        current_select:"YT"

    };

    componentDidMount(){

      this.setState({current_select:"YT"});

    }

    yt_clicked()
    {
      this.setState({current_select:"YT"});
    }

    st_clicked()
    {
      this.setState({current_select:"ST"});
    }

    zt_clicked()
    {
      this.setState({current_select:"ZT"});
    }

    ems_clicked()
    {
      this.setState({current_select:"EMS"});
    }

    _handleForm(e){
      e.preventDefault();
      let expresscode = "PPTEST";
      let sendername = this.refs.input2.value;
      let senderphone = this.refs.input3.value;
      let senderprovince = this.refs.input4.value;
      let sendercity = this.refs.input5.value;
      let senderdistrict = this.refs.input6.value;
      let senderaddress = this.refs.input7.value;

      let receivername =  this.refs.input8.value;
      let receiverphone = this.refs.input9.value;
      let receiverprovince = this.refs.input10.value;
      let receivercity =  this.refs.input11.value;
      let receiverdistrict = this.refs.input12.value;
      let receiveraddress =  this.refs.input13.value;

      let goodsname =  this.refs.input14.value;
      let goodsdesc =  this.refs.input15.value;
      let goodsnum = this.refs.input16.value;
      var num = 0;
      if(goodsnum == "")
      {
         num= 1;
      }
      else
      {
        num = parseInt(goodsnum);
      }
      let usernote = this.refs.input17.value;


        if(senderphone!="" && senderprovince!="" && sendercity!="" && senderdistrict!="" &&senderaddress!="")
        {
          //所有信息都填写了
          this.setState({call_status:100});

        }
      // alert(num);

          fetch("http://apis.baidu.com/ppsuda/callexpress/call?"
          + "expresscode=" + expresscode
          + "&sendername=" + sendername
          + "&senderphone=" + senderphone
          + "&senderprovince=" + senderprovince
          + "&sendercity=" + sendercity
          + "&senderdistrict=" + senderdistrict
          + "&senderaddress=" + senderaddress

          + "&receivername=" + receivername
          + "&receiverphone=" + receiverphone
          + "&receiverprovince=" + receiverprovince
          + "&receivercity=" + receivercity
          + "&receiverdistrict=" + receiverdistrict
          + "&receiveraddress=" + receiveraddress

          + "&goodsname=" + goodsname
          + "&goodsdesc=" + goodsdesc
          + "&goodsnum=" + num
          + "&usernote=" + usernote,{
              headers: {
                 'Accept': 'application/json',
                 'apikey': '6d7510a2333b6b649c40055c1d0d5915',
             }})
              .then((response) => response.json())
              .then((responseData) => {

                  if(responseData.result == "1"){

                      //呼叫成功
                        // alert("呼叫成功...");
                        this.setState({call_status:1});

                  }
                  else
                  {
                        // alert("呼叫失败...");
                        this.setState({call_status:-1});
                  }
                  this.setState({result:responseData});
              }).catch((error) => {
                  console.warn(error);
              });

    }

    render(){
        return(
            <div className="call-express">
            <form onSubmit={this._handleForm.bind(this)} id="form">


                  <div className="four-express">
                    <a className="calltip"></a>

                    <a className="yt" href="javascript:void(0)" onClick={this.yt_clicked.bind(this)} title="圆通速递"></a>
                    <a className="yt2" href="javascript:void(0)" onClick={this.yt_clicked.bind(this)} title="圆通速递"></a>

                    <a className="st" href="javascript:void(0)" onClick={this.st_clicked.bind(this)} title="申通速递"></a>
                    <a className="st2" href="javascript:void(0)" onClick={this.st_clicked.bind(this)} title="申通速递"></a>

                    <a className="zt" href="javascript:void(0)" onClick={this.zt_clicked.bind(this)} title="中通速递"></a>
                    <a className="zt2" href="javascript:void(0)" onClick={this.zt_clicked.bind(this)} title="中通速递"></a>

                    <a className="ems" href="javascript:void(0)" onClick={this.ems_clicked.bind(this)} title="邮政EMS"></a>
                    <a className="ems2" href="javascript:void(0)" onClick={this.ems_clicked.bind(this)} title="邮政EMS"></a>
                  </div>

                  <div className="line"/>

                  <div className="sendinfo">
                    <div className="sendbg">
                          <div className="send-left">
                            <a className="sendinfo1">快递公司代码</a>
                            <a className="sendinfo2">发件人姓名</a>
                            <a className="sendinfo2">发件人手机号 </a>
                            <a className="sendinfo2">发件人地址(省)</a>
                            <a className="sendinfo2">发件人地址(市)</a>
                            <a className="sendinfo2">发件人地址(区)</a>
                            <a className="sendinfo2">详细地址</a>
                          </div>

                          <div className="send-right">
                            <input className="sendinfo1_value" type="text" required placeholder="快递公司代码"  ref="input1" value={this.state.current_select} readOnly="true" />
                            <input className="sendinfo2_value" type="text" required placeholder="发件人姓名"  ref="input2" />
                            <input className="sendinfo2_value" type="number" required placeholder="发件人手机号"  ref="input3"  />
                            <input className="sendinfo2_value" type="text" required placeholder="发件人地址(省)"  ref="input4" />
                            <input className="sendinfo2_value" type="text" required placeholder="发件人地址(市)"  ref="input5" />
                            <input className="sendinfo2_value" type="text" required placeholder="发件人地址(区)"  ref="input6" />
                            <textarea className="sendinfo3_value" type="text" required placeholder="详细地址"  ref="input7" />
                          </div>
                    </div>
                    <div className="receivebg">
                          <div className="receive-left">
                            <a className="receiveinfo1">收件人姓名</a>
                            <a className="receiveinfo2">收件人手机号</a>
                            <a className="receiveinfo2">收件人地址(省)</a>
                            <a className="receiveinfo2">收件人地址(市)</a>
                            <a className="receiveinfo2">收件人地址(区)</a>
                            <a className="receiveinfo2">详细地址</a>
                          </div>

                          <div className="receive-right">
                            <input className="receiveinfo1_value" type="text"  placeholder="收件人姓名"  ref="input8"/>
                            <input className="receiveinfo2_value" type="number"  placeholder="收件人手机号"  ref="input9"/>
                            <input className="receiveinfo2_value" type="text"  placeholder="收件人地址(省)"  ref="input10"/>
                            <input className="receiveinfo2_value" type="text"  placeholder="收件人地址(市)"  ref="input11"/>
                            <input className="receiveinfo2_value" type="text"  placeholder="收件人地址(区)"  ref="input12"/>
                            <textarea className="receiveinfo3_value" type="text"  placeholder="详细地址"  ref="input13"/>
                          </div>
                    </div>
                  </div>

                  <div className="goodinfo">

                    <div className="goodinfobg">
                        <div className="goodinfo-left">
                          <a className="goodinfo1">物品名称</a>
                          <a className="goodinfo2">物品描述</a>
                          <a className="goodinfo2">物品数量 </a>
                          <a className="goodinfo2">用户留言</a>
                        </div>

                        <div className="goodinfo-right">
                          <input className="goodinfo1_value" type="text"  placeholder="物品名称"  ref="input14"/>
                          <input className="goodinfo2_value" type="text"  placeholder="物品描述"  ref="input15"/>
                          <input className="goodinfo2_value" type="number"  placeholder="物品数量"  ref="input16"/>
                          <textarea className="goodinfo3_value" type="text"  placeholder="用户留言"  ref="input17"/>
                        </div>
                    </div>
                    <div className="call">

                        {
                          (() =>{
                              if(this.state.call_status !=100)
                              {
                                return <div>
                                          <input type="submit" className="call-btn" value="确认呼叫" />
                                       </div>

                              }
                              if(this.state.call_status == 100)
                              {
                                return  <div>
                                          <a type="submit" className="call-btn2" value="正在呼叫" />
                                        </div>

                              }
                          })()
                        }

                      {
                          (() => {
                                if(this.state.call_status == 1)
                                {
                                  return <div className="success">
                                            <a href="javascript:void(0)" className="call-success"></a>
                                            <a href="javascript:void(0)" className="call-success-tips">请耐心等待工作人员联系您</a>
                                        </div>
                                }
                                if(this.state.call_status == -1)
                                {
                                  return <div className="faild">
                                            <a href="javascript:void(0)" className="call-faild"></a>
                                            <a href="javascript:void(0)" className="call-faild-tips">请检查网络是否连接或重新呼叫</a>
                                        </div>
                                }

                                if(this.state.call_status == 0)
                                {
                                  return <div className="nocall">
                                        </div>
                                }
                              })()
                      }
                    </div>
                  </div>
              </form>
            </div>
        )
    }

}
