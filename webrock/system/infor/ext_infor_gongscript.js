
var panel= {
	xtype:'rockgrid',
	tablename:'infor',searchtools:true,defaultorder:'xu,optdt desc',
	tbar:['-','双击可预览'],url:publicstore('infor','system'),storeafteraction:'inforgong',storebeforeaction:'beforeinforgong',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'类型',dataIndex:'typename',width:120,search:true,editor:'textfield'
	},{
		text:'标题',dataIndex:'title',align:'left',flex:1,search:true
	},{
		text:'操作人',dataIndex:'optname',width:100,search:true
	},{
		text:'发布者/部门',dataIndex:'zuozhe',search:true,autowidth:true
	},{
		text:'时间',dataIndex:'indate',search:true,autowidth:true
	},{
		text:'操作时间',dataIndex:'optdt',width:150,search:true
	},{
		text:'序号',dataIndex:'xu',width:60,search:true
	}],
	dblclick:function(o, r){
		var url = js.getajaxurl('$gong','view','taskrun',{uid:adminid,id:r.data.id,jmbool:true});
		js.open(url, 800);
	}
};



return {
	panel:panel
};