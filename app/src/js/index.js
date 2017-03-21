'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

// var remote = require('electron-prebuilt').remote;

import {Link, BrowserRouter as Router, Route} from 'react-router-dom'

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// require('less-loader!../css/index.less')

import TitleBar from './component/title-bar'
import ToolContainer from './component/tool-container'

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
        window.location.href = "#/tool";
    }

    render() {
        return (
                <div className="container">
                    <TitleBar/>
                    <div className="content">
                        <ReactCSSTransitionGroup className="top-title" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                            {/* {(() => {
                                if (url.indexOf('/tool') == 0 || url == "/") {
                                    return <div className="tool title" key="tool">
                                        <a className="icon" href="#/tool"></a>
                                    </div >
                                }
                            })()} */}
                        </ReactCSSTransitionGroup>
                        <div className="center-content">
                            <ReactCSSTransitionGroup component="div" className="left-navigations" transitionName="nav" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                {/* {this.props.links.map(function(link, index) {
                                    if (url.indexOf(link.url) != 0)
                                        return <Link className={link.key} to={link.url} activeClassName="active" key={index}></Link>
                                })} */}
                            </ReactCSSTransitionGroup>

                            <ReactCSSTransitionGroup component="div" transitionName="router" className="right-contents" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                                <Route path="/" key="tool" component={ToolContainer} />
                            </ReactCSSTransitionGroup>

                        </div>
                    </div>
                </div>
        )
    }
}

ReactDOM.render(<Router ><App/></Router>
    , document.getElementById('app'))
