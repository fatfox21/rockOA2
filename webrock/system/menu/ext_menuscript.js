var tree,form;
function clickedit(){
	var data = tree.changedata;
	form.adddata(data);
	form.field('idPost').setValue(data.id);
	form.setmsg('修改状态','blue');
	form.field('namePost').focus();
}
function clickadd(){
	form.setmsg('新增','blue');
	form.reset();
	form.field('namePost').focus();
}
function clickadddown(){
	form.setmsg('新增下级','blue');
	form.reset();
	form.field('pidPost').setValue(tree.changedata.id);
	form.field('namePost').focus();
}

function btn(bo){
	try{
	getcmp('edit_'+rand+'').setDisabled(bo);
	getcmp('del_'+rand+'').setDisabled(bo);
	getcmp('adddown_'+rand+'').setDisabled(bo);
	}catch(e){}	
}

var panel=[{
	xtype:'rocktree',
	url:publictreestore({order:'sort'}),
	tablename:'menu',
	celleditbool:true,
	tbar:[{
		text:'刷新',handler:function(){tree.storereload()},icon:gicons('arrow_refresh')
	},'-',{
		text:'全部展开',handler:function(){tree.expandAll()}
	},'-',{
		text:'全部收起',handler:function(){tree.collapseAll()}
	},'-',{
		text:'新增下级',icon:gicons('add'),handler:function(){clickadddown()},disabled:true,id:'adddown_'+rand+''
	},'->',{
		text:'新增',icon:gicons('add'),handler:function(){clickadd()}
	},'-',{
		text:'修改',icon:gicons('page_edit'),disabled:true,id:'edit_'+rand+'',handler:function(){clickedit()}
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,id:'del_'+rand+'',handler:function(a){tree.del(a)}
	}],
	columns:[{
		xtype: 'treecolumn',
		text:'名称',align:'left',dataIndex:'name',width:'20%'
	},{
		text:'地址',align:'center',dataIndex:'url',width:'20%'
	},{
		text:'编号',align:'center',dataIndex:'num',width:'7%'
	},{
		text:'序号',align:'center',dataIndex:'sort',width:'7%',editor:{xtype:'numberfield',minValue:0}
	},{
		text:'图标',align:'center',dataIndex:'icons',width:'8%',renderer:function(a,b,c){
			if(!isempt(a)){
				return '<img src="'+gicons(a)+'" height=16 width=16>';
			}else{
				return '';
			}
		}
	},{
		text:'启用',align:'center',dataIndex:'status',width:'7%',renderer:renderbox,editor:{xtype:'combo',store:js.arraystr(),editable:false}
	},{
		text:'验证',align:'center',dataIndex:'ispir',width:'7%',renderer:renderbox,editor:{xtype:'combo',store:js.arraystr(),editable:false}
	},{
		text:'展开',align:'center',dataIndex:'isopen',width:'7%',renderer:renderbox,editor:{xtype:'combo',store:js.arraystr(),editable:false}
	},{
		text:'审核菜单',align:'center',dataIndex:'ischeck',width:'10%',renderer:renderbox,menuDisabled:true
	},{
		text:'ID',align:'center',dataIndex:'id',width:'6%'
	}],
	beforeload:function(){
		btn(true);
	},
	click:function(){
		btn(false);
	},
	dblclick:function(){
		//clickedit();
	}
},{
	region:'east',title:'菜单管理',width:250,split:true,xtype:'rockform',rand:rand,collapsible:true,tablename:'menu',autoScroll:false,
	items:[{
		fieldLabel:'id号',value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:''+bitian+'菜单名称',name:'namePost',allowBlank: false
	},{
		fieldLabel:'编号',name:'numPost'
	},{
		fieldLabel:'上级ID',name:'pidPost',value:'0',minValue:0,xtype:'numberfield'
	},{
		fieldLabel:'地址',name:'urlPost'
	},{
		fieldLabel:'图标',name:'iconsPost'
	},{
		fieldLabel:'&nbsp;',name:'statusPost',xtype:'checkboxfield',boxLabel:'启用',inputValue:'1',value:'1',checked:true,labelSeparator:''
	},{
		fieldLabel:'&nbsp;',name:'ispirPost',xtype:'checkboxfield',boxLabel:'权限验证',inputValue:'1',value:'1',checked:true,labelSeparator:''
	},{
		fieldLabel:'&nbsp;',name:'isopenPost',xtype:'checkboxfield',boxLabel:'展开',inputValue:'1',labelSeparator:''
	},{
		fieldLabel:'&nbsp;',name:'ischeckPost',xtype:'checkboxfield',boxLabel:'审核菜单',inputValue:'1',labelSeparator:''
	},{
		fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
	},{
		fieldLabel:'菜单颜色',name:'colorPost'
	}],
	submitfields:'name,num,pid,url,icons,status,ispir,isopen,sort,ischeck',
	params:{int_filestype:'status,ispir,isopen,sort,pid,ischeck'},
	success:function(bac){
		tree.storereload();
	}
}];

return {
	panel:panel,
	init:function(){
		tree = rock[index][0];
		form = rock[index][1];
	}
};