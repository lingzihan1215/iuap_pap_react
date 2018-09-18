/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import manageList from './components/List';
import model from './models'

//注入Model
if(!(model.name in mirror.actions)){    mirror.model(model);};


export const interList= connect((state) => state.inter)(manageList);
