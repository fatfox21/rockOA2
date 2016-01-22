var monye = js.now('Y-m');
var panel = {
	xtype:'rockgrid',tablename:'supplea',formtitle:'办公用品统计',exceltitle:'办公用品统计',
	url:publicstore(mode, dir),highsearchbool:false,searchtools:true,
	keywhere:'and status in(1,3,4)',
	defaultwhere:"and `optdt` like '"+monye+"%'",
	tbarcenter:[{
		xtype:'rockdate',format:'month',width:100,value:monye
	}],
	execlparams:{excelchuli:'status',status_arr:'待确认,已发放,不通过驳回,入库,异常入库'},
	outsearch:function(){
		var s= "and `optdt` like '"+this.down('rockdate').getValue()+"%'";
		return s;
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
		text:'状态',dataIndex:'status',width:150,boxdata:[['red','待发放'],['green','已发放'],['blue','驳回'],['#ff6600','入库'],['#800000','异常入库']],search:true,renderer:renderbox,atype:'select',store:js.arraystr('0|待确认,1|已发放,2|不通过驳回,3|入库,4|异常入库')
	},{
		text:'操作时间',dataIndex:'optdt',width:160
	}]
};

return {
	panel:panel
};