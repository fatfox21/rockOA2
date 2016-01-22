var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'supplea',
	tablename:'supplea',defaultorder:'id desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:90,search:true
	},{
		text:'部门',dataIndex:'deptname',width:100,search:true,autowidth:true
	},{
		text:'申请时间',dataIndex:'optdt',width:160,search:true,atype:'date'
	},{
		text:'申请物品',dataIndex:'aname',width:120,search:true,sortable:true
	},{
		text:'申请数量',dataIndex:'total',width:80
	},{
		text:'状态',dataIndex:'status'
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,sortable:false,search:true
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