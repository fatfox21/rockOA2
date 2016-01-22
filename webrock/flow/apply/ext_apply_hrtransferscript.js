var frompanel={
	submitfields:'tranuid,newdeptid,tranname,trantype,olddeptname,newdeptname,oldranking,newranking,effectivedt,explain',labelWidth:100,
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		name:'tranuidPost',id:'tranuid_'+rand+'',hidden:true
	},{
		name:'newdeptidPost',id:'newdeptid_'+rand+'',hidden:true
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'要调动人',otherfields:{deptname:'olddeptname_'+rand+'',ranking:'oldranking_'+rand+''},nameidfields:'tranuid_'+rand+'',name:'trannamePost',xtype:'changedeptuser',changetitle:'选择要调动人',changetype:'user',allowBlank: false,width:'49%'
		},{
			fieldLabel:'调动类型',name:'trantypePost',allowBlank: false,xtype:'optioncombo',optionmnum:'transfertype',width:'49%'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'原来部门',name:'olddeptnamePost',id:'olddeptname_'+rand+'',width:'49%',readOnly:true,allowBlank: false
		},{
			fieldLabel:'调动后部门',name:'newdeptnamePost',nameidfields:'newdeptid_'+rand+'',width:'49%',allowBlank: false,xtype:'changedeptuser',changetitle:'选择调动后部门',changetype:'dept'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'原来职位',name:'oldrankingPost',id:'oldranking_'+rand+'',width:'49%',allowBlank: false
		},{
			fieldLabel:'调动后职位',name:'newrankingPost',width:'49%',allowBlank: false,xtype:'optioncombo',optionmnum:'ranking'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'生效日期',name:'effectivedtPost',allowBlank: false,xtype:'datefield',format:'Y-m-d',editable:false,width:'49%'
		},{
			fieldLabel:'申请人',name:'namePost',width:'49%',readOnly:true,value:adminname
		}]
	},{
		fieldLabel:'说明',name:'explainPost',allowBlank: false,xtype:'textareafield',height:100
	}]
};


var panelss = {
	xtype:'rockflowform',
	formparams:frompanel,
	formwidth:600,
	opttype:params.opttype,
	tablename:params.tablename,
	flownum:params.flownum,
	mid:params.mid,
	gridid:params.gridid,
	showdata:function(fo, da){
		fo.setVal('name', da.user.name);
	}
}

return {
	panel:panelss
};