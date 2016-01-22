var ndate = js.now('Y-m'),today = js.now('Y-m-d');
var panel = {
	xtype:'rockgrid',tablename:'meet',exceltitle:'会议列表',keywhere:'[A][K]type=0',searchtools:true,
	defaultwhere:"[A][K]startdt like '"+ndate+"%'",defaultorder:'startdt desc',
	tbarleft:[{
		emptyText:'月份',xtype:'rockdate', width:90,format:'Y-m',editable:false,value:ndate
	}],
	tbar:['->',{
		text:'取消会议',disabled:true,id:'cancella_'+rand+'',tooltip:'只允许取消当天未开的会议哦',handler:function(){
			this.up('grid')._cancelmeet();
		}
	}],
	_cancelmeet:function(){
		var me = this;
		Ext.MessageBox.prompt('系统提示', ''+bitian+'请输入取消会议的原因:',function(a,b){
			if(a=='ok' && b){
				js.msg('wait','取消中...');
				$.post(js.getajaxurl('cancelmeet',mode,dir),{id:me.changedata.id,sm:b}, function(da){
					if(da=='success'){
						js.msg('success','取消成功');
						me.storereload();
					}else{
						js.msg('msg', da);
					}
				});
			}
		});
	},
	outsearch:function(){
		var s = '',yf = this.down('rockdate').getValue();
		if(!isempt(yf))s="[A][K]startdt like '"+yf+"%'"
		return s;
	},
	click:function(a,d){
		var bo = true,d1 	 = d.data;;
		var time1 = parseFloat(js.now('time')),
			time2 = parseFloat(js.now('time',d1.startdt));
		
		if(time2>time1 && d1.startdt.indexOf(today)==0 && d1.status==1 && d1.state==0)bo=false;
		getcmp('cancella_'+rand+'').setDisabled(bo);
	},
	beforeload:function(){
		getcmp('cancella_'+rand+'').setDisabled(true);
	},
	execlparams:{excelchuli:'state,status',state_arr:'正常,会议中,结束,取消',status_arr:'待审批,已审批,审批不通过'},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'会议室',dataIndex:'hyname',width:'10%',search:true,autowidth:true
	},{
		text:'主题',dataIndex:'title',width:'10%',search:true,autowidth:true
	},{
		text:'开始时间',dataIndex:'startdt',width:155,search:true
	},{
		text:'截止时间',dataIndex:'enddt',width:155,search:true
	},{
		text:'参会人员',dataIndex:'joinname',width:'10%',search:true,autowidth:true
	},{
		text:'发起人',dataIndex:'optname',width:70,search:true
	},{
		text:'会议状态',dataIndex:'state',width:100,boxdata:[['green','正常'],['blue','会议中'],['#ff6600','结束'],['#888888','取消']],renderer:renderbox,atype:'select',search:true,store:js.arraystr('正常,会议中,结束,取消')
	},{
		text:'说明',dataIndex:'explain',flex:1,align:'left'
	},{
		text:'审批状态',dataIndex:'status',width:80,boxdata:[['blue','待审批'],['green','已审批'],['red','审批不通过']],renderer:renderbox,atype:'select',search:true,store:js.arraystr('待审批,已审批,审批不通过')
	}]
};

return {
	panel:panel
};