var atype = params.atype;
var panel = {
	xtype:'rockgrid',tablename:'daily',itemId:'dailylist',formtitle:'工作日报',exceltitle:'工作日报',url:publiccheckstore(mode,dir),opentype:atype,
	defaultorder:'a.`dt` desc',searchtools:true,
	_qiehuanzt:function(lx){
		this.setparams({opentype:lx},true);
	},
	tbarcenter:[{
		xtype:'combo',id:'type_'+rand+'',width:100,editable:false,store:js.arraystr('|-日报类型-,0|日报,1|周报,2|月报,3|年报'),value:''
	}],
	outsearch:function(){
		var typ = getcmp('type_'+rand+'').getValue(),s='';
		if(typ!='')s='and a.`type`='+typ+'';
		return s;
	},
	tbar:['->',{
		text:'新增',icon:gicons('add'),handler:function(){
			this.up('grid')._clickeadd();
		}
	},'-',{
		text:'编辑',icon:gicons('edit'),id:'editbtn_'+rand+'',disabled:true,handler:function(){
			this.up('grid')._clickedit();
		}
	},'-',{
		text:'删除',icon:gicons('delete'),id:'delbtn_'+rand+'',disabled:true,handler:function(){
			this.up('grid').del();
		}
	}],
	click:function(o,d){
		if(atype == 5){
			var bo = d.data.uid!=adminid;
			getcmp('editbtn_'+rand+'').setDisabled(bo);
			getcmp('delbtn_'+rand+'').setDisabled(bo);
		}
	},
	beforeload:function(){
		if(atype == 5){
			getcmp('editbtn_'+rand+'').setDisabled(true);
			getcmp('delbtn_'+rand+'').setDisabled(true);
		}
	},
	_clickedit:function(){
		var sid = this.changedata.id;
		addtabs('新增日报','person,daily,add,id='+sid+',index='+index+'','dailyadd_'+sid+'',{icon:gicons('edit')});
	},
	_clickeadd:function(){
		addtabs('新增日报','person,daily,add,index='+index+'','dailyadd',{icon:gicons('add')});
	},
	columns:[{
		xtype: 'rownumberer',
		width: 30
	},{
		text:'部门',dataIndex:'deptname',flex:1,search:true,sortable:true
	},{
		text:'姓名',dataIndex:'name',width:120,search:true,sortable:true
	},{
		text:'类型',dataIndex:'type',qz:'a.',width:100,sortable:true,renderer:function(v){
			var as =['日报','周报','月报','年报'];return as[v];
		}
	},{
		text:'日报日期',dataIndex:'dt',width:180,search:true,sortable:true,qz:'a.'
	},{
		text:'星期',dataIndex:'week',width:120
	},{
		text:'新增时间',dataIndex:'adddt',width:170,search:true,sortable:true
	},{
		text:'操作时间',dataIndex:'optdt',width:170,search:true,sortable:true
	}],
	fields:['content','plan','uid'],
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
if(atype!=5)panel.tbar = [];
return {
	panel:panel,
	tabson:{
		show:function(){
			rock[index].isReload();	
		}
	}
};