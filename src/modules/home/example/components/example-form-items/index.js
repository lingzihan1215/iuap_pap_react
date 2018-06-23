import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import {Button} from 'tinper-bee';
import Header from 'components/Header';
import createModal from 'yyuap-ref';
import './index.less';


/**
 * ExampleRef Component
 * 参照示例
 */
class ExampleRef  extends Component {
    constructor(props) { 
        super(props);
        this.state = {

        }
    }
    
    render() {
        const self=this;
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='example-ref'>
                <Header title='参照示例'/>
            </div>
        )
    }
}
export default ExampleRef;