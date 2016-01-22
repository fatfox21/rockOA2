var grid,form,
	atype = params.atype;

function showprogress(){
	var o = $("div[id^='progress_"+rand+"_']");
	
	for(var i=0; i<o.length; i++){
		var v = $(o[i]).attr('val');
		var bil = parseFloat(v)/100;
		Ext.create('Ext.ProgressBar', {
			renderTo: o[i],
			width: '100%',
			text:''+v+'%',
			value:bil
		});
	}
}

var panelss = {
	xtype:'rockgrid',tablename:'projectm',celleditbool:false,searchtools:true,region:'center',
	itemId:'listm',url:publicstore(mode,dir),paramsbase:{atype:atype},defaultorder:'startdt desc',
	storeafteraction:'getlist',storebeforeaction:'getlistwhere',
	columnssou:[{dataIndex:'title',text:'项目名称'},{dataIndex:'typename',text:'项目类别'},{dataIndex:'fuze',text:'负责人'},{dataIndex:'runuser',text:'执行人'}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'项目信息',dataIndex:'title',align:'left',width:'30%',renderer:function(v,m,re){
			var a = re.raw;
			var s = '<div style="line-height:22px">';
			s+='<span class="hui">类别：</span>'+a.typename+'<br>';
			s+='<span class="hui">名称：</span>'+a.title+'<br>';
			s+='<span class="hui">负责人：</span>'+a.fuze+'<br>';
			s+='<span class="hui">执行人：</span>'+a.runuser+'<br>';
			s+='<span class="hui">开始时间：</span>'+a.startdt+'<br>';
			if(!isempt(a.enddt))s+='<span class="hui">预计结束时间：</span>'+a.enddt+'<br>';
			s+='</div>';
			return s;
		}
	},{
		text:'项目进度',dataIndex:'progress',align:'left',width:'40%',renderer:function(v,m,re){
			var a = re.raw,
				ed = a.edays, s1='，已执行:'+a.days+'天';
				
			if(ed != 'a' && a.state =='执行中'){
				if(ed>0){
					s1+='，还有'+ed+'天';
				}else if(ed==0){
					s1+='，今日需完成';
				}else{
					s1+='，<font color=red>已超期'+(0-ed)+'天</font>';
				}
			}	
			if(a.state=='已完成')s1='，<font color=green>'+a.state+'</font>';
			if(a.state=='已取消')s1='，<font color=#aaaaaa>'+a.state+'</font>';
			
			var s = '<div style="line-height:22px">';
			s+='<div align="left" id="progress_'+rand+'_'+re.get('id')+'" val="'+v+'"></div>';
			s+='<div>项目进度:'+v+'%'+s1+'</div>';
			if(a.stri != '')s+='<div><b>项目进度信息：</b>'+a.stri+'</div>';
			s+='</div>';
			return s;
		}
	},{
		text:'备注说明',dataIndex:'remark',flex:1,align:'left'
	},{
		text:'状态',dataIndex:'state',width:80,search:true
	}],
	tbar:['->',{
		text:'当前跟进项目',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(0);}
	},'-',{
		text:'已完成项目',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(1);}
	},'-',{
		text:'已超期项目',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(2);}
	},'-',{
		text:'待执行项目',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(3);}
	},'->',{
		text:'新增进度',icon:gicons('application_form_edit'),hidden:(atype!='bg'),disabled:true,itemId:'jindu',handler:function(){
			grid._addjindula();
		}
	},(atype=='bg')?'-':'',{
		text:'详情',icon:gicons('page_white_text'),disabled:true,itemId:'xiang',handler:function(){
			grid._xiang();
		}
	}],
	load:function(){
		showprogress();
	},
	click:function(){
		this.down('#xiang').setDisabled(false);
		this.down('#jindu').setDisabled(false);
	},
	dblclick:function(){
		grid._xiang();
	},
	beforeload:function(){
		this.down('#xiang').setDisabled(true);
		this.down('#jindu').setDisabled(true);
	},
	_qiehuanzt:function(oi){
		if(this.loadbool)return;
		this.setparams({protype:oi}, true);
	},
	_xiang:function(){
		var url = js.getajaxurl('$project','view','taskrun',{uid:adminid,id:this.changedata.id,jmbool:true});
		js.open(url, 800);
	},
	_addjindula:function(){
		var me = this;
		if(!me.changedata.id)return;
		if(!me._aawin){
			var cans = winopt({title:'新增进度',width:400,icon:gicons('application_form_edit'),items:{
				border:false,labelWidth:90,aftersaveaction:'addjdaftersave',url:publicsave(mode,dir),
				tablename:'projects',submittext:'确定',
				xtype:'rockform',autoScroll:false,cancelbool:true,
				submitfields:'progress,state,progress,explain,mid',
				params:{int_filestype:'progress',otherfields:'optdt={now},optname={admin},optid={adminid}'},
				items:[{
					fieldLabel:'id号',value:'0',name:'idPost',hidden:true
				},{
					name:'midPost',hidden:true
				},{
					fieldLabel:''+bitian+'状态',name:'statePost',allowBlank: false,xtype:'optioncombo',optionmnum:'projectstate',change:function(a){
						var bili=100;
						if(a.value!='已完成'){
							bili = me.changedata.progress;
						}
						form.setVal('progress',bili);
						$('#jindul_'+rand+'').html(''+bili);
					}
				},{
					fieldLabel:'进度(<span id="jindul_'+rand+'">0</span>%)',name:'progressPost',xtype:'sliderfield',minValue: 0,maxValue: 100,listeners:{
						drag:function(o){
							$('#jindul_'+rand+'').html(''+o.getValue());
						}
					}
				},{
					fieldLabel:'备注说明',name:'explainPost',xtype:'textareafield',height:60
				},uploadwindows.fields()],
				success:function(){
					me._aawin.close();
					me.storereload();
				}
			}});
			me._aawin = Ext.create('Ext.Window',cans);
			me.destroypanel.push(me._aawin);
		}
		me._aawin.show();
		form = me._aawin.child('rockform');
		form.reset();
		form.setVal('mid', me.changedata.id);
		form.setVal('progress', me.changedata.progress);
		form.setVal('state', me.changedata.state);
		$('#jindul_'+rand+'').html(''+me.changedata.progress);
	}
};

var panel = panelss;

return {
	panel:panel,
	init:function(){
		grid = objpanel.down('#listm');
	}
};