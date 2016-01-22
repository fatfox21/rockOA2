var columns = [{
	xtype: 'rownumberer',
	width: 40
},{
	text:'车牌号',dataIndex:'carnum',width:120,search:true
},{
	text:'状态',dataIndex:'state',width:100,search:true
},{
	text:'车辆品牌',dataIndex:'carbrand',width:120
},{
	text:'型号',dataIndex:'carmode',width:100,search:true
},{
	text:'车辆类型',dataIndex:'cartype',width:100,search:true
},{
	text:'强险到期',dataIndex:'qxenddt',width:100,search:true,atype:'date'
},{
	text:'行驶证到期',dataIndex:'xszenddt',width:100,search:true,atype:'date'
},{
	text:'商业险到期',dataIndex:'syxenddt',width:100,search:true,atype:'date'
},{
	text:'年审截到期',dataIndex:'nsenddt',width:100,search:true,atype:'date'
}];


var panel = {
	xtype:'rockgrid',tablename:'carm',searchtools:true,exceltitle:'车辆提醒',region:'center',
	columns:columns
};

return {
	panel:panel
};
