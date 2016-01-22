var panel={
	xtype:'rockgrid',
	tablename:'kq_dkjl',searchtools:true,
	tbarcenter:[{
		xtype:'rockdate',format:'Y-m',emptyText:'月份',width:90
	}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',width:200,search:true
	},{
		text:'姓名',dataIndex:'name',width:80,search:true
	},{
		text:'日期',dataIndex:'dt',width:90,search:true
	},{
		text:'上班时间',dataIndex:'worktime',width:120
	},{
		text:'上班情况',width:200,items:[{
			text:'时间',align:'center',dataIndex:'amtime',flex:1
		},{
			text:'状态',align:'center',dataIndex:'amzt',flex:1
		}]
	},{
		text:'下班情况',width:200,items:[{
			text:'时间',align:'center',dataIndex:'pmtime',flex:1
		},{
			text:'状态',align:'center',dataIndex:'pmzt',flex:1
		}]
	},{
		text:'备注',dataIndex:'explain',flex:1
	}]
}
return {
	panel:panel
};