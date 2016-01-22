var form,mid;
mid = params.id;
if(isempt(mid))mid = 0;

function boackindie(){
	if(mid!=0){
		var data = getcmp(params.gridid).changedata;
		form.adddata(data, 'id');
		form.setmsg('修改状态','blue');
		form.getField('fileid').loadfile('carm', data.id);
	}
}
var panel= {
	width:650,xtype:'rockform',
	submitfields:'carnum,carbrand,carmode,cartype,buydt,buyprice,enginenb,ispublic,state,framenum',border:false,
	url:publicsave(mode, dir),
	params:{int_filestype:'ispublic',otherfields:'optdt={now},optname={admin},optid={adminid}',add_otherfields:'adddt={now},addname={admin}'},tablename:'carm',
	items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true	
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'车牌号',name:'carnumPost',allowBlank: false,width:'49%'
			},{
				fieldLabel:''+bitian+'车辆类型',name:'cartypePost',allowBlank: false,width:'49%',xtype:'optioncombo',optionmnum:'cartype',editable:true
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'车辆品牌',name:'carbrandPost',allowBlank: false,width:'49%',xtype:'optioncombo',optionmnum:'carbrand',editable:true
			},{
				fieldLabel:''+bitian+'型号',name:'carmodePost',allowBlank: false,width:'49%'
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'购买日期',name:'buydtPost',width:'49%',xtype:'datefield',format:'Y-m-d',allowBlank: false,editable:false
			},{
				fieldLabel:''+bitian+'购买价格',name:'buypricePost',width:'49%',xtype:'numberfield'
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:'车架号',name:'framenumPost',width:'49%'
			},{
				fieldLabel:'发动机号',name:'enginenbPost',width:'49%'
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'车辆状态',name:'statePost',allowBlank: false,width:'49%',xtype:'optioncombo',optionmnum:'carstate'
			},{
				fieldLabel:'&nbsp;',name:'ispublicPost',xtype:'checkboxfield',boxLabel:'公开使用(员工可预定)',inputValue:'1',checked:true,labelSeparator:''
			}]
		},{
			fieldLabel:'备注说明',name:'explainPost',xtype:'textareafield',height:60
		},
		uploadwindows.fields({allowBlank:false})
	],
	success:function(){
		if(params.gridid){
			if(getcmp(params.gridid))getcmp(params.gridid).isreadload = true;
			closetabs(nowtab.num);
		}
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