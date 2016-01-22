var panel = {
	xtype:'rockgridform',tablename:'group',formtitle:'组',celleditbool:true,iconqz:'group_',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'组名',dataIndex:'name',width:200,editor:'textfield',search:true
	},{
		text:'排序号',dataIndex:'sort',width:80,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'验证',dataIndex:'ispir',width:80,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'ID',dataIndex:'id',width:60
	}],
	formparams:{
		submitfields:'name,ispir,sort',
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'<font color=red>*</font>组名',name:'namePost',allowBlank: false
		},{
			fieldLabel:'&nbsp;',name:'ispirPost',xtype:'checkboxfield',boxLabel:'权限验证',inputValue:'1',value:'1',checked:true,labelSeparator:''
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}],
		params:{int_filestype:'ispir'}
	}
};

return {
	panel:panel
};
