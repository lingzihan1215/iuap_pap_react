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

//注入Model
mirror.model(model);

export const UserInfo= connect((state) => state.suppliermanager)(UserInfo);
export const EnterpriseInfo= connect((state) => state.suppliermanager)(EnterpriseInfo);
export const ContactInfo= connect((state) => state.suppliermanager)(ContactInfo);
export const RegisterInfo= connect((state) => state.suppliermanager)(RegisterInfo);
