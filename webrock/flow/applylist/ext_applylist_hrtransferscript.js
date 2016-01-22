var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'hrtransfer',formtitle:'人事调动',
	tablename:'hrtransfer',defaultorder:'id desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'申请人',dataIndex:'name',width:70,search:true
	},{
		text:'要调动人',dataIndex:'tranname',width:80,search:true
	},{
		text:'调动类型',dataIndex:'trantype',width:80,search:true
	},{
		text:'原来部门',dataIndex:'olddeptname',width:100,search:true,autowidth:true
	},{
		text:'原来职位',dataIndex:'oldranking',width:110,search:true
	},{
		text:'生效日期',dataIndex:'effectivedt',width:110,search:true,atype:'date'
	},{
		text:'调动后部门',dataIndex:'newdeptname',width:100,search:true,autowidth:true
	},{
		text:'调动后职位',dataIndex:'newranking',width:110,search:true
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