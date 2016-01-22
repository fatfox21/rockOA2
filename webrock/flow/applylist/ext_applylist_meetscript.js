var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'meet',rand:rand,exceltitle:'会议室预定',
	tablename:'meet',keywhere:'[A][K]a.type[D]0',defaultorder:'startdt desc',
	formtitle:'会议室预定',formwidth:400,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'发起人',align:'center',dataIndex:'name',width:90,search:true
	},{
		text:'会议室',dataIndex:'hyname',search:true,autowidth:true
	},{
		text:'主题',dataIndex:'title',search:true,autowidth:true
	},{
		text:'开始时间',align:'center',dataIndex:'startdt',width:160,search:true,atype:'date'
	},{
		text:'截止时间',align:'center',dataIndex:'enddt',width:160,search:true,atype:'date'
	},{
		text:'参会人员',dataIndex:'joinname',width:'10%',search:true,autowidth:true
	},{
		text:'申请状态',dataIndex:'status'
	},{
		text:'会议状态',dataIndex:'state',width:80,boxdata:[['green','正常'],['blue','会议中'],['#ff6600','结束'],['#888888','取消']],renderer:renderbox,atype:'select',search:true,store:js.arraystr('正常,会议中,结束,取消')
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,sortable:false
	}],
	tbarcenter:[{
		xtype:'datefield',format:'Y-m-d',id:'datess_'+rand+'',emptyText:'会议日期',width:120,editable:false
	}],
	outsearch:function(){
		var s = '',
			s1= getcmp('datess_'+rand+'').getRawValue();
		if(!isempt(s1))s="[A][K]a.`startdt`[K]like[K]'"+s1+"%'";	
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