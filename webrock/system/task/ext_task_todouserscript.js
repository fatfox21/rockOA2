var panel = {
	xtype:'rockgridform',tablename:'taskuser',formtitle:'任务提醒人员',celleditbool:true,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',width:200,editor:'textfield',search:true
	},{
		text:'排序号',dataIndex:'sort',width:80,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'接收人',dataIndex:'recename',width:200,search:true
	},{
		text:'抄送给',dataIndex:'chaoname',width:200,search:true
	},{
		text:'操作时间',dataIndex:'optdt',width:160,search:true
	},{
		text:'ID',dataIndex:'id',width:60
	}],
	formparams:{
		submitfields:'name,sort,recename,receid,chaoid,chaoname',
		params:{int_filestype:'sort',otherfields:'optdt={now}'},autoScroll:false,
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'BT名称',name:'namePost',allowBlank: false
		},{
			name:'receidPost',id:'receid_'+rand+'',hidden:true
		},{
			fieldLabel:'BT接收人',nameidfields:'receid_'+rand+'',name:'recenamePost',xtype:'changedeptuser',changetitle:'选择接收人',changetype:'usercheck',allowBlank: false
		},{
			name:'chaoidPost',id:'chaoid_'+rand+'',hidden:true
		},{
			fieldLabel:'抄送给',nameidfields:'chaoid_'+rand+'',name:'chaonamePost',xtype:'changedeptuser',changetitle:'选择抄送对象',changetype:'usercheck'
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	}
};

return {
	panel:panel
};
