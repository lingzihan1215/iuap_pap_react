/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import List from './components/List';
import Edit from './components/Edit';
import model from './models'

//注入Model
mirror.model(model);


export const userList= connect((state) => state.user)(List);
export const userEdit= connect((state) => state.user)(Edit);
