var data;
var type = params.type,form,
	uid  = params.uid,win,nowtype;
if(uid==0)uid=adminid;
var aabcccc = {work:['公司/单位','岗位'],edu:['学校名','学历/专业']};

function loadinfor(){
	form.setmsg('加载信息...','blue');
	$.get(js.getajaxurl('loadinfor', mode, dir,{id:uid}), function(da){
		form.setmsg('');
		var a= js.decode(da);
		showdata(a.data);
		setinforsdt(a);
	});
	if(type==0){
		form.getField('workdate').setDisabled(true);
		form.getField('state').setDisabled(true);
	}
}

function setinforsdt(a){
	form.down('#work').getStore().loadData(a.work);
	form.down('#edu').getStore().loadData(a.edu);
}

function loaddatass(lx){
	var o = form.down('#'+lx+'');
	o.getEl().mask('加载中...');
	$.get(js.getajaxurl('loadinforjl', mode, dir,{id:uid,atype:lx}), function(da){
		var a= js.decode(da);
		o.getStore().loadData(a);
		o.getEl().unmask();
	});
}

function showdata(data){
	form.adddata(data,'id,name,user,deptname,state,workdate');
	if(!isempt(data.face))get('view_face_'+rand+'-inputEl').src = data.face;
}
var workjinglgrid = function(lx){
	return {
		xtype:'rockgrid',height:150,tablename:'userjl',itemId:lx,columns:[{
			xtype: 'rownumberer',
			width: '5%'
		},{
			text:aabcccc[lx][0],dataIndex:'name',width:'30%',align:'center'
		},{
			text:aabcccc[lx][1],dataIndex:'ranking',width:'20%',align:'center'
		},{
			text:'开始日期',dataIndex:'startdt',width:'22%',align:'center'
		},{
			text:'截止日期',dataIndex:'enddt',width:'22%',align:'center'
		}],
		bbarbool:false,
		bbar:[{
			text:'新增',icon:gicons('add'),handler:function(){addworkl(lx)}
		},'-',{
			text:'删除',icon:gicons('delete'),handler:function(){
				this.up('rockgrid').del(false, false, function(){
					loaddatass(lx);
				});
			}
		},'双击编辑行','->',{
			icon:gicons('reload'),text:'刷新',handler:function(){
				loaddatass(lx);
			}
		}],
		storeautoLoad:false,
		fields:['uid','atype'],
		dblclick:function(o, r){
			var frm = addworkl(r.data.atype);
			frm.adddata(r.data, 'id');
		}
	}
};

function addworkl(lx){
	if(!win){
		var cans = winopt({title:'管理',width:300,items:{
			border:false,tablename:'userjl',submittext:'确定',
			submitfields:'atype,name,ranking,startdt,enddt,uid',autoScroll:false,cancelbool:true,
			xtype:'rockform',autoScroll:false,
			items:[{
				fieldLabel:'id号',value:'0',name:'idPost',hidden:true
			},{
				name:'atypePost',hidden:true
			},{
				name:'uidPost',value:uid,hidden:true
			},{
				fieldLabel:''+bitian+'名称',name:'namePost',allowBlank: false
			},{
				fieldLabel:''+bitian+'岗位',name:'rankingPost',allowBlank: false
			},{
				fieldLabel:''+bitian+'开始时间',name:'startdtPost',xtype:'datefield',editable:false,format:'Y-m-d',allowBlank: false
			},{
				fieldLabel:''+bitian+'截止时间',name:'enddtPost',xtype:'datefield',editable:false,format:'Y-m-d',allowBlank: false
			}],
			success:function(a, o){
				loaddatass(nowtype);
				win.close();
			}
		}});
		win = Ext.create('Ext.Window',cans);
		form.destroypanel.push(win);
	}
	win.show();
	var frm = win.down('rockform');
	frm.reset();
	frm.setVal('atype', lx);
	nowtype = lx;
	var a = aabcccc[lx];
	frm.getField('name').setFieldLabel(''+bitian+''+a[0]+'');
	frm.getField('ranking').setFieldLabel(''+bitian+''+a[1]+'');
	return frm;
}

var jifield = 'birthday,idnum,xueli,minzu,face,tel,jinname,mobile,qq,jintel,housetel,hkaddress,nowaddress,houseaddress,school,bydate,zhuanye,xuexing,jiguan,hunyin,workdt,zzmianmao';
var bitss = ''+bitian+'';
var bitssbbs= false;
if(type==1){
	jifield+=',state,workdate';
	bitss = '';
	bitssbbs = true;
}

var panel= {
	xtype:'rockform',tablename:'admin',rand:rand,
	submitfields:jifield,labelWidth:90,editrecord:true,
	params:{otherfields:'optdt={now},optname={admin},optid={adminid}'},autoScroll:true,
	items:[{
		fieldLabel:'id号',value:'0',name:'idPost',hidden:true
	},{
		xtype: 'fieldcontainer',defaultType: 'displayfield',layout:'hbox',items:[{
			fieldLabel:'姓名',name:'namePost',width:'33%'
		},{
			fieldLabel:'用户名',name:'userPost',width:'33%'
		},{
			fieldLabel:'部门',name:'deptnamePost',width:'33%'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:''+bitian+'入职时间',name:'workdatePost',width:'33%',xtype:'datefield',format:'Y-m-d',editable:false,maxValue:new Date()
		},{
			fieldLabel:''+bitian+'人员状态',value:'',name:'statePost',width:'33%',xtype:'combo',allowBlank: false,editable:false,store:public.userstate
		},{
			fieldLabel:'出生日期',name:'birthdayPost',width:'33%',xtype:'datefield',format:'Y-m-d',editable:false
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'身份证号码',name:'idnumPost',width:'33%'
		},{
			fieldLabel:''+bitian+'最高学历',name:'xueliPost',width:'33%',xtype:'optioncombo',optionmnum:'xueli',allowBlank: false
		},{
			fieldLabel:''+bitian+'民族',name:'minzuPost',width:'33%',xtype:'optioncombo',optionmnum:'minzu',allowBlank: false
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'毕业学校',name:'schoolPost',width:'33%'
		},{
			fieldLabel:'毕业时间',name:'bydatePost',width:'33%',xtype:'datefield',format:'Y-m-d',editable:false
		},{
			fieldLabel:'专业',name:'zhuanyePost',width:'33%'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'婚姻状况',name:'hunyinPost',width:'33%',xtype:'optioncombo',optionmnum:'hunyin',editable:true
		},{
			fieldLabel:'籍贯',name:'jiguanPost',width:'33%'
		},{
			fieldLabel:'血型',name:'xuexingPost',width:'33%',xtype:'optioncombo',optionmnum:'xuexing',editable:true
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:''+bitian+'参加工作日期',name:'workdtPost',width:'33%',xtype:'datefield',format:'Y-m-d',editable:false,maxValue:new Date()
		},{
			fieldLabel:'政治面貌',name:'zzmianmaoPost',width:'33%',xtype:'optioncombo',optionmnum:'zzmianmao'
		}]
	},{
		xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
			xtype:'fieldset',width:'75%',title:'联系信息',defaultType: 'textfield',
			items:[{
				xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
					fieldLabel:'办公电话',name:'telPost',width:'50%'
				},{
					fieldLabel:''+bitss+'手机号码',name:'mobilePost',width:'49%',allowBlank: bitssbbs	
				}]
			},{
				xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
					fieldLabel:'家庭电话',name:'housetelPost',width:'50%'
				},{
					fieldLabel:'QQ号码',name:'qqPost',width:'49%'	
				}]
			},{
				fieldLabel:''+bitss+'户口地址',name:'hkaddressPost',allowBlank: bitssbbs	
			},{
				fieldLabel:''+bitss+'家庭地址',name:'houseaddressPost',allowBlank: bitssbbs	
			},{
				fieldLabel:''+bitss+'现地址',name:'nowaddressPost',allowBlank: bitssbbs		
			},{
				xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
					fieldLabel:''+bitss+'紧急联系人',name:'jinnamePost',width:'50%',allowBlank: bitssbbs	
				},{
					fieldLabel:''+bitss+'紧急电话',name:'jintelPost',width:'49%',allowBlank: bitssbbs		
				}]
			}]
		},{
			xtype:'displayfield',value:'<div style="padding-top:20px" align="center"><img id="view_face_'+rand+'-inputEl" style="border:1px #cccccc solid" src="images/noface.gif" height="100" width="100"><br><a onclick="return js.cropimg(\'face_'+rand+'-inputEl\',\''+jm.encrypt('形象照片')+'\',100,100)" href="javascript:" class="a">形象照片</a></div>',width:'24%'
		}]
	},{
		name:'facePost',id:'face_'+rand+'',hidden:true
	},{
		xtype:'fieldset',
		title: '工作经历',
		collapsible: true,padding:5,
		items:workjinglgrid('work')
	},{
		xtype:'fieldset',
		title: '教育经历',
		collapsible: true,padding:5,
		items:workjinglgrid('edu')
	}],
	success:function(){
		if(type==1)rock[params.index].isreadload = true;
	},
	width:780,border:false
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
		form=rock[index].down('rockform');
		loadinfor();
	}
};