var grid;
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
	xtype:'rockgridform',url:publiccheckstore(),searchtools:true,exceltitle:'考勤.请假和加班',
	tablename:'kq_info',defaultorder:'stime desc',opentype:3,editbool:false,keywhere:'[A][K]a.status<>5',
	execlparams:{excelchuli:'status',status_arr:'待审核,审核通过,审核不通过'},
	griddelwhere:function(d){
		return d.optid==adminid;
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',width:120,search:true,autowidth:true
	},{
		text:'姓名',dataIndex:'name',width:90,search:true
	},{
		text:'类型',dataIndex:'kind',width:90,search:true,sortable:true
	},{
		text:'类别',dataIndex:'qjkind',width:60,search:true,sortable:true
	},{
		text:'开始时间',dataIndex:'stime',width:150,search:true,atype:'date',sortable:true
	},{
		text:'结束时间',dataIndex:'etime',width:150,search:true,atype:'date',sortable:true
	},{
		text:'时间(小时)',dataIndex:'totals',width:120,renderer:function(v,a,b){
			var lx = b.raw.kind,s;
			if(lx=='请假'){
				s = c.tal(v);
				if(s!='')s='('+s+')';
				return '<font color=red>'+v+'</font>'+s+'';
			}else{
				return '<font color=green>'+v+'</font>小时';
			}
		}
	},{
		text:'状态',width:130,dataIndex:'status',renderer:function(v,a,b){
			var s = '<font color="blue">待'+b.raw.nowcheckname+'审核</font>';
			var ns = b.raw.statusman;if(isempt(ns))ns='';
			if(v=='2')s = ns+'<font color="red">审核不通过</font>';
			if(v=='1')s = ns+'<font color="green">审核通过</font>';
			return s;
		}
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1
	},{
		text:'销假',dataIndex:'isxj',sortable:true,width:90,renderer:function(v){
			var s='';
			if(v==1)s='<font color=green>有销假过</font>';
			return s;
		}
	}],
	tbarcenter:[{
		xtype:'rockdate',format:'month',id:'month_'+rand+'',emptyText:'月份',width:80
	}],
	outsearch:function(){
		var s = '',
			s1= getcmp('month_'+rand+'').getValue();
		if(!isempt(s1))s="[A][K]a.`stime`[K]like[K]'"+s1+"%'";	
		return s;
	},
	grideditwhere:function(a){	
		
	},
	formotherfield:'id,name,deptname',
	formtitle:'假期',
	formparams:{
		submitfields:'kind,stime,etime,totals,uid,explain',
		params:{int_filestype:'totals',otherfields:'optdt={now},optid={adminid},status=1,isturn=1,statusman={admin}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'部门',xtype:'displayfield',name:'deptnamePost',id:'deptname_'+rand+''
		},{
			name:'uidPost',id:'uid_'+rand+'',hidden:true
		},{
			fieldLabel:''+bitian+'人员',otherfields:{deptname:'deptname_'+rand+''},nameidfields:'uid_'+rand+'',name:'namePost',xtype:'changedeptuser',changetitle:'选择人员',changetype:'user'
		},{
			fieldLabel:''+bitian+'类型',name:'kindPost',allowBlank: false,xtype:'optioncombo',optionmnum:'leavetypes',autoloadlist:true
		},{
			fieldLabel:''+bitian+'开始时间',name:'stimePost',xtype:'datetimefield',allowBlank: false,editable:false
		},{
			fieldLabel:'截止时间',name:'etimePost',xtype:'datetimefield',editable:true
		},{
			fieldLabel:''+bitian+'时长(小时)',name:'totalsPost',allowBlank: false,minValue:1,xtype:'numberfield',value:1
		},{
			fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:100
		}]
	}
};

return {
	panel:panel,
	init:function(){
		grid = rock[index];
	}
};