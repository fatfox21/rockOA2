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
	xtype:'rockflowgrid',opentype:params.opentype,flownum:'leave',rand:rand,
	tablename:'kq_info',keywhere:'[A][K]a.kind[D][F]请假[F]',defaultorder:'stime desc',
	formtitle:'请假条',formwidth:400,url:publiccheckstore('leave', 'person'),
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'姓名',align:'center',dataIndex:'name',width:90,search:true
	},{
		text:'部门',align:'center',dataIndex:'deptname',width:200,search:true,autowidth:true
	},{
		text:'请假类型',align:'center',dataIndex:'qjkind',width:100,search:true,autowidth:true
	},{
		text:'开始时间',align:'center',dataIndex:'stime',width:160,search:true,atype:'date'
	},{
		text:'结束时间',align:'center',dataIndex:'etime',width:160,search:true,atype:'date'
	},{
		text:'时间(小时)',align:'center',dataIndex:'totals',width:120,renderer:function(v){
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
if(params.opentype == 0){
	panel.bbaritems = ['-',{id:'total_'+rand+'',xtype:'tbtext',text:'本月请假0小时，可用假期0小时'}];
	panel.loadgrid  = function(){
		var str = this.getData('totalstring');
		getcmp('total_'+rand+'').setText(str);
	}
}

return {
	panel:panel,
	tabson:{
		show:function(){
			rock[index].isReload();//显示时刷新
		}
	}
};