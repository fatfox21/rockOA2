var cal;
var month,year,enddt;

function readlist(){
	getcmp('msg_'+rand+'').setText(js.getmsg('读取中...'));
	var url = js.getajaxurl('getmontlist', mode, dir, {enddt:enddt,uid:adminid,startdt:''+year+'-'+month+'-01'});
	$.get(url, function(da){
		getcmp('msg_'+rand+'').setText('');
		getnrshow(js.decode(da));
	});
}
function getnrshow(a){
	var i,o1,s,s1='';
	for(i in a){
		o1 = $('#day_'+rand+'_'+i+'');
		s  = '';
		o1.html(a[i].str);
	}
}

var panel={
	xtype:'calendarpanel',textvalign:'top',
	renderer:function(tad, ars, y, m){
		var s= '<div style="line-height:20px;text-align:left">&nbsp;'+ars.d+' <span style="font-size:11px;color:'+ars.color+'">'+ars.jieri+'</span> </div>';
		s+='<div style="font-size:12px;padding:0px 3px;" align="left" id="day_'+rand+'_'+ars.d+'"></div>';
		enddt = ''+y+'-'+m+'-'+xy10(ars.d)+'';
		return s;
	},
	bbar:[{
		text:'新增日程',icon:gicons('add'),handler:function(){
			cal._add();
		}
	},'-',{
		text:'日程管理',icon:gicons('calendar_edit'),handler:function(){
			addtabs('日程管理',''+dir+','+mode+',guan', 'scheduleguan',{icon:gicons('calendar_edit')});
		}
	},'-',{
		text:'刷新',icon:gicons('reload'),handler:function(){readlist()}
	},{
		xtype:'tbtext',id:'msg_'+rand+''
	}],
	changemonth:function(o,y,m){
		month = m;
		year  = y;
		//getcmp('month_'+rand+'').setValue(''+y+'-'+m+'');
		readlist();
	},
	_add:function(){
		var a = this._window();
		a.reset();
	},
	_window:function(){
		var me = this;
		var lx	= 0;
		if(!me._win){
			Ext.apply(me._formparams, me.formparams);
			var cans = winopt({title:'新增日程',width:500,items:{
				border:false,tablename:'schedule',url:publicsave(mode, dir),
				xtype:'rockform',cancelbool:true,
				submitfields:'title,mid,startdt,enddt,ratecont,explain',
				params:{int_filestype:'mid',otherfields:'optdt={now},optname={admin},uid={adminid}'},
				items:[{
					fieldLabel:'id号',value:'0',name:'idPost',hidden:true
				},{
					fieldLabel:''+bitian+'标题',name:'titlePost',allowBlank: false
				},{
					name:'plidPost',hidden:true
				},{
					name:'ratecontPost',hidden:true,xtype:'textareafield'
				},{
					xtype: 'fieldcontainer',id:'shijian_'+rand+'',defaultType: 'textfield',layout:'hbox',items:[{
						fieldLabel:'时间从',name:'startdtPost',xtype:'datetimefield',value:new Date(),width:250,allowBlank: false
					},{
						xtype:'displayfield',value:'<div align="center">至</div>',width:30,hideLabel:true
					},{
						name:'enddtPost',xtype:'datetimefield',hideLabel:true,width:160
					}]
				},{
					fieldLabel:'说明',name:'explainPost',height:60,xtype:'textareafield'
				}],
				success:function(){
					js.msg('success','保存成功');
					readlist();
					me._win.close();
				}
			}});
			me._win = Ext.create('Ext.Window',cans);
			lx = 1;
		}
		me._win.show();
		if(lx==1){
			me._form = me._win.down('form');
		}
		return me._form;
	}
};
return {
	panel:panel,
	init:function(){
		cal = objpanel.down('calendarpanel');
		cal.on({
			destroy:function(){
				if(this._win)Ext.destroy(this._win);
			}
		});
	}
};