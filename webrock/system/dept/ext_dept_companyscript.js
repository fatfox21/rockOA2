var panel = {
	xtype:'rockgridform',tablename:'company',formtitle:'公司',celleditbool:true,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'公司名称',dataIndex:'name',width:250,search:true
	},{
		text:'排序号',dataIndex:'sort',width:100,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'负责人',dataIndex:'chargename',width:150,search:true
	},{
		text:'地址',dataIndex:'address',flex:1,search:true
	},{
		text:'ID',dataIndex:'id',width:60
	}],
	formwidth:400,
	formparams:{
		submitfields:'name,chargename,sort,chargeid,address',autoScroll:false,
		params:{int_filestype:'sort',otherfields:'optdt={now}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'BT名称',name:'namePost',allowBlank: false
		},{
			name:'chargeidPost',id:'chargeid_'+rand+'',hidden:true
		},{
			fieldLabel:'负责人',nameidfields:'chargeid_'+rand+'',name:'chargenamePost',xtype:'changedeptuser',changetitle:'选择负责人',changetype:'usercheck'
		},{
			fieldLabel:'地址',name:'addressPost'
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	}
};

return {
	panel:panel
};
