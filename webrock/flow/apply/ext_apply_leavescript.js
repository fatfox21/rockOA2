var form;
var c = {
	tal:function(v){
		var t=0,h=0,s='';
		if(v>0){
			t = parseInt(v/8);
			h = v%8;
		}
		s=''+h+'小时';
		if(h==0)s='';
		if(t>0)s=''+t+'天'+s;
		return s
	},
	ctime:function(){
		var a  = form.getValuess();
		var st = a.stime,
			et = a.etime;
		if(isempt(st)||isempt(et)){
			form.setVal('totals',0);
			return;
		}
		if(st.substr(0,7)!=et.substr(0,7)){
			form.setmsg('不允许跨月申请');
			return;
		}	
		$.post(js.getajaxurl('total','leave','person'),{stime:st,etime:et}, function(da){
			var a= js.decode(da);
			form.setVal('totals',a[0]);
			form.setmsg(a[1],'red');
		});
	}
}

var frompanel={
	submitfields:'qjkind,stime,etime,totals,explain',
	params:{int_filestype:'totals',otherfields:'optdt={now},uid={adminid},kind=请假,status=0'},
	url:js.getajaxurl('publicsave','leave','person'),
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'姓名',xtype:'displayfield',value:adminname,name:'namePost'
	},{
		fieldLabel:'部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost'
	},{
		fieldLabel:'请假类型',name:'qjkindPost',allowBlank: false,xtype:'optioncombo',optionmnum:'leavetypem',autoloadlist:true
	},{
		fieldLabel:'开始时间',name:'stimePost',allowBlank: false,xtype:'rockdate',format:'Y-m-d H:i:00',editable:false,onpicked:function(){c.ctime()}
	},{
		fieldLabel:'截止时间',name:'etimePost',allowBlank: false,xtype:'rockdate',format:'Y-m-d H:i:00',editable:false,onpicked:function(){c.ctime()}
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'请假(小时)',name:'totalsPost',allowBlank: false,xtype:'numberfield',minValue:0,value:'0',width:'70%',validator:function(v){
				$('#tisnshuto_'+rand+'').html('&nbsp;'+c.tal(v)+'');
				return (v>0)?true:'请假时间至少要1个小时';
			}
		},{
			xtype:'label',html:'<div style="padding-top:3px;font-size:12px" id="tisnshuto_'+rand+'">&nbsp;0天0小时</div>'
		}]
	},{
		fieldLabel:'说明',name:'explainPost',allowBlank: false,xtype:'textareafield',height:100
	}],
	submitcheck:function(o){
		var a  = o.getValuess();
		if(a.totals<=0)return '时间不能为'+a.totals+'小时';
		var st = a.stime,
			et = a.etime;
		if(st.substr(0,7)!=et.substr(0,7))return '不允许跨月申请';
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