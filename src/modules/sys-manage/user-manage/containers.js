/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import List from './components/List';
import model from './models'

//注入Model
mirror.model(model);


export const userList= connect((state) => state.order)(List);
