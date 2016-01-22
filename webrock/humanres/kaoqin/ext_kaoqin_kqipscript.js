var panel={
	tablename:'kq_dkip',formtitle:'在线打卡IP',celleditbool:true,
	xtype:'rockgridform',defaultorder:'`sort`',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'针对对象',dataIndex:'recename',flex:1,search:true
	},{
		text:'可打卡ip',dataIndex:'ipvalue',width:'30%',search:true
	},{
		text:'排序号',dataIndex:'sort',width:'13%',editor:{xtype:'numberfield',minValue:0}
	},{
		text:'ID',dataIndex:'id',width:'13%'
	}],
	formwidth:500,
	formparams:{
		submitfields:'recename,receid,sort,ipvalue',labelWidth:120,autoScroll:false,
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			id:'receid_'+rand+'',name:'receidPost',hidden:true
		},{
			fieldLabel:'针对对象',nameidfields:'receid_'+rand+'',name:'recenamePost',xtype:'changedeptuser',changetitle:'选择部门/人员',changetype:'deptusercheck',allowBlank: false
		},{
			fieldLabel:'可打卡ip(多个,分开)',name:'ipvaluePost',allowBlank: false
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	}
};
return {
	panel:panel
};