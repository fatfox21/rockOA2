var frompanel={
	submitfields:'startdt,enddt,hyname,title,joinid,explain,joinname',
	params:{otherfields:'type=0,state=0'},
	url:publicsave('meet','humanres'),beforesaveaction:'applymeetbefore',
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'会议室',name:'hynamePost',allowBlank:false,xtype:'optioncombo',optionmnum:'meeting',autoloadlist:true
	},{
		fieldLabel:'主题',name:'titlePost',allowBlank: false
	},{
		fieldLabel:'开始时间',name:'startdtPost',allowBlank: false,xtype:'datetimefield',minValue:new Date()
	},{
		fieldLabel:'截止时间',name:'enddtPost',allowBlank: false,xtype:'datetimefield',minValue:new Date()
	},{
		name:'joinidPost',id:'joinid_'+rand+'',hidden:true
	},{
		fieldLabel:'参会人员',nameidfields:'joinid_'+rand+'',name:'joinnamePost',xtype:'changedeptuser',changetitle:'选择参会人员',changetype:'deptusercheck'
	},{
		fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:100
	}],
	submitcheck:function(o){
		var a  = o.getValuess();
		var st1= parseFloat(js.now('time',a.startdt))/1000,
			et1= parseFloat(js.now('time',a.enddt))/1000;
		if(st1>=et1)return '开始时间必须小于截止时间';
		var st = a.startdt,
			et = a.enddt;
		if(st.substr(0,10)!=et.substr(0,10))return '时间不允许跨日';
		return '';
	}
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
	}
}

return {
	panel:panelss
};