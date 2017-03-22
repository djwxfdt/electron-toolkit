import React from 'react'
require('../../../css/component/calculator.less')

export default class Calculator extends React.Component{

    state = {
        result:0,
        typing:false,
        current:"",
        clear_key:"AC",
        operator:"",
        left_num:0,
        right_num:0,
        temp_num:0,
        operator_checked:false,
        result_ok: false,
    };

    _handleNumberInput(number){
        if (number == 0){
              if (this.state.typing){
                  if (this.state.current.length <= 0){
                      return;
                  }else if (this.state.current.length > 0 && Number(this.state.current) == 0) {
                      let index = this.state.current.indexOf(".");
                      if (index == -1){
                        return;
                      }
                  }
              }else{
                if (this.state.result == 0){
                    return;
                }
              }
        }
        if(this.state.current.length == 1){
            if (Number(this.state.current) == 0){
                this.state.current = "";
            }
        }
        if (this.state.operator_checked){
          this.state.current = "";
          this.setState({operator_checked:false});
        }
        let res;
        if(number == 99){
            let index = this.state.current.indexOf(".");
            if (index == -1){
                if (this.state.current != ""){
                    res = this.state.current + ".";
                }else{
                    res = "0.";
                }
            }
            else{
                return;
            }
        }
        else{
          res = this.state.current + number;
        }

        if(res.length > 9)
            return;
        if (this.state.operator != ""){
            this.setState({typing:true,current:res,clear_key:"C",right_num:Number(res),result_ok:false});
        }
        else{
            this.setState({typing:true,current:res,clear_key:"C",left_num:Number(res),result_ok:false});
        }
    }
    _handleReverse(){
        if (this.state.operator != ""){

            if (this.state.typing){
              let revValue = 0 - Number(this.state.current);
              if (this.state.operator_checked){
                this.setState({typing:true,current:revValue.toString(),clear_key:"C",left_num:revValue});
              }
              else{
                this.setState({typing:true,current:revValue.toString(),clear_key:"C",right_num:revValue});
              }
            }else{
              let revValue = 0 - this.state.result;
              this.setState({typing:true,current:revValue.toString(),clear_key:"C",left_num:revValue});
            }
        }
        else{
            let revValue = 0 - Number(this.state.current);
            this.setState({typing:true,current:revValue.toString(),clear_key:"C",left_num:revValue});
        }
    }
    _handlePercentage(){
        if (this.state.operator != ""){

            if (this.state.typing){
              let revValue = Number(this.state.current) / 100;
              this.setState({typing:true,current:this._checkPercentageNumber(revValue).toString(),clear_key:"C",right_num:Number(this._checkPercentageNumber(revValue))});
            }else{
              let revValue = this.state.result / 100;
              this.setState({typing:true,current:this._checkPercentageNumber(revValue).toString(),clear_key:"C",left_num:Number(this._checkPercentageNumber(revValue))});
            }
        }
        else{
            let revValue = Number(this.state.current) / 100;
            this.setState({typing:true,current:this._checkPercentageNumber(revValue).toString(),clear_key:"C",left_num:Number(this._checkPercentageNumber(revValue))});
        }
    }
    _checkPercentageNumber(number){
          let resSub = number.toString();
          let resStr = number.toString();
          if (number.toString().length > 9){
              let index = resStr.indexOf(".");
              let index_e = resStr.indexOf("e");
              if (index == -1 && index_e == -1){
                  resSub = resStr.substring(0,1) + "." + resStr.substring(1,4) + "e+" + resStr.substring(resStr.length-4,resStr.length-2);
              }
              else if (index > 0 && index_e > 0) {
                  resSub = resStr.substring(0,3) + resStr.substring(index_e-1);
              }
              else if (index > 5) {
                resSub = resStr.substring(0,index);
              }
              else if (index < 5 && index_e == -1) {
                resSub = resStr.substring(0,7);
              }
          }
          return resSub;
    }
    _handleClearInput(){
        this.setState({typing:false,current:"",result:0,clear_key:"AC",left_num:0,right_num:0,temp_num:0,operator:""});
    }
    _handleOperator(operator){
        if (this.state.operator != "" &&  !this.state.operator_checked && !this.state.result_ok){
            this._handleCalculateResult();
        }
        this.setState({operator:operator,operator_checked:true});
    }
    _handleCalculateResult(){
        let res;
        if(this.state.operator == "+"){
            res = this.state.left_num + this.state.right_num;
        }else if (this.state.operator == "-") {
            res = this.state.left_num - this.state.right_num;
        }else if (this.state.operator == "×") {
            res = this.state.left_num * this.state.right_num;
        }else if (this.state.operator == "÷") {
            res = this.state.left_num / this.state.right_num;
        }else{
            return;
        }
        let resStr = res.toString();
        if (resStr.length < 9){

          if (resStr == "Infinity"){
            this.setState({typing:true,current:"错误",result:0,clear_key:"C",left_num:0,right_num:0,temp_num:0,operator:"",operator_checked:true});
          }
          else if (this.state.current == "错误") {
            this.setState({typing:false,current:"",result:0,clear_key:"C",left_num:0,right_num:0,temp_num:0,operator:"",operator_checked:true});
          }
          else{
            this.setState({left_num:res,typing:false,result:res,current:"",result_ok:true});
          }
        }
        else{
            let index = resStr.indexOf(".");
            let index_e = resStr.indexOf("e");
            let resSub;
            if (index == -1 && index_e == -1){
                if(Number(resStr) > 0){
                    resSub = resStr.substring(0,1) + "." + resStr.substring(1,4) + "e+" + resStr.substring(resStr.length-4,resStr.length-2);
                }else{
                    resSub = resStr.substring(0,2) + "." + resStr.substring(2,4) + "e+" + resStr.substring(resStr.length-4,resStr.length-2);
                }
            }
            else if (index > 0 && index_e > 0) {
                resSub = resStr.substring(0,3) + resStr.substring(index_e-1);
            }
            else if (index > 6) {
              resSub = resStr.substring(0,3) + "e+" + resStr.substring(resStr.length-1);
            }
            else if (index <= 6 && index_e == -1) {
              resSub = resStr.substring(0,8);
            }
            this.setState({left_num:res,typing:true,result:res,current:resSub,result_ok:true});
        }
    }

    render(){
        return(
            <div className="calculator">
                <div className="tool-content">
                    <div className="input">
                        {this.state.typing?this.state.current:this.state.result}
                    </div>
                    <div className="row">
                        <div className="item" onClick={this._handleClearInput.bind(this)}>{this.state.clear_key}</div>
                        <div className="item" onClick={this._handleReverse.bind(this)}>+/-</div>
                        <div className="item" onClick={this._handlePercentage.bind(this)}>%</div>
                        {
                          (() => {
                              let cl = ((this.state.operator_checked) && (this.state.operator == "÷"))?"item selected":"item";
                              return <div className={cl} onClick={this._handleOperator.bind(this,"÷")}>÷</div>
                          })()
                        }
                    </div>
                    <div className="row">
                        <div className="item" onClick={this._handleNumberInput.bind(this,7)}>7</div>
                        <div className="item" onClick={this._handleNumberInput.bind(this,8)}>8</div>
                        <div className="item" onClick={this._handleNumberInput.bind(this,9)}>9</div>
                        {
                          (() => {
                              let cl = ((this.state.operator_checked) && (this.state.operator == "×"))?"item selected":"item";
                              return <div className={cl} onClick={this._handleOperator.bind(this,"×")}>×</div>
                          })()
                        }
                    </div>
                    <div className="row">
                        <div className="item" onClick={this._handleNumberInput.bind(this,4)}>4</div>
                        <div className="item" onClick={this._handleNumberInput.bind(this,5)}>5</div>
                        <div className="item" onClick={this._handleNumberInput.bind(this,6)}>6</div>
                        {
                          (() => {
                              let cl = ((this.state.operator_checked) && (this.state.operator == "-"))?"item selected":"item";
                              return <div className={cl} onClick={this._handleOperator.bind(this,"-")}>-</div>
                          })()
                        }
                    </div>
                    <div className="row">
                        <div className="item" onClick={this._handleNumberInput.bind(this,1)}>1</div>
                        <div className="item" onClick={this._handleNumberInput.bind(this,2)}>2</div>
                        <div className="item" onClick={this._handleNumberInput.bind(this,3)}>3</div>
                        {
                          (() => {
                              let cl = ((this.state.operator_checked) && (this.state.operator == "+"))?"item selected":"item";
                              return <div className={cl} onClick={this._handleOperator.bind(this,"+")}>+</div>
                          })()
                        }
                    </div>
                    <div className="row">
                        <div className="item" style={{width:"199px"}} onClick={this._handleNumberInput.bind(this,0)}>0</div>
                        <div className="item" onClick={this._handleNumberInput.bind(this,99)}>.</div>
                        <div className="item" onClick={this._handleCalculateResult.bind(this)}>=</div>
                    </div>
                </div>
            </div>
        )
    }
}
