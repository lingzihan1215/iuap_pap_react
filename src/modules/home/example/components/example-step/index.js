import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { actions } from 'mirrorx';
import { Step,Button } from 'tinper-bee';
import Form from 'bee-form';
import Header from 'components/Header'; 
import StepOne from './step-one';
import StepTwo from './step-two';
import StepThree from './step-three';

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

    validates(current,error,values){
        console.log(current);
        console.log(error);
        console.log(values);
        if(!error){
            this.setState({ 
                current:this.state.current + 1
            });
        }
    }

    render(){
        const self=this;
        return (
            <div className='example-step'>
                 <Step.Steps current={this.state.current}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Step.Steps>
                <div className='step-content'>
                    <div className='edit-panel' style={{'display':this.state.current==0?'block':'none'}}>
                        <StepOne form={this.props.form} validateFlag={this.props.validateNum==0} validatefn={(error,values)=>{self.validates(0,error,values)}} />
                    </div>
                    <div className='edit-panel' style={{'display':this.state.current==1?'block':'none'}}>
                        <StepTwo form={this.props.form} validateFlag={this.props.validateNum==1} validatefn={(error,values)=>{self.validates(1,error,values)}} />
                    </div>
                    <div className='edit-panel' style={{'display':this.state.current==2?'block':'none'}}>
                        <StepThree form={this.props.form} validateFlag={this.props.validateNum==2} validatefn={(error,values)=>{self.validates(2,error,values)}}/>
                    </div>
                </div>
                <Button onClick={this.next}>
                    下一页
                </Button>
                <Button onClick={this.prev}>
                    上一页
                </Button>
            </div>
        )
    }
}

export default Form.createForm()(exampleStep);