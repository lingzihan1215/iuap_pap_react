/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import model from './models';
import UserInfo from './components/UserInfo'
import EnterpriseInfo from './components/EnterpriseInfo';
import ContactInfo from './components/ContactInfo';
import RegisterInfo from './components/RegisterInfo';
import SupplierList from './components/supplier-list';

//注入Model
mirror.model(model);

export const userinfo = connect((state) => state.suppliermanager)(UserInfo);
export const enterpriseinfo= connect((state) => state.suppliermanager)(EnterpriseInfo);
export const contactinfo= connect((state) => state.suppliermanager)(ContactInfo);
export const registerInfo= connect((state) => state.suppliermanager)(RegisterInfo);
export const supplierList= connect((state) => state.suppliermanager)(SupplierList);
