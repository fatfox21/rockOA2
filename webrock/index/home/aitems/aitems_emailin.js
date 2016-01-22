var showdfun	= function(v,m,r){
	if(r.get('iswd')==1)v='<b>'+v+'</b>';
	return v;
};
var opentablss = function(id){
	addtabs('邮件详情','person,email,view,mid='+id+',typeoi=0','email_view'+id+'',{menutype:'cy'});
};
homeitems.emailin={
	xtype:'rockgrid',tablename:'emailm',pageSize:5,tools:tools,frame: true,padding:0,border:false,url:js.getajaxurl('homeemailm', 'email', 'person'),
	bbarbool:false,fields:['iswd'],abcnum:'emailin',abcurl:'person,email',
	title:'内部邮件<span id="inforemailintotal" class=red></span>',tabstitle:'内部邮件',
	columns:[{
		text:'',dataIndex:'xuhao',width: 35,renderer:showdfun
	},{
		text:'发件人',dataIndex:'sendname',width:70,search:true,renderer:showdfun
	},{
		text:'主题',dataIndex:'title',flex:1,align:'left',renderer:function(v,m,t){
			var d 	= t.data,s1='';
			if(d.iswd==1)s1=';font-weight:bold';
			var s   = '<span tasid="'+d.id+'" temp="span_'+rand+'" style="cursor:pointer'+s1+'"><u>'+v+'</u></span>';
			return s;
		}
	},{
		text:'时间',dataIndex:'senddt',autowidth:true,renderer:showdfun
	}],
	load:function(){
		var to = this.getData('wdtotal'),s='';
		if(to>0)s='('+to+')';
		$('#inforemailintotal').html(s);
		$("span[temp='span_"+rand+"']").click(function(){
			var sod = $(this).attr('tasid');
			opentablss(sod);
		});
	},
	dblclick:function(o, r){
		var url = js.getajaxurl('$emailin','view','taskrun',{uid:adminid,id:r.data.id,jmbool:true});
		js.open(url, 800);
	}
};