import React, { Component } from "react";
import { Col } from "tinper-bee";
import ContractTitle from "./ContractTitle";
class ContractEdit extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <Col md={10} xs={10} sm={10}>
        {/* title */}
        <ContractTitle />
        Form 部分
      </Col>
    );
  }
}

ContractEdit.propTypes = {};

export default ContractEdit;
