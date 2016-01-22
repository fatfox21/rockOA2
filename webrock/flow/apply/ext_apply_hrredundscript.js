var frompanel={
	submitfields:'entrydt,quitdt,ranking,redundtype,redundreson,explain',
	params:{otherfields:''},beforesaveaction:'hrredundbefore',url:publicsave('hr','humanres'),
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'姓名',xtype:'displayfield',value:adminname,name:'namePost'
	},{
		fieldLabel:'部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost'
	},{
		
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'职位',name:'rankingPost',id:'ranking_'+rand+'',width:'49%'
		},{
			fieldLabel:'离职类型',name:'redundtypePost',allowBlank: false,xtype:'optioncombo',optionmnum:'redundtype',width:'49%'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'入职日期',name:'entrydtPost',id:'entrydt_'+rand+'',allowBlank: false,xtype:'datefield',format:'Y-m-d',editable:false,width:'49%'
		},{
			fieldLabel:'离职日期',name:'quitdtPost',allowBlank: false,xtype:'datefield',format:'Y-m-d',editable:false,width:'49%'
		}]
	},{
		name:'redundresonPost',hidden:true
	},{
		xtype: 'checkboxgroup',fieldLabel: ''+bitian+'离职原因',allowBlank: false,
		columns: 3,id:'check_'+rand+'',
		items: [
			{boxLabel: '无法胜任工作',name:'redundresonssPost',inputValue:'无法胜任工作'},
			{boxLabel: '另找到工作',name:'redundresonssPost',inputValue:'另找到工作'}
		]
	},{
		fieldLabel:'说明',name:'explainPost',allowBlank: false,xtype:'textareafield',height:100
	}],
	submitcheck:function(o){
		var d = o.getValues();
		o.setVal('redundreson', d.redundresonssPost);
		return '';
	}
};


$.get(js.getajaxurl('hrendund','hr','humanres'),function(da){
	var d = js.decode(da);
	if(params.mid==0){
		getcmp('entrydt_'+rand+'').setValue(d.urs.workdate);
		getcmp('ranking_'+rand+'').setValue(d.urs.ranking);
	}
	var  o = getcmp('check_'+rand+'');
	o.removeAll();
	var a= [],i;
	for(i=0; i<d.reson.length; i++){
		a.push({boxLabel:d.reson[i].name,name:'redundresonssPost',inputValue:d.reson[i].name});
	}
	o.add(a);
	
});

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
		
		getcmp('check_'+rand+'').items.each(function(f){
			var das = da.data.redundreson;
			if(das.indexOf(f.inputValue)>-1)f.setValue(true);
			
		});
	}
}

return {
	panel:panelss
};