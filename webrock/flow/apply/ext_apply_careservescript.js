var frompanel={
	submitfields:'usename,useid,startdt,enddt,address,xianlines,carnum,carid,jiaid,jianame,explain,useren',params:{int_filestype:'useren'},
	url:js.getajaxurl('publicsave','car','humanres'),beforesaveaction:'panduanyuding',
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'使用人',name:'usenamePost',width:'49%',allowBlank: false,nameidfields:'useid_'+rand+'',xtype:'changedeptuser',changetitle:'选择使用人',changetype:'deptusercheck'
		},{
			name:'useidPost',id:'useid_'+rand+'',hidden:true
		},{
			fieldLabel:'使用人数',name:'userenPost',allowBlank: false,xtype:'numberfield',value:0,minValue:0,width:'50%'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'datetimefield',layout:'hbox',items:[{
			fieldLabel:'开始时间',name:'startdtPost',allowBlank: false,width:'49%'
		},{
			fieldLabel:'截止时间',name:'enddtPost',allowBlank: false,width:'50%'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'目的地',name:'addressPost',width:'49%',allowBlank: false
		},{
			fieldLabel:'线路',name:'xianlinesPost',width:'50%',allowBlank: false
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'预定车辆',name:'caridPost',width:'49%',allowBlank: false,xtype:'rockcombo',url:js.getajaxurl('getcardata','car','humanres'),autoloadlist:true,valuefields:'id',displayfields:'carnum',change:function(o){getcmp('carnum_'+rand+'').setValue(o.getRawValue())}
		},{
			name:'jiaidPost',id:'jiaid_'+rand+'',hidden:true
		},{
			name:'carnumPost',id:'carnum_'+rand+'',hidden:true
		},{
			fieldLabel:'驾驶员',name:'jianamePost',width:'50%',allowBlank: false,nameidfields:'jiaid_'+rand+'',xtype:'changedeptuser',changetitle:'选择驾驶员',changetype:'usercheck'
		}]
	},{
		fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60
	}]
};



var panelss = {
	xtype:'rockflowform',
	formparams:frompanel,
	formwidth:650,
	opttype:params.opttype,
	tablename:params.tablename,
	flownum:params.flownum,
	mid:params.mid,
	gridid:params.gridid
}

return {
	panel:panelss
};