var form;
var c = {
	ctime:function(){
		var a  = form.getValuess();
		var st = a.stime,
			et = a.etime;
		if(isempt(st)||isempt(et)){
			form.setVal('totals',0);
			return;
		}
		if(st.substr(0,10)!=et.substr(0,10)){
			form.setmsg('加班不允许跨日');
			return;
		}	
		$.post(js.getajaxurl('total','jiaban','person'),{stime:st,etime:et}, function(da){
			var a= js.decode(da);
			form.setVal('totals',a[0]);
			form.setmsg(a[1],'red');
		});
	}
}

var frompanel={
	submitfields:'stime,etime,totals,explain',
	params:{int_filestype:'totals',otherfields:'optdt={now},uid={adminid},kind=加班,status=0'},
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'姓名',xtype:'displayfield',value:adminname,name:'namePost'
	},{
		fieldLabel:'部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost'
	},{
		fieldLabel:'开始时间',name:'stimePost',allowBlank: false,xtype:'rockdate',format:'Y-m-d H:i:00',editable:false,onpicked:function(){c.ctime()}
	},{
		fieldLabel:'截止时间',name:'etimePost',allowBlank: false,xtype:'rockdate',format:'Y-m-d H:i:00',editable:false,onpicked:function(){c.ctime()}
	},{
		fieldLabel:'加班(小时)',name:'totalsPost',allowBlank: false,readOnly:true,value:'0',width:'70%',validator:function(v){
			return (v>0)?true:'加班时间至少要1个小时';
		}
	},{
		fieldLabel:'说明',name:'explainPost',allowBlank: false,xtype:'textareafield',height:100
	}],
	submitcheck:function(o){
		var a  = o.getValuess();
		var st = a.stime,
			et = a.etime;
		if(st.substr(0,10)!=et.substr(0,10))return '加班不允许跨日';
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
		fo.setVal('name', da.user.name);
		fo.setVal('deptname', da.user.deptname);
	}
}

return {
	panel:panelss,
	init:function(){
		form = rock[index].getForm();
	}
};