var date = js.now(),grid,win;
var atype = params.atype;
var panel = {
	xtype:'rockgrid',url:publicstore(mode,dir),
	storeafteraction:'getwcslistwock',storebeforeaction:'getwcslistbefore',
	tablename:'work',searchtools:true,defaultorder:'startdt desc',fields:['sjla','sjsj','sjks'],
	paramsbase:{atype:atype},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'标题',dataIndex:'title',search:true,autowidth:true,align:'left'
	},{
		text:'创建者',dataIndex:'optname',search:true,width:80
	},{
		text:'任务类型',dataIndex:'type',search:true,width:80
	},{
		text:'等级',dataIndex:'grade',search:true,width:60
	},{
		text:'分配给',dataIndex:'dist',search:true,autowidth:true
	},{
		text:'状态',dataIndex:'state',width:60,search:true,autowidth:true,renderer:function(v,m, d){
			if(v=='已完成'){
				v='<font color=green>'+v+'</font>';
			}else{
				if(d.data.sjsj>0)v+='<br><font color=red>超'+d.data.sjla+'</font>';
				if(d.data.sjks>0 && v=='待执行')v='<font color=red>'+v+'</font>';
			}				
			return v;
		}
	},{
		text:'开始时间',dataIndex:'startdt',width:160
	},{
		text:'截止时间',dataIndex:'enddt',width:160
	},{
		text:'任务报告',dataIndex:'baoname',search:true,autowidth:true,renderer:function(v, m, b){
			var s = '';
			if(!isempt(v))s='报告给'+v+'';
			if(!isempt(b.raw.bgtime))s+= '<br>每天'+b.raw.bgtime+'';
			return s;
		}
	},{
		text:'说明',align:'left',dataIndex:'explain',search:true,autowidth:true,renderer:rendercont
	}],
	tbar:['->',{
		text:'所有任务',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(0);}
	},'-',{
		text:'未完成任务',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(1);}
	},'-',{
		text:'已完成任务',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(2);}
	},'-',{
		text:'超期任务',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(3);}
	},'->',{
		text:'任务报告',disabled:true,itemId:'baog',icon:gicons('pencil'),handler:function(){grid._showwin();}
	},'-',{
		text:'详情',icon:gicons('page_white_text'),disabled:true,itemId:'xiang',handler:function(){
			grid._xiang();
		}
	}],
	_qiehuanzt:function(oi){
		if(this.loadbool)return;
		this.setparams({atype:oi}, true);
	},
	click:function(){
		if(!this.changedata.id)return;
		this.down('#baog').setDisabled(false);
		this.down('#xiang').setDisabled(false);
	},
	beforeload:function(){
		this.down('#baog').setDisabled(true);
		this.down('#xiang').setDisabled(true);
	},
	dblclick:function(){
		this._xiang();
	},
	_showwin:function(){
		if(!win){
			var cans = winopt({title:'任务报告',width:400,items:{
				border:false,aftersaveaction:'workbgaftersave',
				tablename:'workbg',url:publicsave(mode,dir),
				xtype:'rockform',
				submitfields:'mid,state,explain',
				params:{int_filestype:'mid',otherfields:'optdt={now},optname={admin},optid={adminid}'},
				cancelbool:true,
				items:[{
					value:'0',name:'idPost',hidden:true
				},{
					value:'0',name:'midPost',hidden:true
				},{
					fieldLabel:''+bitian+'状态',name:'statePost',allowBlank: false,xtype:'optioncombo',optionmnum:'workstate'
				},{
					fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60
				},uploadwindows.fields()],
				success:function(){
					grid.storereload();
					win.hide();
				}
			}});
			win = Ext.create('Ext.Window',cans);
			this.destroypanel.push(win);
		}
		win.show();
		var form = win.child('rockform');
		form.reset();
		form.setVal('mid', this.changedata.id);
	},
	_xiang:function(){
		mopenview('work',this.changedata.id);
		//var url = js.getajaxurl('$work','view','taskrun',{uid:adminid,id:this.changedata.id,jmbool:true});
		//js.open(url, 800);
	}
};

return {
	panel:panel,
	init:function(){
		grid = rock[index];
	}
};