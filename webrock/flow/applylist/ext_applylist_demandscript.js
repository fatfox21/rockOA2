var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'demand',formtitle:'业务需求',
	tablename:'demand',defaultorder:'id desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'标题',dataIndex:'title',width:110,search:true,autowidth:true,align:'left'
	},{
		text:'申请人',dataIndex:'name',width:70,search:true
	},{
		text:'申请部门',dataIndex:'deptname',width:180,search:true
	},{
		text:'操作时间',dataIndex:'optdt',width:160,search:true,atype:'date'
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