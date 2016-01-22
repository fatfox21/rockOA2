var panel = {
	xtype:'rockgridform',tablename:'homeitems',formtitle:'默认首页项',celleditbool:true,defaultorder:'sort',keywhere:'and type=1 and mid=0',
	
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',width:'50%',editor:'textfield',search:true
	},{
		text:'可用对象',dataIndex:'recename',flex:1,search:true
	},{
		text:'排序号',dataIndex:'sort',width:'10%',editor:{xtype:'numberfield',minValue:0}
	},{
		text:'ID',dataIndex:'id',width:'10%'
	}],
	clickgrid:function(){
		getcmp('inugua_'+rand+'').setDisabled(false);
	},
	beforeloadgrid:function(){
		getcmp('inugua_'+rand+'').setDisabled(true);
	},
	tbar:['->',{
		text:'进入管理',icon:gicons('application_view_tile'),id:'inugua_'+rand+'',disabled:true,handler:function(o){
			var d = this.up('grid');
			addtabs(d.changedata.name+'(项管理)','@index,home,indextd,mid='+d.changedata.id+'','hometdcogwwe'+d.changedata.id+'',{padding:0,icon:gicons('application_view_tile')});
		}
	},'-'],
	formparams:{
		submitfields:'name,sort,receid,recename,type',
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'BT名称',name:'namePost',allowBlank: false
		},{
			name:'typePost',value:'1',xtype:'textfield',hidden:true
		},{
			name:'receidPost',id:'receid_'+rand+'',xtype:'textfield',hidden:true
		},{
			fieldLabel:'可用对象',nameidfields:'receid_'+rand+'',name:'recenamePost',xtype:'changedeptuser',changetitle:'选择对象',changetype:'deptusercheckall'
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}],
		params:{int_filestype:'sort,type'}
	}
};

return {
	panel:panel
};
