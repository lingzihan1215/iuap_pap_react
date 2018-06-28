import React, { Component } from 'react'
import { Table,Button,Tree,Row,Col} from 'tinper-bee'
import moment from "moment/moment";
import { actions } from "mirrorx";
import './index.less';

class TreeTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    render(){
        const self=this;
        return (
            <div className="tree-table">
                <Header title='树表' />
                <Row>
                    <Col md={3} sm={6} xs={12}>

                    </Col>
                    <Col md={9} sm={6} xs={12}>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TreeTable;