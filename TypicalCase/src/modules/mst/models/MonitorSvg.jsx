import { actions } from 'mirrorx';
import * as api from '../services/MonitorSvg';
import { Error, Info } from 'utils';
import uuidv1 from 'uuid/v1';

let timeTicket = null;
export default {
	name: 'monitorsvg',
	initialState: {
		showModal: false,
		showDelModal: false,
		bgName: '',
		open: false,
		preview: false,
		tools: '',
		editItemId: '',
		editItems: [],
		editState: false,
		type: 1,
		pageX: 0,
		pageY: 0,
		coordinatex: 0,
		coordinatey: 0,
		high: 0,
		width: 0,
		vsize: 14,
		vcolor: '#ffffff',
		_data: '0.0',
		code: '',
		name: '',
		value: '',
		url: '',
		openway: '1',
		vdatatype: '',
		dataSet: '',
		video: '',
		scale: 0,
		attributex: 0,
		attributey: 0,

		rangeUpline: '',
		rangeDownline: '',
		warnUpline: '',
		warnDownline: '',

		showItem: '',
		//submint: false,
		timersArr: [],
		modalstate: 'add',
		pagestate: 'viewstate', //viewstate, addstate, editstate
		btnstate: false,
		treeNodesRtn: '', //返回的需要渲染出来的树节点
		treeData: [
			{
				title: '贵溪冶炼厂',
				key: '0',
				children: [
					{
						title: '硫酸车间',
						key: '0-1',
						children: []
					},
					{
						title: '熔炼车间',
						key: '0-2',
						children: [
							{
								title: '一系统',
								key: '0-2-1',
								children: []
							},
							{
								title: '二系统',
								key: '0-2-2',
								children: []
							}
						]
					}
				]
			}
		],
		treeList: [],
		expandedKeys: [],
		searchValue: '',
		autoExpandParent: false,
		monitorcode: '',
		monitorname: '',
		_monitorcode: '', //选中的树节点编码
		_monitorname: '', //选中的树节点名称
		selectedCheck: false //树节点选中校验
	},

	reducers: {
		save(state, data) {
			return {
				...state,
				...data
			};
		}
	},

	effects: {
		// 加载数据
		async loading(data, getState) {
			let { treeData } = getState().monitorsvg;
			actions.monitorsvg.convertToList(treeData);
		},
		// 预览
		handlePreview(data, getState) {
			actions.monitorsvg.save({ open: false, preview: true });
			clearInterval(timeTicket);
			timeTicket = setInterval(function() {
				let { editItems } = getState().monitorsvg;
				for (let item of editItems) {
					item._data = (Math.random() * 100).toFixed(1) - 0;
				}
				actions.monitorsvg.save({ editItems: [ ...editItems ] });
			}, 2000);
		},
		// 取消预览
		handleCancelPreview(data, getState) {
			clearInterval(timeTicket);
			actions.monitorsvg.save({ preview: false });
		},
		//导入底图按钮
		handleUpPic(data, getState) {
			if (getState().monitorsvg.bgName) {
				Error('底图已导入');
				return;
			}
		},
		//导入底图成功后的回调
		handleUpLoad(data, getState) {
			let { file: { name, status } } = data;
			// if(status=='done'){
			//   console.log(name,status,'ooooooo')
			//   actions.monitorsvg.save({bgName:name})
			// }
			actions.monitorsvg.save({ bgName: name });
		},
		//点击工具箱中的某一项
		handleClickTools(data, getState) {
			actions.monitorsvg.save({
				tools: data.type,
				type: data.type,
				coordinatex: 0,
				coordinatey: 0,
				high: 0,
				width: 0,
				vsize: 14,
				vcolor: '#000000',
				_data: '0.0',
				code: uuidv1(),
				name: '',
				value: '',
				url: '',
				openway: '1',
				vdatatype: '',
				dataSet: '',
				video: '',
				scale: 0,
				attributex: 0,
				attributey: 0
			});
			// 设置默认值
			if (data.type == 5) {
				actions.monitorsvg.save({ high: 220, width: 220 });
			}
			if (data.type == 6 || data.type == 7) {
				actions.monitorsvg.save({ high: 200, width: 'normal', scale: 5 });                     
			}
			if (data.type == 9) {
				actions.monitorsvg.save({ high: 260, width: 600 });
			}
		},
		// 点击底图时，获取鼠标点击的位置坐标
		getPageXY(data, getState) {
			let clientWidth = document.body.clientWidth,
				clientHeight = document.body.clientHeight,
				// 底图相对body的左、上偏移
				left = data.target.offsetLeft + data.target.parentNode.offsetLeft,
				top = data.target.offsetTop + data.target.parentNode.offsetTop,
				appHeight = document.querySelector('#app').offsetHeight,
				meWrapsMarginLeft = document.querySelector('.me-wraps').marginLeft,
				// 鼠标点击相对底图的位置
				pageX = data.pageX - left,
				pageY = data.pageY - top,
				attributex = 0,
				attributey = 0,
				coordinatex = pageX,
				coordinatey = pageY,
				tools = getState().monitorsvg.tools;
			// 控制属性框右边界
			if (clientWidth - data.pageX < 200) {
				attributex = clientWidth - left - 200;
			} else {
				attributex = data.pageX - left;
			}
			//控制属性框下边界
			switch (tools) {
				case 1:
					attributey = appHeight - data.pageY < 309 ? appHeight - top - 309 : data.pageY - top;
					break;
				case 2:
					attributey = appHeight - data.pageY < 341 ? appHeight - top - 341 : data.pageY - top;
					break;
				case 3:
					attributey = appHeight - data.pageY < 373 ? appHeight - top - 373 : data.pageY - top;
					break;
				case 4:
					attributey = appHeight - data.pageY < 341 ? appHeight - top - 341 : data.pageY - top;
					break;
				case 5:
					attributey = appHeight - data.pageY < 437 ? appHeight - top - 437 : data.pageY - top;
					break;
				case 6:
					attributey = appHeight - data.pageY < 437 ? appHeight - top - 437 : data.pageY - top;
					break;
				case 7:
					attributey = appHeight - data.pageY < 437 ? appHeight - top - 437 : data.pageY - top;
					break;
				case 8:
					attributey = appHeight - data.pageY < 405 ? appHeight - top - 405 : data.pageY - top;
					break;
				case 9:
					attributey = appHeight - data.pageY < 437 ? appHeight - top - 437 : data.pageY - top;
					break;
				default:
					break;
			}
			if (tools) {
				actions.monitorsvg.save({
					tools: '',
					editState: true,
					coordinatex,
					coordinatey,
					attributex,
					attributey,
					pageX,
					pageY,
					vsize: 14
				});
			}
		},
		// 属性编辑
		handleChange(data, getState) {
			let svgWidth = document.querySelector('#containSvg').offsetWidth,
				svgHeight = document.querySelector('#containSvg').offsetHeight;
			let { coordinatex, coordinatey, width, high, vsize } = getState().monitorsvg;
			// 转换液位计和温度计的宽度
			width = width === 'small' || width === 'normal' || width === 'large' ? 100 : width;
			switch (data.type) {
				case 'coordinatex':
					let newCoordinatex = 0;
					if (data.typeNum == 9) {
						newCoordinatex = data.coordinatex < svgWidth ? data.coordinatex : svgWidth - 50;
					} else {
						newCoordinatex = width
							? data.coordinatex < svgWidth - width ? data.coordinatex : svgWidth - width
							: data.coordinatex < svgWidth - 50 ? data.coordinatex : svgWidth - 50;
					}
					actions.monitorsvg.save({ coordinatex: newCoordinatex });
					break;
				case 'coordinatey':
					let newCoordinatey = 0;
					if (data.typeNum == 9) {
						newCoordinatey =
							data.coordinatey < svgHeight - Math.ceil(vsize * 1.6)
								? data.coordinatey
								: svgHeight - Math.ceil(vsize * 1.6);
					} else {
						newCoordinatey = high
							? data.coordinatey < svgHeight - high ? data.coordinatey : svgHeight - high
							: data.coordinatey < svgHeight - Math.ceil(vsize * 1.6)
								? data.coordinatey
								: svgHeight - Math.ceil(vsize * 1.6);
					}
					actions.monitorsvg.save({ coordinatey: newCoordinatey });
					break;
				case 'width':
					let newWidth = 0;
					width =
						data.width === 'small' || data.width === 'normal' || data.width === 'large' ? 100 : data.width;
					if (data.typeNum != 9) {
						coordinatex = coordinatex < svgWidth - width ? coordinatex : svgWidth - width;
						newWidth = data.width;
					}
					if (data.typeNum == 5) {
						high = newWidth = width > 1000 ? 1000 : width;
					} else {
						newWidth = width > 1000 ? 1000 : data.width;
					}
					actions.monitorsvg.save({ width: newWidth, high, coordinatex });
					break;
				case 'high':
					let newHigh = 0;
					if (data.typeNum != 9) {
						coordinatey = coordinatey < svgHeight - data.high ? coordinatey : svgHeight - data.high;
					}
					if (data.typeNum == 5) {
						width = newHigh = data.high > 1000 ? 1000 : data.high;
					} else {
						newHigh = data.high > 1000 ? 1000 : data.high;
					}
					actions.monitorsvg.save({ high: newHigh, width, coordinatey });
					break;
				case 'vsize':
					if (data.typeNum == 9) {
						coordinatey =
							coordinatey < svgHeight - Math.ceil(data.vsize * 1.6)
								? coordinatey
								: svgHeight - Math.ceil(data.vsize * 1.6);
					} else {
						coordinatey = high
							? coordinatey < svgHeight - high ? coordinatey : svgHeight - high
							: coordinatey < svgHeight - Math.ceil(data.vsize * 1.6)
								? coordinatey
								: svgHeight - Math.ceil(vsize * 1.6);
					}
					actions.monitorsvg.save({ vsize: data.vsize, coordinatey });
					break;
				case 'vcolor':
					actions.monitorsvg.save({ vcolor: data.vcolor });
					break;
				case 'value':
					actions.monitorsvg.save({ value: data.value });
					break;
				case 'name':
					actions.monitorsvg.save({ name: data.name });
					break;
				case 'url':
					actions.monitorsvg.save({ url: data.url });
					break;
				case 'openway':
					actions.monitorsvg.save({ openway: data.openway });
					break;
				case 'vdatatype':
					actions.monitorsvg.save({ vdatatype: data.vdatatype });
					break;
				case 'dataSet':
					actions.monitorsvg.save({ dataSet: data.dataSet });
					break;
				case 'video':
					actions.monitorsvg.save({ video: data.video });
					break;
				case 'scale':
					actions.monitorsvg.save({ scale: data.scale });
					break;
			}
		},
		// 保存
		handleSubmit(data, getState) {
			let svgWidth = document.querySelector('#containSvg').offsetWidth,
				svgHeight = document.querySelector('#containSvg').offsetHeight;
			let {
					editItemId,
					type,
					coordinatex,
					coordinatey,
					attributex,
					attributey,
					pageX,
					pageY,
					high,
					width,
					vsize,
					vcolor,
					code,
					value,
					name,
					url,
					openway,
					vdatatype,
					dataSet,
					video,
					scale,
					_data,
					editItems
				} = getState().monitorsvg,
				newWidth = width === 'small' || width === 'normal' || width === 'large' ? 100 : width;
			if (type == 9) {
				coordinatex = coordinatex < svgWidth - 50 ? coordinatex : svgWidth - 50;
				coordinatey =
					coordinatey < svgHeight - Math.ceil(vsize * 1.6) ? coordinatey : svgHeight - Math.ceil(vsize * 1.6);
			} else if (type == 7) {
				coordinatex = coordinatex < svgWidth - newWidth ? coordinatex : svgWidth - newWidth;
				coordinatey =
					coordinatey < svgHeight - high - Math.ceil(vsize * 1.6)
						? coordinatey
						: svgHeight - high - Math.ceil(vsize * 1.6);
			} else {
				coordinatex = newWidth
					? coordinatex < svgWidth - newWidth ? coordinatex : svgWidth - newWidth
					: coordinatex < svgWidth - 50 ? coordinatex : svgWidth - 50;
				coordinatey = high
					? coordinatey < svgHeight - high ? coordinatey : svgHeight - high
					: coordinatey < svgHeight - Math.ceil(vsize * 1.6)
						? coordinatey
						: svgHeight - Math.ceil(vsize * 1.6);
			}
			attributex = svgWidth - coordinatex < 200 ? svgWidth - 200 : coordinatex;
			switch (type) {
				case 1:
					attributey = svgHeight - coordinatey < 309 ? svgHeight - 309 : coordinatey;
					break;
				case 2:
					attributey = svgHeight - coordinatey < 341 ? svgHeight - 341 : coordinatey;
					break;
				case 3:
					attributey = svgHeight - coordinatey < 373 ? svgHeight - 373 : coordinatey;
					break;
				case 4:
					attributey = svgHeight - coordinatey < 341 ? svgHeight - 341 : coordinatey;
					break;
				case 5:
					attributey = svgHeight - coordinatey < 437 ? svgHeight - 437 : coordinatey;
					break;
				case 6:
					attributey = svgHeight - coordinatey < 437 ? svgHeight - 437 : coordinatey;
					break;
				case 7:
					attributey = svgHeight - coordinatey < 437 ? svgHeight - 437 : coordinatey;
					break;
				case 8:
					attributey = svgHeight - coordinatey < 405 ? svgHeight - 405 : coordinatey;
					break;
				case 9:
					attributey = svgHeight - coordinatey < 437 ? svgHeight - 437 : coordinatey;
					break;
				default:
					break;
			}
			let editItem = {
				id: uuidv1(),
				type: data,
				coordinatex,
				coordinatey,
				originalx: coordinatex,
				originaly: coordinatey,
				attributex,
				attributey,
				pageX,
				pageY,
				high,
				width,
				vsize,
				vcolor,
				code,
				value,
				name: data == 1 ? value : name,
				url,
				openway,
				vdatatype,
				dataSet,
				video,
				scale,
				_data
			};
			if (editItemId) {
				editItems.map((item, index) => {
					if (item.id === editItemId) {
						editItems[index] = { ...editItem, id: item.id, attributex, attributey };
					}
				});
				actions.monitorsvg.save({
					tools: '',
					//submint: true,
					editState: false,
					editItems: [ ...editItems ],
					editItemId: ''
				});
			} else {
				actions.monitorsvg.save({
					tools: '',
					//submint: true,
					editState: false,
					editItems: [ ...editItems, editItem ],
					editItemId: ''
				});
			}
		},
		// 取消
		handleCancel(data, getState) {
			actions.monitorsvg.save({ editState: false, editItemId: '' });
		},
		// 关闭图表控件
		handleCloseEchart(data, getState) {
			let element = document.querySelector('#chart');
			element.style.display = 'none';
		},
		// 打开图表控件
		handleOpenEchart(data, getState) {
			let element = document.querySelector('#chart');
			element.style.display = 'block';
		},
		// 编辑控件
		handleEditControl(data, getState) {
			let { editItems } = getState().monitorsvg;
			console.log(editItems,'11')
			for (let item of editItems) {
				if (item.id == data) {
					item.editState = true;
					item.editItemId = data;
					actions.monitorsvg.save({ ...item });
				}
			}
			console.log(editItems,'22')			
		},
		// 拖拽开始的回调
		handleMoveStart(data, getState) {
			data.result.stopPropagation();
			if (data.result && data.result.preventDefault) {
				data.result.preventDefault();
			} else {
				data.result.returnValue = false;
			}
		},
		// 拖拽结束的回调
		handleMoveStop(data, getState) {
			console.log(data.position, '3434343s');
			let svgWidth = document.querySelector('#containSvg').offsetWidth,
				svgHeight = document.querySelector('#containSvg').offsetHeight,
				{ editItems } = getState().monitorsvg;
			for (let item of editItems) {
				if (item.id == data.position.node.id) {
					let x = Number(item.originalx) + Number(data.position.x),
						y = Number(item.originaly) + Number(data.position.y);
					item.attributex = svgWidth - x < 200 ? svgWidth - 200 : x;
					switch (item.type) {
						case 1:
							item.attributey = svgHeight - y < 309 ? svgHeight - 309 : y;
							break;
						case 2:
							item.attributey = svgHeight - y < 341 ? svgHeight - 341 : y;
							break;
						case 3:
							item.attributey = svgHeight - y < 373 ? svgHeight - 373 : y;
							break;
						case 4:
							item.attributey = svgHeight - y < 341 ? svgHeight - 341 : y;
							break;
						case 5:
							item.attributey = svgHeight - y < 437 ? svgHeight - 437 : y;
							break;
						case 6:
							item.attributey = svgHeight - y < 437 ? svgHeight - 437 : y;
							break;
						case 7:
							item.attributey = svgHeight - y < 437 ? svgHeight - 437 : y;
							break;
						case 8:
							item.attributey = svgHeight - y < 405 ? svgHeight - 405 : y;
							break;
						case 9:
							item.attributey = svgHeight - y < 437 ? svgHeight - 437 : y;
							break;
						default:
							break;
					}
					//item.coordinatex = x;
					//item.coordinatey = y;
					break;
				}
			}
			actions.monitorsvg.save({ editItems: [ ...editItems ] });
			console.log(getState().monitorsvg.editItems, 'www');
		},
		convertToList(data) {
			let treeList = [];
			for (let i = 0; i < data.length; i++) {
				let node = data[i];
				let key = node.key;
				treeList.push({ key: key, title: key });
				actions.monitorsvg.convertToList(node.children, node.key);
			}
			actions.monitorsvg.save({ treeList: treeList });
		},
		// 树节点选择事件
		onTreeNodeSelect(data, getState) {
			//TODO
			let { monitorcode, monitorname } = data;
			actions.monitorsvg.save({
				selectedCheck: true,
				monitorcode: monitorcode,
				monitorname: monitorname,
				_monitorcode: monitorcode,
				_monitorname: monitorname
			});
		},
		//搜索框输入事件
		onSearchValueChange(data, getState) {
			let { treeList, treeData } = getState().monitorsvg;
			const expandedKeys = [];
			treeList.forEach((item) => {
				if (item.key.indexOf(data) > -1) {
					console.log(item.key + '+++++');
					expandedKeys.push(actions.monitorsvg.getParentKey(item.key, treeData));
				}
			});
			const uniqueExpandedKeys = [];
			expandedKeys.forEach((item) => {
				if (item && uniqueExpandedKeys.indexOf(item) === -1) {
					uniqueExpandedKeys.push(item);
				}
			});
			actions.monitorsvg.save({ expandedKeys: uniqueExpandedKeys, searchValue: data, autoExpandParent: true });
		},
		//获取父级节点key
		getParentKey(key, tree) {
			let parentKey;
			for (let i = 0; i < tree.length; i++) {
				let node = tree[i];
				if (node.children) {
					if (node.children.some((item) => item.key === key)) {
						parentKey = node.key;
					} else if (getParentKey(key, node.children)) {
						parentKey = getParentKey(key, node.children);
					}
				}
			}
			return parentKey;
		},
		//同级增加事件
		onSameLevelClick(data, getState) {
			//TODO
			let { selectedCheck } = getState().monitorsvg;
			if (selectedCheck) {
				actions.monitorsvg.save({ monitorcode: '', monitorname: '', btnstate: true, pagestate: 'addstate' });
			} else {
				Error('请选中节点');
			}
		},
		//下级增加事件
		async onSubLevelClick(data, getState) {
			//TODO
			let { selectedCheck } = getState().monitorsvg;
			if (selectedCheck) {
				actions.monitorsvg.save({ monitorcode: '', monitorname: '', btnstate: true, pagestate: 'addstate' });
			} else {
				Error('请选中节点');
			}
			let qryParam = {
				page: 0,
				size: 0,
				searchParams: {
					searchMap: null
				}
			};
			// ws测试 let dataset = await api.getMonitorSvg(qryParam);
			// console.log(JSON.parse(dataset.data.data)[0].billhead);
		},
		// 编辑按钮
		handleEdit(data, getState) {
			//TODO
			let { selectedCheck, _monitorcode, _monitorname } = getState().monitorsvg;
			if (selectedCheck) {
				actions.monitorsvg.save({
					monitorcode: _monitorcode,
					monitorname: _monitorname,
					btnstate: true,
					pagestate: 'addstate'
				});
			} else {
				Error('请选择节点');
			}
		},
		//删除事件
		onDelClick(data, getState) {
			//TODO
			let { selectedCheck } = getState().monitorsvg;
			if (selectedCheck) {
				actions.monitorsvg.save({ showDelModal: true });
			} else {
				Error('请选择节点');
			}
		},

		//编辑画面事件
		handleEditSvg(data, getState) {
			let { selectedCheck, bgName } = getState().monitorsvg;
			if (bgName) {
				if (selectedCheck) {
					actions.routing.push({
						pathname: 'monitorsvg/add',
						search: `?type=edit`
					});
				} else {
					Error('请选择节点');
				}
			} else {
				Error('请先导入底图');
			}
		},
		//保存
		saveHandler(data, getState) {
			let { _monitorcode, _monitorname } = getState().monitorsvg;
			actions.monitorsvg.save({
				monitorcode: _monitorcode,
				monitorname: _monitorname,
				btnstate: false,
				pagestate: 'viewstate'
			});
		},
		//取消保存
		cancelHandler(data, getState) {
			let { _monitorcode, _monitorname } = getState().monitorsvg;
			actions.monitorsvg.save({
				monitorcode: _monitorcode,
				monitorname: _monitorname,
				btnstate: false,
				pagestate: 'viewstate'
			});
		},
		//模态框值变化
		handleValueChange(data, getState) {
			actions.dsconfig.save(data);
		},
		//删除模态框确认
		handleDelConfirm(data, getState) {
			actions.monitorsvg.save({ showDelModal: false });
		},
		//删除模态框取消
		handleDelCancel(data, getState) {
			actions.monitorsvg.save({ showDelModal: false });
		}
	}
};
