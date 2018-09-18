/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import manageList from './components/List';
import manageDetail from './components/Detail';
import model from './models'

//注入Model
if(!(model.name in mirror.actions)){    mirror.model(model);};


export const tenantList= connect((state) => state.tenant)(manageList);
export const orderDetail= connect((state) => state.tenant)(manageDetail);
