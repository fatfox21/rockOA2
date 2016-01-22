var panel = {
	xtype:'rockgridform',tablename:'fundm',formtitle:'我的基金',celleditbool:true,
	exceltitle:'我的基金',
	columns:[{
		xtype: 'rownumberer',
		width: 50
	},{
		text:'类型',align:'center',dataIndex:'types',width:80,search:true
	},{
		text:'名称',align:'center',dataIndex:'name',width:200,search:true
	},{
		text:'编号',align:'center',dataIndex:'num',width:100,search:true
	},{
		text:'最新净值',align:'center',dataIndex:'nets',width:100,search:false
	},{
		text:'最新涨幅',align:'center',dataIndex:'rnets',width:100,search:false
	},{
		text:'序号',align:'center',dataIndex:'sort',width:100,search:true,editer:'numberfield'
	}],
	dblclick:function(a, v){
		var a = v.raw;
		addtabs('['+a.name+','+a.num+']净值','person,fund,net,mid='+a.id+',name='+a.name+'','fundm_'+a.id+'');
	},
	formparams:{
		submitfields:'sort,name,num,types',params:{int_filestype:'sort'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'类型',name:'typesPost',allowBlank: false
		},{
			fieldLabel:''+bitian+'名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'编号',name:'numPost',allowBlank: false
		},{
			fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	}
};

return {
	panel:panel
};
