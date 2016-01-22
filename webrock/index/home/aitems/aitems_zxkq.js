homeitems.zxkq={
	xtype:'rockgrid',title:'在线考勤',tablename:'kq_dkjl',keywhere:'and uid='+adminid+'',pageSize:5,tools:tools,margin:margin,frame: true,padding:0,border:false,url:js.getajaxurl('dkjl', 'kaoqin', 'person'),keywhere:'[A][K]b.id[D][adminid]',
	bbarbool:false,closable:false,abcnum:'mydkjl',abcurl:'person,kaoqin,dkjl',icon:gicons('clock'),
	columns:[{
		text:'',dataIndex:'xuhao',width: 35
	},{
		text:'姓名',dataIndex:'name',flex:0.5,search:true,qz:'b.'
	},{
		text:'时间',dataIndex:'checktime',flex:1,search:true
	},{
		text:'星期',dataIndex:'cnweek',flex:0.4
	}],
	bbar:['->',{xtype:'tbtext',id:'dkjlmsg_'+rand},{text:'添加打卡记录',icon:gicons('clock_add'),handler:function(o){adddkjl(o)}}]
};

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