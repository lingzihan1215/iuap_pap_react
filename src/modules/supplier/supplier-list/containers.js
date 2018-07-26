/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import model from './models';

import SupplierList from './components/list';

//注入Model
if(!(model.name in mirror.actions)){    mirror.model(model);};

export const supplierList= connect((state) => state.supplier)(SupplierList);
