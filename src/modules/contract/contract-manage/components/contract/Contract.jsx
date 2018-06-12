import React, { Component } from "react";
import ContractStep from "../tree-modul/TreeModul";
import ContractEdit from "../contract-edit/ContractEdit";
import './contract.less';
class Contracts extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return <div className="contract_modul clearfix"><ContractStep /><ContractEdit /></div>;
  }
}
export default Contracts;
