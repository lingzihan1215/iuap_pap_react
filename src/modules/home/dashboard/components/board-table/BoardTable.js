import React, { Component } from 'react'
import { Table, Checkbox } from 'tinper-bee'
import NoData from 'components/NoData';
import multiSelect from "tinper-bee/lib/multiSelect.js";
import { Scrollbars } from 'react-custom-scrollbars';

const MultiSelectTable = multiSelect(Table, Checkbox);

export default class BoardTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLoading: true
        }
    }

    tabelSelect = (data) => {

    }

    render(){
        let _this = this;

        setTimeout(() => {
            _this.setState({ showLoading: false})
        }, 2000);

        return (
            <div className="table-list">
                <Scrollbars>
                    <MultiSelectTable
                        loading={{ show: showLoading, loadingType: "line" }}
                        rowKey={(r, i) => i}
                        emptyText={() => <NoData />}
                        columns={columns}
                        data={list}
                        multiSelect={{ type: "checkbox" }}
                        getSelectedDataFunc={this.tabelSelect}
                    />
                </Scrollbars>
            </div>
        )
    }
}