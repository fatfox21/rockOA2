var grid,grids,form;
function btn(bo){
	try{
	getcmp('edit_'+rand+'').setDisabled(bo);
	getcmp('del_'+rand+'').setDisabled(bo);
	getcmp('zt_'+rand+'').setDisabled(bo);
	}catch(e){}	
}
var panelss = {
	xtype:'rockgrid',tablename:'assetm',celleditbool:false,highsearchbool:true,searchtools:true,exceltitle:'资产列表',region:'center',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'类别',dataIndex:'typename',width:100,editor:'textfield'
	},{
		text:'名称',dataIndex:'title',width:200,editor:'textfield',search:true
	},{
		text:'编号',dataIndex:'num',width:100,editor:'textfield'
	},{
		text:'品牌',dataIndex:'brand',width:150,search:true
	},{
		text:'放置地点',dataIndex:'address',width:150,editor:'textfield',search:true
	},{
		text:'资产来源',dataIndex:'laiyuan',width:100,editor:{xtype:'optioncombo',optionmnum:'assetslaiyuan'},search:true
	},{
		text:'状态',dataIndex:'state',width:100,editor:{xtype:'optioncombo',optionmnum:'assetsstate'},search:true
	},{
		text:'规格/型号',dataIndex:'model',flex:1,editor:'textfield',search:true
	},{
		text:'购进日期',dataIndex:'buydt',width:100,search:true
	}],
	tbar:['双击行查看登记状态','->',{
		text:'登记状态',icon:gicons('pencil'),disabled:true,id:'zt_'+rand+'',handler:function(){
			grids.searchgoto('and mid='+grid.changedata.id+'');
			grid._changelistda();
		}
	},'-',{
		text:'新增',icon:gicons('add'),handler:function(){grid._clickeadd()}
	},'-',{
		text:'修改',icon:gicons('edit'),disabled:true,id:'edit_'+rand+'',handler:function(){grid._clickedit()}
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,id:'del_'+rand+'',handler:function(a){grid.del(a)}
	}],
	_clickedit:function(){
		var sid = this.changedata.id;
		addtabs('编辑资产','humanres,assets,add,id='+sid+',gridid='+this.getId()+'','assetsadd_'+sid+'',{icon:gicons('edit')});
	},
	_clickeadd:function(){
		addtabs('新增资产','humanres,assets,add,gridid='+this.getId()+'','assetsadd',{icon:gicons('add')});
	},
	beforeload:function(){
		btn(true);
	},
	click:function(o,r){
		btn(false);
	},
	itemId:'listm',
	dblclick:function(o,r){
		var sid = r.get('id');
		grids.searchgoto('and mid='+sid+'');
		this._changelistda();
	},
	_changelistda:function(){
		var da = this.changedata;
		form.reset();
		form.setVal('mid', da.id);
		form.setVal('num', da.num);
	}
};

var panel = [panelss,{
	height:240,region:'south',split:true,border:false,layout:'border',items:[{
		region:'center',xtype:'rockgrid',tablename:'assets',storeautoLoad:false,itemId:'lists',bbarbool:false,
		columns:[{
			xtype: 'rownumberer',
			width: 40
		},{
			text:'操作人',dataIndex:'optname',width:100
		},{
			text:'操作时间',dataIndex:'optdt',width:160,sortable:true
		},{
			text:'状态',dataIndex:'state',width:100
		},{
			text:'说明',dataIndex:'explain',flex:1
		}]
	},{
		xtype:'rockform',tablename:'assets',itemId:'listss',icon:gicons('pencil'),region:'east',width:300,title:'状态登记',collapsible: true,split:true,
		submitfields:'state,mid,explain',url:publicsave(mode, dir),aftersaveaction:'upassetmstate',
		params:{int_filestype:'mid',otherfields:'optdt={now},optname={admin}'},
		items:[{
			value:'0',name:'idPost',hidden:true	
		},{
			value:'0',name:'midPost',hidden:true
		},{
			fieldLabel:'资产编号',name:'numPost',xtype:'displayfield'
		},{
			fieldLabel:'BT状态',name:'statePost',allowBlank: false,xtype:'optioncombo',optionmnum:'assetsstate'
		},{
			fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60
		}],
		success:function(){
			grid._changelistda();
			grids.storereload();
		}
	}]
}];

return {
	panel:panel,
	init:function(){
		grid = objpanel.down('#listm');
		grids = objpanel.down('#lists');
		form = objpanel.down('#listss');
	},
	tabson:{
		show:function(){
			if(grid.isreadload){
				grid.storereload();
				grid.isreadload=false;
			}	
		}
	}
};
