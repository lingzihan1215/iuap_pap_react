/*
* 路由表
* */
import React from "react";
import { Router, Route } from "mirrorx";
import Layout from "layout";
import BDM from "modules/bdm/router";
import MST from "modules/mst/router";
import PPM from "modules/ppm/router";


const App = () => (
	<Router>
		<div>
			{/* <Route exact path="*" component={Layout} /> */}
			{/* 单表路由 */}
			<Route path="/bdm" component={BDM} />
			{/* 主子表路由 */}
			<Route path="/mst" component={MST} />
			{/* 树表路由 */}
			<Route path="/ppm" component={PPM} />
			{/* <Route path="/bpm" component={BPM} /> */}
			{/* <Route exact path="/" render={() => (
				<h3>请选择一个菜单</h3>
			)}/> */}
		</div>
	</Router>
);

export default App;
