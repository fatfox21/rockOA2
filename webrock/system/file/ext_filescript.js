
var panel= {
	xtype:'rockgrid',checkcolumns:true,
	tablename:'file',searchtools:true,
	columns:[{
		xtype: 'rownumberer',
		width: 30
	},{
		text:'类型',align:'center',search:true,dataIndex:'fileext',width:80,renderer:function(v){
			return '<img src="mode/fileicons/'+v+'.gif" width=16 height=16>';
		}
	},{
		text:'文件名',align:'center',dataIndex:'filename',width:230,autowidth:true,search:true
	},{
		text:'大小',align:'center',dataIndex:'filesizecn',width:100,search:true
	},{
		text:'上传时间',align:'center',dataIndex:'adddt',width:160,search:true,atype:'date'
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
