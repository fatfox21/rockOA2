var total = 0;
var fenxiuserino = function(){
	var cans = {
		type:getcmp('type_'+rand).getValue(),
		dt:getcmp('dt_'+rand).getValue()
	};
	objpanel.getEl().mask('分析中...');
	$.post(js.getajaxurl('fx',mode,dir),cans,function(da){
		objpanel.getEl().unmask();
		
		var a = js.decode(da);
		objpanel.down('chart').getStore().loadData(a.rows);
		
		var b = a.rows;
		b.push({name:'合计',value:a.totalCount,bili:''});
		objpanel.down('grid').getStore().loadData(b);
	});
}
var chart = {
	xtype: 'chart',animate: true,shadow: true,
	store: Ext.create('Ext.data.Store', {
		fields:['name','value','bili'],
		data:[]
	}),
	legend: {
		position: 'right'
	},
	theme: 'Base:gradients',
	series:[{
		type: 'pie',
		field: 'value',
		showInLegend: true,
		donut: false,
		tips: {
			trackMouse: true,
			width: 140,
			renderer: function(d, item) {
				this.setTitle(d.get('name') + ': ' + d.raw.bili + '');
			}
		},
		highlight: {
			segment: {
				margin: 10
			}
		},
		label: {
			field: 'name',
			display: 'rotate',
			contrast: true,
			font: '12px Arial',
			renderer:function(d, d1, d2){
				return d+'('+d2.raw.value+'人)';
			}
		}
	}]
};

var panel = [{
	width:300,region:'east',split:true,
	xtype:'grid',
	store: Ext.create('Ext.data.Store', {
		fields:['name','value','bili'],
		data:[]
	}),
	columns:[{xtype: 'rownumberer',width:'10%'},{
		dataIndex:'name',
		align:'center',width:'40%',
		text:'名称',menuDisabled:true
	},{
		dataIndex:'value',
		align:'center',width:'24%',
		text:'值',menuDisabled:true
	},{
		dataIndex:'bili',
		align:'center',width:'24%',
		text:'比例',menuDisabled:true
	}]
},{
	tbar:['按照',{
		xtype:'combo',value:'deptname',store:js.arraystr('deptname|部门,gender|性别,xueli|学历,nian|年龄,year|入职年份,nianxian|入职年限,state|人员状态,ranking|职位'),width:100,editable:false,id:'type_'+rand+''
	},{
		xtype:'rockdate',width:130,clearbool:true,editable:false,id:'dt_'+rand,emptyText:'在职日期'
	},{
		text:'分析',icon:gicons('chart_pie'),handler:fenxiuserino
	}],
	layout: 'fit',region:'center',
	items:chart
}];

return {
	panel:panel,
	init:function(){
		fenxiuserino();
	}
};