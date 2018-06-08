import { actions } from "mirrorx";
import queryString from "query-string";
import uuidv1 from "uuid/v1";
import * as api from "../services/OprtParamConfig";
import { Info, Error } from "utils";

export default {
  name: "oprtparamconfig",
  initialState: {
    scode: "",
    sname: "",
    list: [],
    bodyList: [],
    activePage: 1,
    totalSize: 0,
    pageSize: 10,
    showDeleteModal: false,
    showSaveModel: false,
    selectedRow: [],
    id: "",
    code: "",
    name: "",
    note: "",
    pk_workshop: "",
    enablestate: "已启用",
    pk_workshop_name: "",
    pk_section: "",
    pk_section_name: "",
    oprtparamcls: "",
    oprtparamclsname: "",
    period: "",
    sysid: "",
    tenantid: "",
    addList: [],
    postAddList: [],
    selectedList: [],
    addSelectedList: [],
    checkFormNow: false,
    addShowDeleteModal: false
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
    // data init
    async load(data, getState) {
      let searchMap = {};
      let { pageSize, activePage, sname, scode } = getState().oprtparamconfig;
      let searchMapParams = {};
      if (data && data.type == "query") {
        searchMap = {
          name: sname,
          code: scode
        };
      } else {
        searchMap = {
          searchParam: null
        };
      }
      let params = {
        page: activePage - 1,
        size: pageSize,
        searchParams: { searchMap: searchMap }
      };
      let {
        data: { data: dat, success: status }
      } = await api.getList(params);
      if (status) {
        let headData = [];
        if (dat.head) {
          let {
            rows: rows,
            pageinfo: { totalElements: totalSize, totalPages: maxPage }
          } = dat.head;
          rows.map(row => {
            let headRow = {
              id: row.values.id.value,
              name: row.values.name.value,
              code: row.values.code.value,
              note: row.values.note.value,
              enablestate:
                row.values.enablestate.value == 0 ? "已停用" : "已启用",
              pk_workshop: row.values.pk_workshop.value,
              pk_workshop_name: row.values.pk_workshop_name.value,
              pk_section: row.values.pk_section.value,
              pk_section_name: row.values.pk_section_name.value,
              oprtparamcls: row.values.oprtparamcls.value,
              oprtparamclsname: row.values.oprtparamclsname.value,
              period: row.values.period.value,
              ts: row.values.ts.value,
              tenantid: row.values.tenantid.value
            };
            headData.push(headRow);
          });
          actions.oprtparamconfig.save({
            list: headData,
            totalSize: totalSize,
            maxPage: maxPage
          });
          actions.oprtparamconfig.handleRowClick({
            index: 0,
            record: { id: headData[0].id }
          });
        } else {
          actions.oprtparamconfig.save({
            list: headData,
            totalSize: 0,
            maxPage: 0
          });
        }
      } else {
        Error("数据加载失败");
      }
    },
    // 行点击加载子表
    async handleRowClick(data, getState) {
      let { list } = getState().oprtparamconfig;
      let selectedRow = new Array(list.length);
      selectedRow[data.index] = true;
      actions.oprtparamconfig.save({ selectedRow });
      let parentId = { id: data.record.id };
      let params = {
        page: 0, // activePage - 1 ???,
        size: 1000000000,
        searchParams: {
          searchMap: { pk_parentid: parentId.id }
        }
      };
      let bodyData = await api.getBodyList(params);
      if (bodyData.data.data.body == undefined) {
        actions.oprtparamconfig.save({ bodyList: [] });
        return;
      }
      let {
        data: {
          success,
          data: {
            body: { pageinfo, rows }
          }
        }
      } = bodyData;
      if (success) {
        let bodyList = [];
        rows.map(row => {
          let bodyRow = {
            crowno: uuidv1(),
            code: row.values.code.value,
            name: row.values.name.value,
            bodynote: row.values.bodynote.value,
            uplimit: row.values.uplimit.value,
            downlimit: row.values.downlimit.value,
            pk_instagno: row.values.pk_instagno.value,
            instnoname: row.values.instnoname.value,
            instnocode: row.values.instnocode.value,
            id: row.values.id.value,
            pk_parentid: row.values.pk_parentid.value,
            ts: row.values.ts.value,
            status: row.status,
            tenantid: row.values.tenantid.value
          };
          bodyList.push(bodyRow);
        });
        actions.oprtparamconfig.save({ bodyList });
      } else {
        Error("子表加载失败");
      }
    },
    rowClassNameHandler(data, getState) {
      let { selectedRow } = getState().oprtparamconfig;
      if (selectedRow[data.index]) {
        return "selected";
      } else {
        return "";
      }
    },
    // change每页显示条目数量
    handleChangePageSize(data, getState) {
      actions.oprtparamconfig.save({ pageSize: data, activePage: 1 });
      actions.oprtparamconfig.load();
    },
    // change页码
    handleChangePageIndex(data, getState) {
      actions.oprtparamconfig.save({ activePage: data, bodyList: [] });
      actions.oprtparamconfig.load();
    },
    // 新增按钮
    addHandler() {
      actions.oprtparamconfig.save({
        id: "",
        ts: "",
        code: "",
        name: "",
        oprtparamcls: "",
        oprtparamclsname: "",
        pk_workshop_name: "",
        period: "",
        pk_workshop: "",
        pk_section: "",
        pk_section_name: "",
        enablestate: "已启用",
        note: "",
        addList: [],
        selectedList: [],
        addSelectedList: []
      });
      actions.routing.push({
        pathname: "oprtparamconfig/add",
        search: "?type=add"
      });
    },
    // 编辑按钮
    async editHandler(data, getState) {
      if (getState().oprtparamconfig.selectedList.length == 0) {
        Error("请选择要编辑的行");
      } else if (getState().oprtparamconfig.selectedList.length > 1) {
        Error("只能操作单行数据");
      } else {
        let bodyList = getState().oprtparamconfig.bodyList;
        let {
          id,
          ts,
          code,
          name,
          oprtparamcls,
          oprtparamclsname,
          period,
          pk_workshop_name,
          pk_workshop,
          pk_section,
          pk_section_name,
          enablestate,
          note,
          tenantid
        } = getState().oprtparamconfig.selectedList[0];
        actions.routing.push({
          pathname: "oprtparamconfig/add",
          search: "?type=edit"
        });
        actions.oprtparamconfig.save({
          id,
          code,
          name,
          enablestate,
          oprtparamcls,
          oprtparamclsname,
          period,
          pk_workshop,
          pk_workshop_name,
          pk_section,
          pk_section_name,
          note,
          ts,
          tenantid,
          addList: bodyList,
          postAddList: bodyList
        });
      }
    },
    // 启用按钮
    async enabledHandler(data, getState) {
      let { selectedList } = getState().oprtparamconfig;
      if (selectedList.length == 0) {
        Error("请选择要启用的行");
      } else {
        let rows = [];
        selectedList.forEach(item => {
          let row = {
            rowId: null,
            values: {
              id: {
                display: null,
                scale: -1,
                value: item.id
              },
              ts: {
                display: null,
                scale: -1,
                value: item.ts
              }
            }
          };
          rows.push(row);
        });
        let postData = {
          data: {
            head: {
              rows: rows
            }
          }
        };
        let res = await api.enable(postData);
        if (res.data.success) {
          actions.oprtparamconfig.load();
          Info("启用成功");
        } else {
          Error("启用失败");
        }
      }
    },
    // 停用按钮
    async disabledHandler(data, getState) {
      let { selectedList } = getState().oprtparamconfig;
      if (selectedList.length == 0) {
        Error("请选择要停用的行");
      } else {
        let rows = [];
        selectedList.forEach(item => {
          let row = {
            rowId: null,
            values: {
              id: {
                display: null,
                scale: -1,
                value: item.id
              },
              ts: {
                display: null,
                scale: -1,
                value: item.ts
              }
            }
          };
          rows.push(row);
        });
        let postData = {
          data: {
            head: {
              rows: rows
            }
          }
        };
        let res = await api.disable(postData);
        console.log(res);
        if (res.data.success) {
          actions.oprtparamconfig.load();
          Info("停用成功");
        } else {
          Error("停用失败");
        }
      }
    },
    // 删除按钮
    delHandler(data, getState) {
      let { selectedList } = getState().oprtparamconfig;
      if (selectedList.length == 0) {
        Error("请选择要删除的行");
      } else {
        actions.oprtparamconfig.save({
          showDeleteModal: true,
          tenantid: selectedList[0].tenantid
        });
      }
    },
    // checktable选中
    async handleSelect(data, getState) {
      actions.oprtparamconfig.save({
        selectedList: data
      });
    },
    // 确认删除
    async handleDelConfirm(data, getState) {
      let { selectedList, tenantid } = getState().oprtparamconfig;
      let rows = [];
      selectedList.map(item => {
        let row = {
          rowId: null,
          values: {
            id: {
              display: null,
              scale: -1,
              value: item.id
            },
            ts: {
              display: null,
              scale: -1,
              value: item.ts
            },
            tenantid: {
              display: null,
              scale: -1,
              value: tenantid
            }
          }
        };
        rows.push(row);
      });
      let delData = {
        data: {
          head: {
            rows: rows
          }
        }
      };
      let res = await api.delItems(delData);
      if (res.data.success) {
        actions.oprtparamconfig.save({
          showDeleteModal: false,
          bodyList: []
        });
        Info("删除成功");
        actions.oprtparamconfig.load();
      } else {
        actions.oprtparamconfig.save({
          showDeleteModal: false
        });
        Error("删除失败");
      }
    },
    // 取消删除
    handleDelCancel(data, getState) {
      actions.oprtparamconfig.save({
        showDeleteModal: false
      });
    },
    // 搜索区域字段编辑
    handleSearchChange(data, getState) {
      if (data.key == "scode") {
        actions.oprtparamconfig.save({ scode: data.param });
      } else if (data.key == "sname") {
        actions.oprtparamconfig.save({ sname: data.param });
      }
    },
    handleSearchChecked(data, getState) {
      actions.oprtparamconfig.save({ sshowEnable: data });
    },
    //重置查询
    clearHandler(data, getState) {
      actions.oprtparamconfig.save({ scode: "", sname: "" });
      actions.oprtparamconfig.load();
    },
    // 查询按钮
    handleQuery(data, getState) {
      actions.oprtparamconfig.load({
        type: "query"
      });
    },
    // add 表体checktable选中
    addHandleSelect(data, getState) {
      actions.oprtparamconfig.save({
        addSelectedList: data
      });
    },
    // add 表头字段编辑
    handleHeadChange(data, getState) {
      actions.oprtparamconfig.save(data);
    },
    // add 增行
    handleAddRow(data, getState) {
      let { id, addList, postAddList } = getState().oprtparamconfig;
      let newRow = {
        crowno: uuidv1(),
        pk_parentid: id,
        name: "",
        code: "",
        bodynote: "",
        uplimit: "",
        downlimit: "",
        pk_instagno: "",
        instnoname: "",
        instnocode: "",
        status: 2
      };
      let newAddList = [...addList, newRow],
        newPostAddList = [...postAddList, newRow];
      actions.oprtparamconfig.save({
        addList: newAddList,
        postAddList: newPostAddList
      });
    },
    // add 删行
    handleDelRow(data, getState) {
      let { addSelectedList } = getState().oprtparamconfig;
      if (addSelectedList.length == 0) {
        Error("请选择要删除的行");
      } else {
        actions.oprtparamconfig.save({
          addShowDeleteModal: true
        });
      }
    },
    addHandleDelConfirm(data, getState) {
      let addList = [...getState().oprtparamconfig.addList];
      let postAddList = [...getState().oprtparamconfig.postAddList];
      let { addSelectedList } = getState().oprtparamconfig;
      let delRows = [];
      addSelectedList.forEach(item => {
        delRows.push(item.crowno);
      });
      delRows.forEach(item => {
        for (let i = 0; i < addList.length; i++) {
          if (addList[i].crowno == item) {
            addList.splice(i, 1);
          }
        }
        for (let j = 0; j < postAddList.length; j++) {
          if (postAddList[j].crowno == item) {
            if (postAddList[j].id) {
              postAddList[j].status = 3;
            } else {
              postAddList.splice(j, 1);
            }
          }
        }
      });
      // console.log(delRows,'delRows')
      // console.log(addList,'addList')
      // console.log(postAddList,'postAddList')
      actions.oprtparamconfig.save({
        addList,
        postAddList,
        addSelectedList: [],
        addShowDeleteModal: false
      });
    },
    addHandleDelCancel(data, getState) {
      actions.oprtparamconfig.save({
        addShowDeleteModal: false
      });
    },
    // add 表体字段编辑事件
    handleBodyChange(data, getState) {
      let addList = [...getState().oprtparamconfig.addList];
      let postAddList = [...getState().oprtparamconfig.postAddList];
      addList.forEach(row => {
        if (data.record.crowno == row.crowno) {
          row[data.type] = data.value;
        }
      });
      postAddList.forEach(row => {
        if (data.record.crowno == row.crowno) {
          row[data.type] = data.value;
          if (row.status == 0) {
            row.status = 1;
          }
        }
      });
      actions.oprtparamconfig.save({
        addList,
        postAddList
      });
    },
    // add 保存提交事件
    async handleSubmit(data, getState) {
      console.log(getState().oprtparamconfig.checkFormNow, "checkform");
      await actions.oprtparamconfig.save({ checkFormNow: true });
      actions.oprtparamconfig.save({ checkFormNow: false });
      let {
        id,
        ts,
        code,
        name,
        oprtparamcls,
        oprtparamclsname,
        period,
        pk_workshop,
        pk_workshop_name,
        pk_section,
        pk_section_name,
        enablestate,
        note,
        addList,
        postAddList,
        tenantid
      } = getState().oprtparamconfig;
      if (!name || !code || !oprtparamclsname || !pk_workshop || !pk_section) {
        return;
      }
      if (postAddList.length == 0) {
        Error("表体不能为空");
        return;
      }
      let qs = queryString.parse(getState().routing.location.search);
      let bodyRows = [];
      let postData = {
        data: {
          head: {
            pageinfo: null,
            rows: ""
          },
          body: {
            pageinfo: null,
            rows: bodyRows
          }
        },
        message: null,
        success: true
      };
      if (qs.type == "add") {
        postData.data.head.rows = [
          {
            rowId: null,
            values: {
              code: {
                value: code
              },
              name: {
                value: name
              },
              pk_workshop: {
                value: pk_workshop
              },
              pk_workshop_name: {
                value: pk_workshop_name
              },
              pk_section: {
                value: pk_section
              },
              pk_section_name: {
                value: pk_section_name
              },
              oprtparamcls: {
                value: oprtparamcls
              },
              oprtparamclsname: {
                value: oprtparamclsname
              },
              period: {
                value: period
              },
              note: {
                value: note
              },
              enablestate: {
                value: enablestate == "已启用" ? 1 : 0
              }
            },
            status: 2
          }
        ];
        let flag = true;
        addList.map(item => {
          if (item.pk_instagno == "") {
            flag = false;
          }
          let row = {
            rowId: null,
            values: {
              code: { value: item.code || null },
              name: { value: item.name || null },
              bodynote: { value: item.bodynote || null },
              uplimit: { value: item.uplimit || null },
              downlimit: { value: item.downlimit || null },
              pk_instagno: { value: item.pk_instagno || null },
              instnoname: { value: item.instnoname || null },
              instnocode: { value: item.instnocode || null }
            },
            status: 2
          };
          bodyRows.push(row);
        });
        if (flag) {
          let res = await api.addSave(postData);
          if (res.data.success) {
            Info("保存成功");
            actions.oprtparamconfig.save({
              bodyList: [],
              selectedRow: []
            });
            actions.routing.push("/ims/oprtparamconfig");
          } else {
            Error("保存失败");
          }
        } else {
          Error("数据标签不能为空");
        }
      } else if (qs.type == "edit") {
        postData.data.head.rows = [
          {
            rowId: null,
            values: {
              id: {
                value: id
              },
              code: {
                value: code
              },
              name: {
                value: name
              },
              oprtparamcls: {
                value: oprtparamcls
              },
              oprtparamclsname: {
                value: oprtparamclsname
              },
              period: {
                value: period
              },
              note: {
                value: note
              },
              pk_workshop: {
                value: pk_workshop
              },
              pk_workshop_name: {
                value: pk_workshop_name
              },
              pk_section: {
                value: pk_section
              },
              pk_section_name: {
                value: pk_section_name
              },
              enablestate: {
                value: enablestate == "已启用" ? 1 : 0
              },
              ts: {
                value: ts
              },
              tenantid: {
                value: tenantid
              }
            },
            status: 1
          }
        ];
        let flag = true;
        postAddList.map(item => {
          if (item.pk_instagno == "") {
            flag = false;
          }
          let row = {
            rowId: null,
            values: {
              code: { value: item.code || null },
              name: { value: item.name || null },
              bodynote: { value: item.bodynote || null },
              uplimit: { value: item.uplimit || null },
              downlimit: { value: item.downlimit || null },
              id: { value: item.id || null },
              ts: { value: item.ts || null },
              pk_parentid: { value: item.pk_parentid || null },
              pk_instagno: { value: item.pk_instagno || null },
              instnoname: { value: item.instnoname || null },
              instnocode: { value: item.instnocode || null },
              tenantid: { value: tenantid }
            },
            status: item.status
          };
          bodyRows.push(row);
        });
        if (flag) {
          let res = await api.editSave(postData);
          if (res.data.success) {
            Info("保存成功");
            actions.oprtparamconfig.save({
              bodyList: [],
              selectedRow: []
            });
            actions.routing.push("/ims/oprtparamconfig");
          } else {
            Error("保存失败");
          }
        } else {
          Error("仪表位号不能为空");
        }
      }
    },
    // add 取消事件
    handleCancle(data, getState) {
      actions.oprtparamconfig.save({
        showSaveModel: true
      });
    },
    headRefAction(data, getState) {
      if (data.ref.length == 0) {
        Error("请选择参照");
      } else {
        let key = data.param.key;
        if (key == "pk_workshop") {
          let pk_workshop = data.ref[0].id;
          let pk_workshop_name = data.ref[0].refname;
          actions.oprtparamconfig.save({
            pk_workshop: pk_workshop,
            pk_workshop_name: pk_workshop_name
          });
        } else if (key == "pk_section") {
          let pk_section = data.ref[0].id;
          let pk_section_name = data.ref[0].name;
          actions.oprtparamconfig.save({
            pk_section: pk_section,
            pk_section_name: pk_section_name
          });
        }
      }
    },
    bodyRefAction(data, getState) {
      console.log(data);
      let addList = [...getState().oprtparamconfig.addList];
      let postAddList = [...getState().oprtparamconfig.postAddList];
      let qs = queryString.parse(getState().routing.location.search);
      let index = data.index;
      if (data.ref[0] == undefined) {
        if (data.flag == "name") {
          addList[index].pk_instagno = "";
          addList[index].instnoname = "";
          addList[index].instnocode = "";
        }
      } else {
        if (data.flag == "name") {
          let ref = data.ref[0];
          addList[index].pk_instagno = ref.id;
          addList[index].instnoname = ref.name;
          addList[index].instnocode = ref.code;
        }
      }
      if (qs.type == "edit") {
        postAddList = addList;
        actions.oprtparamconfig.save({
          postAddList
        });
      }
      actions.oprtparamconfig.save({
        addList
      });
    },
    //确认取消关闭弹出框
    closeSaveModal(data, getState) {
      actions.oprtparamconfig.save({
        showSaveModel: false
      });
    },
    leaveSave(data, getState) {
      actions.oprtparamconfig.save({
        selectedList: [],
        bodyList: [],
        showSaveModel: false
      });
      actions.routing.goBack();
      let list = getState().oprtparamconfig.list;
      if (list != null && list.length > 0) {
        actions.oprtparamconfig.handleRowClick({
          index: 0,
          record: { id: list[0].id }
        });
      }
    }
  }
};
