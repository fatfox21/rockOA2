var tree,win,grid;
function clickedit(){
	windowsss();
	var data = grid.changedata;
	form.adddata(data);
	form.field('idPost').setValue(data.id);
	form.setmsg('修改状态','blue');
}
function windowsss(){
	if(!win){
		var cans = winopt({title: '系统选项',items:{
			id:'form_'+rand+'',border:false,
			submitfields:'name,num,mnum,value,xu,ism',
			params:{int_filestype:'xu,ism',otherfields:'optdt={now},optid={adminid}'},tablename:'option',
			url:publicsave(mode,dir),cancelbool:true,
			xtype:'rockform',items:[{
				fieldLabel:'id号',value:'0',name:'idPost',hidden:true	
			},{
				fieldLabel:'编号',name:'numPost'	
			},{
				fieldLabel:'上级编号',name:'mnumPost'	
			},{
				fieldLabel:'名称',name:'namePost'
			},{
				fieldLabel:'对应值',name:'valuePost'	
			},{
				fieldLabel:'序号',name:'xuPost',value:'0',minValue:0,xtype:'numberfield'
			},{
				fieldLabel:'&nbsp;',name:'ismPost',xtype:'checkboxfield',boxLabel:'显示在左边',inputValue:'1',labelSeparator:''
			}],
			success:function(){
				grid.storereload();
			}
		}});
		win = Ext.create('Ext.Window',cans);
	}
	win.show();
	form = getcmp('form_'+rand+'');	
}
function clickadd(abs,pids){
	windowsss();
	form.reset();
	form.setmsg('新增状态','blue');
	if(abs){
		form.setVal('mnum', abs);
		//form.setVal('pid', pids);
	}
}
function btn(bo, das){
	try{
	getcmp('edit_'+rand+'').setDisabled(bo);
	getcmp('del_'+rand+'').setDisabled(bo);
	getcmp('gldown_'+rand+'').setDisabled(true);
	}catch(e){}
	if(!bo){
		if(!isempt(das.num))getcmp('gldown_'+rand+'').setDisabled(false);
	}
}
function aaguanli(){
	var da = grid.changedata;
	rockoption.setlist(da.name, da.num);
}

var omenu=Ext.create('Ext.menu.Menu',{
	items:[{
		text:'新增下级选项',id:'danjiadd_'+rand+'',handler:function(a){clickadd(grid.changedata.num, grid.changedata.id)},icon:gicons('add')
	},{
		text:'新增同级选项',handler:function(a){clickadd(grid.changedata.mnum, grid.changedata.pid)}
	},'-',{
		text:'编辑',handler:function(){},icon:gicons('page_eidt'),handler:function(){clickedit()}
	},'-',{
		text:'下级选项',id:'danjiadda_'+rand+'',handler:function(){gotodown()}
	},{
		text:'管理下级选项',id:'cogdown_'+rand+'',handler:function(){aaguanli()}
	}]
});

function gotodown(num){
	if(!num)num=grid.changedata.num;
	grid.searchgoto("and mnum='"+num+"'");
}

var panel= [{
	xtype:'rocktree',tablename:'option',region:'west',width:320,split:true,bbarbool:false,title:'选项列表',collapsible: true,url:publictreestore({order:'xu',expandall:'true',pidfields:'mnum',idfields:'num',fistid:'rock'}),where:'and ism=1',
	tools:[{
		type:'refresh',handler:function(){tree.storereload()},tooltip:'刷新'
	},{
		type:'expand',tooltip:'全部展开',handler:function(){tree.expandAll()}
	},{
		type:'collapse',tooltip:'全部收起',handler:function(){tree.collapseAll()}
	}],
	columns:[{
		xtype: 'treecolumn',text:'名称',align:'left',dataIndex:'name',flex:1
	},{
		text:'编号',width:100,dataIndex:'num',align:'center'
	},{
		text:'ID',dataIndex:'id',width:60,align:'center'
	}],
	bbar:[{
		text:'新增顶级',handler:function(){clickadd('rock','0')},icon:gicons('add')
	},'-',{
		text:'管理',handler:function(){rockoption.setlist('系统选项','rock',{savecall:function(){tree.storereload()}})}
	}],
	click:function(a,note,c,d,e){
		grid.changedata = note.raw;
		omenu.showAt(e.getXY());
	}
},{
	xtype:'rockgrid',exceltitle:'系统选项',
	tablename:'option',celleditbool:true,searchtools:true,defaultorder:'mnum,xu',
	tbar:['->',{
		text:'下级选项',icon:gicons('cog'),handler:function(){aaguanli()},id:'gldown_'+rand+'',disabled:true
	},'-',{
		text:'新增',icon:gicons('add'),handler:function(){clickadd()}
	},'-',{
		text:'修改',icon:gicons('page_edit'),disabled:true,id:'edit_'+rand+'',handler:function(){clickedit()}
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,id:'del_'+rand+'',handler:function(a){grid.del(a)}
	}],
	imagescloss:function(num){
		gotodown(num);
	},
	columns:[{
		xtype: 'rownumberer',
		width: '4%'
	},{
		text:'名称',align:'left',dataIndex:'name',width:'20%',editor:{xtype:'textfield'},search:true,renderer:function(v,d,r){
			var s	= 'images/white.gif';
			if(!isempt(r.data.num))s=gicons('folder');
			return '<img src="'+s+'" align="absmiddle" onclick="rock['+index+'][1].imagescloss(\''+r.data.num+'\')" width="16" height="16"> '+v;;
		}
	},{
		text:'编号',align:'center',dataIndex:'num',width:'18%',editor:{xtype:'textfield'},search:true
	},{
		text:'上级编号',align:'center',dataIndex:'mnum',width:'18%',editor:{xtype:'textfield'},search:true
	},{
		text:'对应值',align:'center',dataIndex:'value',width:'20%',editor:{xtype:'textfield'},search:true
	},{
		text:'序号',align:'center',dataIndex:'xu',width:'10%',editor:{xtype:'numberfield',minValue:0}
	},{
		text:'ID',align:'center',dataIndex:'id',width:'9%'
	}],
	beforeload:function(){
		btn(true);
	},
	click:function(o,r){
		btn(false,r.data);
	}
}];



return {
	panel:panel,
	init:function(){
		tree = rock[index][0];
		grid = rock[index][1];
	},
	tabson:{
		destroy:function(){
			Ext.destroy(win);	
			Ext.destroy(omenu);	
		}
	}
};