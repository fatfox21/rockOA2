var frompanel={
	submitfields:'title,explain,content',labelWidth:100,
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'标题',name:'titlePost',editable:false,allowBlank:false
	},{
		fieldLabel:'内容',name:'contentPost',xtype:'kindeditor',height:200,id:'content_'+rand+''
	},{
		fieldLabel:'说明备注',name:'explainPost',xtype:'textareafield',height:60
	},
	uploadwindows.fields()],
	submitcheck:function(){
		getcmp('content_'+rand+'').submitValue();
	}
};
var panelss = {
	xtype:'rockflowform',
	formparams:frompanel,
	formwidth:700,
	opttype:params.opttype,
	tablename:params.tablename,
	flownum:params.flownum,
	mid:params.mid,
	gridid:params.gridid,
	showdata:function(fo, da){
		
	}
}

return {
	panel:panelss
};