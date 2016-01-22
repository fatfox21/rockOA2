
var frompanel={
	submitfields:'entrydt,syenddt,positivedt,explain,ranking',
	params:{otherfields:''},beforesaveaction:'positivebefore',url:publicsave('hr','humanres'),
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'姓名',xtype:'displayfield',value:adminname,name:'namePost'
	},{
		fieldLabel:'部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost'
	},{
		fieldLabel:'职位',name:'rankingPost',id:'ranking_'+rand+''
	},{
		fieldLabel:'入职日期',name:'entrydtPost',id:'entrydt_'+rand+'',allowBlank: false,xtype:'datefield',format:'Y-m-d',editable:false
	},{
		fieldLabel:'试用到期日',name:'syenddtPost',allowBlank: false,xtype:'datefield',format:'Y-m-d',editable:false
	},{
		fieldLabel:'转正日期',name:'positivedtPost',allowBlank: false,xtype:'datefield',format:'Y-m-d',editable:false
	},{
		fieldLabel:'说明',name:'explainPost',allowBlank: false,xtype:'textareafield',height:100
	}],
	submitcheck:function(o){
		
		return '';
	}
};

if(params.mid==0){
	$.get(js.getajaxurl('getuinf','hr','humanres'),function(da){
		var d = js.decode(da);
		getcmp('entrydt_'+rand+'').setValue(d.workdate);
		getcmp('ranking_'+rand+'').setValue(d.ranking);
	});
}

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