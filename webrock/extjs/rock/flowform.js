/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.flowform',{
	extend: 'Ext.panel.Panel',
    alias: 'widget.rockflowform',
	
	flownum:'',
	tablename:'',
	gridid:'',
	isedit:0,
	border:false,
	layout: {
		type: 'hbox',
		align: 'stretch',
		pack: 'center'
	},
	
	formparams:{},
	formsuccess:function(){
		
	},
	formwidth:550,
	initComponent: function(){
		var me	= this;
		me.rand	= js.getrand();
		if(me.formwidth<550)me.formwidth=550;
		me._formparams={
			border:false,
			tablename:me.tablename,
			flownum:me.flownum,
			xtype:'rockform',
			editjudgewhere:'status in(0,2) and uid={uid} and id={id}',
			success:function(a, a1){
				me.formsuccess(me, a);
				var ssa = '编辑';
				if(this.mid==0)ssa='新增';
				js.msg('success', ''+ssa+'保存成功');
				a1.setBtnhidden(true);
				me._setpreoad();
				//closetabs(nowtab.num);
			},
			width:me.formwidth,
			border:false,
			buttonsitems:[{
				text:'提交处理',icon:gicons('check'),id:'checkbtn_'+me.rand+'',hidden:true,handler:function(){me._checkflow()}
			}]
		};
		me._createitmes();
		this.callParent();
	},
	_createitmes:function(){
		var me = this;
		Ext.apply(me._formparams, me.formparams);
		var shenpl = {
			xtype:'fieldset',title: '处理进程',bodyPadding:5,hidden:me.mid==0,collapsible: true,layout:'anchor',items:[{
				xtype: 'fieldcontainer',defaultType: 'displayfield',layout:'hbox',items:[{
					fieldLabel:'状态',name:'checkstatustextPost',readOnly:true,value:'待提交',width:'49%',labelWidth:80
				},{
					fieldLabel:'当前处理人',name:'nowchecknamePost',readOnly:true,value:'',width:'49%',labelWidth:80
				}]
			},{
				xtype: 'combo',fieldLabel: ''+bitian+'动作',editable:false,name: 'checkstatusPost',labelWidth:80,hidden:true,value:'',store:[['','']],anchor:'49%'
			},{
				fieldLabel:'说明',name:'checkexplainPost',xtype:'textareafield',height:50,labelWidth:80,hidden:true
			},{
				fieldLabel:'处理流程',hidden:true,name:'checnshowjloewPost',xtype:'displayfield',height:55,value:'<div id="flowlog_'+me.rand+'" class="x-form-text" style="height:50px;overflow:auto;padding:0px;line-height:22px"></div>',labelWidth:80
			},{
				xtype:'grid',id:'checklog_'+me.rand+'',margin:5,store:Ext.create('Ext.data.Store',{
					fields:['id','name','checkname','status','statusname','statuscolor','explain','optdt'],
					data:[]
				}),
				columns:[{
					xtype: 'rownumberer',width:40	
				},{
					text:'名称',dataIndex:'name',align:'center',flex:0.7,sortable:false,menuDisabled:true
				},{
					text:'处理人',dataIndex:'checkname',align:'center',flex:0.7,sortable:false,menuDisabled:true
				},{
					text:'状态',dataIndex:'status',align:'center',flex:0.7,sortable:false,menuDisabled:true,renderer:function(v, m,a){
						return '<font color='+a.get('statuscolor')+'>'+a.get('statusname')+'</font>';
					}
				},{
					text:'时间',dataIndex:'optdt',align:'center',flex:1,sortable:false,menuDisabled:true
				}],
				viewConfig: {
					enableTextSelection: true
				},
				features: [{
					ftype: 'rowbody',
					getAdditionalData: function(v, index) {
						var cont = v.explain,
							s	= '';
						var cls = 'x-grid-row-body-hidden';
						if(!isempt(cont)){
							cls = '';
							s	= '<div style="padding:2px;padding-left:5px;line-height:20px">【说明】：'+cont+'</div>';
						}
						return {
							rowBody: s,
							rowBodyCls:cls
						};
					}
				}, {
					ftype: 'rowwrap'
				}]
			}]
		};
		me._formparams.items.push(shenpl);
		me.items = me._formparams;
	},
	showdata:function(){},
	afterFirstLayout:function()
	{
		this.callParent();
		this.form 	= this.down('rockform');
		this.loadData();
	},
	//加载数据
	loadData:function(){
		var me		= this;
		me.isedit	= 0;
		if(me.mid==0){
			me.form.setBitian();
			me.isedit = 1;
			return;
		}	
		var gurl	= me.geturl;
		if(!gurl)gurl = js.getajaxurl('publicgetdata', 'flow', '');
		var url = gurl+'&tablename='+me.tablename+'&flownum='+me.flownum+'&mid='+me.mid+'';
		me.form.setmsg('读取信息...','#ff6600');
		me.form.setBtnhidden(true);
		$.get(url, function(da){
			me._loadshowdata(da);
		});
	},
	_loadshowdata:function(da)
	{
		var me = this;
		me.form.setmsg('');
		var a = js.decode(da);
		me.backdata = a;
		me.form.adddata(a.data,'id');
		me.form.setVal('nowcheckname', js.repempt(a.data.nowcheckname,''));
		me._loadinforshow(a);
		getcmp('checklog_'+me.rand+'').getStore().loadData(a.logarr);
		getcmp('checklog_'+me.rand+'').setHeight(150);
		me.form.getField('checkstatus').getStore().loadData(a.actarr);;
		var zt = '',zt1='';
		if(a.data.isturn!=1){
			zt = '待提交';
		}else{
			zt = a.data.checkstatustext;
			//是否可以审核
			var nochid = ','+a.data.nowcheckid+',';
			if(nochid.indexOf(','+adminid+',')>-1 && a.data.status !=1){
				getcmp('checkbtn_'+me.rand+'').show();
				me.form.getField('checkstatus').show();
				me.form.getField('checkexplain').show();
			}
			if(a.data.status !=1)me.form.getField('checnshowjloew').show();
		}
		me.form.setVal('checkstatustext', zt);
		if(a.data.nstatus!=1 && a.data.uid == adminid){//可编辑的条件
			me.form.setBtnhidden(false);
			me.form.setBitian();
			me.isedit = 1;
		}
		if(!me.isEdit())me.form.setReadOnly(true, 'checkexplainPost,checkstatusPost');
		me.showdata(me.form, a, me);
	},
	_loadinforshow:function(a){
		$('#flowlog_'+this.rand+'').html('<div style="padding:5px;line-height:22px">'+a.logstr+'</div>');
	},
	_checkflow:function(){
		var me = this;
		if(me.form.bool)return;
		var zt = me.form.getVal('checkstatus'),
			sm = me.form.getVal('checkexplain');
		var das = {zt:zt,sm:sm,flownum:me.flownum,id:me.mid};
		if(isempt(zt)){
			me.form.setmsg('请选择处理动作');
			return;
		}
		if(zt=='2' && isempt(sm)){
			me.form.setmsg('此动作必须填写说明');
			return;
		}
		me.form.setmsg('处理中...', '#ff6600');
		me.form.bool = true;
		$.ajax({
			type:'post',url:js.getajaxurl('check','flow'),data:das,
			success:function(da){
				if(da.indexOf('成功')){
					me.form.setmsg(da, 'green');
					getcmp('checkbtn_'+me.rand+'').setDisabled(true);
					try{reloaddaiban()}catch(e){}
				}else{
					me.form.bool = false;
					me.form.setmsg(da);
				}
				me._setpreoad();
			},
			error:function(){
				me.form.bool = false;
				me.form.setmsg('处理失败请重试');
			}
		});
	},
	getForm:function(){
		return this.down('rockform');
	},
	isEdit:function(){
		return this.isedit == 1;
	},
	//可以刷新
	_setpreoad:function(){
		if(!this.gridid)return;
		if(!getcmp(this.gridid))return;
		getcmp(this.gridid).setReload(true);
	}
});