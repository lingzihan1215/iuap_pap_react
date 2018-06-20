import React, { Component } from "react"
import mirror, { connect } from 'mirrorx'

// UI Component
import Load from './components/load'

// 数据模型
import model from './model'
mirror.model(model);

const conectedLoadComponent = connect(state => state.manage, null)(Load);
export default conectedLoadComponent


