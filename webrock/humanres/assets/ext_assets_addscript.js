var form,mid;
mid = params.id;
if(isempt(mid))mid = 0;

function boackindie(){
	if(mid!=0){
		var data = getcmp(params.gridid).changedata;
		form.adddata(data, 'id');
		form.setmsg('修改状态','blue');
		form.getField('fileid').loadfile('assetm', data.id);
	}
}
var panel= {
	width:750,xtype:'rockform',
	submitfields:'title,typename,num,brand,remark,address,model,laiyuan,state,buydt,price',border:false,
	url:publicsave(mode, dir),beforesaveaction:'autopannum',editrecord:true,
	params:{int_filestype:'',otherfields:'optdt={now},optname={admin}',add_otherfields:'adddt={now}'},tablename:'assetm',
	items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true	
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'资产类别',name:'typenamePost',allowBlank: false,xtype:'optioncombo',optionmnum:'assetstype',width:'49%'
			},{
				fieldLabel:'编号',name:'numPost',width:'49%'
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'名称',name:'titlePost',allowBlank: false,width:'49%'
			},{
				fieldLabel:'品牌',name:'brandPost',width:'49%',xtype:'optioncombo',optionmnum:'assetsbrand',editable:true
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:'放置地点',name:'addressPost',width:'49%',xtype:'optioncombo',optionmnum:'assetsaddress',editable:true
			},{
				fieldLabel:'规格/型号',name:'modelPost',width:'49%'
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'资产来源',name:'laiyuanPost',width:'49%',xtype:'optioncombo',optionmnum:'assetslaiyuan',allowBlank: false
			},{
				fieldLabel:''+bitian+'状态',name:'statePost',width:'49%',xtype:'optioncombo',optionmnum:'assetsstate',allowBlank: false
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:'购进日期',name:'buydtPost',width:'49%',xtype:'datefield',format:'Y-m-d',editable:false
			},{
				fieldLabel:'价格',name:'pricePost',width:'49%',xtype:'numberfield',minValue:0
			}]
		},{
			fieldLabel:'备注说明',name:'remarkPost',xtype:'textareafield',height:100
		},
		uploadwindows.fields({allowBlank:false})
	],
	success:function(){
		getparent('assetslist','setReload', true);
		closetabsnow();
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