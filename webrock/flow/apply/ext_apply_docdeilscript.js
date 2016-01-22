var frompanel={
	submitfields:'receid,recename,explain,title',labelWidth:100,
	params:{int_filestype:'receid',otherfields:'optdt={now},uid={adminid},status=0'},
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'姓名',xtype:'displayfield',value:adminname,name:'namePost'
	},{
		fieldLabel:'部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost'
	},{
		fieldLabel:'标题',name:'titlePost',allowBlank: false
	},{
		name:'receidPost',id:'receid_'+rand+'',hidden:true
	},{
		fieldLabel:'接收人',name:'recenamePost',allowBlank: false,xtype:'changedeptuser',changetype:'user',nameidfields:'receid_'+rand+'',changetitle:'选择接收人'
	},uploadwindows.fields(),{
		fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60
	}],
	submitcheck:function(o){
		var d = o.getValuess(),s='';
		if(d.fileid=='')s='请添加相关文件';
		return s;
	}
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
	showdata:function(fo, da, o){
		fo.setVal('name', da.user.name);
		fo.setVal('deptname', da.user.deptname);
	}
}

return {
	panel:panelss
};