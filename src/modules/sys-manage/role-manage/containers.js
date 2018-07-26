/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import List from './components/List';
import Edit from './components/Edit';
import model from './models'

//注入Model
if(!(model.name in mirror.actions)){    mirror.model(model);};


export const roleList= connect((state) => state.role)(List);
export const roleEdit= connect((state) => state.role)(Edit);
