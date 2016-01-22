var form,mid;
mid = params.id;
if(isempt(mid))mid = 0;

function boackindie(){
	if(mid!=0){
		var data = rock[params.index].changedata;
		form.adddata(data, 'id');
		form.setmsg('修改状态','blue');
		form.getField('fileid').loadfile('work', data.id);
		getcmp('plcont_'+rand+'').loadinfor(data.id);
	}
}

var panel= {
	width:700,
	xtype:'rockform',tablename:'work',editrecord:true,
	submitfields:'title,type,grade,distid,dist,explain,baoid,baoname,plcont,bgtime,wctime,wcsj,wclx,istx,status',border:false,
	params:{int_filestype:'wcsj,istx,status',otherfields:'optdt={now},optname={admin},optid={adminid},mid=0'},
	url:publicsave(mode,dir),
	_changesoe:function(){
		var val = form.getVal('wclx');
		if(val=='小时'){
			form.getField('wclx11').hide();
			form.getField('wctime').hide();
			form.setVal('wctime', '');
		}else{
			form.getField('wclx11').show();
			form.getField('wctime').show();
		}
	},
	items:[{
		fieldLabel:'id号',value:'0',name:'idPost',hidden:true
	},{
		fieldLabel:''+bitian+'标题',name:'titlePost',allowBlank: false
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:''+bitian+'任务类型',name:'typePost',allowBlank: false,width:'49%',xtype:'optioncombo',optionmnum:'worktype'
		},{
			fieldLabel:''+bitian+'任务等级',name:'gradePost',allowBlank: false,width:'50%',xtype:'optioncombo',optionmnum:'workgrade'
		}]
	},{
		name:'distidPost',id:'distid_'+rand+'',hidden:true
	},{
		fieldLabel:''+bitian+'分配给',nameidfields:'distid_'+rand+'',name:'distPost',xtype:'changedeptuser',changetitle:'选择人员',changetype:'usercheck',allowBlank: false
	},{
		fieldLabel:'任务说明',xtype:'textareafield',name:'explainPost',height:80
	},{
		value:'',name:'plidPost',hidden:true
	},{
		value:'',name:'plcontPost',xtype:'textareafield',hidden:true
	},{
		xtype:'rockrate',typebasebool:true,fieldLabel:''+bitian+'工作频率',id:'plcont_'+rand+'',tablename:'work',width:'99%',height:60
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'任务开始',name:'wcsjPost',allowBlank: false,value:0,width:150,xtype:'numberfield',minValue:0,listeners:{change:function(v){
				var val = v.value,
				val1	= form.getVal('wclx');
				if(isempt(val)||val<1){
					form.getField('wclx').hide();
					form.getField('wclx11').hide();
					form.getField('wctime').hide();
					form.getField('wclx12').hide();
				}else{
					form.getField('wclx').show();
					form.getField('wclx12').show();
					form._changesoe();
				}
			}}
		},{
			xtype:'combo',hidden:true,name:'wclxPost',value:'小时',hideLabel:true,store:js.arraystr('小时,天,工作日,周'),width:80,editable:false,listeners:{change:function(v){
				form._changesoe();
			}}	
		},{
			xtype:'displayfield',hidden:true,name:'wclx11Post',value:'&nbsp;后的&nbsp;',hideLabel:true
		},{
			xtype:'rockdate',hidden:true,name:'wctimePost',format:'H:i:00',hideLabel:true,width:100
		},{
			xtype:'displayfield',hidden:true,name:'wclx12Post',value:'&nbsp;内完成',hideLabel:true
		}]
	},{
		name:'baoidPost',id:'baoid_'+rand+'',hidden:true
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'每天的',xtype:'rockdate',name:'bgtimePost',format:'H:i:00',width:180
		},{
			xtype:'displayfield',value:'&nbsp;报告给&nbsp;',hideLabel:true
		},{
			labelHide:true,nameidfields:'baoid_'+rand+'',name:'baonamePost',width:300,xtype:'changedeptuser',changetitle:'选择报告对象',changetype:'usercheck'
		},{
			xtype:'displayfield',value:'&nbsp;直到完成',hideLabel:true
		}]
	},uploadwindows.fields(),{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'&nbsp;',name:'statusPost',xtype:'checkboxfield',boxLabel:'启用',inputValue:'1',checked:true,labelSeparator:''
		},{
			fieldLabel:'&nbsp;',name:'istxPost',xtype:'checkboxfield',boxLabel:'提醒',inputValue:'1',checked:true,labelSeparator:''
		}]
	}],
	submitcheck:function(o){
		var s='',s1='';
		var a = getcmp('plcont_'+rand+'').getresult();
		s=a[0];
		s1=a[1];
		if(s=='')return '没有添加工作频率';
		o.setVal('plid', s);
		o.setVal('plcont', s1);
		return '';
	},
	success:function(){
		if(params.index)rock[params.index].isreadload = true;
		closetabs(nowtab.num);
	}
};

return {
	panel:{
		xtype:'panel',border:false,
		layout: {
			type: 'hbox',
			align: 'stretch',
			pack: 'center'
		},
		items:panel
	},
	init:function(){
		form = rock[index].child('rockform');
		boackindie();
	}
};