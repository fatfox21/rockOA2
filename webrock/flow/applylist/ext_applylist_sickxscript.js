var c = {
	tal:function(v){
		var t=0,h=0,s='';
		if(v>0){
			t = parseInt(v/8);
			h = v%8;
		}
		s=''+h+'小时';
		if(h==0)s='';
		if(t>0)s=''+t+'天'+s;
		return s
	}
}

var panel= {
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'sickx',rand:rand,
	tablename:'kq_sick',defaultorder:'optdt desc',
	formtitle:'请假条',formwidth:400,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',dataIndex:'name',width:90,search:true
	},{
		text:'部门',dataIndex:'deptname',width:200,search:true,autowidth:true
	},{
		text:'销假类型',dataIndex:'type',width:100,search:true,atype:'select',store:js.arraystr('0|请假单,1|外出出差'),qz:'a.',renderer:function(v){
			var s = '请假单';if(v==1)s='外出出差';return s;
		}
	},{
		text:'对应销假单',align:'',dataIndex:'mseric',autowidth:true,search:true
	},{
		text:'开始时间',dataIndex:'stime',width:160,search:true,atype:'date'
	},{
		text:'结束时间',dataIndex:'etime',width:160,search:true,atype:'date'
	},{
		text:'时间(小时)',dataIndex:'totals',width:120,renderer:function(v){
			var s = c.tal(v);
			if(s!='')s='('+s+')';
			return '<font color=red>'+v+'</font>'+s+'';
		}
	},{
		text:'状态',align:'left',dataIndex:'status'
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1,sortable:false
	}],
	tbarcenter:[{
		xtype:'rockdate',format:'month',id:'month_'+rand+'',emptyText:'月份',width:90
	}],
	outsearch:function(){
		var s = '',
			s1= getcmp('month_'+rand+'').getValue();
		if(!isempt(s1))s="[A][K]a.`stime`[K]like[K]'"+s1+"%'";	
		return s;
	}
};
return {
	panel:panel,
	tabson:{
		show:function(){
			rock[index].isReload();
		}
	}
};