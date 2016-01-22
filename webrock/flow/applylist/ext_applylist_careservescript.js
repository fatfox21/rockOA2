var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'careserve',rand:rand,
	tablename:'careserve',defaultorder:'optdt desc',
	formtitle:'车辆预定',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'申请人',dataIndex:'name',width:80,search:true
	},{
		text:'使用者',dataIndex:'usename',width:100,search:true
	},{
		text:'预定车辆',dataIndex:'carnum',width:100,search:true
	},{
		text:'目的地',dataIndex:'address',width:100,search:true
	},{
		text:'线路',dataIndex:'xianlines',search:true,flex:0.5
	},{
		text:'开始时间',dataIndex:'startdt',width:160,search:true,atype:'date'
	},{
		text:'截止时间',dataIndex:'enddt',width:160,search:true,atype:'date'
	},{
		text:'状态',dataIndex:'status'
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