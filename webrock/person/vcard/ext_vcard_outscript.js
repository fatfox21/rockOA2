var tree,grid,bool=false,
	optionnum = 'vcardgroup'+adminid+'';

function savecalblc(){
	tree.storereload();
	if(grid.form){
		grid.form.getField('gname').setLoad(false);
	}
}


var panel= [{
	xtype:'rocktree',tablename:'option',region:'west',width:200,split:true,bbarbool:false,title:'通讯录组',collapsible: true,url:publictreestore({order:'xu',expandall:'true',pidfields:'mnum',idfields:'num',fistid:optionnum}),
	columns:[{
		xtype: 'treecolumn',
		text:'名称',align:'left',dataIndex:'name',width:'99%'
	}],
	bbar:[{
		text:'刷新',handler:function(){tree.storereload()},icon:gicons('reload')
	},'-',{
		text:'组管理',handler:function(){rockoption.setlist('我的通讯录组管理',optionnum,{savecall:function(){savecalblc();},delcall:function(){savecalblc();}});}
	}],
	dblclick:function(o,v){
		grid.searchgoto("and gname='"+v.data.name+"'");
	},
	load:function(){
		
	}
},{
	xtype:'rockgridform',tablename:'vcard',formtitle:'通讯录',celleditbool:true,iconqz:'vcard_',
	defaultorder:'sort',keywhere:'and optid='+adminid+'',
	storefieldstype:'columns',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:100,editor:'textfield',search:true
	},{
		text:'所在组',dataIndex:'gname',width:80,editor:'textfield',search:true
	},{
		text:'手机号',dataIndex:'mobile',width:150,editor:'textfield',search:true
	},{
		text:'电话',dataIndex:'tel',width:150,editor:'textfield',search:true
	},{
		text:'邮箱',dataIndex:'email',width:150,editor:'textfield',search:true
	},{
		text:'地址',dataIndex:'address',width:150,editor:'textfield',search:true
	},{
		text:'排序号',dataIndex:'sort',width:80,editor:{xtype:'numberfield',minValue:0}
	}],
	formparams:{
		submitfields:'name,gname,sort,mobile,tel,email,address',
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'<font color=red>*</font>姓名',name:'namePost',allowBlank: false
		},{
			fieldLabel:'所在组',name:'gnamePost',xtype:'optioncombo',optionmnum:optionnum,editable:true
		},{
			fieldLabel:'手机号',name:'mobilePost'
		},{
			fieldLabel:'电话',name:'telPost'
		},{
			fieldLabel:'邮箱',name:'emailPost'
		},{
			fieldLabel:'地址',name:'addressPost'
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}],
		params:{int_filestype:'sort',otherfields:'optdt={now},optname={admin},optid={adminid}'}
	}
}];



return {
	panel:panel,
	init:function(){
		tree = rock[index][0];
		grid = rock[index][1];
	}
};