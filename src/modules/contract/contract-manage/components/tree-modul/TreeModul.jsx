import React, { Component } from "react";
import { Timeline, Col, Row } from "tinper-bee";

class ContractStep extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <Col md={2} xs={2} sm={2}>
        <div>合同编辑</div>
        <Timeline>
          <Timeline.Item>合同抬头</Timeline.Item>
          <Timeline.Item>合同项目</Timeline.Item>
          <Timeline.Item>合同条款</Timeline.Item>
          <Timeline.Item>合同附件</Timeline.Item>
        </Timeline>
      </Col>
    );
  }
}

export default ContractStep;
