var tree,grid,bool=false,
	atype = params.atype,
	filenum = 'filetype',wherss='';
if(atype==1){
	filenum = 'filetype_'+adminid+'';
	wherss  = '[K][A][K]optid[D]'+adminid+'';
}	

function savecalblc(){
	tree.storereload();
}
function callbacku(a, o, sid){
	if(sid=='')return;
	js.msg('wait','保存文件中...');
	bool = true;
	$.post(js.getajaxurl('savedoc',mode,dir),{fileid:sid, typename:tree.changedata.name,atype:atype}, function(da){
		js.msg('success', '保存成功');
		grid.storereload();
		bool = false;
	});
}
function uploadfield(){
	if(bool)return;
	if(!tree.changedata){
		js.msg('msg','请选择选择左边的类别，没有类别请先管理类别');
		return;
	}
	uploadwindows.show({title:'上传['+tree.changedata.name+']类别文件',callback:callbacku,oktype:'clear'});
}

var panel= [{
	xtype:'rocktree',tablename:'option',region:'west',width:200,split:true,bbarbool:false,title:'文件类别',collapsible: true,
	url:publictreestore({order:'xu',expandall:'true',pidfields:'mnum',idfields:'num',fistid:filenum}),
	columns:[{
		xtype: 'treecolumn',
		text:'名称',align:'left',dataIndex:'name',width:'99%'
	}],
	bbar:[{
		text:'刷新',handler:function(){tree.storereload()},icon:gicons('reload')
	},'-',{
		text:'类别管理',handler:function(){rockoption.setlist('文件类别管理',filenum,{qomnum:filenum,savecall:function(){savecalblc();},delcall:function(){savecalblc();}});}
	}],
	dblclick:function(o,v){
		grid.searchgoto("and typename='"+v.data.name+"'");
	}
},{
	xtype:'rockgrid',checkcolumns:true,keywhere:"[A][K]atype[D]"+atype+""+wherss+"",
	tablename:'word',searchtools:true,celleditbool:true,defaultorder:'sort',
	tbar:['->',{
		text:'共享操作',icon:gicons('page_go'),handler:function(){grid._shategoto()}
	},'-',{
		text:'上传',icon:gicons('arrow_up'),handler:function(){uploadfield()}
	},'-',{
		text:'删除',icon:gicons('delete'),handler:function(){grid.del(false,true)}
	}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'类型',search:true,dataIndex:'fileext',sortable:true,width:60,renderer:function(v){
			return '<img src="mode/fileicons/'+v+'.gif" width=16 height=16>';
		}
	},{
		text:'类别',dataIndex:'typename',width:100,search:true,editor:'textfield',sortable:true
	},{
		text:'文件名称',align:'left',dataIndex:'filename',flex:1,search:true,editor:'textfield',sortable:true
	},{
		text:'大小',dataIndex:'filesizecn',width:90
	},{
		text:'共享给',dataIndex:'shatename',flex:0.7,search:true
	},{
		text:'序号',dataIndex:'sort',width:50,search:true,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'添加时间',dataIndex:'adddt',width:150,search:true,sortable:true,atype:'date'
	},{
		text:'下载',xtype:'actioncolumn',dataIndex:'optbtn',width:60,menuDisabled:true,sortable:false,items:[{
			icon:gicons('download'),tooltip: '下载',handler:function(g, rowIndex, colIndex){
				grid._downla(rowIndex);
			}
		}]
	}],
	_downla:function(oi){
		var rec = this.store.getAt(oi);
		var fileid = rec.raw.fileid;
		js.downshow(fileid);
	},
	_shategoto:function(){
		var me = this,lx=0;
		var sid = me.getSelectValue('id', true);
		if(isempt(sid)){
			js.msg('msg','没有选中任何行记录');
			return;
		}
		if(!me._aawin){
			var cans = winopt({title:'选中的共享操作',width:300,items:{
				border:false,url:js.getajaxurl('saveshate',mode,dir),
				tablename:'word',submittext:'确定',xtype:'rockform',autoScroll:false,cancelbool:true,submitfields:'',
				items:[{
					fieldLabel:'id号',value:'0',name:'sidPost',hidden:true
				},{
					fieldLabel:''+bitian+'共享给',xtype:'combo',store:[['not','不共享'],['dept','本部门'],['all','所有人员'],['auto','自定义']],editable:false,allowBlank: false,name:'typePost',listeners:{change:function(o){
						me._form.getField('shatename').setVisible(o.value=='auto');
					}}
				},{
					name:'shateuidPost',id:'shateuid_'+rand+'',hidden:true
				},{
					fieldLabel:''+bitian+'部门/人员',nameidfields:'shateuid_'+rand+'',name:'shatenamePost',xtype:'changedeptuser',changetitle:'选择部门/人员',changetype:'deptusercheck',hidden:true
				}],
				success:function(){
					me._aawin.close();
					me.storereload();
				}
			}});
			me._aawin = Ext.create('Ext.Window',cans);
			me.destroypanel.push(me._aawin);
			lx = 1;
		}
		me._aawin.show();
		if(lx==1)me._form = me._aawin.child('rockform');
		me._form.setmsg('');
		me._form.setVal('sid',sid);
	}
}];



return {
	panel:panel,
	init:function(){
		tree = rock[index][0];
		grid = rock[index][1];
	}
};