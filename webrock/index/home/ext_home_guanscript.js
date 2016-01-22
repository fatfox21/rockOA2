var panel = {
	xtype:'rockgridform',tablename:'homeitems',formtitle:'首页项',celleditbool:true,defaultorder:'lie,sort',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'title',width:200,editor:'textfield',search:true
	},{
		text:'编号',dataIndex:'num',width:150,search:true
	},{
		text:'可用对象',dataIndex:'recename',width:200,search:true
	},{
		text:'所在列',dataIndex:'lie',width:100,editor:{xtype:'numberfield',minValue:1,maxValue:3}
	},{
		text:'排序号',dataIndex:'sort',width:100,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'是否可用',dataIndex:'valid',width:80,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'是否默认',dataIndex:'ismr',width:80,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'ID',dataIndex:'id',width:70
	}],
	tbar:['需在index/home/aitems/目录下创建js文件'],
	formparams:{
		submitfields:'title,lie,num,sort,receid,recename,valid,ismr',
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'BT组名',name:'titlePost',allowBlank: false
		},{
			fieldLabel:'BT编号',name:'numPost',allowBlank: false
		},{
			name:'receidPost',id:'receid_'+rand+'',xtype:'textfield',hidden:true
		},{
			fieldLabel:'可用对象',nameidfields:'receid_'+rand+'',name:'recenamePost',xtype:'changedeptuser',changetitle:'选择对象',changetype:'deptusercheckall'
		},{
			fieldLabel:'所在列',name:'liePost',value:'1',minValue:1,xtype:'numberfield',maxValue:3
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		},{
			fieldLabel:'&nbsp;',name:'validPost',xtype:'checkboxfield',boxLabel:'可用',inputValue:'1',value:'1',checked:true,labelSeparator:''
		},{
			fieldLabel:'&nbsp;',name:'ismrPost',xtype:'checkboxfield',boxLabel:'默认项',inputValue:'1',value:'1',checked:true,labelSeparator:''
		}],
		params:{int_filestype:'lie,sort,valid,ismr'}
	}
};

return {
	panel:panel
};
