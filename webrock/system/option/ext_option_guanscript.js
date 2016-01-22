var tree,
	num = params.num,win,form;

function btn(bo){
	try{
	getcmp('adddown_'+rand+'').setDisabled(bo);
	getcmp('edit_'+rand+'').setDisabled(bo);
	getcmp('del_'+rand+'').setDisabled(bo);
	}catch(e){}	
}
function clickadddown(){
	windowsss();
	form.reset();
	form.setVal('mnum',tree.changedata.num);
	form.setmsg('新增状态','blue');
	win.setTitle('新增');
}
function clickedit(){
	windowsss();
	form.adddata(tree.changedata,'id');
	form.setmsg('编辑状态','blue');
	win.setTitle('编辑');
}
var chengbianh = function(){
	var num = form.getVal('mnum');
	if(isempt(num) || !isempt(form.getVal('num')))return;
	var rnd = parseInt(Math.random()*999)+1;
	rnd = num+'_'+rnd;
	form.setVal('num', rnd);
}

function windowsss(){
	var lx = 0;
	if(!win){
		var cans = winopt({title: '系统选项',width:300,items:{
			id:'form_'+rand+'',border:false,
			submitfields:'name,num,value,xu,mnum',
			url:publicsave(mode,dir),cancelbool:true,
			autoScroll:false,
			params:{int_filestype:'xu',otherfields:'optdt={now},optid={adminid}'},tablename:'option',xtype:'rockform',
			items:[{
				fieldLabel:'id号',value:'0',name:'idPost',hidden:true	
			},{
				xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
					fieldLabel:'编号',name:'numPost',width:'90%'
				},{
					xtype:'button',icon:gicons('reload'),margin:'0 0 0 5',width:'9%',tooltip:'生成一个编号',handler:chengbianh
				}]
			},{
				fieldLabel:'',name:'mnumPost',hidden:true
			},{
				fieldLabel:''+bitian+'名称',name:'namePost',allowBlank: false
			},{
				fieldLabel:'对应值',name:'valuePost'	
			},{
				fieldLabel:'序号',name:'xuPost',value:'0',minValue:0,xtype:'numberfield'
			}],
			success:function(){
				tree.storereload();
				//win.close();
			}
		}});
		win = Ext.create('Ext.Window',cans);
		lx = 1;
		tree.destroypanel.push(win);
	}
	win.show();
	form = getcmp('form_'+rand+'');	
}

var panelss = {
	xtype:'rocktree',
	url:publictreestore({order:'xu',expandall:'true',pidfields:'mnum',idfields:'num'}),
	tablename:'option',region:'center',
	fistwhere:"and num='"+num+"'",
	tbar:[{
		text:'刷新',handler:function(){tree.storereload()},icon:gicons('reload')
	},'需要新增下级需要有编号,编号不要随意更改','->',{
		text:'新增下级',icon:gicons('add'),handler:function(){clickadddown()},disabled:true,id:'adddown_'+rand+''
	},'-',{
		text:'修改',icon:gicons('edit'),disabled:true,id:'edit_'+rand+'',handler:function(){clickedit()}
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,id:'del_'+rand+'',handler:function(a){tree.del(a)}
	}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		xtype: 'treecolumn',
		text:'名称',align:'left',dataIndex:'name',flex:1
	},{
		text:'编号',align:'center',dataIndex:'num',width:'18%'
	},{
		text:'上级编号',align:'center',dataIndex:'mnum',width:'18%',hidden:true
	},{
		text:'对应值',align:'center',dataIndex:'value',width:'25%'
	},{
		text:'序号',align:'center',dataIndex:'xu',width:'10%'
	}],
	click:function(a, v){
		btn(false);
		if(v.parentNode.parentNode==null){
			getcmp('edit_'+rand+'').setDisabled(true);
			getcmp('del_'+rand+'').setDisabled(true);
		}
		if(isempt(v.raw.num))getcmp('adddown_'+rand+'').setDisabled(true);
	},
	dblclick:function(a, v){
		if(v.parentNode.parentNode!=null)clickedit();
	},
	beforeload:function(){
		btn(true);
	}
};

var leftgrid = {
	xtype:'rockgrid',bbarbool:false,title:'选项列表',collapsible: true,split:true,width:230,region:'west',tablename:'option',keywhere:"[A][K]mnum=[F]"+num+"[F]",pageSize:0,hideHeaders:true,defaultorder:'xu',
	columns:[{
		xtype: 'rownumberer',
		width: '15%'
	},{
		text:'名称',width:'84%',dataIndex:'name',align:'left'
	}],
	click:function(a, v){
		tree.setparams({fistwhere:"[A][K]num[D][F]"+v.raw.num+"[F]"}, true);
	},
	tools:[{
		type:'refresh',handler:function(){this.up('rockgrid').storereload()},tooltip:'刷新'
	}]
};
var panel = panelss;
if(params.atype==1){
	panelss.fistwhere = "[A][K]num[D][F]"+num+"_temp[F]";
	panel = [leftgrid,panelss];
}

return {
	panel:panel,
	init:function(){
		tree = objpanel.down('rocktree');
	}
};