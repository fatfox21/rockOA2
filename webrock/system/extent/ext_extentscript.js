var type = params.type,changeid=0;
var uobj,mobj,gobj,bool=true;
var checkbox = {
	align:'center',width: '10%',menuDisabled:true,dataIndex:'checkboxss',text:'<input type="checkbox" id="selall_'+rand+'">',sortable:false,
	renderer:function(v,d,r){
		return '<input type="checkbox" value="'+r.data.id+'" name="checkbox_'+rand+'">';
	}
};
var savebtn = {
	text:'保存',icon:gicons('disk'),handler:function(){save()}
};

function selall(o1){
	var o =$("input[name='checkbox_"+rand+"']");
	for(var i=0;i<o.length;i++){
		o[i].checked=o1.checked;
	}
}

function save()
{
	if(type=='view' || bool || changeid==0)return false;
	var data={type:type,mid:changeid};
	var cha = ['0'];
	var o =$("input[name='checkbox_"+rand+"']");
	for(var i=0;i<o.length;i++)if(o[i].checked)cha.push(o[i].value);
	data.checkaid	= cha.join(',');
	var url	= js.getajaxurl('save','extent','system');
	bool	= true;
	js.msg('wait','保存中...');
	$.post(url,data,function(da){
		if(da!='success'){
			js.msg('msg',da);
		}else{
			js.msg('success','保存成功');
		}
		bool	= false;
	});
}

var user = {
	xtype:'rockgrid',title:'人员列表',id:'userlist_'+rand+'',collapsible: true,
	pageSize:15,searchtools:true,
	tablename:'admin',storefields:'id,user,status,name,deptname',keywhere:'and status=1 and state<>5',
	bbaritems:['-'],
	columns:[{
		xtype: 'rownumberer',
		width: '8%'
	},{
		text:'姓名',dataIndex:'name',width:'20%',search:true
	},{
		text:'部门',dataIndex:'deptname',width:'30%',search:true
	},{
		text:'用户名',dataIndex:'user',width:'22%',search:true
	},{
		text:'ID',dataIndex:'id',width:'8%'
	}]
};

var group = {
	xtype:'rockgrid',tablename:'group',bbarbool:false,title:'组列表',collapsible: true,id:'grouplist_'+rand+'',
	bbar:[{text:'刷新',handler:function(){gobj.storereload()}},'->'],keywhere:'and ispir=1',
	columns:[{
		xtype: 'rownumberer',
		width: '10%'
	},{
		text:'组名',dataIndex:'name',width:'50%',menuDisabled:true
	},{
		text:'验证',dataIndex:'ispir',width:'20%',renderer:renderbox,menuDisabled:true
	}]
};

var menu = {
	xtype:'rocktree',
	url:publictreestore({order:'sort',expandall:'true'}),where:'and ispir=1 and `status`=1',
	tablename:'menu',
	title:'菜单列表',id:'menulist_'+rand+'',collapsible: true,
	columns:[{
		xtype: 'treecolumn',
		text:'名称',align:'left',dataIndex:'name',width:'50%',sortable:false
	},{
		text:'编号',dataIndex:'num',width:'25%',sortable:false,align:'center'
	},{
		text:'ID',dataIndex:'id',width:'10%',sortable:false,align:'center'
	}],
	bbar:[{
		text:'全部展开',handler:function(){mobj.expandAll()}
	},'-',{
		text:'全部收起',handler:function(){mobj.collapseAll()}
	},'->']
}

function backquanxian(){
	var url		= js.getajaxurl('getextent','extent','system');
	var data={type:type,mid:changeid};
	$.post(url,data,function(da){
		bool	= false;
		var o = $("input[name='checkbox_"+rand+"']");
		for(var i=0;i<o.length;i++){
			o[i].checked=false;
			if(da.indexOf('['+o[i].value+']')>=0)o[i].checked=true;
		}
	});
}


var panel=[];

if(type == 'um' || type == 'view'){
	user.region='west';
	user.split=true;
	user.width='48%';
	menu.region='center';
	menu.columns.unshift(checkbox);
	user.click=function(a,r){
		if(bool)return;
		changeid = r.data.id;
		mobj.setTitle('人员['+r.data.name+']的权限');
		backquanxian();
	}
	if(type == 'um'){
		user.bbaritems.push(savebtn);
	}
	panel = [user,menu];
}

if(type == 'gm'){
	group.region='west';
	group.split=true;
	group.width='48%';
	menu.region='center';
	menu.columns.unshift(checkbox);
	group.click=function(a,r){
		if(bool)return;
		changeid = r.data.id;
		mobj.setTitle('组['+r.data.name+']的权限');
		backquanxian();
	}
	group.bbar.push(savebtn);
	panel = [group,menu];
}

if(type == 'mu'){
	user.region='east';
	user.split=true;
	user.width='48%';
	menu.region='center';
	user.columns.unshift(checkbox);
	user.pageSize=0;
	user.bbarbool=false;
	user.bbar = [{text:'刷新',handler:function(){uobj.storereload()}}];
	menu.click=function(a,r){
		if(bool)return;
		changeid = r.data.id;
		uobj.setTitle('菜单['+r.data.name+']有权限的人员');
		backquanxian();
	}
	menu.bbar.push(savebtn);
	panel = [user,menu];
}

if(type == 'mg'){
	group.region='east';
	group.split=true;
	group.width='48%';
	menu.region='center';
	group.columns.unshift(checkbox);
	menu.click=function(a,r){
		if(bool)return;
		changeid = r.data.id;
		gobj.setTitle('菜单['+r.data.name+']有权限的组');
		backquanxian();
	}
	menu.bbar.push(savebtn);
	panel = [menu,group];
}

return {
	panel:panel,
	init:function(){
		uobj = getcmp('userlist_'+rand+'');
		gobj = getcmp('grouplist_'+rand+'');
		mobj = getcmp('menulist_'+rand+'');
		if(type =='view')get('selall_'+rand+'').disabled=true;
		$('#selall_'+rand+'').click(function(){
			selall(this);
		});
		bool=false;
	}
};