var date = js.now(),grid,win,
	atype = params.atype;

var spanel 	= {
	xtype:'rockgrid',celleditbool:true,region:'north',url:publicstore(mode,dir),
	storeafteraction:'getlistwock',pageSize:0,height:250,split:true,minHeight:250,
	tablename:'work',searchtools:true,defaultorder:'optdt desc',storebeforeaction:'workbeforeact',
	defaultwhere:"[A][K]dt[D][F]"+date+"[F]",id:'grid_'+rand+'',paramsbase:{atype:atype},bbarbool:false,searchtools:false,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'标题',dataIndex:'title',search:true,autowidth:true
	},{
		text:'创建者',dataIndex:'optname',search:true,width:80
	},{
		text:'任务类型',dataIndex:'type',search:true,width:80
	},{
		text:'等级',dataIndex:'grade',search:true,width:60
	},{
		text:'分配给',dataIndex:'dist',search:true,autowidth:true
	},{
		text:'状态',dataIndex:'state',width:60,search:true
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
	bbar:[{
		xtype:'tbtext',text:'['+date+']的任务',id:'temsg_'+rand+''
	},{
		icon:gicons('reload'),text:'刷新',handler:function(){
			grid.storereload();
		}
	},(atype==1)?'':'-',{
		text:'任务报告',hidden:atype==1,icon:gicons('pencil'),disabled:true,itemId:'baog',handler:function(){
			grid._showwin();
		}
	},'-',{
		text:'详情',icon:gicons('page_white_text'),disabled:true,itemId:'xiang',handler:function(){
			grid._xiang();
		}
	},'双击可查看任务报告记录'],
	click:function(){
		if(!this.changedata.id)return;
		this.down('#baog').setDisabled(false);
		this.down('#xiang').setDisabled(false);
	},
	dblclick:function(){
		if(!this.changedata.id)return;
		getcmp('gridbg_'+rand+'').searchgoto("and mid='"+this.changedata.id+"'");
	},
	beforeload:function(){
		this.down('#baog').setDisabled(true);
		this.down('#xiang').setDisabled(true);
	},
	_showwin:function(){
		if(!win){
			var cans = winopt({title:'任务报告',width:350,items:{
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
		uploadwindows.resetdata(true);
	},
	_xiang:function(){
		var url = js.getajaxurl('$work','view','taskrun',{uid:adminid,id:this.changedata.id,jmbool:true});
		js.open(url, 800);
	}
};



var botm = {
	region:'center',split:true,xtype:'rockgrid',bbarbool:false,storeautoLoad:false,tablename:'workbg',
	id:'gridbg_'+rand+'',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'状态',dataIndex:'state',width:80
	},{
		text:'说明',dataIndex:'explain',flex:1
	},{
		text:'操作人',dataIndex:'optname',width:80
	},{
		text:'操作时间',dataIndex:'optdt',width:160
	}],
	title:'任务报告记录',headerPosition: 'right'
};

function changedt(dt){
	getcmp('temsg_'+rand+'').setText('['+dt+']的任务');
	grid.setparams({dt:dt,uid:adminid,atype:atype});
	grid.searchgoto("[A][K]dt[D][F]"+dt+"[F]");
}
var panel = [spanel,{
	region:'west',width:220,minWidth:220,maxWidth:220,split:true,xtype: 'datepicker',handler: function(picker, date) {
		var dt = Ext.Date.format(date, 'Y-m-d');
		changedt(dt);
	}
},botm];
return {
	panel:panel,
	init:function(){
		grid = getcmp('grid_'+rand+'');
	}
};