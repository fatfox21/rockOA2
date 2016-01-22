function openurl(a){
	var sas = ['申请','审核'];
	var url = a.url,
		num = a.menunum,
		txt = a.title,
		typ = a.opentype;
	if(isempt(url))return;	
	if(typ){
		url+=',opentype='+typ+'';
		num+=''+typ+'';
	}
	addtabs(txt, url, num);
}

function opentablss(a){
	addtabs('[查看]'+a.modename,'flow,apply,'+a.modenum+',flownum='+a.modenum+',tablename='+a.tablename+',opentype=1,mid='+a.mid+',gridid=', ''+a.modenum+'_'+a.mid+'');
}

var panel = {
	bbarbool:false,xtype:'rockgrid',
	url:js.getajaxurl('daicl',mode,dir),
	tbar:[{
		text:'刷新',icon:gicons('reload'),handler:function(){
			this.up('rockgrid').storereload();
		}
	}],
	storeconfig:{groupField: 'modename'},
	features: [{ftype:'grouping',groupHeaderTpl: '{name} ({rows.length}条)'}],
	fields:['modename','modenum','tablename','mid'],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',width:200,dataIndex:'deptname',sortable:false
	},{
		text:'姓名',width:80,dataIndex:'name',sortable:false
	},{
		text:'时间',width:160,dataIndex:'optdt',sortable:false
	},{
		text:'状态',width:150,dataIndex:'statusman',sortable:false
	},{
		text:'摘要',flex:1,dataIndex:'remark',sortable:false
	},{
		xtype:'actioncolumn',
		width:70,text:'去处理',
		items: [{
			icon: gicons('page_go'),
			tooltip: '打开',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				opentablss(rec.data);
			}
		}]
	}],
	click:function(a,v){
		openurl(v.raw);
	}
};
return {
	panel:panel
};