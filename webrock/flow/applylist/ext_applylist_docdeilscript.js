var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'docdeil',fields:['filestr'],
	tablename:'docdeil',defaultorder:'id desc',url:publiccheckstore('docdeil','person'),storeafteraction:'docdeilfile',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:90,search:true
	},{
		text:'部门',dataIndex:'deptname',width:180,search:true
	},{
		text:'标题',dataIndex:'title',autowidth:true
	},{
		text:'接收人',dataIndex:'recename',width:80,search:true
	},{
		text:'状态',dataIndex:'status'
	},{
		text:'相关文件',dataIndex:'filestr',autowidth:true,align:'left'
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,sortable:false,search:true
	}],
	formtitle:'文件传送'
};

return {
	panel:panel
};