var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'jiaban',rand:rand,
	tablename:'kq_info',keywhere:'[A][K]a.kind[D][F]加班[F]',defaultorder:'stime desc',
	formtitle:'加班单',formwidth:400,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',align:'center',dataIndex:'name',width:90,search:true
	},{
		text:'部门',align:'center',dataIndex:'deptname',width:200,search:true,autowidth:true
	},{
		text:'开始时间',align:'center',dataIndex:'stime',width:160,search:true,atype:'date'
	},{
		text:'结束时间',align:'center',dataIndex:'etime',width:160,search:true,atype:'date'
	},{
		text:'时间(小时)',align:'center',dataIndex:'totals',width:120,renderer:function(v){
			return '<font color=green>'+v+'</font>';
		}
	},{
		text:'状态',dataIndex:'status'
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,sortable:false
	}],
	tbarcenter:[{
		xtype:'rockdate',format:'month',id:'month_'+rand+'',emptyText:'月份',width:80
	}],
	outsearch:function(){
		var s = '',
			s1= getcmp('month_'+rand+'').getValue();
		if(!isempt(s1))s="[A][K]a.`stime`[K]like[K]'"+s1+"%'";	
		return s;
	}
};

return {
	panel:panel,
	tabson:{
		show:function(){
			rock[index].isReload();
		}
	}
};