var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'hrredund',formtitle:'离职申请',
	tablename:'hrredund',defaultorder:'id desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:70,search:true
	},{
		text:'部门',dataIndex:'deptname',width:100,search:true,autowidth:true
	},{
		text:'职务',dataIndex:'ranking',width:100,search:true,autowidth:true
	},{
		text:'入职日期',dataIndex:'entrydt',width:110,search:true,atype:'date'
	},{
		text:'离职日期',dataIndex:'quitdt',width:110,search:true,atype:'date'
	},{
		text:'离职类型',dataIndex:'redundtype',width:110,search:true
	},{
		text:'离职原因',dataIndex:'redundreson',width:110,search:true,autowidth:true
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