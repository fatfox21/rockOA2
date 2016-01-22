var tree;

function clickadd(){
	windowsss();
	form.reset();
	form.setmsg('新增状态','blue');
	form.getField('fileid').loadfile('infor');
}
function btn(bo){
	try{
	getcmp('adddown_'+rand+'').setDisabled(bo);
	getcmp('edit_'+rand+'').setDisabled(bo);
	getcmp('del_'+rand+'').setDisabled(bo);
	}catch(e){}	
}

var panel = {
	xtype:'rocktree',
	url:publictreestore({order:'xu',expandall:'true',pidfields:'mnum',idfields:'num'}),
	tablename:'option',
	fistwhere:"and num='filetype'",
	tbar:[{
		text:'刷新',handler:function(){tree.storereload()},icon:gicons('reload')
	},'->',{
		text:'新增',icon:gicons('add'),handler:function(){clickadd()}
	},'-',{
		text:'新增下级',icon:gicons('add'),handler:function(){clickadddown()},disabled:true,id:'adddown_'+rand+''
	},'-',{
		text:'修改',icon:gicons('page_edit'),disabled:true,id:'edit_'+rand+'',handler:function(){clickedit()}
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,id:'del_'+rand+'',handler:function(a){tree.del(a)}
	}],
	columns:[{
		xtype: 'treecolumn',
		text:'名称',align:'left',dataIndex:'name',flex:1
	},{
		text:'编号',align:'center',dataIndex:'num',width:'10%'
	},{
		text:'上级编号',align:'center',dataIndex:'mnum',width:'18%',hidden:true
	},{
		text:'对应值',align:'center',dataIndex:'value',width:'20%'
	},{
		text:'序号',align:'center',dataIndex:'xu',width:'10%'
	}],
	click:function(){
		btn(false);
	},
	beforeload:function(){
		btn(true);
	}
};

return {
	panel:panel,
	init:function(){
		tree = rock[index];
	}
};