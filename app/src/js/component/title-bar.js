'use strict'


import React from 'react'
// require('../../css/component/title-bar.less')
const electron = window.require('electron');
const remote = electron.remote;



export default class Titlebar extends React.Component{


    state ={
      maxWindow:false
    };

    componentDidMount(){

       var window = remote.getCurrentWindow();

        window.on('maximize', () => {
          console.log('maximize');
          this.setState({maxWindow:true});
        });

        window.on('unmaximize', () => {
            console.log('unmaximize');
           this.setState({maxWindow:false});
        });

    }

    _handleClick(type){
        var window = remote.getCurrentWindow();

        switch (type) {
            case "mini":
                window.minimize();
                break;
            case "full":
                {
                  this.setState({maxWindow:true});
                  window.maximize();
                }
                break;
            case "unfull":
                {
                  this.setState({maxWindow:false});
                  window.unmaximize();
                }
                 break;
            case "close":
                window.close();
                break;
            default:
                break;
        }
    }


    render(){
        return(
            <div className="titlebar webkit-draggable">
                <div className="logo">

                </div>
            	<div className="btn-area">
                    <div className="mini btn" onClick={this._handleClick.bind(this,"mini")} title="最小化"></div>
                    {
                      (() =>{
                          if(!this.state.maxWindow)
                          {
                            return <div className="full btn" onClick={this._handleClick.bind(this,"full")} title="最大化"></div>
                          }
                          else
                          {
                            return <div className="unfull btn" onClick={this._handleClick.bind(this,"unfull")} title="向下还原"></div>
                          }

                      })()
                    }
                    <div className="close btn" onClick={this._handleClick.bind(this,"close")} title="关闭"></div>
                </div>
            </div>
        )
    }
}
