var openurl = function(a){
	var url = a.url,
		num = a.menunum,
		txt = a.title,
		typ = a.opentype;
	if(isempt(url))return;
	if(url=='check'){
		url = 'flow,applylist,'+a.num+',opentype='+typ+'';
		num = ''+a.num+'list_'+typ+'';
	}
	addtabs(txt, url, num);
};
homeitems.daib = {
	title:'待办/处理',bbarbool:false,hideHeaders:false,xtype:'rockgrid',closable:false,frame:true,border:false,
	url:js.getajaxurl('daiban','flow','person'),tools:tools,id:'daishen_'+rand+'',abcurl:'flow,apply,check',abcnum:'daicheck',
	fields:['stotal','xuhao'],
	columns:[{
		text:'',dataIndex:'xuhao',width: 35
	},{
		text:'名称',flex:1,dataIndex:'title',sortable:false,align:'left',renderer:function(v,v1,a1){
			var d=a1.data;
			var s = v;
			if(d.stotal>0)s+=' <font color=red>('+d.stotal+')</font>';
			return s;
		}
	}],
	click:function(a,v){
		openurl(v.raw);
	}
};