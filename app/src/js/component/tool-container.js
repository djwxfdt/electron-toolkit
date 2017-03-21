import React from 'react'

import { Link} from 'react-router-dom';

// require('../../css/component/tool-container.less')


export default class ToolContainer extends React.Component{

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
            {(()=>{
                if(this.props.children){
                    return this.props.children
                }
                else{
                    return (
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",width:"780px"}}>
                        {
                            this.props.links.map((link,index)=>{
                                return(
                                        <Link to={link.path} activeClassName="active" className={link.key} key={index}></Link>
                                )
                            })
                        }
                        </div>

                    )
                }
            })()}

            </div>
        )
    }
}
