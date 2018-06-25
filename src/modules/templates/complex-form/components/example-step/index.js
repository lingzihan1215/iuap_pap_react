import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { actions } from 'mirrorx';
import { Step,Button } from 'tinper-bee';
import Form from 'bee-form';
import Header from 'components/Header'; 
import StepOne from './step-one';
import StepTwo from './step-two';
import StepThree from './step-three';
import './index.less';

/**
 * 简要说明：
 * 1、当点击下一页面时，需要校验当前页面的form区域，通过传入 validateFlag 来控制校验时机
 * 2、当form区域校验时，会调用此组件的 validates 方法，并将校验结果传入。 如果校验失败则不跳转到下一页
 * 3、每一块form区域校验后，将校验后的结果存入到此组件的 formData 这个state中，最后提交将 formData 传入到后台即可
 */
class exampleStep extends Component{
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
          formData:{},
        };
      }

    /**
     * 下一页
     */
    next=()=> {
        actions.example.updateState({
            validateNum:this.state.current
        })
    }

    /**
     * 上一页
     */
    prev=()=> {
        this.setState({ 
            current:this.state.current - 1
        });   
    }

    /**
     * 提交
     */
    commit=()=>{
        console.log(this.state.formData);
        actions.example.updateState({
            validateNum:this.state.current
        })
    }

    /**
     * 校验的回调
     * @param {*} current 被校验的form区域
     * @param {*} error 校验错误信息，如果没有为null
     * @param {*} values 校验后的数据
     */
    validates=(current,error,values)=>{
        if(!error){
            this.setState({ 
                current:this.state.current + 1,
                formData:Object.assign(this.state.formData,values)
            });
        }
    }

    render(){
        const self=this;
        const { validateNum, form } = this.props;
        const { current } = this.state;
        return (
            <div className='example-step'>
                 <Step.Steps current={current}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Step.Steps>
                <div className='step-content'>
                    <div className='edit-panel' style={{'display':current==0?'block':'none'}}>
                        <StepOne form={form} validateFlag={validateNum==0} validatefn={(error,values)=>{self.validates(0,error,values)}} />
                    </div>
                    <div className='edit-panel' style={{'display':current==1?'block':'none'}}>
                        <StepTwo form={form} validateFlag={validateNum==1} validatefn={(error,values)=>{self.validates(1,error,values)}} />
                    </div>
                    <div className='edit-panel' style={{'display':current==2?'block':'none'}}>
                        <StepThree form={form} validateFlag={validateNum==2} validatefn={(error,values)=>{self.validates(2,error,values)}}/>
                    </div>
                    <div className='edit-panel success-panel' style={{'display':current==3?'block':'none'}}>
                        <h1>
                            提交成功
                        </h1>
                    </div>
                </div>
                <div className='step-btn'>
                    <Button onClick={this.prev} style={{'display':current>0?'inline-block':'none'}}>
                        上一页
                    </Button>
                    <Button onClick={this.next} style={{'display':(current==2||current==3)?'none':'inline-block'}}>
                        下一页
                    </Button>
                    <Button onClick={this.commit} style={{'display':current==2?'inline-block':'none'}}>
                        提交
                    </Button>
                </div>
            </div>
        )
    }
}

export default Form.createForm()(exampleStep);