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
	autoclosetab:false,
	layout: {
		type: 'hbox',
		align: 'stretch',
		pack: 'center'
	},
	formparams:{},
	formsuccess:function(){},
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
			editjudgewhere:'status in(0,2)[K][A][K](uid[D]{uid}[K]or[K]optid[D]{optid})[K][A][K]id[D]{id}',
			success:function(a, a1){
				me.formsuccess(me, a);
				var ssa = '编辑';
				if(me.mid==0)ssa='新增';
				js.msg('success', ''+ssa+'保存成功');
				a1.setBtnhidden(true);
				me._setpreoad();
				if(me.autoclosetab)closetabsnow();
			},
			width:me.formwidth,
			border:false,
			buttonsitems:[{
				text:'去处理...',icon:gicons('check'),id:'checkbtn_'+me.rand+'',hidden:true,handler:function(){me._checkflow()}
			}]
		};
		me._createitmes();
		this.callParent();
	},
	_createitmes:function(){
		var me = this;
		Ext.apply(me._formparams, me.formparams);
		me._formparams.items.push({
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'申请人',readOnly:true,value:adminname,name:'applynamePost',width:'49%'
			},{
				fieldLabel:'申请人部门',readOnly:true,value:admindeptname,name:'applydeptnamePost',width:'50%'
			}]
		});
		me.items = me._formparams;
	},
	showdata:function(){},
	afterFirstLayout:function()
	{
		this.callParent();
		this.form 	= this.down('rockform');
		this.loadData();
	},
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
		
		var zt = '';
		if(a.data.isturn!=1){
			zt = '待提交';
		}else{
			zt = a.data.checkstatustext;
			if(a.ischeck==1){
				getcmp('checkbtn_'+me.rand+'').show();
			}
		}
		me.isedit = a.isedit;
		if(me.isedit==1){
			me.form.setBtnhidden(false);
			me.form.setBitian();
		}else{
			me.form.setReadOnly(true);
			me.form.setBtnhidden(true);
		}
		if(me.form.getField('fileid')){
			me.form.getField('fileid').loadfile(me.tablename, me.mid, !me.isEdit());
		}
		me.form.setVal('applyname', a.aurs.name);
		me.form.setVal('applydeptname', a.aurs.deptname);
		me.showdata(me.form, a, me);
	},
	_loadinforshow:function(a){
		$('#flowlog_'+this.rand+'').html('<div style="padding:5px;line-height:22px">'+a.logstr+'</div>');
	},
	_checkflow:function(){
		var me = this;
		var url = js.getajaxurl('$view','flow','taskrun',{uid:adminid,mid:me.mid,modenum:me.flownum,table:this.tablename,jmbool:true});
		url+='&gridid='+me.gridid+'';
		js.open(url, 800);
	},
	getForm:function(){
		return this.down('rockform');
	},
	isEdit:function(){
		return this.isedit == 1;
	},
	_setpreoad:function(){
		getparent(''+this.flownum+'list_0','setReload', true);
		getparent(''+this.flownum+'list_1','setReload', true);
		if(!this.gridid)return;
		if(!getcmp(this.gridid))return;
		getcmp(this.gridid).setReload(true);
	}
});