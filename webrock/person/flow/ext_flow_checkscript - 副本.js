function openurl(a){
	var sas = ['申请','审核'];
	var url = a.url,
		num = a.menunum,
		txt = a.title,
		typ = a.opentype;
	if(isempt(url))return;	
	if(typ){
		url+=',opentype='+typ+'';
		num+=''+typ+'';
	}
	addtabs(txt, url, num);
}

var panel = {
	bbarbool:false,xtype:'rockgrid',
	url:js.getajaxurl('daicl','home','index'),
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'功能名称',flex:1,dataIndex:'title',sortable:false,align:'left'
	},{
		text:'待处理数',width:150,dataIndex:'stotal',sortable:false
	}],
	click:function(a,v){
		openurl(v.raw);
	}
};
return {
	panel:panel
};