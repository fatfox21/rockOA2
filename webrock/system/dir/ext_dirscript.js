var tree,grid;
var panel= [{
	xtype:'rocktree',region:'west',width:200,split:true,title:'系统文件夹',collapsible: true,
	url:js.getajaxurl('getsysfilod','dir','system'),hideHeaders:true,
	columns:[{
		text:'文件名',align:'left',dataIndex:'name',width:'100%',xtype: 'treecolumn'
	}],
	click:function(a,v){
		grid.setparams({path:v.raw.path});
		grid.storereload();
	},
	listeners:{
		beforeitemexpand:function(v){
			if(tree)tree.setparams({path:v.raw.path});
		}
	}
},{
	xtype:'rockgrid',region:'center',bbarbool:false,url:js.getajaxurl('getfile','dir','system'),
	columns:[{
		xtype: 'rownumberer',
		width: 30
	},{
		text:'类型',align:'center',dataIndex:'type',width:80,renderer:function(v){
			return '<img src="mode/fileicons/'+v+'.gif" width=16 height=16>';
		}
	},{
		text:'文件名',align:'center',dataIndex:'file',width:90,autowidth:true
	},{
		text:'修改时间',align:'center',dataIndex:'editdt',width:160
	},{
		text:'创建时间',align:'center',dataIndex:'lastdt',width:160
	},{
		text:'大小',align:'center',dataIndex:'size',width:80
	}]
}];

return {
	panel:panel,
	init:function(){
		tree=rock[index][0];
		grid=rock[index][1];
	}
};
