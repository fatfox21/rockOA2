var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'waichu',
	tablename:'kq_out',defaultorder:'outtime desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:90,search:true
	},{
		text:'部门',dataIndex:'deptname',width:100,search:true,autowidth:true
	},{
		text:'类型',dataIndex:'atype',width:80,search:true,atype:'select',store:js.arraystr('外出,出差'),sortable:true
	},{
		text:'外出时间',dataIndex:'outtime',width:160,search:true,atype:'date'
	},{
		text:'预计回岗时间',dataIndex:'intime',width:160,search:true,atype:'date'
	},{
		text:'状态',dataIndex:'status'
	},{
		text:'前往地址',dataIndex:'address',search:true
	},{
		text:'外出事由',dataIndex:'reason',search:true
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,sortable:false,search:true
	}],
	tbarcenter:[{
		xtype:'rockdate',format:'month',id:'month_'+rand+'',emptyText:'月份',width:80
	}],
	outsearch:function(){
		var s = '',
			s1= getcmp('month_'+rand+'').getValue();
		if(!isempt(s1))s="[A][K]a.`outtime`[K]like[K]'"+s1+"%'";	
		return s;
	},
	
	formtitle:'外出出差'
};

return {
	panel:panel,
	tabson:{
		show:function(){
			rock[index].isReload();
		}
	}
};