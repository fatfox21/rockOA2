var panel = {
	xtype:'rockgrid',tablename:'menucom',formtitle:'常用菜单',celleditbool:true,checkcolumns:true,searchtools:true,
	defaultorder:'`sort`,`id`',fields:['url'],
	tbar:['->',{
		text:'删除',icon:gicons('delete'),handler:function(){
			rock[index].del(false,true);
		}
	}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'菜单名称',dataIndex:'name',flex:1,editor:'textfield',search:true,align:'left',renderer:function(v,m,d){
			var icos = d.get('icon');
			if(isempt(icos))icos='images/white.gif';
			return '<img src="'+icos+'" height="16" width="16" align="absmiddle"> '+v;
		}
	},{
		text:'编号',dataIndex:'num',width:120,search:true
	},{
		text:'排序号',dataIndex:'sort',width:100,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'菜单id',dataIndex:'menuid',width:80
	},{
		text:'图标',dataIndex:'icon',width:200
	},{
		text:'添加时间',dataIndex:'optdt',width:180,sortable:true
	},{
		xtype:'actioncolumn',
		width:70,text:'打开',
		items: [{
			icon: gicons('page_go'),tooltip: '打开菜单',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex).data;
				addtabs(rec.name, rec.url, rec.num,{icon:rec.icon,menutype:'cy'});
				//opentablss(rec.raw);
			}
		}]
	}]
};

return {
	panel:panel
};
