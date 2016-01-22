/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.gridform',{
	extend: 'Ext.rock.grid',
    alias: 'widget.rockgridform',
	requires: ['Ext.rock.grid', 'Ext.rock.form'],
	columns:[],
	
	delbool:true,
	editbool:true,
	addbool:true,
	formview:'window',
	initComponent: function(){
		var me	= this;
		Ext.applyIf(me, {
			searchtools:true,
			url:publicstore(),
			tbar:[],
			btnobj:{},
			iconqz:''
		});
		if(me.addbool){
			if(!Ext.Array.contains(me.tbar, '->'))me.tbar.push('->');
			me.tbar.push({
				text:'新增',icon:gicons(''+me.iconqz+'add'),handler:function(){me._add()}
			});
		}
		if(me.editbool){
			me.tbar.push('-');
			me.tbar.push({
				text:'编辑',icon:gicons(''+me.iconqz+'edit'),itemId:'edit',disabled:true,handler:function(){me._edit()}
			});
		}
		if(me.delbool){
			me.tbar.push('-');
			me.tbar.push({
				text:'删除',icon:gicons(''+me.iconqz+'delete'),itemId:'del',disabled:true,handler:function(){me._del()}
			});
		}
		me.click = function(o,record,item,index ,e){
			me._btnca(false);
			me.clickgrid(o,record,item,index ,e);
		};
		me.load	= function(a,b,c,d,e,f){
			if(me.loadcount==1){
				me.btnobj.edit = me.down('#edit');
				me.btnobj.del = me.down('#del');
			}
			me.loadgrid(a,b,c,d,e,f);
		};
		me.beforeload	= function(a,b,c,d,e,f){
			me._btnca(true);
			me.beforeloadgrid(a,b,c,d,e,f);
		};
		me._formparams={
			border:false,
			tablename:me.tablename,
			xtype:'rockform',
			cancelbool:true,
			success:function(a){
				me.storereload();
				if(me.formaction=='hide')me._win.close();
				me.formsuccess(me, a);
			}
		};
		me.callParent();
	},
	
	grideditwhere:function(){return true},
	griddelwhere:function(){return true},
	_btnca:function(bo){
		var me = this,ia;
		if(me.btnobj.edit){
			ia = 0;
			if(!bo)if(!me.grideditwhere(me.changedata, me))ia = 1;
			if(bo)ia=1;
			me.btnobj.edit.setDisabled(ia==1);
		}	
		if(me.btnobj.del){
			ia = 0;
			if(!bo)if(!me.griddelwhere(me.changedata, me))ia = 1;
			if(bo)ia=1;
			me.btnobj.del.setDisabled(ia==1);
		}
	},
	
	clickgrid:function(){},
	loadgrid:function(){},
	beforeloadgrid:function(){},
	
	
	formwidth:300,
	formtitle:'标题',
	formsuccess:function(){},
	formadd:function(){},
	formedit:function(){},
	formwinshow:function(){},
	formaddbefore:function(){return true},
	formeditbefore:function(){return true},
	formotherfield:'id',
	formaction:'hide',
	_add:function(){
		if(!this.formaddbefore(this))return;
		this._show();
		this.form.reset();
		this.form.setmsg('新增','blue');
		this._win.setTitle('[新增]'+this.formtitle+'');
		this._win.setIcon(gicons(''+this.iconqz+'add'));
		this.formadd(this.form, this);
	},
	_edit:function(){
		if(!this.formeditbefore(this))return;
		this._show();
		var da	 = this.changedata;
		this.form.adddata(da, this.formotherfield);
		this.form.setmsg('编辑','#ff6600');
		this._win.setTitle('[编辑]'+this.formtitle+'');
		this._win.setIcon(gicons(''+this.iconqz+'edit'));
		this.formedit(this.form,da, this);
	},
	_del:function(){
		this.del();
	},
	_show:function(){
		var me = this;
		var lx	= 0;
		if(!me._win){
			Ext.apply(me._formparams, me.formparams);
			var cans = winopt({title:me.formtitle,width:me.formwidth,items:me._formparams});
			me._win = Ext.create('Ext.Window',cans);
			lx = 1;
		}
		me._win.show();
		if(lx==1){
			me.form = me._win.down('form');
			me.destroypanel=[me._win];
		}
		me.formwinshow(me.form, me);
	},
	formwinhide:function(){
		if(this._win)this._win.close();
	}
});