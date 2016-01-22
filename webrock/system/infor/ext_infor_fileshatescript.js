
var panel={
	xtype:'rockgrid',
	tablename:'word',searchtools:true,defaultorder:'sort',url:publicstore(mode,dir),storebeforeaction:'fileshatewhere',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'类型',search:true,dataIndex:'fileext',sortable:true,width:100,renderer:function(v){
			return '<img src="mode/fileicons/'+v+'.gif" width=16 height=16>';
		}
	},{
		text:'类别',dataIndex:'typename',width:150,search:true,editor:'textfield',sortable:true
	},{
		text:'文档名称',align:'left',dataIndex:'filename',flex:1,search:true,editor:'textfield',sortable:true
	},{
		text:'大小',dataIndex:'filesizecn',width:100
	},{
		text:'添加时间',dataIndex:'adddt',width:150,search:true,sortable:true,atype:'date'
	},{
		text:'共享者',dataIndex:'optname',width:100,search:true,sortable:true
	},{
		text:'下载',xtype:'actioncolumn',dataIndex:'optbtn',width:60,menuDisabled:true,sortable:false,items:[{
			icon:gicons('download'),tooltip: '下载',handler:function(g, rowIndex, colIndex){
				grid._downla(rowIndex);
			}
		}]
	}],
	_downla:function(oi){
		var rec = this.store.getAt(oi);
		var fileid = rec.raw.fileid;
		js.downshow(fileid);
	}
};



return {
	panel:panel,
	init:function(){
		grid = rock[index];
	}
};