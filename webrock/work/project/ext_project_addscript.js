var form,mid;
mid = params.id;
if(isempt(mid))mid = 0;

function boackindie(){
	if(mid!=0){
		var data = getcmp(params.gridid).changedata;
		form.adddata(data, 'id');
		form.setmsg('修改状态','blue');
		form.getField('fileid').loadfile('projectm', data.id);
		$('#jindul_'+rand+'').html(''+data.progress);
	}
}
var panel= {
	width:750,xtype:'rockform',editrecord:true,
	submitfields:'title,typename,state,startdt,enddt,fuze,fuzeid,runuser,runuserid,progress,viewuser,viewuserid,remark',border:false,
	params:{int_filestype:'progress',otherfields:'optdt={now},optname={admin},optid={adminid}',add_otherfields:'adddt={now}'},tablename:'projectm',labelWidth:100,
	editjudgewhere:"id={id} and `state`!='已完成'",
	items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true	
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'项目类别',name:'typenamePost',allowBlank: false,xtype:'optioncombo',optionmnum:'projecttype',width:'49%'
			},{
				fieldLabel:''+bitian+'项目状态',name:'statePost',allowBlank: false,xtype:'optioncombo',optionmnum:'projectstate',width:'49%'
			}]
		},{
			fieldLabel:''+bitian+'名称',name:'titlePost',allowBlank: false
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'开始时间',name:'startdtPost',allowBlank: false,xtype:'datetimefield',width:'49%'
			},{
				fieldLabel:'预计结束时间',name:'enddtPost',xtype:'datetimefield',width:'49%'
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'负责人',name:'fuzePost',nameidfields:'fuzeid_'+rand+'',allowBlank: false,width:'49%',xtype:'changedeptuser',changetitle:'选择项目负责人',changetype:'usercheck'
			},{
				name:'fuzeidPost',id:'fuzeid_'+rand+'',hidden:true
			},{
				name:'runuseridPost',id:'runuserid_'+rand+'',hidden:true
			},{
				fieldLabel:''+bitian+'执行人员',name:'runuserPost',nameidfields:'runuserid_'+rand+'',allowBlank: false,width:'49%',width:'49%',xtype:'changedeptuser',changetitle:'选择项目执行人员',changetype:'deptusercheck'
			}]
		},{
			xtype: 'fieldcontainer',defaultType:'textfield',layout:'hbox',items:[{
				fieldLabel:''+bitian+'进度(<span id="jindul_'+rand+'">0</span>%)',name:'progressPost',width:'49%',xtype:'sliderfield',minValue: 0,maxValue: 100,listeners:{
					drag:function(o){
						$('#jindul_'+rand+'').html(''+o.getValue());
					}
				}
			},{
				fieldLabel:'授权查看',name:'viewuserPost',nameidfields:'viewuserid_'+rand+'',width:'49%',xtype:'changedeptuser',changetitle:'选择授权查看人员',changetype:'deptusercheck'
			},{
				name:'viewuseridPost',id:'viewuserid_'+rand+'',hidden:true
			}]
		},{
			fieldLabel:'备注说明',name:'remarkPost',xtype:'textareafield',height:100
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