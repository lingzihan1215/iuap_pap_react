import React, { Component } from "react";
import ContractStep from "../tree-modul/TreeModul";
import ContractEdit from "../contract-edit/ContractEdit";
class Contracts extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return [<ContractStep />, <ContractEdit />];
  }
}
export default Contracts;
