/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.flowgrid',{
	extend: 'Ext.rock.grid',
    alias: 'widget.rockflowgrid',
	opentype:0,
	flownum:'',
	columns:[],
	reloadbool:false,
	initComponent: function(){
		var me	= this;
		Ext.applyIf(me, {
			searchtools:true,
			url:publiccheckstore(),
			tbar:[],
			iconqz:'',
			rand:js.getrand(),
			delurl:js.getajaxurl('flowdel','flow','')
		});
		me.url += '&flownum='+me.flownum+'';
		me.delurl += '&flownum='+me.flownum+'';
		me.id = 'rockflowgrid_'+me.rand+'';
		var tbass = ['->',{
			text:'新增',icon:gicons(''+me.iconqz+'add'),handler:function(){me._add()}
		},'-',{
			text:'编辑',icon:gicons(''+me.iconqz+'edit'),disabled:true,handler:function(){me._edit()},id:'edit_'+me.rand+''
		},'-',{
			text:'删除',icon:gicons(''+me.iconqz+'delete'),disabled:true,handler:function(){me._del()},id:'del_'+me.rand+''
		}];
		me.tbar = me.tbar.concat(tbass);
		me.columns.push({
			text:'查看',dataIndex:'viewopt',width:60,xtype:'actioncolumn',
			items: [{
				icon: gicons('page_white_text'),
				tooltip: '查看',
				handler: function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					me._opentals('查看',rec.get('id'));
				}
			}]
		});
		
		me.click = function(a, v,item,index ,e){
			me.flow.iseditdel(v,'edit','del');
			getcmp('view_'+me.rand+'').setDisabled(false);
			me.clickgrid(a,v,item,index ,e);
		}
		me.beforeload = function(){
			me.flow.iseditdel(false,'edit','del');
			try{getcmp('view_'+me.rand+'').setDisabled(true);}catch(e){}
		}
		me.load = function(a,b,c,d,e,f){
			me.flow.loadshow(me);
			me.loadgrid(a,b,c,d,e,f);
		}
		me.datachanged = function(){
			me.flow.loadshow(me);
		}
		me.flow = Ext.create('Ext.rock.flow',{opentype:me.opentype,flownum:me.flownum,rand:me.rand});
		var viewbtn = {text:'新窗口查看',icon:gicons('application'),disabled:true,handler:function(){me._view()},id:'view_'+me.rand+''};
		
		if(me.opentype!=0){
			me.tbar=['->',viewbtn];
		}else{
			me.tbar.push('-');
			me.tbar.push(viewbtn);
		}
		me._formparams={
			border:false,
			tablename:me.tablename,
			flownum:me.flownum,
			xtype:'rockform',
			cancelbool:true,
			editjudgewhere:'status in(0,2) and uid={uid} and id={id}',
			success:function(a){
				me.storereload();
				if(me.formaction=='hide')me._win.close();
				me.formsuccess(me, a);
			}
		};
		for(var i=0;i<me.columns.length;i++){
			if(me.columns[i].dataIndex=='status'){
				Ext.applyIf(me.columns[i], {
					text:'状态',align:'left',qz:'a.',width:150,search:true,atype:'select',store:public.flowstatus,renderer:function(a,b,c){
						return me.flow.showbtn(a,b,c);
					}
				})
			}
		}
		me.callParent();
	},
	_view:function(){
		var a = this.changedata;
		var url = js.getajaxurl('$view','flow','taskrun',{uid:adminid,mid:a.id,modenum:this.flownum,table:this.tablename,jmbool:true});
		js.open(url, 800);
	},
	
	openView:function(){
		this._view();
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
	formotherfield:'id,name,deptname',
	formaction:'hide',
	_add:function(){
		this._opentals('新增',0);
	},
	_opentals:function(tit, sid){
		addtabs('['+tit+']'+this.formtitle,'flow,apply,'+this.flownum+',flownum='+this.flownum+',tablename='+this.tablename+',opentype='+this.opentype+',mid='+sid+',gridid='+this.getId()+'', ''+this.flownum+'_'+sid+'');
	},
	_edit:function(){
		this._opentals('编辑',this.changedata.id);
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
	setReload:function(bo){
		this.reloadbool = bo;
	},
	isReload:function(){
		if(this.reloadbool)this.storereload();
		this.setReload(false);
	}
});