var panel = {
	xtype:'rockgridform',tablename:'email_tpl',formtitle:'系统邮件模版',celleditbool:true,iconqz:'email_',defaultorder:'`sort`',
	url:publicstore(mode,dir),storeafteraction:'aftertplstore',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',width:150,editor:'textfield',search:true
	},{
		text:'编号',dataIndex:'num',width:120,editor:'textfield',search:true
	},{
		text:'使用发送',dataIndex:'setnameid',width:150,search:true
	},{
		text:'发送标题',dataIndex:'title',width:150,search:true,editor:'textfield'
	},{
		text:'内容',align:'left',dataIndex:'content',flex:1,search:true,renderer:function(v){
			return v.replace(/\n/g, '<br>');
		}
	},{
		text:'操作时间',dataIndex:'optdt',width:160,search:true,atype:'date'
	},{
		text:'排序号',dataIndex:'sort',width:70,editor:{xtype:'numberfield',minValue:0},sortable:true
	}],
	tbar:['->',{
		text:'测试发送',icon:gicons('email_open'),handler:function(){
			this.up('rockgridform')._sendtest();
		}
	},'-',],
	_sendtest:function(){
		var num = this.changedata.num;
		if(isempt(num))return;
		js.msg('wait', '测试发送中...');
		$.get(js.getajaxurl('sendtest', mode, dir,{num:num}), function(da){
			if(da=='success'){
				js.msg(da, '发送成功');
			}else{
				js.msg('msg', da);
			}
		});
	},
	formwidth:500,
	formparams:{
		submitfields:'name,num,title,setid,content,sort',labelWidth:100,
		autoScroll:false,params:{int_filestype:'sort,setid',otherfields:'optdt={now},optname={admin},optid={adminid}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'编号',name:'numPost',allowBlank: false
		},{
			fieldLabel:''+bitian+'发送邮箱帐号',name:'setidPost',xtype:'combo',editable:false,store:[['','']],allowBlank: false
		},{
			fieldLabel:''+bitian+'发送标题',name:'titlePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'内容模版',name:'contentPost',allowBlank: false,height:100,xtype:'textareafield'
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	},
	loadgrid:function(){
		var a = this.getData('emailstore'),i,b=[];
		for(i=0; i<a.length; i++){
			b.push([a[i].id,''+a[i].name+'('+a[i].emailname+')']);
		}
		this.formparams.items[3].store = b;
	}
};

return {
	panel:panel
};
