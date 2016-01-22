var frompanel={
	submitfields:'object,uid,atype,result,money,explain',params:{int_filestype:'money'},
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		value:'0',name:'uidPost',id:'uid_'+rand+'',hidden:true
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'奖惩对象',name:'objectPost',width:'49%',allowBlank: false,nameidfields:'uid_'+rand+'',xtype:'changedeptuser',changetitle:'选择奖惩对象',changetype:'user'
		},{
			fieldLabel:'奖惩类型',name:'atypePost',allowBlank: false,xtype:'optioncombo',optionmnum:'rewardtype',autoloadlist:true,width:'50%'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'奖惩结果',name:'resultPost',allowBlank: false,xtype:'optioncombo',optionmnum:'rewardresult',width:'49%'
		},{
			fieldLabel:'奖惩金额',name:'moneyPost',allowBlank: false,xtype:'optioncombo',optionmnum:'rewardmoney',autoloadlist:true,width:'50%',valuefields:'value',value:'0'
		}]
	},{
		fieldLabel:'说明',name:'explainPost',allowBlank: false,xtype:'textareafield',height:100
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
		//fo.setVal('object', da.user.name);
		//fo.setVal('deptname', da.user.deptname);
	}
}

return {
	panel:panelss
};