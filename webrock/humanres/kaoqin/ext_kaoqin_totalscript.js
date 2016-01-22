function xiang(){
	var o = rock[index];
	var uid   = o.changedata.id;
	if(!uid)return;
	var month = getcmp('month_'+rand+'').getValue();
	addtabs('['+o.changedata.name+']的考勤','person,kaoqin,my,uid='+uid+',month='+month+'','kaoqin_'+uid+'');
}
var panel={
	xtype:'rockgrid',tablename:'admin',searchtools:true,exceltitle:'考勤统计',defaultorder:'sort',
	storeafteraction:'totalafter',url:publicstore(mode,dir),firstsearchbool:true,storefields:'deptname,id,`name`',
	tbarcenter:[{
		xtype:'rockdate',emptyText:'月份',value:js.now('Y-m'),editable:false,format:'month',width:90,id:'month_'+rand+''
	},{
		xtype:'checkbox',boxLabel:'不统计休息日',id:'xiuxiuxi_'+rand+'',checked:true
	}],
	dblclick:function(){
		xiang();
	},
	outsearch:function(o){
		var month = getcmp('month_'+rand+'').getValue(),
			pdxx  = 0;
		if(isempt(month))month='';
		if(getcmp('xiuxiuxi_'+rand+'').checked)pdxx=1;
		o.setparams({month:month,pdxx:pdxx});
		return '';
	},
	tbar:['->',{
		text:'详情',handler:xiang
	}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',width:180,search:true,sortable:true
	},{
		text:'姓名',dataIndex:'name',width:100,search:true,sortable:true
	},{
		text:'请假(小时)',dataIndex:'leavesj',width:110
	},{
		text:'加班(小时)',dataIndex:'jiabansj',width:110
	},{
		text:'考勤正常',dataIndex:'zc',width:80
	},{
		text:'迟到',dataIndex:'chidao',width:80
	},{
		text:'早退',dataIndex:'zaotui',width:80
	},{
		text:'未打卡',dataIndex:'wdk',width:80
	},{
		text:'考勤合计',dataIndex:'kaoqinzt',align:'left',flex:1
	}]
}
return {
	panel:panel
};