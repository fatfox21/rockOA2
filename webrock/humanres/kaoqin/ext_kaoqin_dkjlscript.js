var form;
function opendown(){
	var url = js.getajaxurl('downexcel','where','public',{fields:escape('姓名,时间(用[]扩起来)'),title:escape('打卡记录格式'),content:escape('管理员,[2015-01-18 08:50:50]')});
	js.open(url);
}
function importdown(){
	uploadwindows.imports({
		title:'导入打卡记录',
		url:js.getajaxurl('import','kaoqin','humanres'),
		callback:function(){
			rock[index].storereload();
		}
	});
}
var panel={
	xtype:'rockgrid',url:js.getajaxurl('dkjl', 'kaoqin', 'person'),
	tablename:'kq_dkjl',searchtools:true,checkcolumns:true,exceltitle:'打卡记录',
	tbarcenter:['日期从',{
		xtype:'datefield',editable:false,format:'Y-m-d',width:100,id:'startdt_'+rand+''
	},'至',{
		xtype:'datefield',editable:false,format:'Y-m-d',width:100,id:'enddt_'+rand+''
	}],
	outsearch:function(){
		var s = '',s3,
			s1= getcmp('startdt_'+rand+'').getRawValue(),
			s2= getcmp('enddt_'+rand+'').getRawValue();
		if(!isempt(s1))s="[A][K]a.`checktime`[K]>=[K]'"+s1+" 00:00:00'";	
		if(!isempt(s2))s+="[K][A][K]a.`checktime`[K]<=[K]'"+s2+" 23:59:59'";
		return s;
	},
	tbar:['-',{
		text:'导入',icon:gicons('page_excel'),tooltip:'必须按照导入文件格式写',menu:[{
			text:'下载导入文件格式',icon:gicons('arrow_down'),handler:opendown
		},'-',{
			text:'导入Excel文件',handler:importdown
		}]
	},'-','打卡记录导入格式需要定制开发','->',{
		text:'删除',icon:gicons('delete'),handler:function(){
			rock[index].del(false,true);
		}
	}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',width:260,search:true,qz:'b.'
	},{
		text:'姓名',align:'center',dataIndex:'name',width:120,search:true,qz:'b.'
	},{
		text:'指纹号',align:'center',dataIndex:'finge',width:80,search:true,qz:'a.'
	},{
		text:'时间',align:'center',dataIndex:'checktime',width:230,search:true
	},{
		text:'星期',dataIndex:'cnweek',width:100
	},{
		text:'ID',align:'center',dataIndex:'id',width:60
	}]
}
return {
	panel:panel
};