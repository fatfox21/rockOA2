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
	}]
};

return {
	panel:panel
};
