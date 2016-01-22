var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'finccbx',rand:rand,
	tablename:'fininfom',keywhere:'[A][K]a.type[D]1',defaultorder:'optdt desc',
	formtitle:'出差报销',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'报销人',dataIndex:'name',width:90,search:true
	},{
		text:'部门',dataIndex:'deptname',width:100,search:true,autowidth:true
	},{
		text:'报销金额',dataIndex:'money',width:100,search:true
	},{
		text:'申请日期',dataIndex:'applydt',width:90,search:true,atype:'date'
	},{
		text:'出差目的',dataIndex:'purpose',width:100,search:true
	},{
		text:'出差成果',dataIndex:'purresult',width:100,search:true
	},{
		text:'付款方式',dataIndex:'paytype',width:100,search:true
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