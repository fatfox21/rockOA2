var panel = {
	xtype:'rockgrid',tablename:'im_mess',checkcolumns:true,searchtools:true,defaultorder:'id desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'sendid',dataIndex:'sendid'
	},{
		text:'receid',dataIndex:'receid'
	},{
		text:'接收人',dataIndex:'receuid'
	},{
		text:'类型',dataIndex:'type'
	},{
		text:'时间',dataIndex:'optdt',search:true,width:160,type:'date'
	},{
		text:'内容',dataIndex:'cont',flex:1,align:'left',renderer:function(v){return jm.base64decode(v)}
	}]
};

return {
	panel:panel
};
