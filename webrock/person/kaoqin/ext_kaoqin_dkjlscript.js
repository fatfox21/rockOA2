function adddkjl(o){
	var o1 = getcmp('dkjlmsg_'+rand);
	o1.setText(js.getmsg('添加打卡记录...'));
	$.get(js.getajaxurl('adddkjl', 'kaoqin', 'person'), function(su){
		if(su == 'success'){
			o.up('rockgrid').storereload();
			o1.setText(js.getmsg('添加成功','green'));
		}else{
			o1.setText(js.getmsg(su));
		}
	});
}
var panel={
	xtype:'rockgrid',url:js.getajaxurl('dkjl', 'kaoqin', 'person'),highsearchbool:false,
	tablename:'kq_dkjl',searchtools:true,exceltitle:'打卡记录',keywhere:'and b.id='+adminid+'',
	tbarcenter:['日期从',{
		xtype:'datefield',editable:false,format:'Y-m-d',width:100,id:'startdt_'+rand+''
	},'至',{
		xtype:'datefield',editable:false,format:'Y-m-d',width:100,id:'enddt_'+rand+''
	}],
	tbar:['->',{
		xtype:'tbtext',id:'dkjlmsg_'+rand
	},{
		text:'添加打卡记录',icon:gicons('clock_add'),handler:function(o){adddkjl(o)}
	}],
	outsearch:function(){
		var s = '',s3,
			s1= getcmp('startdt_'+rand+'').getRawValue(),
			s2= getcmp('enddt_'+rand+'').getRawValue();
		if(!isempt(s1))s="[A][K]a.`checktime`[K]>=[K]'"+s1+" 00:00:00'";	
		if(!isempt(s2))s+="[K][A][K]a.`checktime`[K]<=[K]'"+s2+" 23:59:59'";
		return s;
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',width:220,search:true,qz:'b.'
	},{
		text:'姓名',dataIndex:'name',width:120,search:true,qz:'b.'
	},{
		text:'时间',dataIndex:'checktime',width:250,search:true
	},{
		text:'星期',dataIndex:'cnweek',width:100
	}]
}
return {
	panel:panel
};