var frompanel={
	submitfields:'outtime,intime,address,explain,atype,reason',labelWidth:100,
	params:{int_filestype:'totals',otherfields:'optdt={now},uid={adminid},status=0'},
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'姓名',xtype:'displayfield',value:adminname,name:'namePost'
	},{
		fieldLabel:'部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost'
	},{
		fieldLabel:'外出类型',xtype:'combo',name:'atypePost',editable:false,allowBlank: false,store:js.arraystr('外出,出差')
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'外出时间',name:'outtimePost',allowBlank: false,xtype:'datetimefield',width:'49%'
		},{
			fieldLabel:'预计回岗时间',name:'intimePost',allowBlank: false,xtype:'datetimefield',width:'50%'
		}]
	},{
		fieldLabel:'前往地址',name:'addressPost',allowBlank: false
	},{
		fieldLabel:'外出事由',name:'reasonPost',allowBlank: false,xtype:'textareafield',height:40
	},{
		fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:40
	}],
	submitcheck:function(o){
		var a  = o.getValuess();
		var st = a.outtime,
			et = a.intime;
		if(st>=et)return '外出时间不能大于预计回岗时间';
		return '';
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
	showdata:function(fo, da){
		fo.setVal('name', da.user.name);
		fo.setVal('deptname', da.user.deptname);
	}
}

return {
	panel:panelss
};