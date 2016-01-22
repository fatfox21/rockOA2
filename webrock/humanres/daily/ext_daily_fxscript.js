var month = js.now('Y-m');

var panel = {
	xtype:'rockgrid',tablename:'dailyfx',exceltitle:'工作日报分析',url:publiccheckstore(mode,dir),opentype:7,searchtools:true,
	defaultwhere:"[A][K]a.`month` like '"+month+"%'",
	tbarcenter:[{
		xtype:'rockdate',format:'month',emptyText:'月份',width:80,id:'month_'+rand+'',value:month,maxDate:month
	},'未写超过',{
		xtype:'numberfield',width:60,value:0,id:'ci_'+rand+''
	},'次'],
	tbar:['->',{
		text:'重新分析',icon:gicons('reload'),handler:function(){
			month = getcmp('month_'+rand+'').getValue();
			js.msg('wait','分析中...');
			var url = js.getajaxurl('dailyfx','kaoqin','taskrun',{uid:0,month:month});
			$.get(url, function(da){
				js.msg();
				rock[index].storereload();
			});
		}
	}],
	outsearch:function(){
		var s = '';
		month = getcmp('month_'+rand+'').getValue();
		s= "[A][K]a.`month` like '"+month+"%'";
		var ci = getcmp('ci_'+rand+'').getValue();
		if(!isNaN(ci))s+=" and a.`totalw`>="+ci+"";
		return s;
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',flex:1,search:true,sortable:true
	},{
		text:'姓名',dataIndex:'name',flex:0.4,search:true,sortable:true
	},{
		text:'月份',dataIndex:'month',flex:0.4,search:true,sortable:true
	},{
		text:'应写次数',dataIndex:'totaly',flex:0.4,sortable:true
	},{
		text:'已写次数',dataIndex:'totalx',flex:0.4,sortable:true
	},{
		text:'未写次数',dataIndex:'totalw',flex:0.4,sortable:true
	},{
		text:'最后统计',dataIndex:'optdt',width:160,search:true,sortable:true
	}]
};

return {
	panel:panel
};