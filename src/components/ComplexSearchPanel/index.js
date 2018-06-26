import React, { Component } from 'react';
import { Button,Panel } from 'tinper-bee';
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
    simple:PropTypes.node,
    complex:PropTypes.node,
    moreName:PropTypes.string,
    openFn:PropTypes.func,
    closeFn:PropTypes.func
};

const defaultProps = {
    search: () => {},
    reset: () => {},
    resetName:'清空',
    searchName:'查询',
    moreName:'更多查询',
    openFn:()=>{},
    closeFn:()=>{}
};


class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    open=()=>{
        if(this.state.open){
            this.props.closeFn()
        }else{
            this.props.openFn()
        }
        this.setState({
            open:!this.state.open
        })
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
        const {children,className,resetName,searchName,simple,complex,moreName } = this.props;
        let classes = 'search-panel';
        if(className){
            classes += ' '+className
        }
        return (
           <div className={classes}>
                <div className='search-panel-simple'>
                    <span className='search-panel-more' onClick={this.open}>
                        {moreName}
                    </span>
                    {simple}
                </div>
                <Panel collapsible expanded={this.state.open} className='search-panel-complex'>
                    {complex}
                </Panel>
                <div className='search-panel-btn'>
                    <Button size='sm' className='reset-btn' onClick={this.reset}>{resetName}</Button>
                    <Button size='sm' className='submit-btn' onClick={this.search}>{searchName}</Button>
                </div>
           </div>
        )
    }
}
SearchPanel.propTypes = propTypes;
SearchPanel.defaultProps = defaultProps;
export default SearchPanel;
