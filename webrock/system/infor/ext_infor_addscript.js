var form,mid,atype=params.atype;
mid = params.id;
if(isempt(mid))mid = 0;
if(!atype)atype=0;
if(atype!=0)atype=admindeptid;

function boackindie(){
	if(mid!=0){
		var data = rock[params.index][1].changedata;
		form.adddata(data, 'id');
		form.setmsg('修改状态','blue');
		form.getField('fileid').loadfile('infor', data.id);
	}else{
		if(atype>0){
			form.setVal('faobjid','d'+admindeptid+'');
			form.setVal('faobjname',admindeptname);
		}	
	}
}

var typenum = 'infortype';
if(atype!=0)typenum = 'infortype_dept_'+admindeptnum+'';

var panel= {
	width:750,xtype:'rockform',
	submitfields:'title,typename,xu,isshow,content,zuozhe,indate,faobjid,faobjname',border:false,
	params:{int_filestype:'xu,isshow,atype',otherfields:'optdt={now},optname={admin},optid={adminid},atype='+atype+''},tablename:'infor',
	url:publicsave(mode,dir),aftersaveaction:'reimsendinfor',
	items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true	
		},{
			xtype: 'fieldcontainer',layout:'hbox',items:[{
				fieldLabel:''+bitian+'信息类型',name:'typenamePost',allowBlank: false,xtype:'optioncombo',optionmnum:typenum,width:'49%',editable:true
			},{
				name:'faobjidPost',id:'faobjid_'+rand+'',xtype:'textfield',hidden:true
			},{
				fieldLabel:'发布给',nameidfields:'faobjid_'+rand+'',name:'faobjnamePost',xtype:'changedeptuser',changetitle:'选择接收对象',changetype:'deptusercheckall',width:'38%'
			},{
				hideLabel:true,name:'isreimPost',xtype:'checkboxfield',boxLabel:'REIM推送',width:'12%',inputValue:'1',labelSeparator:'',margin:'0 0 0 10'
			}]
		},{
			fieldLabel:''+bitian+'主题',name:'titlePost',allowBlank: false
		},{
			fieldLabel:'内容',name:'contentPost',xtype:'htmleditor',height:220
		},
		uploadwindows.fields({allowBlank:false}),{
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'&nbsp;',name:'isshowPost',xtype:'checkboxfield',boxLabel:'显示首页',width:'49%',inputValue:'1',checked:true,labelSeparator:''
			},{
				fieldLabel:'序号',name:'xuPost',value:'0',minValue:0,xtype:'numberfield',width:'49%'
			}]
		},{
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'发布者/部门',name:'zuozhePost',width:'49%'
			},{
				fieldLabel:'时间',name:'indatePost',xtype:'datetimefield',width:'49%'
			}]
		}
	],
	success:function(){
		if(params.index){
			rock[params.index][1].isreadload = true;
			closetabs('inforadd_'+mid+'');
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