var panel = {
	xtype:'rockgridform',tablename:'email',formtitle:'发邮件帐号',celleditbool:true,iconqz:'email_',defaultorder:'`sort`',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',flex:1,editor:'textfield',search:true
	},{
		text:'邮箱帐号',dataIndex:'emailname',flex:1,search:true
	},{
		text:'SMTP服务器',dataIndex:'serversmtp',flex:1,search:true
	},{
		text:'服务器端口',dataIndex:'serverport',width:100,search:true
	},{
		text:'连接方式',dataIndex:'secure',width:100,search:true
	},{
		text:'操作时间',dataIndex:'optdt',width:160,search:true,atype:'date'
	},{
		text:'排序号',dataIndex:'sort',width:80,editor:{xtype:'numberfield',minValue:0},sortable:true
	},{
		text:'ID',dataIndex:'id',width:60
	}],
	formparams:{
		submitfields:'name,emailname,serversmtp,serverport,sort,secure',labelWidth:100,
		autoScroll:false,params:{int_filestype:'sort',otherfields:'optdt={now}'},
		beforesaveaction:'setemailpass',url:publicsave(mode, dir),
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'邮箱帐号',name:'emailnamePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'邮箱密码',name:'emailpassPost'
		},{
			fieldLabel:''+bitian+'SMTP服务器',name:'serversmtpPost',allowBlank: false
		},{
			fieldLabel:''+bitian+'服务器端口',name:'serverportPost',allowBlank: false
		},{
			fieldLabel:'连接方式',name:'securePost',xtype:'combo',editable:false,store:[['','默认'],['ssl','ssl']]
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	}
};

return {
	panel:panel
};
