import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import PropTypes from 'prop-types';
import './index.less';
import classnames from 'classnames';
/**
 * 部分不能通过this.props.form.resetFields()清空的组件，需要传reset方法，在reset方法中自行清空
 */
const propTypes = {
    search: PropTypes.func,
    reset:PropTypes.func,
    resetName:PropTypes.string,
    searchName:PropTypes.string,
};

const defaultProps = {
    search: () => {},
    reset: () => {}
};


class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }
    search=()=>{
        let self=this;
        this.props.form.validateFields((err, values) => {
            console.log(values);
            self.props.search(err, values);
        });
    }
    reset=()=>{
        this.props.form.resetFields();
        this.props.reset();
    }
    render() {
        const {children,className,form,resetName,searchName } = this.props;
        let classes = 'search-panel';
        if(className){
            classes += ' '+className
        }
        return (
           <div className='search-panel'>
            {children}
                <div className='search-panel-btn'>
                    <Button size='sm' className='reset-btn' onClick={this.reset}>{resetName?resetName:'清空'}</Button>
                    <Button size='sm' className='submit-btn' onClick={this.search}>{searchName?searchName:'查询'}</Button>
                </div>
           </div>
        )
    }
}
SearchPanel.propTypes = propTypes;
SearchPanel.defaultProps = defaultProps;
export default SearchPanel;
