var form,mid;
mid = params.id;
if(isempt(mid))mid = 0;

function boackindie(){
	if(mid!=0){
		var data = rock[params.index].changedata;
		form.adddata(data, 'id');
		form.setmsg('修改状态','blue');
		form.getField('fileid').loadfile('daily', data.id);
		form.getField('type').setReadOnly(true);
		if(data.type==0)form.getField('dt').setReadOnly(true);
	}
}

var panel= {
	width:600,
	xtype:'rockform',tablename:'daily',border:false,
	submitfields:'content,dt,enddt,plan,type',labelWidth:100,
	url:publicsave(mode,dir),aftersaveaction:'dailyafter',beforesaveaction:'dailybefore',
	params:{int_filestype:'uid',add_otherfields:'adddt={now}',otherfields:'optdt={now},optname={admin},uid={adminid},optid={adminid}'},
	items:[{
		fieldLabel:'id号',value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:'姓名',name:'namePost',xtype:'displayfield',value:adminname
	},{
		fieldLabel:'部门',name:'deptnamePost',xtype:'displayfield',value:admindeptname
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'日报类型',xtype:'combo',name:'typePost',editable:false,store:js.arraystr('0|日报,1|周报,2|月报,3|年报'),value:'0',width:'50%',listeners:{
				change:function(o){
					form.getField('enddt').setVisible(o.value!='0');
					form.getField('huitype').setVisible(o.value=='0');
				}
			}
		},{
			fieldLabel:'以邮件汇报给',name:'huitypePost',xtype:'combo',editable:false,store:[['','不汇报'],['super','直属上级']],width:'49%',value:''
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:''+bitian+'日期',name:'dtPost',allowBlank: false,value:new Date(),format:'Y-m-d',xtype:'datefield',editable:false,maxValue:new Date(),width:'50%'
		},{
			fieldLabel:''+bitian+'截止日期',name:'enddtPost',format:'Y-m-d',xtype:'datefield',editable:false,width:'49%',hidden:true
		}]
	},{
		fieldLabel:''+bitian+'内容',xtype:'textareafield',name:'contentPost',height:120,allowBlank: false
	},{
		fieldLabel:'下次计划',xtype:'textareafield',name:'planPost',height:80
	},uploadwindows.fields()],
	submitcheck:function(o){
		if(this.getVal('type')=='1' && isempt(this.getVal('enddt')))return '请选择截止日期';
		return '';
	},
	success:function(){
		js.msg('success','处理成功');
		getparent('dailylist','setReload', true);
		closetabs(nowtab.num);
	}
};

return {
	panel:{
		xtype:'panel',border:false,
		layout: {
			type: 'hbox',
			align: 'stretch',
			pack: 'center'
		},
		items:panel
	},
	init:function(){
		form = rock[index].child('rockform');
		boackindie();
	}
};