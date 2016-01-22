
var panel= {
	xtype:'rockgrid',checkcolumns:true,defaultorder:'id desc',
	tablename:'log',searchtools:true,
	columns:[{
		xtype: 'rownumberer',
		width: 30
	},{
		text:'类型',search:true,dataIndex:'type',width:100
	},{
		text:'时间',dataIndex:'optdt',width:160,search:true,atype:'date'
	},{
		text:'IP',dataIndex:'ip',width:130,search:true
	},{
		text:'浏览器',dataIndex:'web',width:130,search:true
	},{
		text:'备注',align:'left',dataIndex:'remark',flex:1,search:true
	},{
		text:'操作人',dataIndex:'optname',width:80,search:true
	}],
	tbar:['->',{
		text:'删除',icon:gicons('delete'),handler:function(){
			rock[index].del(false,true);
		}
	}]
};

return {
	panel:panel
};
