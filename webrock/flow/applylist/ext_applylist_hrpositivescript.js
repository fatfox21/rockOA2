var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'hrpositive',formtitle:'转正申请',
	tablename:'hrpositive',defaultorder:'id desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:70,search:true
	},{
		text:'部门',dataIndex:'deptname',width:180,search:true
	},{
		text:'职务',dataIndex:'ranking',width:130,search:true
	},{
		text:'入职日期',dataIndex:'entrydt',width:110,search:true,atype:'date'
	},{
		text:'试用到期日',dataIndex:'syenddt',width:110,search:true,atype:'date'
	},{
		text:'转正日期',dataIndex:'positivedt',width:110,search:true,atype:'date'
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