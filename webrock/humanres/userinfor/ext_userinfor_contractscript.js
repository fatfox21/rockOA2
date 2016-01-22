var panel = {
	xtype:'rockgridform',tablename:'userjl',formtitle:'人员合同',url:publicstore(mode,dir),storebeforeaction:'contractuserbeifre',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:80,search:true,qz:'b.'
	},{
		text:'部门',dataIndex:'deptname',width:150,autowidth:true,search:true,qz:'b.'
	},{
		text:'合同类型',dataIndex:'httype',width:150,search:true,qz:'a.'
	},{
		text:'开始日期',dataIndex:'startdt',width:110,search:true,qz:'a.',atype:'date'
	},{
		text:'截止日期',dataIndex:'enddt',width:110,search:true,qz:'a.',atype:'date'
	},{
		text:'说明',dataIndex:'explain',flex:1,align:'left',search:true,qz:'a.'
	},{
		text:'合同状态',dataIndex:'state',width:100,search:true,qz:'a.'
	},{
		text:'提前截止日期',dataIndex:'tqenddt',width:110,search:true,qz:'a.',atype:'date'
	},{
		text:'操作时间',dataIndex:'optdt',width:160,search:true,qz:'a.'
	}],
	tbar:['->',{
		text:'全部',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){this.up('rockgridform')._qiehuanzt(0);}
	},'-',{
		text:'1月内到期',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){this.up('rockgridform')._qiehuanzt(1);}
	},'-',{
		text:'1周内到期',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){this.up('rockgridform')._qiehuanzt(2);}
	},'-',{
		text:'3天内到期',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){this.up('rockgridform')._qiehuanzt(3);}
	},'-',{
		text:'已到期',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){this.up('rockgridform')._qiehuanzt(4);}
	},'->'],
	formedit:function(fo, d){
		fo.setVal('deptname', d.deptname);
		fo.setVal('name', d.name);
	},
	_qiehuanzt:function(oi){
		if(this.loadbool)return;
		this.setparams({protype:oi}, true);
	},
	bbaritems:['无截止日期为长期合同'],
	formwidth:400,
	formparams:{
		submitfields:'startdt,enddt,explain,uid,httype,state,tqenddt',
		params:{int_filestype:'uid',otherfields:'optdt={now},atype=ract'},labelWidth:100,
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'部门',xtype:'displayfield',name:'deptnamePost',id:'deptname_'+rand+''
		},{
			name:'uidPost',id:'uid_'+rand+'',hidden:true
		},{
			fieldLabel:''+bitian+'人员',otherfields:{deptname:'deptname_'+rand+''},nameidfields:'uid_'+rand+'',name:'namePost',xtype:'changedeptuser',changetitle:'选择人员',changetype:'user',allowBlank: false
		},{
			fieldLabel:''+bitian+'合同类型',name:'httypePost',xtype:'optioncombo',optionmnum:'hetongtype',allowBlank: false
		},{
			fieldLabel:''+bitian+'开始日期',name:'startdtPost',xtype:'datefield',format:'Y-m-d',editable:false,allowBlank: false
		},{
			fieldLabel:'截止日期',name:'enddtPost',xtype:'datefield',format:'Y-m-d'
		},{
			fieldLabel:''+bitian+'合同状态',name:'statePost',xtype:'combo',editable:false,allowBlank: false,store:js.arraystr('有效,到期,解除')
		},{
			fieldLabel:'提前截止日期',name:'tqenddtPost',xtype:'datefield',format:'Y-m-d'
		},{
			fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60
		}]
	}
};

return {
	panel:panel
};
