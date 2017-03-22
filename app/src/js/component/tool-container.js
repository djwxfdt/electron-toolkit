import React from 'react'

import { Link} from 'react-router-dom';

import CheckTransfer from "./tool/check-transfer.js"
import CallExpress from "./tool/call-express.js"
import Calculator from "./tool/calculator.js"
import Lottery from "./tool/lottery.js"


require('../../css/component/tool-container.less')


export class Index extends React.Component{

    static defaultProps = {
        links:[
            {name:"快递查询",path:"/tool/check-transfer",key:"check-transfer-tool item-tool"},
            {name:"计算器",path:"/tool/calculator",key:"calculator-tool item-tool"},
            {name:"彩票查询",path:"/tool/lottery",key:"lottery-tool item-tool"},
            {name:"呼叫快递",path:"/tool/call-express",key:"call-express-tool item-tool"}]
    };

    render(){
        return(
            <div className="tool-container" style={{justifyContent:"center",alignItems:"center"}}>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",width:"780px"}}>
                {
                    this.props.links.map((link,index)=>{
                        return(
                                <Link to={link.path}  className={link.key} key={index}></Link>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export const ToolTransfer = props =><div className="tool-container" style={{justifyContent:"center",alignItems:"center"}}><CheckTransfer /></div>
export const ToolCalculator = props =><div className="tool-container" style={{justifyContent:"center",alignItems:"center"}}><Calculator /></div>
export const ToolCall = props =><div className="tool-container" style={{justifyContent:"center",alignItems:"center"}}><CallExpress /></div>
export const ToolLottery = props =><div className="tool-container" style={{justifyContent:"center",alignItems:"center"}}><Lottery /></div>
