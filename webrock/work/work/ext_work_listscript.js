var date = js.now(),grid,win,
	atype = params.atype,keywhere;
	
keywhere 	= "op0on0lj0hgn0nj0nh0kp0hhi0pg0mo0li0hhp0nj0nh0ng0hhn0pg0mn0mm0hhi0po0hhg0no0ko0pp0hgl0hgk0hgm0po0lg0lj0hgm0op0oo0oh0hhh0nk0hih0hhp0hhg0nm0mn0mm0hgn0pn0oo0no0ko0pn0on0oh0hhl0nj0mn0pp0hhl0nk0hih0hgn0hhl0nj0mn0pp0hhl0on0lg0ng0hgn0po0on0hgo0hhn0pn0on0oi0hgg0nm0mn0pp0hhi0og0hgm0ml0lo06";
if(atype == 1){//报告查看
	keywhere = "uv0ut0rp0nmt0tp0tn0qv0nno0vm0su0ro0nnv0tp0tn0tm0nnt0vm0st0ss0nno0vu0nnm0tu0qu0vv0nmr0nmq0nms0vu0rm0rp0nms0uv0uu0un0nnn0tq0non0nnv0nnm0ts0st0ss0nmr0uv0ut0rt0nno0vm0st0nnv0nmp0tq0non0nnv0nnm0tr0up0nnv0nmp0tq0non0nom0vu0uv0ut0uo0nns0vt0ut0rp0nno0vm0tm0qu0nnr0tq0non0nmt0pp0tt0sr0ru0ru012";
}

var spanel 	= {
	xtype:'rockgrid',celleditbool:true,region:'north',url:publicstore(mode,dir),
	storeafteraction:'getlistwock',pageSize:0,height:250,split:true,minHeight:250,
	tablename:'work',searchtools:true,defaultorder:'optdt desc',
	defaultwhere:"[A][K]dt[D][F]"+date+"[F]",id:'grid_'+rand+'',
	keywhere:keywhere,bbarbool:false,searchtools:false,
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
			if(!isempt(v)&&!isempt(b.raw.bgtime)){
				s = '每天'+b.raw.bgtime+'的报告给'+v+'';
			}
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