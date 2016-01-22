
var panel= {
	xtype:'rockgrid',defaultorder:'id desc',url:publicstore(mode,dir),storeafteraction:'logshowla',
	tablename:'flow_log',searchtools:true,
	fields:['statusname'],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'模块名称',dataIndex:'modename',width:120
	},{
		text:'进程名称',dataIndex:'name',width:160,search:true
	},{
		text:'审核人',dataIndex:'checkname',width:80,search:true
	},{
		text:'状态',dataIndex:'status',width:100,search:true,sortable:true,renderer:function(v,m, c){
			var s = v;
			if(v=='1')s = '<font color=green>通过</font>';
			if(v=='2')s = '<font color=red>不通过</font>';
			if(!isempt(c.data.statusname))s=c.data.statusname;
			return s;
		}
	},{
		text:'操作时间',dataIndex:'optdt',width:150,search:true,sortable:true
	},{
		text:'浏览器',dataIndex:'web',width:130,search:true
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,search:true
	}]
};

return {
	panel:panel
};
