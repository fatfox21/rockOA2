js.imports('js/rmb.js');
var grids,form;
var frompanel={
	submitfields:'money,moneycn,explain,applydt,bills,fullname,paytype,cardid,openbank',labelWidth:100,url:publicsave('finsave','finasys'),aftersaveaction:'fybxsave',
	params:{otherfields:'type=0'},
	items:[{
		value:'0',name:'idPost',hidden:true
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'报销人',xtype:'displayfield',value:adminname,name:'namePost',width:'49%'
		},{
			fieldLabel:'报销部门',xtype:'displayfield',value:admindeptname,name:'deptnamePost',width:'49%'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'申请日期',name:'applydtPost',width:'49%',value:js.now(),readOnly:true
		},{
			fieldLabel:'附单据',name:'billsPost',width:'40%',xtype:'numberfield',value:0,allowBlank: false,minValue:0,maxValue:100
		},{
			xtype:'displayfield',value:'&nbsp;(张)',hideLabel:true
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
		xtype:'fieldset',title: '报销明细',collapsible: true,padding:5,
		items:{
			xtype:'rockgrid',height:200,tablename:'fininfos',storeautoLoad:false,bbarbool:false,celleditbool:true,celleditautosave:false,defaultorder:'`sort`',
			columns:[{
				xtype: 'rownumberer',
				width: 40
			},{
				text:'*所属项目',dataIndex:'items',width:150,editor:{xtype:'optioncombo',optionmnum:'finaitems'}
			},{
				text:'*发生日期',dataIndex:'startdt',width:120,defaultvalue:js.now(),editor:{xtype:'rockdate',format:'Y-m-d',editable:false}
			},{
				text:'*金额',dataIndex:'moneys',width:100,defaultvalue:'0',editor:{xtype:'numberfield',minValue:0}
			},{
				text:'说明',dataIndex:'explain',flex:1,editor:'textfield'
			}],
			bbar:[{
				text:'新增',icon:gicons('add'),id:'adds_'+rand+'',disabled:params.mid!=0,handler:function(){
					grids.insertData();
				}
			},'-',{
				text:'删除',icon:gicons('delete'),id:'dels_'+rand+'',disabled:params.mid!=0,handler:function(){
					grids.removeRows();
					form.changsemoneh();
				}
			},'双击单元格编辑','->',{
				text:'合计：0.00￥',xtype:'tbtext',id:'hetjila_'+rand+''
			}],
			celleditchange:function(f){
				form.changsemoneh();
			}
		}
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'报销金额',name:'moneyPost',allowBlank: false,width:'49%',readOnly:true
		},{
			fieldLabel:'报销金额大写',name:'moneycnPost',allowBlank: false,width:'49%',readOnly:true
		}]
	},{
		fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60
	},uploadwindows.fields()],
	submitcheck:function(o){
		var s = '';
		this.changsemoneh();
		if(parseFloat(o.getVal('money'))<=0){
			s='报销金额不能为0';
		}
		if(s=='')s = grids.getjsonData('params');
		return s;
	},
	changsemoneh:function(){
		var d = grids.getjsonData(),mon = 0,i;
		for(i=0;i<d.length;i++){
			if(!isempt(d[i].items) && !isempt(d[i].startdt)){
				mon = mon+parseFloat(d[i].moneys);
			}
		}
		var mon1 = js.float(mon);
		getcmp('hetjila_'+rand+'').setText('合计：'+mon1+'￥');
		this.setVal('money', mon1+'');
		this.setVal('moneycn', AmountInWords(mon));
	}
};

if(params.mid==0){
	$.get(js.getajaxurl('getlast','finsave','finasys'),function(da){
		if(da){
			var d = js.decode(da);
			form.setVal('paytype', d.paytype);
			form.setVal('cardid', d.cardid);
			form.setVal('openbank', d.openbank);
			form.setVal('fullname', d.fullname);
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
		grids.setkeyWhere("[A][K]mid[D]"+da.data.id+"",true);
		getcmp('hetjila_'+rand+'').setText('合计：'+da.data.money+'￥');
		if(o.isEdit()){
			getcmp('adds_'+rand+'').setDisabled(false);
			getcmp('dels_'+rand+'').setDisabled(false);
		}
	}
}

return {
	panel:panelss,
	init:function(obj){
		grids = obj.down('rockgrid');
		form  = obj.down('rockform');
	}
};