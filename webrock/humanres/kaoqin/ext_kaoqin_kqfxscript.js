var 
dt1 = js.now('Y-m-01'),grid,
panel={
	xtype:'rockgrid',firstsearchbool:true,opentype:7,
	tablename:'kq_anay',searchtools:true,url:publiccheckstore(mode,dir),exceltitle:'考勤分析',
	storeafteraction:'kaoqinfxafter',defaultorder:'dt desc',fields:['iswork'],
	tbarcenter:['日期从',{
		xtype:'datefield',editable:false,format:'Y-m-d',value:dt1,width:100,id:'startdt_'+rand+''
	},'至',{
		xtype:'datefield',editable:false,format:'Y-m-d',width:100,id:'enddt_'+rand+''
	},{
		xtype:'checkbox',boxLabel:'不分析休息日',id:'xiuxiuxi_'+rand+''
	}],
	tbar:['->',{
		text:'详情',handler:function(){
			grid = rock[index];
			var uid   = grid.changedata.uid;
			if(!uid)return;
			var month = grid.changedata.dt.substr(0, 7);
			addtabs('['+grid.changedata.name+']的考勤','person,kaoqin,my,uid='+uid+',month='+month+'','kaoqin_'+uid+'');
		}
	}],
	load:function(o){
		/*
		var tab = get(o.getView().getId()+'-table');
		tab.rows[1].deleteCell(1);
		tab.rows[1].deleteCell(1);
		tab.rows[1].deleteCell(1);
		tab.rows[1].deleteCell(1);
		
		tab.rows[0].cells[1].rowSpan = 2;
		tab.rows[0].cells[2].rowSpan = 2;
		tab.rows[0].cells[3].rowSpan = 2;
		tab.rows[0].cells[4].rowSpan = 2;*/
	},
	outsearch:function(){
		var s = '',s3,
			s1= getcmp('startdt_'+rand+'').getRawValue(),
			s2= getcmp('enddt_'+rand+'').getRawValue();
		if(!isempt(s1))s="[A][K]a.`dt`[K]>=[K]'"+s1+"'";	
		if(!isempt(s2))s+="[K][A][K]a.`dt`[K]<=[K]'"+s2+"'";
		s3 = ''+s+'';
		if(getcmp('xiuxiuxi_'+rand+'').checked){
			s+='[K][A][K]a.iswork=1';
		}
		return s;
	},
	viewConfigs:{
		getRowClass: function(v, rowIndex){
			if(v.data.iswork=='0')return 'hui';
   		}
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',width:200,search:true
	},{
		text:'姓名',dataIndex:'name',width:100,search:true
	},{
		text:'日期',dataIndex:'dt',width:100,search:true,atype:'date'
	},{
		text:'星期',dataIndex:'week',width:80
	},{
		text:'名称',dataIndex:'ztname',width:80
	},{
		text:'状态',dataIndex:'state',width:80,renderer:function(v,a,b){
			if(v!='正常' && b.data.iswork=='1' && isempt(b.get('states')))v='<font color=red>'+v+'</font>';
			if(b.data.iswork=='0' && getcmp('xiuxiuxi_'+rand+'').checked)v='休息日';
			return v;
		}
	},{
		text:'时间',dataIndex:'time',width:80
	},{
		text:'备注',dataIndex:'states',flex:1,align:'left'
	}]
}
return {
	panel:panel
};