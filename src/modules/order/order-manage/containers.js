/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import manageList from './components/List';
import manageDetail from './components/Detail';
import model from './models'

//注入Model
mirror.model(model);


export const orderList= connect((state) => state.order)(manageList);
export const orderDetail= connect((state) => state.order)(manageDetail);
