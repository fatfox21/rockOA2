var mid = params.mid,
	name= params.name;
var panel = {
	xtype:'rockgridform',tablename:'funds',formtitle:'净值',celleditbool:true,
	keywhere:'and mid='+mid+'',defaultorder:'`dt` desc',
	exceltitle:'净值',
	columns:[{
		xtype: 'rownumberer',
		width: 50
	},{
		text:'名称',align:'center',dataIndex:'name',width:200,search:true,renderer:function(){
			return name;
		}
	},{
		text:'日期',align:'center',dataIndex:'dt',width:100,search:true
	},{
		text:'净值',align:'center',dataIndex:'net',width:100,search:false
	},{
		text:'累计净值',align:'center',dataIndex:'nets',width:100,search:false
	}],
	formparams:{
		submitfields:'dt,net,nets,mid',
		params:{otherfields:'mid='+mid+'',int_filestype:'mid'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'日期',name:'dtPost',allowBlank: false,xtype:'datefield',format:'Y-m-d'
		},{
			fieldLabel:''+bitian+'净值',name:'netPost',allowBlank: false
		},{
			fieldLabel:'累计净值',name:'netsPost'
		}]
	}
};

return {
	panel:panel
};
