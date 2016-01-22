var ndate = js.now('Y-m');
var panel = {
	xtype:'rockgrid',tablename:'meet',exceltitle:'会议列表',keywhere:'[A][K]type=0',searchtools:true,
	defaultwhere:"[A][K]startdt like '"+ndate+"%'",
	tbarleft:[{
		emptyText:'月份',xtype:'rockdate', width:90,format:'Y-m',editable:false,value:ndate
	}],
	outsearch:function(){
		var s = '',yf = this.down('rockdate').getValue();
		if(!isempt(yf))s="[A][K]startdt like '"+yf+"%'"
		return s;
	},
	execlparams:{excelchuli:'status',status_arr:'正常,会议中,结束,取消'},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'会议室',dataIndex:'hyname',width:'10%',search:true,autowidth:true
	},{
		text:'主题',dataIndex:'title',width:'10%',search:true,autowidth:true
	},{
		text:'开始时间',dataIndex:'startdt',width:160,search:true
	},{
		text:'截止时间',dataIndex:'enddt',width:160,search:true
	},{
		text:'参会人员',dataIndex:'joinname',width:'10%',search:true,autowidth:true
	},{
		text:'操作时间',dataIndex:'optdt',width:150,search:true
	},{
		text:'发起人',dataIndex:'optname',width:70,search:true
	},{
		text:'状态',dataIndex:'status',width:100,boxdata:[['green','正常'],['blue','会议中'],['#ff6600','结束'],['#888888','取消']],renderer:renderbox,atype:'select',search:true,store:js.arraystr('正常,会议中,结束,取消')
	}]
};

return {
	panel:panel
};