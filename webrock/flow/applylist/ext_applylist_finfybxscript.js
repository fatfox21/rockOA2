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
		text:'部门',dataIndex:'deptname',width:200,search:true,autowidth:true
	},{
		text:'报销金额',dataIndex:'money',width:160,search:true
	},{
		text:'状态',dataIndex:'status'
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,sortable:false
	}],
	tbarcenter:[{
		xtype:'rockdate',format:'month',id:'month_'+rand+'',emptyText:'月份',width:80
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