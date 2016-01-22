var form,ostime,oetime;
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
	},
	ctime:function(){
		var a  = form.getValuess();
		var st = a.stime,
			et = a.etime;
		if(isempt(st)||isempt(et)){
			form.setVal('totals',0);
			return;
		}
		if(st.substr(0,7)!=et.substr(0,7)){
			form.setmsg('不允许跨月申请');
			return;
		}	
		$.post(js.getajaxurl('total','leave','person'),{stime:st,etime:et}, function(da){
			var a= js.decode(da);
			form.setVal('totals',a[0]);
			form.setmsg(a[1],'red');
		});
	}
}

var frompanel={
	submitfields:'totals,type,xjall,stime,etime,totals,explain,mid,mseric',
	params:{int_filestype:'totals,type,xjall,mid'},autoScroll:false,beforesaveaction:'sickbeforeaction',
	url:js.getajaxurl('publicsave','leave','person'),labelWidth:100,
	_floarr:[false,false],
	_changetype:function(val){
		if(val=='')return;
		getcmp('totals'+rand+'').setVisible(val==0);
		var o1 = getcmp('xiaojila'+rand+'');
		o1.setValue('');
		form.setVal('mseric','');
		if(this._floarr[val]){
			o1.getStore().loadData(this._floarr[val]);
			return;
		}
		var url = js.getajaxurl('changetypesick','leave','person');
		js.ajax(url,{type:val},function(str){
			var a = js.decode(str);
			frompanel._floarr[val]=a;
			o1.getStore().loadData(a);
		});
	},
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'单据类型',name:'typePost',editable:false,allowBlank: false,value:'',xtype:'combo',store:[['','-请选择-'],['0','请假条'],['1','外出出差单']],width:'49%',listeners:{
				change:function(o1){
					frompanel._changetype(o1.value);
				}
			}
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'销假单据',name:'midPost',value:'',xtype:'combo',allowBlank: false,width:'49%',id:'xiaojila'+rand+'',store:[['','']],editable:false,listeners:{
				change:function(o1){
					var a1=o1.store.data.items[0].raw;
					ostime = a1[2];
					oetime = a1[3];
					form.setVal('mseric',a1[1]);
					form.setVal('stime',a1[2]);
					form.setVal('etime',a1[3]);
					form.setVal('totals',a1[4]);
					form.getField('stime').setMinValue(a1[2]);
					form.getField('etime').setMinValue(a1[2]);
				}
			}
		},{
			name:'msericPost',hidden:true
		},{
			fieldLabel:'销假全时段',name:'xjallPost',value:'0',xtype:'combo',store:[['0','否'],['1','是']],width:'50%',editable:false
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'实际开始时间',name:'stimePost',allowBlank: false,xtype:'datetimefield',editable:false,onpicked:function(){c.ctime()},width:'49%'
		},{
			fieldLabel:'实际截止时间',name:'etimePost',allowBlank: false,xtype:'datetimefield',editable:false,onpicked:function(){c.ctime()},width:'50%'
		}]
	},{
		xtype: 'fieldcontainer',id:'totals'+rand+'',hidden:true,defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'最后请假(时)',name:'totalsPost',xtype:'numberfield',minValue:0,value:'0',width:'70%',validator:function(v){
				$('#tisnshuto_'+rand+'').html('&nbsp;'+c.tal(v)+'');
				return (v>0)?true:'请假时间至少要1个小时';
			}
		},{
			xtype:'label',html:'<div style="padding-top:3px;font-size:12px" id="tisnshuto_'+rand+'">&nbsp;0天0小时</div>'
		}]
	},{
		fieldLabel:'说明',name:'explainPost',allowBlank: false,xtype:'textareafield',height:100
	}],
	submitcheck:function(o){
		var a  = o.getValuess();
		var st = a.stime,
			et = a.etime;
		if(ostime==st && oetime==et && a.id=='0')return '没有改变任何时间，不用申请';	
		if(st.substr(0,7)!=et.substr(0,7))return '不允许跨月申请';
		if(st>=et)return '开始时间不能大于截止时间';
		return '';
	}
};

var panelss = {
	xtype:'rockflowform',
	formparams:frompanel,
	formwidth:600,
	opttype:params.opttype,
	tablename:params.tablename,
	flownum:params.flownum,
	mid:params.mid,
	gridid:params.gridid,
	showdata:function(fo, da){
	}
}

return {
	panel:panelss,
	
	init:function(){
		form = rock[index].getForm();
	}
};