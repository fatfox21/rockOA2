var panel = {
	xtype:'rockgrid',tablename:'daily',formtitle:'工作日报',url:publiccheckstore('daily','person'),opentype:7,
	defaultorder:'a.`dt` desc',searchtools:true,
	tbarcenter:[{
		xtype:'combo',id:'type_'+rand+'',width:100,editable:false,store:js.arraystr('|-日报类型-,0|日报,1|周报,2|月报,3|年报'),value:''
	}],
	outsearch:function(){
		var typ = getcmp('type_'+rand+'').getValue(),s='';
		if(typ!='')s='and a.`type`='+typ+'';
		return s;
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',flex:1,search:true,sortable:true
	},{
		text:'姓名',dataIndex:'name',width:120,search:true,sortable:true
	},{
		text:'类型',dataIndex:'type',qz:'a.',width:100,search:false,sortable:true,renderer:function(v){
			var as =['日报','周报','月报','年报'];return as[v];
		}
	},{
		text:'日报日期',dataIndex:'dt',width:180,search:true,sortable:true
	},{
		text:'星期',dataIndex:'week',width:120
	},{
		text:'新增时间',dataIndex:'adddt',width:170,search:true,sortable:true
	},{
		text:'操作时间',dataIndex:'optdt',width:170,search:true,sortable:true
	}],
	fields:['content','plan'],
	features: [{
		ftype: 'rowbody',
		getAdditionalData: function(v, index) {
			var cont = v.content,
				s	= '',s1,plan = v.plan;
			var cls = 'x-grid-row-body-hidden';
			if(!isempt(cont)){
				cls = '';
				s1 = '【工作内容】<br>'+cont+'';
				if(!isempt(plan))s1+= '<br>【下次计划】<br>'+plan+'';
				s	= '<div style="padding:2px;padding-left:5px;line-height:20px">'+s1+'</div>';
			}
			return {
				rowBody: s,
				rowBodyCls:cls
			};
		}
	}, {
		ftype: 'rowwrap'
	}]
};

return {
	panel:panel
};