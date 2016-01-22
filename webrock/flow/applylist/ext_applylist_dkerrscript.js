var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'dkerr',formtitle:'打卡异常',
	tablename:'kq_dkerr',defaultorder:'id desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:70,search:true
	},{
		text:'部门',dataIndex:'deptname',width:200,search:true
	},{
		text:'异常类型',dataIndex:'errtype',width:100,search:true
	},{
		text:'日期',dataIndex:'dt',width:110,search:true,atype:'date'
	},{
		text:'应打卡时间',dataIndex:'ytime',width:110,search:true
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