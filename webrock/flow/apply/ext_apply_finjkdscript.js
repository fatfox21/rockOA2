js.imports('js/rmb.js');
var grids,form;
var frompanel={
	submitfields:'money,moneycn,explain,applydt,fullname,paytype,cardid,openbank,purpose',labelWidth:100,
	params:{otherfields:'type=2'},
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'申请人',xtype:'displayfield',value:adminname,name:'namePost',width:'49%'
		},{
			fieldLabel:'申请人部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost',width:'49%'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'申请日期',name:'applydtPost',width:'49%',value:js.now(),readOnly:true
		},{
			fieldLabel:'借款用途',name:'purposePost',width:'50%',allowBlank: false
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'收款人全称',name:'fullnamePost',width:'49%',allowBlank: false
		},{
			fieldLabel:'付款方式',name:'paytypePost',width:'50%',allowBlank: false,xtype:'optioncombo',optionmnum:'finpaytype'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'收款帐号',name:'cardidPost',width:'49%',allowBlank: false
		},{
			fieldLabel:'开户行',name:'openbankPost',width:'50%',allowBlank: false
		}]
	},{
		fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60,allowBlank: false
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'借款金额',name:'moneyPost',allowBlank: false,width:'49%',xtype:'numberfield',value:0,minValue:0,listeners:{change:function(){form.changsemoneh()}}
		},{
			fieldLabel:'借款金额大写',name:'moneycnPost',allowBlank: false,width:'49%',readOnly:true
		}]
	},uploadwindows.fields()],
	submitcheck:function(o){
		var s = '';
		this.changsemoneh();
		if(parseFloat(o.getVal('money'))<=0){
			s='借款金额不能为0';
		}
		return s;
	},
	changsemoneh:function(){
		var mon1 = form.getVal('money');
		this.setVal('moneycn', AmountInWords(mon1));
	}
};

if(params.mid==0){
	$.get(js.getajaxurl('getlast','finsave','finasys'),function(da){
		if(da){
			var d = js.decode(da);
			if(!isempt(d.paytype))form.setVal('paytype', d.paytype);
			if(!isempt(d.cardid))form.setVal('cardid', d.cardid);
			if(!isempt(d.openbank))form.setVal('openbank', d.openbank);
			if(!isempt(d.fullname))form.setVal('fullname', d.fullname);
		}
	});
}

var panelss = {
	xtype:'rockflowform',
	formparams:frompanel,
	formwidth:700,
	opttype:params.opttype,
	tablename:params.tablename,
	flownum:params.flownum,
	mid:params.mid,
	gridid:params.gridid,
	showdata:function(fo, da, o){
		fo.setVal('name', da.user.name);
		fo.setVal('deptname', da.user.deptname);
	}
}

return {
	panel:panelss,
	init:function(obj){
		grids = obj.down('rockgrid');
		form  = obj.down('rockform');
	}
};