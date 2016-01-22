/**
	设置频率使用的
	create:Chenxihu
	createdt:2013-11-04 17:19:00
*/

var rockrateobject={};
Ext.define('Ext.rock.rate', {
	extend: 'Ext.form.field.Display',
    alias: 'widget.rockrate',
	onDestroy:function(){
		if(this.windowss)Ext.destroy(this.windowss);
		this.callParent();
	},
	ratetypestore:[],
	initComponent: function(){
		var me		= this;
		Ext.applyIf(this,{
			typebasebool:false,
			rand:js.getrand(),
			wintitle:me.fieldLabel,
			tablename:'task',
			height:80,
			ratetypestring:'仅一次,分钟,小时,天,工作日,休息日,周一,周二,周三,周四,周五,周六,周日,月,年',
			ratetypestrbase:'仅一次,天,工作日,周一,周二,周三,周四,周五,周六,周日,月,年'
		});
		rockrateobject[me.rand] = me;
		var s= '<div id="rockrateshow_'+me.rand+'" class="x-form-text" style="height:'+me.height+'px;overflow:auto;padding:0px"></div><div><a href="javascript:" class="blue" id="aclick_'+me.rand+'" onclick="return rockrateobject[\''+me.rand+'\'].setpinlvshow(this)"><img src="'+gicons('add')+'" width=16 height=16 align="absmiddle"> 添加</a>&nbsp; <font color="#aaaaaa">单击编辑</font></div>';
		me.value = s;
		me.ratetypestore = js.arraystr((me.typebasebool)?me.ratetypestrbase:me.ratetypestring);
		me.callParent();
	},
	setpinlvshow:function(){
		var me = this;
		if(!me.windowss){
			var cans = winopt({title: '设置'+me.wintitle+'',width:400,items:{
				id:'rateform_'+me.rand+'',border:false,bbarbool:false,submittext:'确定',tablename:'tasktime',
				submitfields:'atype,rateval,shijian,startdt,enddt,stime,etime',
				params:{int_filestype:'rateval',otherfields:'optdt={now}'},
				cancelbool:true,
				xtype:'rockform',items:[{
					fieldLabel:'id号',value:'0',name:'idPost',hidden:true	
				},{
					fieldLabel:'开始时间',name:'startdtPost',xtype:'rockdate',editable:false,format:'datetime',clearbool:true,hidden:true,onpicked:function(){me.showchane()}
				},{
					xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
						fieldLabel:''+bitian+'重复类型',name:'atypePost',value:'仅一次',xtype:'combo',store:me.ratetypestore,editable:false,width:180,listeners:{change:function(){me.changeaatype()}}
					},{
						xtype: 'fieldcontainer',id:'atypevalss_'+me.rand+'',padding:0,margin:0,hidden:true,layout:'hbox',items:[{
							xtype:'displayfield',value:'<div align="right">每&nbsp;</div>',width:50,padding:0
						},{
							xtype:'numberfield',minValue:1,value:1,width:50,editable:true,name:'ratevalPost',padding:0
						},{
							xtype:'displayfield',value:'小时',width:60,name:'atypevalPost'
						}]
					}]
				},{
					xtype: 'fieldcontainer',hidden:true,id:'meitian_'+me.rand+'',defaultType: 'textfield',layout:'hbox',items:[{
						fieldLabel:'每天运行从',name:'stimePost',xtype:'rockdate',format:'H:i',editable:false,width:190,onpicked:function(){me.showchane()},clearbool:true
					},{
						fieldLabel:'至',name:'etimePost',xtype:'rockdate',format:'H:i',editable:false,width:130,labelWidth:20,onpicked:function(){me.showchane()},clearbool:true
					}]
				},{
					fieldLabel:''+bitian+'时间',name:'shijianPost',id:'shijian_'+me.rand+'',xtype:'trigger',editable:false,triggerCls:'x-form-date-trigger',onTriggerClick:function(){me.changedt()}
				},{
					fieldLabel:'截止时间',name:'enddtPost',xtype:'rockdate',editable:false,format:'datetime',clearbool:true,hidden:true,onpicked:function(){me.showchane()}
				},{
					fieldLabel:'备注',name:'showfields',xtype:'displayfield',id:'showfields'+me.rand+''
				}],
				success:function(da,obc){
					var ss = getcmp('showfields'+me.rand+'').getValue();
					me.addneris(ss, da.id);
					me._savesuccess(da.id);
					me.windowss.hide();
					obc.setmsg('');
				},
				submitcheck:function(){
					var v = me.winform.field('atypePost').getValue();
					var d = me.winform.field('shijianPost').getValue();
					if(isempt(v))return'没有重复选择类型';
					if(isempt(d))return'请选择时间';
					me.showchane();
					return '';
				}
			}});
			me.windowss = Ext.create('Ext.Window',cans);
		}
		me.windowss.show();
		me.winform = getcmp('rateform_'+me.rand+'');
		me.winform.reset();
		me.winform.setmsg('新增状态','blue');
		return false;
	},
	changeaatype:function(){
		var v = this.winform.field('atypePost').getValue(),
			o = [];
		o[0] = getcmp('meitian_'+this.rand+'');	
		o[1] = getcmp('atypevalss_'+this.rand+'');	
		if(v=='仅一次'){
			o[1].hide();
			this.winform.field('startdtPost').hide();
			this.winform.field('enddtPost').hide();
		}else{
			o[1].show();
			this.winform.field('startdtPost').show();
			this.winform.field('enddtPost').show();
		}
		this.winform.setVal('atypeval', v);
		this.winform.setVal('shijian','');
		if(v=='小时'||v=='分钟'){
			o[0].show();
		}else{
			o[0].hide();
			this.winform.setVal('stime','');
			this.winform.setVal('etime','');
		}
		this.showchane();
	},
	showchane:function(cad){
		var me = this,v,st,et,sj,sv,vs,ve;
		if(!cad){
			v  = me.winform.getVal('atype');
			st = me.winform.getVal('startdt');
			et = me.winform.getVal('enddt');
			sj = me.winform.getVal('shijian');
			sv = me.winform.getVal('rateval');
			vs = me.winform.getVal('stime');
			ve = me.winform.getVal('etime');
		}
		if(cad){
			v = cad.atype,
			st = cad.startdt,
			et = cad.enddt,
			sj = cad.shijian,
			sv = cad.rateval;
			vs = cad.stime;
			ve = cad.etime;
		}
		var s = '',s1='';
		if(v=='仅一次'){
			s = v+' '+sj+'';
		}else{
			if(me.winform){
			if(v=='工作日'||v=='休息日'){
				me.winform.field('ratevalPost').hide();
				sv=1;
			}else{
				me.winform.field('ratevalPost').show();
			}}
			s = '';
			if(!isempt(st))s+='从'+st+'开始 ';
			s+= '每';
			if(sv>1)s+=sv;
			s+= v;
			s+= '的'+sj+'';
			if(!isempt(vs))s1=' 每天从'+vs+'开始';
			if(!isempt(ve))s1+='至'+ve+'结束';
			s+=s1;
			if(!isempt(et))s+=' 在'+et+'截止';
		}
		if(!cad)getcmp('showfields'+me.rand+'').setValue(s);
		return s;
	},
	changedt:function(){
		var me= this;
		var v = this.winform.field('atypePost').getValue();
		var lx='yyyy-MM-dd HH:mm:ss';
		if(v=='小时')lx='mm分ss秒';
		if(v=='天' || v=='工作日' || v=='休息日' || v.indexOf('周')==0)lx='HH时mm分ss秒';
		if(v=='月')lx='dd日 HH时mm分ss秒';
		if(v=='年')lx='MM月dd日 HH时mm分ss秒';
		if(v=='分钟')lx='ss秒';
		var da = {el:'shijian_'+this.rand+'-inputEl'};
		da.dateFmt = lx;
		da.onpicked= function(){
			me.showchane();
		};
		WdatePicker(da);
	},
	addneris:function(ss ,ids){
		var me= this;
		var o = $('#rockrateshow_'+this.rand+''),assid='itemsa_a'+this.rand+'_'+ids+'',
		s = '<div id="'+assid+'" tempid="'+ids+'" onmouseover="this.style.backgroundColor=\'#f1f1f1\'" onmouseout="this.style.backgroundColor=\'\'" style="padding:6px 5px;border-bottom:1px #eeeeee solid"><a>1</a>、<span>'+ss+'</span><font style="display:none">'+ids+'</font></div>';
		$('#'+assid+'').remove();
		o.append(s);
		this.resetsizeloxu();
		$('#'+assid+'').click(function(event){
			me.clickitemss(event, this);
		});
	},
	clickitemss:function(e, od){
		var me = this;
		this.clickdivo = od;
		if(!this.optnumabc){
			this.optnumabc=Ext.create('Ext.menu.Menu',{
				items:[{
					text:'修改',handler:function(){me.edititems()},icon:gicons('edit')
				},'-',{
					text:'删除',handler:function(){me.delitems()},icon:gicons('delete')
				}]
			});
		}
		this.optnumabc.showAt([e.clientX,e.clientY]);
	},
	delitems:function(){
		$(this.clickdivo).remove();
		this.resetsizeloxu();
	},
	_savesuccess:function(sid){
		this.loadinforarr[sid]=this.winform.getValuess();
	},
	edititems:function(){
		var ssid = $(this.clickdivo).attr('tempid');
		var data = this.loadinforarr[ssid];
		this.setpinlvshow();
		this.winform.adddata(data);
		this.winform.setVal('id', ssid);
		this.winform.setmsg('修改状态','blue');
		this.showchane();
	},
	resetsizeloxu:function(){
		var o = $('#rockrateshow_'+this.rand+'').find('a');
		for(var i=0;i<o.length;i++)o[i].innerHTML=(''+(i+1)+'');
	},
	loadinforarr:{},
	reset:function(){
		$('#rockrateshow_'+this.rand+'').html('');
		if(!this.winform)return;
		this.winform.reset();
		this.winform.setmsg('');
	},
	loadinfor:function(ids){
		var me = this,
			ho = $('#rockrateshow_'+me.rand+'');
		ho.html(js.getmsg('加载中...', '#555555'));
		me.loadinforarr= {};
		if(ids=='0'){
			ho.html('');
			return;
		}
		$.get(js.getajaxurl('gettaketime','task','system',{mid:ids,table:me.tablename}),function(da){
			ho.html('');
			var a = js.decode(da),ss;
			for(var i=0;i<a.length;i++){
				me.loadinforarr[a[i].id]=a[i];
				ss = me.showchane(a[i]);
				me.addneris(ss, a[i].id);
			}
		});
	},
	getresult:function(){
		var o = $('#rockrateshow_'+this.rand+'').find('font'),
		o1 = $('#rockrateshow_'+this.rand+'').find('span');
		var s = '',i,s1='';
		for(i=0;i<o.length;i++){
			s+=','+o[i].innerHTML+'';
			s1+=''+o1[i].innerHTML+'\n';
		}
		if(s!='')s=s.substr(1);
		return [s,s1];
	}
});