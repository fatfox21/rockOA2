function openurl(a){
	var sas = ['申请','待办'];
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
	addtabs('[新增]'+a.name,'flow,apply,'+a.num+',flownum='+a.num+',tablename='+a.table+',opentype=0,mid=0,gridid=', ''+a.num+'_0');
}
function openlistla(a,lx){
	var sas = ['申请','待办','查询'];
	addtabs('['+sas[lx]+']'+a.name,'flow,applylist,'+a.num+',opentype='+lx+'', ''+a.num+'list_'+lx+'');
}

var panel = {
	bbarbool:false,xtype:'rockgrid',tablename:'flow_set',defaultorder:'`sort`',
	searchtools:true,url:publicstore(mode,dir),storeafteraction:'applydata',storebeforeaction:'applybeforedata',
	storeconfig:{groupField: 'temp_type'},fields:['temp_type'],
	features: [{ftype:'grouping',groupHeaderTpl: '{name} ({rows.length}个模块)'}],
	tbar:['-',{
		icon:gicons('reload'),text:'刷新',handler:function(){
			this.up('grid').storereload();
		}
	},'-','以下是统计是针对我或者操作人是我的申请记录'],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'分类',dataIndex:'type',search:true,flex:0.3
	},{
		text:'名称',dataIndex:'name',search:true,flex:0.4
	},{
		text:'编号',dataIndex:'num',search:true,flex:0.3
	},{
		text:'待处理',dataIndex:'totals0',width:90,renderer:function(v){
			var s = '';
			if(v>0)s='<font color=blue>'+v+'</font>';
			return s;
		}
	},{
		text:'处理未通过',dataIndex:'totals2',width:90,renderer:function(v){
			var s = '';
			if(v>0)s='<font color=red>'+v+'</font>';
			return s;
		}
	},{
		text:'已完成',dataIndex:'totals3',width:90,renderer:function(v){
			var s = '';
			if(v>0)s='<font color=#555555>'+v+'</font>';
			return s;
		}
	},{
		xtype:'actioncolumn',
		width:80,text:'新增申请',
		items: [{
			icon: gicons('page_add'),
			tooltip: '新增申请',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				var d 	= rec.raw;
				opentablss(d, 0);
			}
		}]
	},{
		xtype:'actioncolumn',
		width:80,text:'申请列表',
		items: [{
			icon: gicons('application_view_list'),
			tooltip: '申请列表',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				var d 	= rec.raw;
				openlistla(d,0);
			}
		}]
	},{
		xtype:'actioncolumn',
		width:80,text:'待办列表',
		items: [{
			icon: gicons('check'),
			tooltip: '待办列表',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				var d 	= rec.raw;
				openlistla(d,1);
			}
		}]
	},{
		xtype:'actioncolumn',
		width:80,text:'查询列表',
		items: [{
			icon: gicons('page_find'),
			tooltip: '查询列表',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				var d 	= rec.raw;
				openlistla(d,2);
			}
		}]
	}]
};
return {
	panel:panel
};