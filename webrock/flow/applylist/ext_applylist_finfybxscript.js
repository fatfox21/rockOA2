var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'finfybx',rand:rand,
	tablename:'fininfom',keywhere:'[A][K]a.type[D]0',defaultorder:'optdt desc',
	formtitle:'费用报销',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:90,search:true
	},{
		text:'部门',dataIndex:'deptname',width:100,search:true,autowidth:true
	},{
		text:'报销金额',dataIndex:'money',width:100,search:true
	},{
		text:'申请日期',dataIndex:'applydt',width:90,search:true,atype:'date'
	},{
		text:'单据(张)',dataIndex:'bills',width:90
	},{
		text:'付款方式',dataIndex:'paytype',width:100,search:true
	},{
		text:'收款人',dataIndex:'fullname',width:100,search:true,autowidth:true
	},{
		text:'状态',dataIndex:'status'
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,sortable:false
	}]
};

return {
	panel:panel,
	tabson:{
		show:function(){
			rock[index].isReload();
		}
	}
};