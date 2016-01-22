var panel= {
	xtype:'rockgrid',tablename:'admin',searchtools:true,defaultorder:'sort',keywhere:'and status=1 and state<>5 and isvcard=1',
	exceltitle:'内部通讯录',storefields:'id,deptname,name,ranking,gender,superman,email,tel,mobile,face',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'头像',dataIndex:'face',width:100,renderer:function(v){
			var s = '';
			if(!isempt(v))s='<img src="'+v+'" height="30" width="30">';
			return s;
		}
	},{
		text:'姓名',dataIndex:'name',width:100,search:true
	},{
		text:'部门',dataIndex:'deptname',width:'15%',search:true
	},{
		text:'职位',dataIndex:'ranking',width:'10%',search:true
	},{
		text:'性别',dataIndex:'gender',width:80,search:true
	},{
		text:'直属上级',dataIndex:'superman',width:'10%',search:true
	},{
		text:'邮箱',dataIndex:'email',width:'15%',search:true
	},{
		text:'电话',dataIndex:'tel',width:120,search:true
	},{
		text:'手机号',dataIndex:'mobile',width:120,search:true
	}]
};

return {
	panel:panel
};