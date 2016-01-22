var columns = [{
	xtype: 'rownumberer',
	width: 40
},{
	text:'车牌号',dataIndex:'carnum',width:120,search:true
},{
	text:'状态',dataIndex:'state',width:100,search:true
}];

var time = js.now('time'),dt;
for(var i=0;i<5;i++){
	dt = js.now('m-d(星期W)', time+(i*24*3600*1000));
	columns.push({
		text:dt,dataIndex:'dt'+i+'',flex:0.2
	});
}

var panel = {
	xtype:'rockgrid',tablename:'carm',searchtools:true,exceltitle:'车辆预定情况',region:'center',keywhere:'[A][K]ispublic=1',
	columns:columns,url:publicstore(mode, dir),storeafteraction:'yudingcarlist',storefields:'id,carnum,state',
	tbar:['只统计公开的车辆']
};

return {
	panel:panel
};
