var panel= {
	xtype:'rockgrid',url:publiccheckstore(),searchtools:true,exceltitle:'考勤.外出出差',
	tablename:'kq_out',defaultorder:'outtime desc',opentype:3,keywhere:'[A][K]a.status<>5',
	tbar:['->',{
		icon:gicons('delete'),text:'删除',handler:function(){
			this.up('rockgrid').del();
		}
	}],
	execlparams:{excelchuli:'status',status_arr:'待审核,审核通过,审核不通过'},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',search:true
	},{
		text:'部门',dataIndex:'deptname',search:true,autowidth:true
	},{
		text:'类型',dataIndex:'atype',width:80,search:true,atype:'select',store:js.arraystr('外出,出差'),sortable:true
	},{
		text:'外出时间',dataIndex:'outtime',width:160,search:true,atype:'date'
	},{
		text:'预计回岗时间',dataIndex:'intime',width:160,search:true,atype:'date'
	},{
		text:'状态',width:150,dataIndex:'status',renderer:function(v,a,b){
			var s = '<font color="blue">待'+b.raw.nowcheckname+'审核</font>';
			var ns = b.raw.statusman;if(isempt(ns))ns='';
			if(v=='2')s = ns+'<font color="red">审核不通过</font>';
			if(v=='1')s = ns+'<font color="green">审核通过</font>';
			return s;
		}
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
	}
};

return {
	panel:panel,
	init:function(){
		grid = rock[index];
	}
};