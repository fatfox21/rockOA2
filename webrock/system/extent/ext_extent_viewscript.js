var grid,form;
function clickedit(){
	form.adddata(grid.changedata,'id');
	form.setmsg('编辑', 'blue');
}
function clickdel(){
	grid.del();
}
function clickadd(){
	form.reset();
	form.setmsg('新增', 'blue');
}

function btn(bo){
	try{
	getcmp('edit_'+rand+'').setDisabled(bo);
	getcmp('del_'+rand+'').setDisabled(bo);
	}catch(e){}	
}

var panel= [{
	xtype:'rockgrid',tablename:'sjoinv',searchtools:true,url:publicstore(mode, dir),storeafteraction:'viewafterstore',
	tbar:[,'->',{
		text:'新增',icon:gicons('add'),handler:clickadd
	},'-',{
		text:'修改',icon:gicons('edit'),disabled:true,id:'edit_'+rand+'',handler:clickedit
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,id:'del_'+rand+'',handler:clickdel
	}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:100,search:true
	},{
		text:'模块编号',dataIndex:'mode',width:120,search:true
	},{
		text:'模块名称',dataIndex:'modename',width:120,search:true
	},{
		text:'类型',dataIndex:'type',width:120,search:true,renderer:function(v){
			var s = '<font color=red>不允许查看</font>';
			if(v=='1') s = '<font color=green>可查看</font>';
			return s;
		}
	},{
		text:'对应值',dataIndex:'renyname',autowidth:true,search:true
	},{
		text:'ID',dataIndex:'id',width:60
	}],
	beforeload:function(){
		btn(true);
	},
	click:function(){
		btn(false);
	},
	dblclick:function(o,v){
		
	},
	load:function(){
		if(this.loadcount>1)return;
		var a = this.getData('modearr');
		var d = [['all','所有模块']];
		for(var i=0; i<a.length; i++){
			d.push([a[i].num, a[i].name]);
		}
		getcmp('mode_'+rand+'').getStore().loadData(d);
	}
},{
	width:250,maxWidth:400,minWidth:200,split:true,region:'east',title:'数据查看管理',collapsible: true,xtype:'rockform',tablename:'sjoinv',rand:rand,
	submitfields:'uid,mode,type,renyid,renyname,name,modename',autoScroll:false,
	params:{int_filestype:'type',otherfields:'optdt={now}'},
	items:[{
		fieldLabel:'id号',value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:''+bitian+'对应模块',id:'mode_'+rand+'',name:'modePost',value:'',allowBlank: false,xtype:'checkcombo',editable:false,store:[['all','所有模块']]
	},{
		name:'modenamePost',hidden:true
	},{
		id:'uid_'+rand+'',name:'uidPost',hidden:true
	},{
		fieldLabel:''+bitian+'人员',name:'namePost',nameidfields:'uid_'+rand+'',xtype:'changedeptuser',changetitle:'选择人员',changetype:'user',allowBlank: false
	},{
		fieldLabel:''+bitian+'类型',name:'typePost',value:'1',xtype:'combo',store:[['1','可查看'],['0','不允许查看']],editable:false
	},{
		id:'renyid_'+rand+'',name:'renyidPost',hidden:true
	},{
		fieldLabel:''+bitian+'对应值',nameidfields:'renyid_'+rand+'',name:'renynamePost',xtype:'changedeptuser',changetitle:'选择部门/人员',changetype:'deptusercheck',allowBlank: false
	}],
	submitcheck:function(){
		this.setVal('modename', getcmp('mode_'+rand+'').getRawValue());
		return '';
	},
	success:function(bac){
		grid.storereload();
	}
}];


return {
	panel:panel,
	init:function(){
		grid = rock[index][0];
		form = rock[index][1];
	}
};