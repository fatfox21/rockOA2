/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.form',{
	extend: 'Ext.form.Panel',
    alias: 'widget.rockform',
	layout:'anchor',
	bodyPadding:5,
	frame:false,
	labelWidth:90,
	defaultPadding:0,
	fieldDefaults:{labelAlign: 'right',xtype:'textfield',anchor:'99%',padding:0,labelSeparator:':'},
	rand:'',
	autoScroll:true,
	submittext:'保存',
	submiticons:'disk',
	defaultType: 'textfield',
	form:null,
	bool:false,
	success:function(){},
	failure:function(){},
	url:'',
	aftersaveaction:'',
	beforesaveaction:'',
	submitcheck:function(form){
		return '';
	},
	params:{},
	flownum:'',
	submitfields:'',
	tablename:'',
	buttonsbool:true,
	cancelbool:false,
	editrecord:false,
	msgerrortpl:'',
	buttonsitems:[],
	initComponent: function(){
		var me	= this;
		me.fieldDefaults.labelWidth = this.labelWidth;
		me.fieldDefaults.padding = this.defaultPadding;
		me.destroypanel	= [];
		if(this.rand=='')this.rand = js.getrand();
		me.tablename = jm.encrypt(me.tablename);
		if(me.buttonsbool){
			me.buttons=[{id:'formmsg_'+me.rand+'',xtype:'tbtext'}];
			me.buttons = me.buttons.concat(me.buttonsitems);
			me.buttons.push({
				id:'formsave_'+me.rand+'',text:me.submittext,handler:function(){me._efeesaddsve(1)},formBind: true,icon:gicons(me.submiticons)
			});
			if(me.cancelbool)me.buttons.push({
				text:'取消',handler:function(){me.up('window').close()},icon:gicons('cancel')
			});
		}
		this.callParent();
	},
	onDestroy:function(){
		for(var i=0;i<this.destroypanel.length;i++)Ext.destroy(this.destroypanel[i]);
		this.callParent();
	},
	setBtnhidden:function(bo){
		var a = getcmp('formsave_'+this.rand+'');
		if(bo){
			a.hide();
		}else{
			a.show();
		}
	},
	setmsg:function(txt,col){
		var s = js.getmsg(txt,col);
		getcmp('formmsg_'+this.rand+'').setText(s);
	},
	submitparams:function(){
		return {};
	},
	editjudgewhere:'',
	addjudgewhere:'',
	submitfun:'',
	submitsave:function(lx){
		this._efeesaddsve(lx);
	},
	_efeesaddsve:function(lx){
		var me = this,s,params;
		if(this.form==null)this.form = this.getForm();
		if(this.bool)return;
		if(!this.form.isValid()){
			this.setmsg('红色边框是必填','red');
			return;
		}
		s=this.submitcheck(me, this.form);
		if(typeof(s)=='string' && s){
			this.setmsg(s,'red');
			return;
		}
		if(typeof(me.submitfun)=='function'){
			me.submitfun(me, this.form);
			return;
		}
		this.setmsg('处理中...','#ff6600');
		this.bool = true;
		if(me.editjudgewhere!='')me.editjudgewhere=me.editjudgewhere.replace(/\'/g, '[F]');
		if(me.addjudgewhere!='')me.addjudgewhere=me.addjudgewhere.replace(/\'/g, '[F]');
		params={submitfields_postabc:this.submitfields,tablename_postabc:this.tablename,flownum_postabc:this.flownum,editjudgewhere:me.editjudgewhere,addjudgewhere:me.addjudgewhere,msgerrortpl:me.msgerrortpl,aftersaveaction:me.aftersaveaction,beforesaveaction:me.beforesaveaction,savelx:lx};
		Ext.apply(params, this.params, me.submitparams(me, form));
		if(typeof(s)=='object')Ext.apply(params, s);
		if(me.editrecord)params.editrecord_postabc='true';
		var url = this.url;
		if(url=='')url=publicsave();
		me.setBtnhidden(true);
		this.form.submit({
			url: url,
			method:'POST',
			params:params,
			success:function(f,o){
				me.bool = false;
				try{
					me.setmsg(o.result.msg,'green');
					me.success(o.result, me, lx);
				}catch(e){
					me.setmsg('处理成功，但返回失败','green');
				}
			},
			failure:function(f,o){
				try{
					me.setmsg(o.result.msg,'red');
				}catch(e){
					js.getarr(o.response);
					me.setmsg('处理失败,返回出错','red');
				}
				me.setBtnhidden(false);
				me.bool = false;
				me.failure();
			}
		});
	},
	adddata:function(data, fsa){
		var fsa1 = ''+this.submitfields+'';
		if(fsa)fsa1+=','+fsa+'';
		var fa	= fsa1.split(','),s='',val;
		this.reset();
		for(var i=0;i<fa.length;i++){
			try{
				val = data[fa[i]];
				if(isempt(val))val='';
				this.setVal(fa[i], val);
			}catch(e){
				s+=''+fa[i]+';';
			}
		}
		if(s!='')alert('以下字段没有文本框\n'+s);
	},
	field:function(fid){
		if(this.form==null)this.form = this.getForm();
		return this.form.findField(fid);
	},
	reset:function(){
		this.getForm().reset();
		this.setmsg('');
		this.setBtnhidden(false);
	},
	getValuess:function(){
		var da = this.getValues(),
			a  = {},v,v1;
		for(v in da){
			v1 = v.replace('Post','');
			a[v1] = da[v];
		}		
		return a;	
	},
	setVal:function(na, val){
		this.getField(na).setValue(''+val+'');
	},
	getVal:function(na){
		var val = this.getField(na).getValue();
		if(isempt(val))val='';
		return val;
	},
	getField:function(na){
		return this.field(na+'Post');
	},
	setBitian:function(){
		var da = this.getValues();
		var o,f,bn;
		for(f in da){
			o = this.field(f);
			bn = o.allowBlank;
			if(!bn){
				o.setFieldLabel(''+bitian+''+o.getFieldLabel());
			}
		}
	},
	setReadOnly:function(bo, oths){
		var da = this.getValues();
		var f;
		if(!oths)oths='';
		for(f in da){
			if(oths.indexOf(f)<0){
				this.field(f).setReadOnly(bo);
			}
		}
	}
});