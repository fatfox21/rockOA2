var tree,grid,atype=params.atype;
function btn(bo){
	try{
	getcmp('edit_'+rand+'').setDisabled(bo);
	getcmp('del_'+rand+'').setDisabled(bo);
	}catch(e){}	
}
function savecalblc(){
	tree.storereload();
}
if(!atype)atype=0;
var typenum = 'infortype';
if(atype!=0){
	typenum = 'infortype_dept_'+admindeptnum+'';
	atype = admindeptid;
}	

var panel= [{
	xtype:'rocktree',tablename:'option',region:'west',width:170,split:true,bbarbool:false,title:'信息类型',collapsible: true,url:publictreestore({order:'xu',expandall:'true',pidfields:'mnum',idfields:'num',fistid:typenum}),
	columns:[{
		xtype: 'treecolumn',
		text:'名称',align:'left',dataIndex:'name',width:'99%'
	}],
	bbar:[{
		text:'刷新',handler:function(){tree.storereload()},icon:gicons('arrow_refresh')
	},'-',{
		text:'类型管理',handler:function(){rockoption.setlist('信息类型',typenum,{savecall:function(){savecalblc();},delcall:function(){savecalblc();}});}
	}],
	dblclick:function(o,v){
		grid.searchgoto("and typename='"+v.data.name+"'");
	}
},{
	xtype:'rockgrid',
	tablename:'infor',searchtools:true,celleditbool:true,defaultorder:'xu,optdt desc',keywhere:'[A][K]atype[D]'+atype+'',
	tbar:['-','双击可预览','->',{
		text:'新增',icon:gicons('add'),handler:function(){grid._clickeadd()}
	},'-',{
		text:'修改',icon:gicons('page_edit'),disabled:true,id:'edit_'+rand+'',handler:function(){grid._clickedit()}
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,id:'del_'+rand+'',handler:function(a){grid.del(a)}
	}],
	_clickedit:function(){
		var sid = this.changedata.id;
		addtabs('编辑信息','system,infor,add,id='+sid+',index='+index+',atype='+atype+'','inforadd_'+sid+'',{icon:gicons('edit')});
	},
	_clickeadd:function(){
		addtabs('信息新增','system,infor,add,index='+index+',atype='+atype+'','inforadd',{icon:gicons('add')});
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'类型',dataIndex:'typename',width:100,search:true,editor:'textfield',autowidth:true
	},{
		text:'标题',dataIndex:'title',align:'left',search:true,flex:1
	},{
		text:'序号',dataIndex:'xu',width:60,search:true,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'显示首页',dataIndex:'isshow',width:80,renderer:renderbox,editor:{xtype:'combo',store:[['1','显示'],['0','不显示']]},search:true,atype:'select'
	},{
		text:'操作人',dataIndex:'optname',width:70,search:true
	},{
		text:'发布者/部门',dataIndex:'zuozhe',search:true,autowidth:true
	},{
		text:'时间',dataIndex:'indate',search:true,autowidth:true
	},{
		text:'发布给',dataIndex:'faobjname',search:true,autowidth:true
	},{
		text:'操作时间',dataIndex:'optdt',width:150,search:true
	}],
	beforeload:function(){
		btn(true);
	},
	click:function(o,r){
		btn(false);
	},
	dblclick:function(o, r){
		var url = js.getajaxurl('$gong','view','taskrun',{uid:adminid,id:r.data.id,jmbool:true});
		js.open(url, 800);
	}
}];



return {
	panel:panel,
	init:function(){
		tree = rock[index][0];
		grid = rock[index][1];
	},
	tabson:{
		show:function(){
			if(rock[index][1].isreadload){
				grid.storereload();
				rock[index][1].isreadload=false;
			}	
		}
	}	
};