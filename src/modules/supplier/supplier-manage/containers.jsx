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
import SupplierDetail from './components/supplier-list/Detail';

//注入Model
mirror.model(model);

export const userinfo = connect((state) => state.supplier)(UserInfo);
export const enterpriseinfo= connect((state) => state.supplier)(EnterpriseInfo);
export const contactinfo= connect((state) => state.supplier)(ContactInfo);
export const registerInfo= connect((state) => state.supplier)(RegisterInfo);
export const supplierList= connect((state) => state.supplier)(SupplierList);
export const supplierDetail= connect((state) => state.supplier)(SupplierDetail);
