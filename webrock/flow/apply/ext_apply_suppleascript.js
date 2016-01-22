var frompanel={
	submitfields:'aid,aname,explain,total',labelWidth:100,
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'姓名',xtype:'displayfield',value:adminname,name:'namePost'
	},{
		fieldLabel:'部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost'
	},{
		fieldLabel:'申请物品',name:'aidPost',xtype:'combo',value:'',store:{fields: ['id', 'name'], autoLoad:false,proxy: {type:'ajax',url:js.getajaxurl('getsupple','supple','humanres'),reader: { root: 'rows'}}},editable:false,allowBlank: false,queryMode: 'remote',displayField: 'name',valueField: 'id',triggerAction:'all'
	},{
		name:'anamePost',hidden:true
	},{
		fieldLabel:'申请数量',name:'totalPost',xtype:'numberfield',value:1,minValue:1,allowBlank: false,editable:false
	},{
		fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:40
	}],
	submitcheck:function(o){
		this.setVal('aname', this.getField('aid').getRawValue());
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
		fo.getField('aid').setRawValue(da.data.aname);
	}
}

return {
	panel:panelss
};