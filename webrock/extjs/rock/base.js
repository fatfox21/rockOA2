/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.base',{});

Ext.define('Ext.rock.optioncombo',{
	extend: 'Ext.form.field.ComboBox',
	alias: ['widget.optioncombo', 'widget.rockcombo'],
	editable:false,
	optionmnum:'',
	triggerAction:'all',
	select:function(){},
	change:function(){},
	initComponent: function(){
		var me	= this;
		Ext.applyIf(this,{
			defaultstore:[],valuefields:'name',displayfields:'name',loadstore:false,autoloadlist:false,
			store:[['loading','加载中...']],fiststore:false
		});
		me.store=me.store.concat(me.defaultstore);
		me.on({
			expand:function(){
				me._expandshow();
			},
			select:this.select,
			change:this.change
		});
		if(!me.url)me.url = js.getajaxurl('getmnum','index','',{mnum:this.optionmnum});
		if(me.url=='company'){
			me.url = js.getajaxurl('getcompanydata','dept','system');
		}
		this.callParent();
		if(me.autoloadlist)me._expandshow();
	},
	_expandshow:function(){
		if(this.loadstore)return;
		this.loadstore = true;
		this.loadlist();
	},
	setLoad:function(bo){
		this.loadstore = bo;
	},
	loadlist:function(){
		var me = this;
		$.get(me.url,function(da){
			me._expandshowcall(da);
		});
	},
	_expandshowcall:function(da){
		var a,b=[],i,val,c=[],vs0,vs1;
		try{
			a = Ext.decode(da);
		}catch(e){
			this.loadstore = false;
		}
		this._datajoa = {};
		for(i=0;i<a.length;i++){
			vs0 = a[i][this.valuefields];
			vs1	= a[i][this.displayfields];
			this._datajoa[vs0] = vs1;
			b.push([vs0,vs1]);
		}
		c = this.defaultstore.concat(b);
		this._datajo = c;
		this.getStore().loadData(c);
		val = this.getValue();
		if(!isempt(val))this.setValue(val);
	},
	getData:function(){
		return this._datajo;
	},
	getItems:function(s1){
		var c = this._datajo,
			s = '',i;
		if(isempt(s1))return s;
		s = this._datajoa[s1];
		return s;
	}
});

Ext.define('Ext.rock.changeuser',{
	extend: 'Ext.form.field.Trigger',
	alias: 'widget.changeuser',
	trigger2Cls: Ext.baseCSSPrefix+'form-search-trigger',
	trigger1Cls: Ext.baseCSSPrefix+'form-clear-trigger',
	changetitle:'选择人员',
	onTrigger2Click:function(){
		var me = this;
		if(!this.userwindiow){
			var cans = winopt({title: this.changetitle,width:600,items:{
				searchtools:true,storefields:'id,name,deptname,ranking',border:false,
				xtype:'rockgrid',tablename:'admin',height:400,columns:[{
					xtype: 'rownumberer',
					width: '8%'
				},{
					text:'姓名',align:'center',dataIndex:'name',width:'40%',search:true
				},{
					text:'部门',align:'center',dataIndex:'deptname',width:'25%',search:true
				},{
					text:'职位',align:'center',dataIndex:'ranking',width:'25%',search:true
				}],
				tbar:['->',{
					text:'确定',icon:gicons('ok'),handler:function(a){me.changcalback(a)}
				}]
			}});
			this.userwindiow = Ext.create('Ext.Window',cans);
		}
		this.userwindiow.show();
	},
	onTrigger1Click:function(){
		for(var a in this.otherfields)getcmp(this.otherfields[a]).setValue('');
		this.setValue('');
	},
	editable:false,
	nameidfields:'',
	changcalback:function(das){
		var da = das.up().up().changedata;
		if(!da){
			js.msg('msg','没有选择人员');
			return;
		}
		this.setValue(da.name);
		for(var a in this.otherfields)getcmp(this.otherfields[a]).setValue(da[a]);
		this.userwindiow.hide();
	},
	initComponent: function(){
		var me	= this;
		Ext.applyIf(this,{
            otherfields:{}
        });
		this.callParent();
	},
	onDestroy:function(){
		if(this.userwindiow)Ext.destroy(this.userwindiow);
		this.callParent();
	}
});

Ext.define('Ext.rock.changedeptuser',{
	extend: 'Ext.form.field.Trigger',
	alias: 'widget.changedeptuser',
	trigger2Cls: Ext.baseCSSPrefix+'form-search-trigger',
	trigger1Cls: Ext.baseCSSPrefix+'form-clear-trigger',
	changetitle:'选择人员',
	changetype:'dept',
	changeobj:null,
	changecheck:function(){return true},
	changeback:function(){},
	onTrigger2Click:function(e){
		var me = this,lx=0;
		if(!this.changecheck(this))return;
		if(typeof(CHANGEUSERTREE)!='object'){
			var cans = winopt({title: this.changetitle,width:350,items:{
				id:'changevalue_panelview',border:false,
				xtype:'rocktree',tablename:'admin',height:400,columns:[{
					text:'名称',align:'left',dataIndex:'name',width:'100%',xtype: 'treecolumn'
				}],
				tbar1112:[{
					xtype:'textfield',width:120,emptyText:'名称',id:'changevalue_keywordla'
				},{
					text:'查询',icon:gicons('zoom'),handler:function(){
						me._searchsou();
					}
				}],
				url:js.getajaxurl('getdept','dept','system'),
				params:{changetype:this.changetype},
				bbar:[{
					icon:gicons('reload'),handler:function(){CHANGEUSERTREEs.storereload()}
				},'-',{
					text:'展开',handler:function(){
						CHANGEUSERTREEs.expandAll();
					}
				},'-',{
					text:'收起',handler:function(){
						CHANGEUSERTREEs.collapseAll();
					}
				},'-',{
					text:'取消选中',handler:function(){
						me._cancelchang();
					}
				},'->',{
					text:'确定',icon:gicons('ok'),id:'changevalue_panelviewa'
				}],
				load:function(){
					setTimeout(function(){CHANGEUSERTREEss()}, 200);
				}
			}});
			CHANGEUSERTREE = Ext.create('Ext.Window',cans);
			lx=1;
		}
		CHANGEUSERTREE.show();
		CHANGEUSERTREE.setTitle(me.changetitle);
		if(lx==1)CHANGEUSERTREEs = getcmp('changevalue_panelview');
		CHANGEUSERTREEss= function(){
			me.getshowinitdata();
		}
		this.changeobj  = CHANGEUSERTREEs;
		if(lx==0){
			if(this.changetype != CHANGEUSERTREEta){
				CHANGEUSERTREEs.setparams({changetype:this.changetype});
				CHANGEUSERTREEs.storereload();
			}else{
				this.getshowinitdata();
			}
		}
		CHANGEUSERTREEta= this.changetype;
		getcmp('changevalue_panelviewa').handler=function(){me._okback()};
	},
	setchangeype:function(type){
		this.changetype = type;
	},
	_searchsou:function(){
		var val = getcmp('changevalue_keywordla').getValue();
		if(isempt(val))val='';
		CHANGEUSERTREEs.setparams({changetype:CHANGEUSERTREEta, val:val});
		CHANGEUSERTREEs.storereload();
	},
	_okback:function(){
		var bad={},type = this.changetype;
		if(type.indexOf('check')>-1){
			var dos = type.indexOf('dept'),
				uos = type.indexOf('user'),
				sid	= [],
				sna	= [];
			var ustree = this.changeobj.getView().getChecked();
			Ext.each(ustree, function(rec){
				sna.push(rec.raw.name);
				if(dos>-1 && uos>-1){
					sid.push(rec.raw.id);
				}else if(dos>-1){
					sid.push(rec.raw.did);
				}else if(uos>-1){
					sid.push(rec.raw.uid);
				}else{
					sid.push(rec.raw.id);
				}
			});
			sid		 = sid.join(',');
			sna		 = sna.join(',');
			if(sna==''){
				js.msg('msg','没有'+this.changetitle+'');
				return;
			}
			bad.id 	 = sid;
			bad.name = sna;
		}else{
			var ca = this.changeobj.changedata;
			bad	= ca;
			if(!ca){
				js.msg('msg','没有'+this.changetitle+'');
				return;
			}
			bad.name = ca.name;
			if(type=='dept'){
				if(ca.type!='d'){
					js.msg('msg','选择的不是部门');
					return;
				}
				bad.id 	 = ca.did;
			}
			if(type=='user'){
				if(ca.type!='u'){
					js.msg('msg','选择的不是人员');
					return;
				}
				bad.id 	 = ca.uid;
				bad.deptname 	 = ca.deptname;
			}
		}
		try{
		for(var a in this.otherfields)getcmp(this.otherfields[a]).setValue(bad[a]);
		if(!isempt(this.nameidfields))getcmp(this.nameidfields).setValue(bad.id);
		this.setValue(bad.name);
		}catch(e){}
		this.changeback(bad.id, bad.name, this);
		CHANGEUSERTREE.hide();
	},
	onTrigger1Click:function(){
		for(var a in this.otherfields)getcmp(this.otherfields[a]).setValue('');
		if(!isempt(this.nameidfields))getcmp(this.nameidfields).setValue('');
		this.setValue('');
		this.changeback('', '', this);
	},
	getshowinitdata:function(){
		var sid = '';
		if(!isempt(this.nameidfields))sid=getcmp(this.nameidfields).getValue();
		if(isempt(sid))return;
		var type = this.changetype;
		if(type.indexOf('check')>-1){
			var uctee	= this.changeobj.getView().getChecked();
			Ext.each(uctee, function(rec){
				rec.set('checked', false);
			});
		}
		this.changenodeshoe(this.changeobj.getRootNode(),type,','+sid+',');
	},
	_cancelchang:function(){
		var type = this.changetype;
		if(type.indexOf('check')>-1){
			var uctee	= this.changeobj.getView().getChecked();
			Ext.each(uctee, function(rec){
				rec.set('checked', false);
			});
		}
	},
	changenodeshoe:function(node, type, sid){
		var did= node.raw.did,
			uid= node.raw.uid,
			cid= node.raw.id,
			me = this,
			path = node.getPath();
		if(type=='user'){
			if(sid.indexOf(','+uid+',')>-1){
				this.changeobj.selectPath(path);
				return;
			}
		}
		if(type=='dept'){
			if(sid.indexOf(','+did+',')>-1){
				this.changeobj.selectPath(path);
				return;
			}
		}
		var bo = false;
		if(type.indexOf('check')>-1){
			var dos = type.indexOf('dept'),
				uos = type.indexOf('user');
			if(dos>-1 && uos>-1){
				if(sid.indexOf(','+cid+',')>-1)bo = true;
			}else if(dos>-1){
				if(sid.indexOf(','+did+',')>-1)bo = true;
			}else if(uos>-1){
				if(sid.indexOf(','+uid+',')>-1)bo = true;
			}
		}
		if(bo){
			node.set('checked',true);
			this.changeobj.selectPath(path);
		}
		if(node.childNodes){
			Ext.each(node.childNodes, function(rec){
				me.changenodeshoe(rec, type, sid);
			});	
		}
	},
	editable:false,
	nameidfields:'',
	initComponent: function(){
		var me	= this;
		Ext.applyIf(this,{
            otherfields:{},
			rand:js.getrand()
        });
		this.callParent();
	},
	onDestroy:function(){
		if(typeof(CHANGEUSERTREE)=='object'){
			Ext.destroy(CHANGEUSERTREE);
			CHANGEUSERTREE = false;
		}
		this.callParent();
	}
});


Ext.define('Ext.rock.changerockdate',{
	extend: 'Ext.form.field.Trigger',
	alias: 'widget.rockdate',
	trigger1Cls: Ext.baseCSSPrefix+'form-date-trigger',
	onpicked:function(){},
	change:function(){},
	editable:false,
	initComponent: function(){
		var me	= this;
		var rand = getrand();
		Ext.applyIf(this,{
			rand:rand,
			minDate:'',
			maxDate:'',
			format:'Y-m-d',
			id:'rockdate_'+rand+'',
			clearbool:false
        });
		if(me.clearbool){
			me.trigger2Cls=Ext.baseCSSPrefix+'form-date-trigger';
			me.trigger1Cls=Ext.baseCSSPrefix+'form-clear-trigger';
			me.onTrigger1Click=function(){
				me.changecliear();
				me._onpickedaa();
			}
		}
		this.callParent();
	},
	_onpickedaa:function(a){
		var me = this,
		val = me.getValue();
		me.onpicked(val, me, a);
		me.change(val, me);
	},
	changetimeshow:function(){
		var da = {el:''+this.id+'-inputEl'};
		if(this.minDate!='')da.minDate = this.minDate;
		if(this.maxDate!='')da.maxDate = this.maxDate;
		var lx = this.format, me = this;
		if(lx=='datetime')lx='Y-m-d H:i:s';
		if(lx=='date')lx='Y-m-d';
		if(lx=='time')lx='H:i:s';
		if(lx=='month')lx='Y-m';
		if(lx=='year')lx='Y';
		lx=lx.replace('Y','yyyy');
		lx=lx.replace('m','MM');
		lx=lx.replace('d','dd');
		lx=lx.replace('H','HH');
		lx=lx.replace('i','mm');
		lx=lx.replace('s','ss');
		da.dateFmt = lx;
		da.onpicked= function(a){
			me._onpickedaa(a);
		};
		WdatePicker(da);
	},
	changecliear:function(){
		this.setValue('');
	},
	onTrigger1Click:function(){
		this.changetimeshow();
	},
	onTrigger2Click:function(){
		this.changetimeshow();
	}
});	