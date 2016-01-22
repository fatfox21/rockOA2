var grid;
function btn(bo, a){
	try{
	getcmp('edit_'+rand+'').setDisabled(bo);
	getcmp('del_'+rand+'').setDisabled(bo);
	getcmp('xiang_'+rand+'').setDisabled(bo);
	if(!bo){
		if(a.state=='已完成'){
			bo = true;
			getcmp('edit_'+rand+'').setDisabled(bo);
			getcmp('del_'+rand+'').setDisabled(bo);
		}
	}
	}catch(e){}	
}
function showprogress(){
	var o = $("div[id^='progress_"+rand+"_']");
	for(var i=0; i<o.length; i++){
		var v = $(o[i]).attr('val');
		var bil = parseFloat(v)/100;
		Ext.create('Ext.ProgressBar', {
			renderTo: o[i],
			width: '100%',
			text:''+v+'%',
			value:bil
		});
	}
}
var panelss = {
	xtype:'rockgrid',tablename:'projectm',celleditbool:false,searchtools:true,exceltitle:'项目列表',
	itemId:'listm',url:publicstore(mode,dir),storebeforeaction:'guanwhere',defaultorder:'startdt desc',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'类别',dataIndex:'typename',width:90,sortable:true
	},{
		text:'名称',dataIndex:'title',width:200,search:true
	},{
		text:'负责人',dataIndex:'fuze',search:true,autowidth:true
	},{
		text:'执行人',dataIndex:'runuser',search:true,autowidth:true
	},{
		text:'开始时间',dataIndex:'startdt',width:150,search:true,atype:'date',sortable:true
	},{
		text:'预计完成',dataIndex:'enddt',search:true,atype:'date',autowidth:true
	},{
		text:'状态',dataIndex:'state',width:80,search:true,sortable:true
	},{
		text:'进度',dataIndex:'progress',width:120,search:true,sortable:true,renderer:function(v,m,re){
			return '<div align="left" id="progress_'+rand+'_'+re.get('id')+'" val="'+v+'"></div>';
		}
	},{
		text:'备注说明',dataIndex:'remark',flex:1,search:true
	},{
		text:'创建人',dataIndex:'optname',search:true,autowidth:true
	}],
	tbar:['->',{
		text:'新增',icon:gicons('add'),handler:function(){grid._clickeadd()}
	},'-',{
		text:'修改',icon:gicons('edit'),disabled:true,id:'edit_'+rand+'',handler:function(){grid._clickedit()}
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,id:'del_'+rand+'',handler:function(a){grid.del(a)}
	},'-',{
		text:'详情',icon:gicons('page_white_text'),disabled:true,id:'xiang_'+rand+'',handler:function(){
			grid._xiang();
		}
	}],
	_clickedit:function(){
		var sid = this.changedata.id;
		addtabs('编辑项目','work,project,add,id='+sid+',gridid='+this.getId()+'','projectadd_'+sid+'',{icon:gicons('edit')});
	},
	_clickeadd:function(){
		addtabs('新增项目','work,project,add,gridid='+this.getId()+'','projectadd',{icon:gicons('add')});
	},
	beforeload:function(){
		btn(true);
	},
	click:function(o,r){
		btn(false,r.raw);
	},
	load:function(){
		showprogress();
	},
	dblclick:function(o,r){
		this._xiang();
	},
	_xiang:function(){
		var url = js.getajaxurl('$project','view','taskrun',{uid:adminid,id:this.changedata.id,jmbool:true});
		js.open(url, 800);
	}
};

var panel = panelss;

return {
	panel:panel,
	init:function(){
		grid = objpanel.down('#listm');
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