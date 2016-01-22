var upbool=false,step=0,grid,selarr;
var panel= [{
	title:'系统升级',region:'west',width:230,split:true,items:[{
		html:'&nbsp; &nbsp; 建议先备份您的数据，开发人员使用的，如果您文件有修改升级会被覆盖的，请谨慎使用。<br><b>升级步骤：</b><br>1、检测新版本<br>2、升级数据库<br>3、升级覆盖相关文件',border:false,padding:10
	}]
},{
	xtype:'rockgrid',checkcolumns:true,defaultorder:'id desc',region:'center',bbarbool:false,
	tablename:'log',storeautoLoad:false,url:js.getajaxurl('data','upgrade','taskrun'),
	columns:[{
		xtype: 'rownumberer',
		width: 30
	},{
		text:'类型',search:true,dataIndex:'type',width:150
	},{
		text:'备注',align:'left',dataIndex:'remark',flex:1,search:true,renderer:function(v){
			if(!isempt(v))v = v.replace(/\n/g, '<br>');
			return v;
		}
	},{
		text:'状态',dataIndex:'status',width:100,renderer:function(v){
			if(!v)v=0;
			var asr = ['<font color=#888888>待更新</font>','<font color=blue>更新中...</font>','<font color=green>更新成功</font>','<font color=red>更新失败</font>'];
			return asr[v];
		}
	}],
	tbar:['在线升级系统，您当前版本V'+VERSION+'','-','在线升级网址',{
		xtype:'textfield',value:'http://127.0.0.1:90/rock/',width:180,id:'url_'+rand+''
	},{
		text:'1.检测新版本',id:'btn1_'+rand+'',handler:function(){
			if(upbool)return;
			var url = getcmp('url_'+rand+'').getValue();
			this.up('grid').setparams({step:1,upurl:url},true);
			step = 1;
		}
	},{
		text:'2.升级数据库',id:'btn2_'+rand+'',handler:function(){
			if(upbool)return;
			var url = getcmp('url_'+rand+'').getValue();
			this.up('grid').setparams({step:2,upurl:url},true);
			step = 2;
		}
	},{
		text:'3.升级覆盖相关文件',id:'btn3_'+rand+'',handler:function(){
			if(upbool)return;
			var url = getcmp('url_'+rand+'').getValue();
			this.up('grid').setparams({step:3,upurl:url},true);
			step = 3;
		}
	}],
	_startupla:function(oi){
		var sel = selarr[oi];
		var len = selarr.length;
		if(oi>=len){
			js.msg('success','更新完成');
			this._uoplabo(false);
			return;
		}
		sel.set('status', 1);
		js.msg('wait','更新升级中('+len+'/'+(oi+1)+')...');
		var da = {
			content:sel.data.remark,
			step:step,upurl:getcmp('url_'+rand+'').getValue()
		};
		$.post(js.getajaxurl('uploadfilest','upgrade','taskrun'),da,function(st){
			if(st=='success'){
				sel.set('status', 2);
				grid._startupla(oi+1);
			}else{
				sel.set('status', 3);
				grid._uoplabo(false);
				js.msg('msg','更新失败:'+st+'');
			}
		});
	},
	bbar:[{
		text:'立马更新(请谨慎使用)',disabled:true,id:'btn4_'+rand+'',handler:function(){
			if(step==0||step==1)return;
			alert('为了您系统安全，请不要使用');return;
			grid._uoplabo(true);
			selarr = grid.getsel();
			if(!selarr || selarr.length==0){
				js.msg('msg','没有选中');
				return;
			}
			grid._startupla(0);
			this.setDisabled(true);
		}
	}],
	_uoplabo:function(bo){
		getcmp('btn1_'+rand+'').setDisabled(bo);
		getcmp('btn2_'+rand+'').setDisabled(bo);
		getcmp('btn3_'+rand+'').setDisabled(bo);
	},
	beforeload:function(){
		getcmp('btn4_'+rand+'').setDisabled(true);
	},
	load:function(){
		var issheng = this.getData('issheng');
		if(issheng==1)getcmp('btn4_'+rand+'').setDisabled(false);
	}
}];

return {
	panel:panel,
	init:function(){
		$.get(js.getajaxurl('geturly','upgrade','taskrun'),function(da){
			getcmp('url_'+rand+'').setValue(da);
		});
		grid = rock[index][1];
	}
};
