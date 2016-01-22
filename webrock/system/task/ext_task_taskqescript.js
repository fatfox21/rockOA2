var grid,form,win,bool=false;

var huirendhi =function(v,a,r){
	if(r.raw.ohui=='1')return '<font color=#888888>'+v+'</font>';
	return v;
}

var panel= [{
	xtype:'rockgrid',
	tablename:'task',searchtools:true,bbarbool:false,url:js.getajaxurl('taskqueue','task','system'),
	columns:[{
		xtype: 'rownumberer',width: 40
	},{
		text:'类型',align:'center',dataIndex:'typename',width:80,search:true,renderer:huirendhi
	},{
		text:'名称',align:'center',dataIndex:'name',width:150,search:true,renderer:huirendhi
	},{
		text:'地址',align:'center',dataIndex:'url',width:200,search:true,renderer:huirendhi
	},{
		text:'运行时间',align:'center',dataIndex:'runtime',width:160,renderer:huirendhi
	},{
		text:'时间',align:'center',dataIndex:'runtimes',width:160
	},{
		text:'操作',xtype:'actioncolumn',dataIndex:'optbtn',width:70,items:[{
			icon:gicons('time_edit'),tooltip: '手动运行',handler:function(grid1, rowIndex, colIndex){
				grid.yunshoala(rowIndex);
			}
		}]
	}],
	yunshoala:function(oi){
		var da = grid.store.getAt(oi)
			a  = da.raw,
			a1	= a.url.split(',');
		var url = js.getajaxurl(a1[1], a1[0], 'taskrun', {mid:a.mid,sid:a.sid});
		js.msg('wait','运行中...');
		$.get(url, function(da){
			if(da=='success'){
				js.msg('success', '运行成功');
			}else{
				js.msg('msg', '运行失败');
			}
		});
	}
},{
	width:220,minWidth:220,split:true,region:'west',xtype: 'datepicker',
	handler: function(picker, date) {
        var dt = Ext.Date.format(date, 'Y-m-d');
		grid.setparams({dt:dt});
		grid.storereload();
    }
}];

return {
	panel:panel,
	init:function(){
		grid = rock[index][0];
	}
};
