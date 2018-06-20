import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import List from './components/list';
import model from './models'

mirror.model(model);

export const orderList = connect((state) => state.orderTest)(List);
