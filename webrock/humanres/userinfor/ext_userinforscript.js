var grid;
function clickedit(){
	var id = grid.changedata.id;
	var name = '['+grid.changedata.name+']档案信息';
	addtabs(name,'humanres,userinfor,edit,index='+index+',type=1,uid='+id+'','useredit'+id+'');
}
function btn(bo){
	try{
	getcmp('edit_'+rand+'').setDisabled(bo);
	}catch(e){}	
}
var panel= {
	xtype:'rockgrid',tablename:'admin',searchtools:true,defaultorder:'sort',celleditbool:true,highsearchbool:true,
	tbar:['->',{
		text:'修改',icon:gicons('user_edit'),disabled:true,id:'edit_'+rand+'',handler:function(){clickedit()}
	}],
	tbarcenter:[{
		xtype:'combo',width:100, store:public.userstate,emptyText:'人员状态',id:'state_'+rand+''
	}],
	execlparams:{excelchuli:'state',state_arr:',正式员工,试用期,实习生,兼职,离职员工'},
	exceltitle:'员工档案',excelsetcolumns:true,
	viewConfigs:{
		getRowClass: function(v, rowIndex){
			if(v.raw.state=='5')return 'hui';
   		}
	},
	outsearch:function(){
		var s='',s1;
		s1 = getcmp('state_'+rand+'').getValue();
		if(!isempt(s1))s='and `state`='+s1+'';
		return s;
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:60,search:true
	},{
		text:'用户名',dataIndex:'user',width:100,search:true
	},{
		text:'指纹号',dataIndex:'finge',width:80,search:true,editor:'textfield'
	},{
		text:'部门',dataIndex:'deptname',width:80,autowidth:true,search:true
	},{
		text:'职位',dataIndex:'ranking',width:80,autowidth:true,search:true
	},{
		text:'性别',dataIndex:'gender',width:50,search:true
	},{
		text:'入职时间',dataIndex:'workdate',width:100,autowidth:true,search:true,editor:'rockdate'
	},{
		text:'直属上级',dataIndex:'superman',width:80,search:true
	},{
		text:'人员状态',dataIndex:'state',width:80,search:false,atype:'select',editor:{xtype:'combo',store:public.userstate,editable:false},renderer:function(v, m){
			if(isempt(v))return '<font color=red>未选</font>';
			var val = public.userstate[v][1];
			return val;
		}
	},{
		text:'学历',dataIndex:'xueli',width:80,search:true
	},{
		text:'生日',atype:'date',dataIndex:'birthday',width:100,search:true,editor:'rockdate'
	},{
		text:'离职日期',atype:'date',dataIndex:'quitdt',width:100,search:true,editor:'rockdate'
	}],
	beforeload:function(){
		btn(true);
	},
	click:function(){
		btn(false);
	}
};

return {
	panel:panel,
	init:function(){
		grid = rock[index];
		rock[index].isreadload = false;
	},
	tabson:{
		show:function(){
			if(rock[index].isreadload){
				grid.storereload();
				rock[index].isreadload=false;
			}	
		}
	}	
};