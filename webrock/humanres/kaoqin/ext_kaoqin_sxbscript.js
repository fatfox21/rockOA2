
var panel={
	xtype:'rockgrid',url:js.getajaxurl('getsxb', mode, dir),
	tablename:'kq_set',searchtools:false,bbarbool:false,
	tbar:[{
		text:'刷新',icon:gicons('reload'),handler:function(){this.up('grid').storereload()}
	},'-','设置时间请在[考勤时间规则]下设置'],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',width:150,search:true,align:'left'
	},{
		text:'时间',align:'center',dataIndex:'time',width:300
	}]
}
return {
	panel:panel
};