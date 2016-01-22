var panel = {
	xtype:'rockgrid',tablename:'supplea',formtitle:'办公用品领用',exceltitle:'办公用品领用',
	url:publicstore(mode, dir),highsearchbool:false,searchtools:true,
	keywhere:'and status in(0,1,2)',
	load:function(){
		var me = this;
		$("input[name='bohfhua_"+rand+"']").click(function(){
			me._checkaaa(this);
		});
	},
	execlparams:{excelchuli:'status',status_arr:'待确认,已发放,不通过驳回,入库,异常入库'},
	_checkaaa:function(o1){
		var o = $(o1),
		das = {id:o.attr('aid'),status:o.attr('azt')}
		me  = this;
		$("input[name='bohfhua_"+rand+"']").attr('disabled', true);
		js.msg('wait','处理中...');
		$.get(js.getajaxurl('qihuan',mode, dir, das), function(){
			js.msg('success','处理成功');
			me.storereload();
		});
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',width:200
	},{
		text:'姓名',dataIndex:'name',width:100
	},{
		text:'物品名称',dataIndex:'aname',width:200,search:true,searchtpl:"aid in(select id from [Q]supple where name ?0 ?1)"
	},{
		text:'申请数',dataIndex:'total',width:100,search:true
	},{
		text:'说明',dataIndex:'explain',search:true,autowidth:true
	},{
		text:'状态',dataIndex:'status',width:150,boxdata:[['red','待发放'],['green','已发放'],['blue','驳回'],['#ff6600','入库'],['#ff6600','异常入库']],search:true,renderer:function(a,v,r){
			var s = renderbox(a,v);
			var d = r.raw;
			if(d.status=='0')s+='<br><input type="button" aid="'+d.id+'" name="bohfhua_'+rand+'" azt="1" value="发放">&nbsp;<input  name="bohfhua_'+rand+'" aid="'+d.id+'" azt="2" type="button" value="驳回">';
			if(d.status=='1' || d.status=='2')s+='('+d.statusman+')';
			return s;
		},atype:'select',store:js.arraystr('0|待确认,1|已发放,2|不通过驳回,3|入库,4|异常入库')
	},{
		text:'操作时间',dataIndex:'optdt',width:160
	}]
};

return {
	panel:panel
};