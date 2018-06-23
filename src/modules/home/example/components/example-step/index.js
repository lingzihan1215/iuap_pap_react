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

class exampleStep extends Component{
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
          formData:{},
        };
      }

    next=()=> {
        actions.example.updateState({
            validateNum:this.state.current
        })
    }
    prev=()=> {
        this.setState({ 
            current:this.state.current - 1
        });   
    }
    commit=()=>{
        actions.example.updateState({
            validateNum:this.state.current
        })
        console.log(this.state.formData);
    }

    validates(current,error,values){
        if(!error){
            this.setState({ 
                current:this.state.current + 1,
                formData:Object.assign(this.state.formData,values)
            });
        }
    }

    render(){
        const self=this;
        const { validateNum } = this.props;
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
                        <StepOne form={this.props.form} validateFlag={this.props.validateNum==0} validatefn={(error,values)=>{self.validates(0,error,values)}} />
                    </div>
                    <div className='edit-panel' style={{'display':current==1?'block':'none'}}>
                        <StepTwo form={this.props.form} validateFlag={this.props.validateNum==1} validatefn={(error,values)=>{self.validates(1,error,values)}} />
                    </div>
                    <div className='edit-panel' style={{'display':current==2?'block':'none'}}>
                        <StepThree form={this.props.form} validateFlag={this.props.validateNum==2} validatefn={(error,values)=>{self.validates(2,error,values)}}/>
                    </div>
                    <div className='edit-panel success-panel' style={{'display':current==3?'block':'none'}}>
                        <h1>
                            提交成功
                        </h1>
                    </div>
                </div>
                <div className='step-btn'>
                    <Button onClick={this.next} style={{'display':(current==2||current==2)?'none':'inline-block'}}>
                        下一页
                    </Button>
                    <Button onClick={this.prev} style={{'display':current>0?'inline-block':'none'}}>
                        上一页
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