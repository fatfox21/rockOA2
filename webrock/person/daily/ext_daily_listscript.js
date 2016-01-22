var panel = {
	xtype:'rockgridform',tablename:'daily',formtitle:'工作日报',exceltitle:'工作日报',url:publiccheckstore(mode,dir),opentype:5,
	defaultorder:'a.`dt` desc',
	grideditwhere:function(da, o){
		return da.uid==adminid && da.xiu==1;
	},
	griddelwhere:function(da, o){
		return da.uid==adminid && da.xiu==1;
	},
	loadgrid:function(){
		var val = this.getData('minDate');
		if(val){
			this.formparams.items[3].minValue=val;
		}
	},
	_qiehuanzt:function(lx){
		this.setparams({opentype:lx},true);
	},
	tbar:['->',{
		text:'我的日报',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){rock[index]._qiehuanzt(5);}
	},'-',{
		text:'下属人员日报',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){rock[index]._qiehuanzt(4);}
	},,{
		text:'授权查看',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){rock[index]._qiehuanzt(6);}
	},'->'],
	columns:[{
		xtype: 'rownumberer',
		width: 30
	},{
		text:'部门',dataIndex:'deptname',flex:1,search:true,sortable:true
	},{
		text:'姓名',dataIndex:'name',width:120,search:true,sortable:true
	},{
		text:'日报日期',dataIndex:'dt',width:180,search:true,sortable:true
	},{
		text:'星期',dataIndex:'week',width:120
	},{
		text:'新增时间',dataIndex:'adddt',width:170,search:true,sortable:true
	},{
		text:'操作时间',dataIndex:'optdt',width:170,search:true,sortable:true
	}],
	formwidth:500,
	formparams:{
		submitfields:'content,dt',
		addjudgewhere:"id<>{id} and dt='{dt}' and uid={adminid}",editjudgewhere:'add',labelWidth:100,
		url:publicsave(mode,dir),aftersaveaction:'dailyafter',
		params:{int_filestype:'uid',add_otherfields:'adddt={now}',otherfields:'optdt={now},optname={admin},uid={adminid}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'姓名',name:'namePost',xtype:'displayfield',value:adminname
		},{
			fieldLabel:'部门',name:'deptnamePost',xtype:'displayfield',value:admindeptname
		},{
			fieldLabel:''+bitian+'日报日期',name:'dtPost',allowBlank: false,value:new Date(),format:'Y-m-d',xtype:'datefield',editable:false,maxValue:new Date()
		},{
			fieldLabel:''+bitian+'内容',name:'contentPost',allowBlank: false,xtype:'textarea',height:150
		},{
			fieldLabel:'以邮件汇报给',name:'huitypePost',xtype:'combo',editable:false,store:[['','不汇报'],['super','直属上级']]
		}]
	},
	fields:['content'],
	features: [{
		ftype: 'rowbody',
		getAdditionalData: function(v, index) {
			var cont = v.content,
				s	= '';
			var cls = 'x-grid-row-body-hidden';
			if(!isempt(cont)){
				cls = '';
				s	= '<div style="padding:2px;padding-left:5px;line-height:20px">【工作内容】<br>'+cont+'</div>';
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