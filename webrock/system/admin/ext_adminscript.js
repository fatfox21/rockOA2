function opendown(){
	var url = js.getajaxurl('downexcel','where','public',{fields:escape('帐号,姓名,性别,职位,部门(必须在组织结构中),手机,邮箱,入职日期(用[]扩起来)'),title:escape('用户导入格式'),content:escape('admin,管理员,男,OA项目经理,开发部,158***,rockoa@xh829.com,[2015-08-01]')});
	js.open(url);
}
function importdown(){
	uploadwindows.imports({
		title:'导入用户',
		url:js.getajaxurl('import',mode,dir),
		callback:function(){
			rock[index].storereload();
		}
	});
}

var panel = {
	xtype:'rockgridform',tablename:'admin',formtitle:'用户',celleditbool:true,iconqz:'user_',defaultorder:'sort',
	bbaritems:['-',{
		text:'更新数据',tooltip:'用来更新人员的部门直属上级信息',icon:gicons('table_refresh'),handler:function(){this.up('rockgridform')._updatehofwe()}
	},'-',{
		text:'用户导入',icon:gicons('page_excel'),tooltip:'必须按照导入文件格式写',menu:[{
			text:'下载导入文件格式',icon:gicons('arrow_down'),handler:opendown
		},'-',{
			text:'导入Excel文件',handler:importdown
		}]
	},'用户名姓名不能有重复,导入默认密码123456'],
	defaultwhere:'and state<>5',
	viewConfigs:{
		getRowClass: function(v, rowIndex){
			if(v.raw.state=='5')return 'hui';
   		}
	},
	tbarcenter:[{
		xtype:'checkbox',boxLabel:'只看在职人员',id:'zz_'+rand+'',checked:true
	}],
	tbar:['->',{
		text:'状态切换',disabled:false,icon:gicons('reload'),handler:function(){this.up('rockgridform')._biaolizhi()}
	},'-'],
	_biaolizhi:function(){
		var me = this;
		if(!me.changedata.id)return;
		if(!me._aawin){
			var cans = winopt({title:'状态切换',width:300,items:{
				border:false,
				tablename:'admin',submittext:'确定',
				xtype:'rockform',autoScroll:false,
				cancelbool:true,
				submitfields:'quitdt,status,type,state,workdate,isdaily,isvcard,positivedt,syenddt',
				params:{int_filestype:'status,type,state,isdaily,isvcard',otherfields:'optdt={now},optname={admin},optid={adminid}'},
				items:[{
					fieldLabel:'id号',value:'0',name:'idPost',hidden:true
				},{
					fieldLabel:'姓名',name:'namePost',xtype:'displayfield'
				},{
					fieldLabel:'部门',name:'deptnamePost',xtype:'displayfield'
				},{
					fieldLabel:''+bitian+'人员状态',name:'statePost',xtype:'combo',clearbool:true,store:public.userstate,editable:false
				},{
					fieldLabel:''+bitian+'入职日期',name:'workdatePost',xtype:'rockdate',clearbool:true,allowBlank: false
				},{
					fieldLabel:'离职日期',name:'quitdtPost',xtype:'rockdate',clearbool:true
				},{
					fieldLabel:'试用到期日',name:'syenddtPost',xtype:'rockdate',clearbool:true
				},{
					fieldLabel:'转正日期',name:'positivedtPost',xtype:'rockdate',clearbool:true
				},{
					fieldLabel:'&nbsp;',name:'statusPost',xtype:'checkboxfield',boxLabel:'启用',inputValue:'1',checked:true,labelSeparator:''
				},{
					fieldLabel:'&nbsp;',name:'typePost',xtype:'checkboxfield',boxLabel:'可登录系统',inputValue:'1',checked:true,labelSeparator:''
				},{
					fieldLabel:'&nbsp;',name:'isdailyPost',xtype:'checkboxfield',boxLabel:'写工作日报',inputValue:'1',checked:true,labelSeparator:''
				},{
					fieldLabel:'&nbsp;',name:'isvcardPost',xtype:'checkboxfield',boxLabel:'通讯录显示',inputValue:'1',checked:true,labelSeparator:''
				}],
				success:function(){
					me._aawin.close();
					me.storereload();
				},
				submitcheck:function(o){
					var s = '';
					if(o.getVal('state')=='5' && isempt(o.getVal('quitdt')))s='离职要选择离职日期';
					if(o.getVal('state')!='5' && !isempt(o.getVal('quitdt')))s='请选择人员状态为离职';
					return s;
				}
			}});
			me._aawin = Ext.create('Ext.Window',cans);
			me.destroypanel.push(me._aawin);
		}
		me._aawin.show();
		var form = me._aawin.child('rockform');
		form.adddata(me.changedata,'id,name,deptname');
	},
	outsearch:function(){
		var s = '';
		if(getcmp('zz_'+rand+'').checked){
			s = 'and state<>5';
		}
		return s;
	},
	bool:false,
	_updatehofwe:function(){
		var me = this;
		if(me.bool)return;
		js.msg('wait','更新中...');
		me.bool=true;
		$.get(js.getajaxurl('updatedata','admin','system'), function(da){
			js.msg('success', da);
			me.bool=false;
			me.storereload();
		});
	},
	exceltitle:'用户',
	execlparams:{excelchuli:'status,type,state',state_arr:',正式员工,试用期,实习生,兼职,离职员工',type_arr:'否,是',status_arr:'否,是'},
	url:publicstore('admin','system'),
	columns:[{
		xtype: 'rownumberer',
		width: 30
	},{
		text:'用户名',dataIndex:'user',width:60,autowidth:true,search:true
	},{
		text:'姓名',dataIndex:'name',width:80,search:true
	},{
		text:'性别',dataIndex:'gender',width:60,editor:{xtype:'combo',store:js.arraystr('男,女')}
	},{
		text:'职位',dataIndex:'ranking',width:70,autowidth:true,search:true
	},{
		text:'直属上级',dataIndex:'superman',width:80,search:true,autowidth:true
	},{
		text:'部门',dataIndex:'deptname',width:60,autowidth:true,search:true
	},{
		text:'电话',dataIndex:'tel',width:60,editor:'textfield',autowidth:true,search:true
	},{
		text:'手机号',dataIndex:'mobile',width:70,editor:'textfield',autowidth:true,search:true
	},{
		text:'邮箱',dataIndex:'email',width:160,editor:'textfield',autowidth:true,search:true
	},{
		text:'启用',dataIndex:'status',width:60,renderer:renderbox,editor:{xtype:'combo',store:js.arraystr(),editable:false},search:true,atype:'select'
	},{
		text:'登系统',dataIndex:'type',width:65,renderer:renderbox,editor:{xtype:'combo',store:js.arraystr(),editable:false},search:true,atype:'select'
	},{
		text:'排序号',dataIndex:'sort',width:65,editor:{xtype:'numberfield',minValue:0},search:true
	},{
		text:'所在组',dataIndex:'groupname',autowidth:true,search:true
	},{
		text:'人员状态',dataIndex:'state',width:80,search:true,atype:'select',store:public.userstate,renderer:function(v, m){
			if(isempt(v))return '<font color=red>未选</font>';
			var val = public.userstate[v][1];
			return val;
		}
	},{
		text:'ID',dataIndex:'id',width:60
	}],
	formadd:function(f){
		f.setVal('pass', '123456');
	},
	formedit:function(f){
		f.setVal('pass', '');
	},
	formwinshow:function(f, o){
		var a = o.getData('group'),b=[],i;
		for(i=0; i<a.length;i++)b.push([a[i].id, a[i].name]);
		f.getField('groupname').getStore().loadData(b);
	},
	formparams:{
		url:publicsave(mode,dir),
		submitfields:'user,pass,name,tel,email,status,groupname,gender,mobile,type,ranking,superman,superid,deptid,deptname,sort',
		params:{int_filestype:'status,type,deptid,sort',add_otherfields:'adddt={now},workdate={date},state=2',md5_filestype:'pass',otherfields:'optdt={now},optname={admin},optid={adminid}'},autoScroll:false,
		submitparams:function(o,f){
			return {groupnamess:o.getField('groupname').getRawValue()};
		},
		submitcheck:function(o,f){
			var sid = o.getVal('id');
			if(sid=='0' && o.getVal('pass')==''){
				o.setVal('pass','123456');
			}
			if(sid == o.getVal('superid')){
				return '直属上级不能是自己';
			}
			return '';
		},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'用户名',name:'userPost',allowBlank: false
		},{
			fieldLabel:'密码',name:'passPost'
		},{
			fieldLabel:''+bitian+'姓名',name:'namePost',allowBlank: false
		},{
			fieldLabel:'电话',name:'telPost'
		},{
			fieldLabel:'手机号',name:'mobilePost'
		},{
			fieldLabel:'邮箱',name:'emailPost'
		},{
			xtype: 'radiogroup',fieldLabel: '性别',
			items: [{
				boxLabel: '男', name: 'genderPost', inputValue: '男', checked: true
			},{
				boxLabel: '女', name: 'genderPost', inputValue: '女'
			}]
		},{
			fieldLabel:'&nbsp;',name:'statusPost',xtype:'checkboxfield',boxLabel:'启用',inputValue:'1',checked:true,labelSeparator:''
		},{
			fieldLabel:'&nbsp;',name:'typePost',xtype:'checkboxfield',boxLabel:'可登录系统',inputValue:'1',checked:true,labelSeparator:''
		},{
			fieldLabel:''+bitian+'职位',name:'rankingPost',allowBlank: false,xtype:'optioncombo',optionmnum:'ranking',editable:true
		},{
			name:'deptidPost',id:'deptid_'+rand+'',hidden:true
		},{
			fieldLabel:''+bitian+'所属部门',nameidfields:'deptid_'+rand+'',name:'deptnamePost',xtype:'changedeptuser',changetitle:'选择部门',allowBlank: false
		},{
			name:'superidPost',id:'superid_'+rand+'',hidden:true
		},{
			fieldLabel:'直属上级',nameidfields:'superid_'+rand+'',name:'supermanPost',xtype:'changedeptuser',changetitle:'选择对应的直属上级',changetype:'usercheck'
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		},{
			fieldLabel:'所在组',name:'groupnamePost',xtype:'checkcombo',editable:false,store:[['1','管理员']]
		}]
	}
};

return {
	panel:panel
};