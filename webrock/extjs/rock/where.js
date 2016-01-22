/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.where', {
	bool:false,
	logicarr:[['LIKE', '包含'],['NOT LIKE', '不包含'],['=', '等于'],['>', '大于'],['>=', '大于等于'],['<', '小于'],['<=', '小于等于'],['<>', '不等于'],['NULL', '为空'],['NO NULL', '不为空'],['LEFT', '开始以'],['RIGHT', '结束以']],
	luojiarr:[['','-不选-'],['(','('],[')',')'],['OR','或者'],['AND','并且']],
	config:{
		rand:''
	},
	mnum:'',
	constructor: function (config){
		this.initConfig(config);
		if(!this.rand)this.rand = js.getrand();
	},
	url:function(at,can){
		return js.getajaxurl(at,'where','public',can);
	},
	_index:-1,
	//istype 0只返回，1保存
	show:function(title, table, mnum, istype,cans){
		var me = this,lx=0;
		this.maincans = js.apply({callback:function(){},opttype:'',qz:'',fields:''}, cans);
		this.istype = istype;
		if(typeof(wherewindow)!='object'){
			var cans = winopt({title: '条件管理',width:570,border:false,items:{
					height:250,region:'center',xtype:'grid',id:'wherewin_grid',hideHeaders:false,
					tbar:[{
						xtype:'combo',id:'wherewin_luoji',store:this.luojiarr,value:'',width:80,editable:false,listeners:{change:function(a,nv,ov){me._changlj(a,ov)}}
					},{
						xtype:'combo',id:'wherewin_field',store:[['','-选择字段-']],editable:false,width:120,value:'',listeners:{change:function(a){me._changfield(a)}}
					},{
						xtype:'combo',id:'wherewin_optlx',store:[['LIKE','包含']],editable:false,width:80,value:'LIKE'
					},{
						xtype:'textfield',width:120,id:'wherewin_key'
					},{
						xtype:'combo',width:120,id:'wherewin_select',editable:false,store:[['','']],hidden:true
					},{
						xtype:'datefield',width:120,id:'wherewin_date',hidden:true,format:'Y-m-d'
					},{
						xtype:'numberfield',width:120,id:'wherewin_int',hidden:true
					},{
						text:'添加',icon:gicons('add'),handler:function(){me._add()},id:'wherewin_add'
					},'->',{
						icon:gicons('reload'),handler:function(){me.reload()}
					}],
					store:Ext.create('Ext.data.Store',{
						fields:['id','field','name','optlx','value','luoji','values'],
						data:[]
					}),
					columns:[{
						xtype: 'rownumberer',width:40	
					},{
						text:'逻辑',dataIndex:'luoji',align:'center',width:80,menuDisabled:true,sortable:false,renderer:function(v){
							return me._luojlxn(v);
						}
					},{
						text:'字段',dataIndex:'name',align:'center',width:130,menuDisabled:true,sortable:false
					},{
						text:'操作符',dataIndex:'optlx',align:'center',menuDisabled:true,sortable:false,width:90,renderer:function(v){
							return me._goptlxn(v);
						}
					},{
						text:'对应值',dataIndex:'value',flex:1,menuDisabled:true,sortable:false
					},{
						text:'操作',xtype:'actioncolumn',dataIndex:'optbtn',align:'center',width:60,menuDisabled:true,sortable:false,items:[{
							icon:gicons('delete'),tooltip: '删除',handler:function(grid, rowIndex, colIndex){
								me._del(rowIndex);
							}
						}]
					}],
					viewConfig:{
						enableTextSelection:true,
						plugins: [{
							ptype: 'gridviewdragdrop',
							dragText: '移动排序'
						}]
					},
					listeners:{
						itemdblclick:function(a,v,b,index){
							var lj=v.data.luoji;
							if(lj=='('||lj==')')return;
							me.changedata = v.data;
							me._edit();
							me._index = index;
						}
					}
				},
				buttons:[{
					xtype:'tbtext',id:'wherewin_msgss'
				},{
					xtype:'textfield',width:150,emptyText:'备注说明',id:'wherewin_explain'
				},{
					text:'确定',icon:gicons('ok'),handler:function(){me._save()}
				},{
					text:'取消',icon:gicons('cancel'),handler:function(){wherewindow.close()}
				}]	
			});
			wherewindow = Ext.create('Ext.Window',cans);
			lx=1
		}
		wherewindow.show();
		wherewindow.setTitle(title);
		if(lx==1){
			this._grid = getcmp('wherewin_grid'); 
			this._store = this._grid.getStore(); 
			this._put={
				luoji:getcmp('wherewin_luoji'),
				field:getcmp('wherewin_field'),
				optlx:getcmp('wherewin_optlx'),
				key:getcmp('wherewin_key'),
				select:getcmp('wherewin_select'),
				date:getcmp('wherewin_date'),
				int:getcmp('wherewin_int')
			};
		}
		this._loadfield(table, mnum, this.maincans.fields, false);
		this.mnum	= mnum;
		this._instda={obj:this._put.key};
	},
	setmsg:function(txt,col){
		var s = js.getmsg(txt,col);
		getcmp('wherewin_msgss').setText(s);
	},
	_edit:function(){
		var da = this.changedata;
		if(da.luoji=='('||da.luoji==')')return;
		this._put.luoji.setValue(da.luoji);
		this._put.field.setValue(da.field);
		this._put.optlx.setValue(da.optlx);
		var lx = this._instda.lx;
		if(lx=='select'){
			this._instda.obj.setValue(da.values);
		}else{
			this._instda.obj.setValue(da.value);
		}
		this._chanbtn(1);
	},
	_del:function(oi){
		if(oi==this._index){
			this._reset();
			this._index=-1;
		}	
		var rec = this._store.getAt(oi);
		this._store.remove(rec);
		if(this._index>oi)this._index--;
	},
	_chanbtn:function(oi){
		var o = getcmp('wherewin_add');
		if(oi==0){
			o.setText('添加');
			o.setIcon(gicons('add'));
		}else{
			o.setText('修改');
			o.setIcon(gicons('edit'));
		}
	},
	_reset:function(){
		for(var a in this._put)this._put[a].reset();
		this._chanbtn(0);
	},
	_add:function(){
		if(isempt(this._instda.field)){
			this._reset();
			this._index=-1;
			return;
		}	
		var id	= 'rand_'+js.getrand(),
			da	= {id:id},
			key	= this._instda.obj.getRawValue(),
			fobj= this._put.field,
			lx	= this._instda.lx;
		da.value = key;
		da.values= this._instda.obj.getValue();
		da.optlx = this._put.optlx.getValue();
		da.luoji = this._put.luoji.getValue();
		da.field = this._instda.field;
		da.name = this._instda.name;
		
		var kon = da.optlx.indexOf('NULL');
		if(isempt(key)&&kon<0)return;
		if(da.luoji=='-不选-')da.luoji='';
		if(lx != 'select'){
			da.values='';
		}
		if(kon>-1){
			da.value='';
			da.values='';
		}	
		if(this._index!=-1){
			da.id = this.changedata.id;
			var oadd,vod;
			oadd= this._store.getAt(this._index);
			for(vod in da)oadd.set(vod, da[vod]);
			oadd.commit(false);
		}else{
			this._insert(da);
		}
		this._reset();
		this._index=-1;
	},
	_goptlxn:function(ls){
		var s = '';
		for(var i=0;i<this.logicarr.length;i++){
			if(this.logicarr[i][0]==ls){
				s=this.logicarr[i][1];
				break;
			}
		}
		return s;
	},
	_luojlxn:function(ls){
		var s = '';
		if(isempt(ls))return s;
		for(var i=0;i<this.luojiarr.length;i++){
			if(this.luojiarr[i][0]==ls){
				s=this.luojiarr[i][1];
				break;
			}
		}
		return s;
	},
	_changlj:function(o1, ov){
		var val = o1.value;
		if(isempt(val))return;
		if(val!='('&&val!=')')return;
		var id = 'rand_'+js.getrand();
		this._insert({luoji:o1.rawValue,id:id,name:'',field:'',optlx:'',value:'',values:''});
		this._put.luoji.setValue(ov);
	},
	_insert:function(da){
		var len = this._store.data.items.length;
		this._store.insert(len,da);
	},
	reload:function(){
		this._loadfield(this._temptable, this.mnum, this._tempfields, true);
	},
	_loadfield:function(tab, tnum, fields, rea){
		if(!rea)if(this.mnum==tnum || this.bool){
			if(this._tempfields!=fields)this._refieldata();
			return;
		}	
		var url = this.url('getfield');
		this._temptable=tab;
		this._tempfields=fields;
		var me = this;
		this.setmsg('读取中...','#555555');
		this.bool = true;
		$.post(url,{table:tab,mnum:tnum,istype:this.istype,fields:fields},function(da){
			var a = js.decode(da);
			me._loadfieldss(a);
		});
	},
	_refieldata:function(){
		var fields = this.maincans.fields;
		var d = [['','-选择字段-']],
			a = this._fieldsboj,oi,fia = ','+fields+',',bo;
		for(oi in a){
			bo = true;
			if(fields != ''){
				if(fia.indexOf(oi)<0)bo=false;
			}
			if(bo)d.push(a[oi]);
		}
		this._put.field.getStore().loadData(d);	
	},
	_loadfieldss:function(as){
		this.bool = false;
		this.setmsg('');
		var va = '',vaa,i,vn,va1;
		this._fieldsboj={};	
		var a	= as.fields;
		for(i=0;i<a.length; i++){
			va = a[i].explain;
			vn = a[i].name;
			vt = a[i].type;
			va1= '';
			if(!isempt(va)){
				vaa = va.split('@');
				va 	= vaa[0];
				if(vaa.length>1)va1=vaa[1];
			}
			if(!isempt(va)){
				this._fieldsboj[vn]=[vn, va, vt,va1];
			}	
		}
		this._refieldata();
		var rows = as.list;
		this._store.loadData(rows[0].clildren);
		getcmp('wherewin_explain').setValue(rows[0].name);
	},
	_changfield:function(a){
		var da = a.valueModels[0].raw,
			xes= da[3],
			xle= da[2],
			obj,lx,dc=[];
		if(!xle)xle='key';
		var o1 = this._put.key,
			o2 = this._put.select,
			o3 = this._put.date,
			o4 = this._put.int;
		if(!isempt(xes)){
			o1.hide();
			o2.show();
			o3.hide();
			o4.hide();
			obj = o2;
			lx  = 'select';
			this._setseldate(xes, o2);
			dc = [['=','等于'],['<>', '不等于'],['NULL', '为空'],['NO NULL', '不为空']];
		}else if(xle.indexOf('int')>-1){
			o1.hide();
			o2.hide();
			o3.hide();
			o4.show();
			obj = o4;
			lx	= 'int';
			dc = [['=', '等于'],['>', '大于'],['>=', '大于等于'],['<', '小于'],['<=', '小于等于'],['<>', '不等于'],['NULL', '为空'],['NO NULL', '不为空']];
		}else if(xle.indexOf('date')>-1){
			o1.hide();
			o2.hide();
			o3.show();
			o4.hide();
			obj = o3;
			lx  = 'date';
			dc = this.logicarr;
		}else{
			o1.show();
			o2.hide();
			o3.hide();
			o4.hide();
			obj = o1;
			lx  = 'key';
			dc	= [['LIKE', '包含'],['NOT LIKE', '不包含'],['=','等于'],['<>', '不等于'],['NULL', '为空'],['NO NULL', '不为空'],['LEFT', '开始以'],['RIGHT', '结束以']];
		}
		var lsox= this._put.optlx;
		lsox.getStore().loadData(dc);
		lsox.setValue(dc[0][0]);
		this._instda={name:da[1],field:da[0],obj:obj,lx:lx};
	},
	_setseldate:function(s, o1){
		var d=[],sa,i,na,nv,na1;
		sa = s.split(',');
		for(i=0; i<sa.length; i++){
			na1 = sa[i].split('|');
			nv  = na1[0];
			na  = nv;
			if(na1.length>1)na=na1[1];
			d.push([nv,na]);
		}
		o1.setValue('');
		o1.getStore().loadData(d);
		o1.setValue(d[0][0]);
	},
	_getsubmitdata:function(){
		
	},
	_save:function(){
		if(this.bool)return;
		var me 	= this;
		var da	= this._store.data.items,
			len = da.length,
			i	= 0,a,cans={};
		for(i=0;i<len;i++){
			a=da[i].data;
			cans['luoji_'+i] = a.luoji;
			cans['id_'+i] 	= a.id;
			cans['field_'+i] = a.field;
			cans['name_'+i] = a.name;
			cans['optlx_'+i] = a.optlx;
			cans['value_'+i] = a.value;
			cans['values_'+i] = a.values;
		}
		cans['stotal'] = i;
		cans['mnum'] = this.mnum;
		cans['explain'] = getcmp('wherewin_explain').getValue();
		for(var a1 in cans){
			if(isempt(cans[a1]))cans[a1]='';
		}
		//alert(this._getstring(cans));return;
		if(me.istype==1 || me.istype==2){
			this.bool = true;
			this.setmsg('处理中...','#ff6600');
			$.post(this.url('save'), cans, function(da){
				me.setmsg('处理成功', 'green');
				var l = js.decode(da);
				me._saveback(l);
				setTimeout(function(){me.setmsg()}, 3000);
			});
		}else if(me.istype==0){
			var where = this._getstring(cans);
			cans.where = where;
			me.maincans.callback(where);
			wherewindow.close();
		}
	},
	_saveback:function(a){
		var i;
		for(i=0;i<a.length;i++)
		this._store.getAt(i).set('id', a[i]);
		this.bool = false;
	},
	_getstring:function(a){
		var oi = a.stotal,i,s='';
		var luoji,field,value,key,values,optlx;
		for(i=0;i<oi;i++){
			luoji = a['luoji_'+i];
			field = a['field_'+i];
			value = a['value_'+i];
			values = a['values_'+i];
			optlx  = a['optlx_'+i];
			if(luoji == ')' || luoji=='('){
				s+=' '+luoji;
			}else{
				key = value;
				if(values!='')key=values;
				s+=' '+luoji+' '+this.maincans.qz+'`'+field+'`';
				if(optlx.indexOf('NULL')>-1){
					s+=' is '+optlx+'';
				}else if(optlx=='LEFT'){
					s+=' LIKE \''+key+'%\'';
				}else if(optlx=='RIGHT'){
					s+=' LIKE \'%'+key+'\'';
				}else if(optlx.indexOf('LIKE')>-1){
					s+=' LIKE \'%'+key+'%\'';
				}else{
					s+=' '+optlx+' \''+key+'\'';
				}
			}
		}
		if(s!=''){
			if(s.substr(0, 8).indexOf('AND')<0)s=' AND'+s;
			s = s.replace(/[ ]/gi, '[K]');
			s = s.replace(/AND/gi, '[A]');
			s = s.replace(/\'/gi, '[F]');
			s = s.replace(/=/gi, '[D]');
		}
		return s;
	}
});
