var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'reward',formtitle:'奖惩处罚',exceltitle:'奖惩处罚',
	tablename:'reward',defaultorder:'id desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'奖惩对象',dataIndex:'object',width:70,search:true
	},{
		text:'部门',dataIndex:'deptname',width:80,search:true,autowidth:true
	},{
		text:'奖惩类型',dataIndex:'atype',width:80,search:true
	},{
		text:'奖惩结果',dataIndex:'result',width:100,search:true
	},{
		text:'奖惩金额',dataIndex:'money',width:110,search:true
	},{
		text:'操作时间',dataIndex:'optdt',width:160,search:true,atype:'date'
	},{
		text:'操作人',dataIndex:'optname',width:70,search:true
	},{
		text:'状态',dataIndex:'status'
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,sortable:false,search:true
	}]
};

return {
	panel:panel,
	tabson:{
		show:function(){
			rock[index].isReload();
		}
	}
};