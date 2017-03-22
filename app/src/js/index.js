'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

// var remote = require('electron-prebuilt').remote;

import {Link, BrowserRouter as Router, Route} from 'react-router-dom'

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

require('../css/index.less')

import TitleBar from './component/title-bar'
import * as Tools from './component/tool-container'

class App extends React.Component {
    static defaultProps = {
        links: [
            {
                name: '工具大全',
                url: '/tool',
                key: "tool"
            }
        ]
    };
    componentDidMount() {
    }

    render() {
        return (
                <div className="container">
                    <TitleBar/>
                    <div className="content">
                        <ReactCSSTransitionGroup className="top-title" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                            <div className="tool title" key="tool">
                               <Link to="/tool" className="icon"></Link>
                           </div >
                        </ReactCSSTransitionGroup>
                        <div className="center-content">
                            <ReactCSSTransitionGroup component="div" className="left-navigations" transitionName="nav" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                {this.props.links.map(function(link, index) {
                                    return <Link className={link.key} to={link.url}  key={index}></Link>
                                })}
                            </ReactCSSTransitionGroup>

                            <ReactCSSTransitionGroup component="div" transitionName="router" className="right-contents" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                                <Route path="/tool" key="tool" exact={true} component={Tools.Index} />
                                <Route path="/tool/check-transfer" key="check" component={Tools.ToolTransfer} />
                                <Route path="/tool/call-express" key="call" component={Tools.ToolCall} />
                                <Route path="/tool/lottery" key="lottery" component={Tools.ToolLottery} />
                                <Route path="/tool/calculator" key="calculator" component={Tools.ToolCalculator} />

                            </ReactCSSTransitionGroup>

                        </div>
                    </div>
                </div>
        )
    }
}

ReactDOM.render(<Router ><App/></Router>
    , document.getElementById('app'))
