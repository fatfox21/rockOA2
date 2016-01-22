var frompanel={
	submitfields:'errtype,dt,ytime,explain',labelWidth:100,
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'姓名',xtype:'displayfield',value:adminname,name:'namePost'
	},{
		fieldLabel:'部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost'
	},{
		fieldLabel:'异常类型',name:'errtypePost',allowBlank: false,xtype:'optioncombo',optionmnum:'dakaerrtype'
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'日期',name:'dtPost',allowBlank: false,xtype:'datefield',format:'Y-m-d',editable:false,maxValue:new Date(),width:'49%'
		},{
			fieldLabel:'应打卡时间',name:'ytimePost',allowBlank: false,xtype:'rockdate',format:'H:i:s',width:'50%'
		}]
	},{
		fieldLabel:'说明',name:'explainPost',allowBlank: false,xtype:'textareafield',height:60
	}]
};
var panelss = {
	xtype:'rockflowform',
	formparams:frompanel,
	formwidth:550,
	opttype:params.opttype,
	tablename:params.tablename,
	flownum:params.flownum,
	mid:params.mid,
	gridid:params.gridid,
	showdata:function(fo, da){
		fo.setVal('name', da.user.name);
		fo.setVal('deptname', da.user.deptname);
	}
}
return {
	panel:panelss
};