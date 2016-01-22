
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
var columns = [];
for(var i=1; i<=31; i++){
	columns.push({
		text:''+i+'',dataIndex:'day'+i+'',width:'3.15%'
	});
}
var panel={
	xtype:'rockgrid',url:js.getajaxurl('dkjl', 'kaoqin', 'person'),highsearchbool:false,storeautoLoad:false,
	tablename:'kq_dkjl',searchtools:false,exceltitle:'打卡记录',keywhere:'and b.id='+adminid+'',bbarbool:false,
	tbar:['月份',{
		xtype:'rockdate',format:'Y-m',width:100,id:'month_'+rand+'',value:js.now('Y-m')
	},'->',{
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
	columns:columns
}
return {
	panel:panel
};