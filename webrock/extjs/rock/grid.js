/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.grid',{
	extend: 'Ext.grid.Panel',
    alias: 'widget.rockgrid',
	bbaritems:[],
	region:'center',
	logicarr:[['LIKE', '包含'],['NOT LIKE', '不包含'],['=', '等于'],['>', '大于'],['>=', '大于等于'],['<', '小于'],['<=', '小于等于'],['<>', '不等于'],['NULL', '为空'],['', '为空值']],
	pageSize:20,
	stripeRows:true,
	fields:[],
	plugins:[],
	changedata:{},
	defaultorder:'',
	bbarbool:true,
	tablename:'',
	sqlwhere:'',
	storefields:'*',
	storefieldstype:'',
	loadcount:0,
	click:function(){},
	dblclick:function(){},
	beforeload:function(){},
	datachanged:function(){},
	load:function(){},
	deljudgewhere:'',
	onDestroy:function(){
		if(this.cellediting)Ext.destroy(this.cellediting);
		for(var i=0;i<this.destroypanel.length;i++)Ext.destroy(this.destroypanel[i]);
		this.callParent();
	},
	storereload:function(){
		this.store.reload()
	},
	sortname:'',
	sortdir:'',
	exceltitle:'',
	excelsetcolumns:false,
	firstsearchbool:false,
	celleditautosave:true,
	initComponent: function(){
		var me		= this;
		Ext.applyIf(this,{
			storeconfig:{},destroypanel:[],
			checkcolumns:false,
			storeautoLoad:true,
			defaultwhere:'',
			opentype:7,
			storeafteraction:'',
			storebeforeaction:'',
			storedeleteaction:'',
			keywhere:'',celleditbool:false,selType: 'rowmodel',
			searchtools:false,url:'',rand:js.getrand(),tbarcenter:[],
			searchtoolss:true,
			tbarleft:[],
			columnssou:[],
			_columnsobj:{},
			viewConfig: {
				enableTextSelection: true,
				loadMask:true
			},
			viewConfigs:{},
			savebool:false,
			highsearchbool:false
		});
		me.sqlwhere = me.defaultwhere;
		if(me.firstsearchbool){
			me.storeautoLoad = false;
		}
		for(var a1 in me.viewConfigs)me.viewConfig[a1]=me.viewConfigs[a1];
		me.plugins = [];
		me.store	= me._createstore();
		if(me.bbarbool)me.bbar	= me._createbbar();
		if(me.celleditbool){
			me.cellediting = Ext.create('Ext.grid.plugin.CellEditing');
			me.plugins.push(me.cellediting);
		};
		if(me.checkcolumns)me.selModel = Ext.create('Ext.selection.CheckboxModel',{
			mode:"MULTI"
		});
		me.on({
			itemclick:function(o,record,item,index ,e){
				me.changedata = record.raw;
				me.click(o,record,item,index ,e);
			},
			itemdblclick:function(o,record,item,index ,e){
				me.dblclick(o,record,item,index ,e);
			},
			beforeedit:function(editor, e){
				me.editold = e.record.data[e.field];
				if(me.editold==null)me.editold='';
			},
			edit:function(editor, e){
				me.savecelledit(e);
			},
			sortchange:function(ct,colm,dir){
				me.sortname = colm.dataIndex;
				me.sortdir	= dir;
			}
		});
		me.createsoutbar();
		me.callParent();
	},
	insertData:function(da){
		var csns = {id:'rand_'+js.getrand()+''},a = this.columns,i,dval;
		for(i=0; i<a.length; i++){
			if(a[i].dataIndex){
				dval = a[i].defaultvalue;
				if(!dval)dval='';
				csns[a[i].dataIndex]=dval;
			}
		}
		Ext.apply(csns, da);
		var tocount	= this.store.data.items.length;
		this.store.insert(tocount,csns);
	},
	removeRows:function(){
		var sm = this.getsel();
		if(sm.length>0)this.store.remove(sm[0]);
	},
	getjsonData:function(lxs,qz){
		var a = this.store.data.items,
			len = a.length, i, d=[],d1={},f,val;
		for(i=0;i<len;i++)d.push(a[i].data);
		if(!qz)qz='';
		if(lxs=='params'){
			d1['count'+qz] = len;
			for(i=0;i<len;i++)for(f in d[i]){
				val = d[i][f];
				if(f=='id'&&val.indexOf('rand_')==0)val='0';
				d1[''+f+'_'+i+''+qz+''] = val;
			}	
			return d1;
		}
		return d;
	},
	afterFirstLayout: function() {
        this.callParent(arguments);
        this.changefiels();
		if(this.firstsearchbool){
			this.search();
		}
    },
	createsoutbar:function(){
		var sto = [],w=0,i,me=this,foi='',sssbtn,sssbtnss,arr=[],ind,
		a= me.columns;
		for(i=0; i<a.length; i++){
			if(typeof(a[i].menuDisabled)=='undefined')me.columns[i].menuDisabled=true;
			if(typeof(a[i].sortable)=='undefined')me.columns[i].sortable=false;
			if(!a[i].align)me.columns[i].align='center';
		}
		if(!me.searchtools)return;
		for(i=0; i<me.columnssou.length; i++)me.columnssou[i].search=true;
		a= me.columnssou.concat(me.columns);
		for(i=0; i<a.length; i++){
			ind = a[i].dataIndex;
			if(a[i].text && a[i].search && ind){
				if(a[i].text.length>w)w=a[i].text.length;
				sto.push([ind, a[i].text]);
				me._columnsobj[ind] = a[i];
				if(foi=='')foi=ind;
			}
		}
		arr = [{
			xtype:'combo',width:w*16+30,value:''+foi+'',id:'fields_'+this.rand+'',editable:false,store:sto,listeners:{change:function(v,t){me.changefiels();}}
		},{
			xtype:'combo',id:'logic_'+this.rand+'',width:90,value:'LIKE',editable:false,store:this.logicarr
		},{
			xtype:'textfield',id:'keyword_'+this.rand+'',width:130,listeners: {specialkey:function(field,e){if (e.getKey()==Ext.EventObject.ENTER)me.search(false,false);}}
		},{
			xtype:'datefield',id:'date_'+this.rand+'',format:'Y-m-d',width:130,hidden:true,editable:false
		},{
			xtype:'combo',id:'select_'+this.rand+'',width:130,value:'',store:[['','-选择-']],hidden:true
		}];
		if(!me.searchtoolss)arr=[];
		
		sssbtnss= [{
			text:'结果中搜索',handler:function(){me.search(true,false)}
		}];
		if(me.highsearchbool){
			sssbtnss.push({text:'高级查询...',handler:function(){me._highsearch()}});
		}
		if(me.exceltitle){
			sssbtnss.push('-');
			var exldoc = [{
				text:'设置导出列...',handler:function(){me._changefieldex()}
			},'-'],
			exldoc1	 = [{
				text:'导出当页',handler:function(){me.exceldown(0)}
			},{
				text:'导出全部(2000条内)',handler:function(){me.exceldown(-1)}
			},'-',{
				xtype:'container',layout: {type: 'hbox',align: 'middle'},items:[{
					xtype:'tbtext',text:'导出前'
				},{
					xtype: 'numberfield',hideLabel:true,minValue:1,value:50,maxValue:2000,width:70,margin:'0 5',id:'daochu_'+this.rand+''
				},{
					xtype:'tbtext',text:'条'
				},{
					xtype:'button',text:'确定',margin:'0 5',handler:function(){
						var o = getcmp('daochu_'+me.rand+'');
						if(!o.isValid())return;
						me.exceldown(o.getValue());
					}
				}]
			}];
			if(!me.excelsetcolumns)exldoc=[];
			exldoc = exldoc.concat(exldoc1);
			sssbtnss.push({
				text:'导出Excel',icon:gicons('page_excel'),menu:exldoc
			});
		}
		sssbtn = {text:'查询',icon:gicons('zoom'),handler:function(){me.search(false,false)},xtype:'splitbutton',menu:sssbtnss};
		arr = this.tbarleft.concat(arr);
		arr = arr.concat(this.tbarcenter);
		arr.push(sssbtn);
		arr = arr.concat(this.tbar);
		this.tbar = arr;
	},
	celleditchange:function(){},
	savecelledit:function(e){
		var me = this;
		if(me.savebool || !me.celleditbool)return;
		var field = e.field,
			neval = e.record.data[field],
			data  = {fieldname:field,value:neval,id:e.record.data.id,oldvalue:me.editold};
		if(data.value == data.oldvalue)return;
		var bo1 = me.celleditchange(field,neval,data.oldvalue,e);
		if(typeof(bo1)=='boolean'&&!bo1)return;
		if(me.celleditautosave)me.changfiledval(data, '保存');
	},
	changfiledval:function(cans, msg, backa, check){
		var me = this;
		if(me.savebool)return;
		var data = js.apply({tablename:me.tablename, id:''}, cans);
		if(data.id==''){
			data.id = me.getSelectValue('id', check);
		}
		if(data.id==''){
			js.msg('msg','没有选择记录');
			return false;
		}
		js.msg('wait',''+msg+'中...');
		me.savebool = true;
		$.post(js.getajaxurl('publicsavecelledit','index',''),data,function(da){
			me.savebool = false;
			js.msg('success',''+msg+'成功');
			if(typeof(backa)=='function')backa(me, data);
		});
	},
	getsel:function(){
		return this.getSelectionModel().getSelection();
	},
	getSelectValue:function(fa, all){
		var s = '';
		var sm = this.getsel();
		var len	= sm.length,i;
		if(!fa)fa='id';
		if(!all)if(len>1)len=1;
		for(i=0;i<len;i++){
			s+=','+sm[i].raw[fa]+'';
		}
		if(s!='')s=s.substr(1);
		return s;
	},
	del:function(odel,check, _backs){
		var me= this,
			s = me.getSelectValue('id', check),
			sm = me.getsel(),i,delurl = me.delurl;
		if(s==''){
			js.msg('msg','没有选择记录');
			return false;
		}
		i = sm.length;
		if(!check)i=1;
		if(!delurl)delurl=js.getajaxurl('publicdel', 'index', '');
		Ext.MessageBox.confirm('系统提示', '确定要删除选中的'+i+'条记录吗？', function(a){
			if(a=='yes'){
				js.msg('wait','删除中...');
				if(odel)odel.setDisabled(true);
				$.post(delurl, {table:me.tablename,id:s,deljudgewhere:me.deljudgewhere,storedeleteaction:me.storedeleteaction}, function(da){
					if(da=='success'){
						js.msg('success','删除成功');
						if(typeof(_backs)=='function'){
							_backs(me);
						}else{
							me.store.reload();
						}
					}else{
						js.msg('msg',da);
					}
				});
			}
		});
	},
	_fieldsdata:{},
	paramsbase:{},
	loadbool:false,
	setkeyWhere:function(ws,bo){
		this.keywhere = ws;
		this.setparams({keywhere:ws}, bo);
	},
	_createstore:function(){
		var me		= this;
		var com,i,fields=['id'],a=this.columns,params;
		for(i=0;i<a.length;i++){
			if(a[i].dataIndex){
				me._fieldsdata[a[i].dataIndex]=a[i].text;
				fields.push(a[i].dataIndex);
			}	
		}
		for(i=0;i<this.fields.length;i++)fields.push(this.fields[i]);
		var url = this.url;
		if(url=='')url=publicstore();
		me.url	= url;
		if(me.storefieldstype=='columns')me.storefields = '`'+fields.join('`,`')+'`';
		var keyss= me.keywhere;
		if(keyss!='')keyss=keyss.replace(/\'/g, '[F]');
		if(me.defaultwhere!='')me.defaultwhere=me.defaultwhere.replace(/\'/g, '[F]');
		params	= js.apply({keywhere:keyss,where:me.defaultwhere,opentype:me.opentype,tablename_abc:me.tablename,storefields:me.storefields,defaultorder:me.defaultorder,storeafteraction:me.storeafteraction,storebeforeaction:me.storebeforeaction}, me.paramsbase);
		fields.push('xuhao');
		var storeopt= {
			pageSize:this.pageSize,fields:fields,remoteSort: true,autoLoad :me.storeautoLoad,
			proxy: {
				type: 'ajax',url:url,actionMethods:{read : 'POST'},
				extraParams:params,timeout:1200000,
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'totalCount'
				},
				simpleSortMode: true
			}
		};
		for(var a in this.storeconfig)storeopt[a]=this.storeconfig[a];
		var store	= Ext.create('Ext.data.Store', storeopt);	
		store.on({
			beforeload:function(a,b,c,d,e,f){
				me.loadbool = true;
				me.setparams({loadcount:me.loadcount});
				me.beforeload(a,b,c,d,e,f);
			},
			load:function(a,b,c,d,e,f){
				me.loadbool = false;
				me.loadcount++;
				me.load(me,a,b,c,d,e,f);
				if(a.getCount()>0)me._resetgridwidth(me.headerCt.getGridColumns());
			},
			datachanged:function(a, b){
				me.datachanged(a, b);
			}
		});
		return store;
	},
	setparams:function(can, bo){
		Ext.apply(this.store.proxy.extraParams, can);
		if(bo)this.storereload();
	},
	_createbbar:function(){
		this.paging = Ext.create('Ext.PagingToolbar', {
			store:this.store,
			displayInfo: true,
			displayMsg: '显示第{0} - {1}条记录 / 共{2}记录',
			emptyMsg: "没有记录",
			items:this.bbaritems
		});
		return this.paging;
	},
	getData:function(fia){
		var da = this.store.proxy.reader.jsonData;
		if(fia)da=da[fia];
		return da;
	},
	gettotalCount:function(){
		return this.getData('totalCount');
	},
	getCount:function(){
		return this.store.getCount();
	},
	_getChiLength:function(val){
		var len = 0;
		if(typeof(val)=='string'){
			val=val.replace(/<[^>]*>/gi,"");
			var mlen=val.length;
			for(var i = 0;i<mlen;i++){
				var olen=(val.charCodeAt(i)>256)?16:10;
				len = len + olen;
			}
		}
		return len;
	},
	_resetgridwidth:function(colnm){
		for(var c=1;c<colnm.length;c++){
			var cotext=colnm[c].dataIndex;
			if(colnm[c].autowidth){
				colnm[c].autoSize();
			}
		}
	},
	oldatype:'',
	changefiels:function()
	{
		var mo	 = this.rand;
		if(!Ext.get('fields_'+mo+'-inputEl'))return false;
		var fioi = getcmp('fields_'+mo+'').getValue();
		if(isempt(fioi))return;
		var arr	 = this._columnsobj[fioi]
		var afile= arr['dataIndex'];
		var atype= arr['atype'];
		if(this.oldatype == atype && atype!='select')return;
		getcmp('keyword_'+mo+'').hide();
		getcmp('date_'+mo+'').hide();
		var selobj	= getcmp('select_'+mo+'');
		selobj.hide();
		if(atype == 'date'){
			getcmp('date_'+mo+'').show();
		}else if(atype == 'select'){
			getcmp('logic_'+mo+'').setValue('=');
			selobj.show();
			var data	= arr['store'];
			if(!data&&arr.editor)data=arr.editor.store;
			if(!data)data=[['','-选择-']];
			selobj.getStore().loadData(data);
			selobj.setValue(data[0][0]);
		}else{
			getcmp('keyword_'+mo+'').show();
			getcmp('logic_'+mo+'').setValue('LIKE');
		}
		this.oldatype = atype;
	},
	search:function(jgbool, alex)
	{
		var mo	   = this.rand,
			awhere = '';
			
		if(Ext.get('fields_'+mo+'-inputEl')){
			var oper   = getcmp('logic_'+mo+'').getValue(),
				key    = getcmp('keyword_'+mo+'').getValue(),
				dt     = getcmp('date_'+mo+'').getRawValue(),
				fioi   = getcmp('fields_'+mo+'').getValue(),
				arr	   = this._columnsobj[fioi],
				fields = arr.dataIndex,
				type   = arr['atype'];
				
			if(type=='date'){
				key=dt;
				if(key!=''){
					if(oper=='>=')key=''+key+' 00:00:00';
					if(oper=='<=')key=''+key+' 23:59:59';
				}
			}
			if(type=='select')key=getcmp('select_'+mo+'').getValue();
			var keyss  = key;
			if(oper.indexOf('LIKE')>=0)key='%'+key+'%';
			key="'"+key+"'";
			if(oper==''){
				key='\'\'';
				oper='=';
			}
			if(oper=='NULL'){
				oper='';
				key='IS NULL';
			}
			var qz=arr.qz;
			if(isempt(qz))qz='';
			awhere=" AND "+qz+"`"+fields+"` "+oper+" "+key+" ";
			if(arr.searchtpl){
				awhere = ' AND '+arr.searchtpl.replace('?0', oper);
				awhere = awhere.replace('?1', key);
			}
			if((oper.indexOf('LIKE')>=0 || oper=='=') && keyss =='')awhere='';
		}
		if(jgbool)awhere = this.sqlwhere + awhere;
		awhere+=this.outsearch(this);	
		if(!alex)this.searchgoto(awhere);
		return awhere;
	},
	outsearch:function(){return ''},
	searchgoto:function(sw){
		if(!sw)sw='';
		var whe=sw;
		this.sqlwhere = whe;
		this.store.proxy.extraParams.where=jm.encrypt(whe);
		if(this.paging!=null){
			this.paging.moveFirst();
		}else{
			this.store.reload();
		}		
		return whe;
	},
	_highsearch:function(){
		var me = this;
		wherewindows.show('高级查询',this.tablename,'usersearchwhere_'+this.rand+'', 0,{
			callback:function(w){
				me.searchgoto(w);
			}
		});
	},
	_changefieldex:function()
	{
		var me = this,
			lx = 0;
		if(!me._chagnewinf){
			var cans = winopt({title: '选择要导出列',width:400,border:false,
				items:me._getistess([]),
				buttons:[{
					text:'确定',icon:gicons('ok'),handler:function(){me._chagnewinok()}
				},{
					text:'取消',icon:gicons('cancel'),handler:function(){me._chagnewinf.close()}
				}]
			});
			me._chagnewinf = Ext.create('Ext.Window',cans);
			lx = 1;
		}
		if(lx==1){
			me.destroypanel.push(me._chagnewinf);
			me._changeadfe();
		}
		me._chagnewinf.show();
	},
	_getistess:function(a){
		return {xtype:'itemselector',height:300,store: a,	fromTitle: '可选列',toTitle: '已选择'};
	},
	
	_changeadfe:function(){
		var me = this, olm=[],a= this.columns,i,atype=0;
		if(me.flownum)olm=['radmin_name','radmin_deptname'];
		for(i=0; i<a.length; i++){
			if(a[i].dataIndex && !a[i].hidden)olm.push(a[i].dataIndex);
		};
		if(!me.flownum)atype=1;
		$.post(js.getajaxurl('getfields','public'),{table:me.tablename,atype:atype,storefields:me.storefields},function(da){
			var d = js.decode(da),i;
			for(i=0; i<d.length; i++)if(!me._fieldsdata[d[i][0]])me._fieldsdata[d[i][0]]=d[i][1];
			me._chagnewinf.removeAll();
			me._chagnewinf.add(me._getistess(d));
			me._chagnewinf.down('itemselector').setValue(olm);
		});
	},
	excelfields:'',
	_chagnewinok:function(){
		var me = this,
			val= me._chagnewinf.down('itemselector').getValue();
		if(val==''){
			js.msg('msg', '至少要选择一列');
			return;
		}			
		me.excelfields = val;
		me._chagnewinf.close();
		js.msg('success', '选择成功');
	},
	
	execlparams:{},
	exceldown:function(lx){
		var me 		= this,a= this.columns,i,olm=[],ans=[],a2;
		var da   	= js.apply({}, me.store.proxy.extraParams);
		for(a2 in me.execlparams)da[a2] = jm.encrypt(me.execlparams[a2]);
		
		da.page 	= me.store.currentPage;
		da.start 	= (da.page -1) * me.pageSize;
		da.limit 	= me.pageSize;
		da.sort 	= me.sortname;
		da.dir 		= me.sortdir;
		if(isempt(me.excelfields)){
			for(i=0; i<a.length; i++){
				if(a[i].dataIndex && !a[i].hidden && !a[i].notexcel)olm.push(a[i].dataIndex);
			};
		}else{
			olm = me.excelfields;
		}
		me.excelfields = olm;
		da.excelfields = me.excelfields.join(',');
		for(i=0; i<olm.length; i++)ans.push(me._fieldsdata[olm[i]]);
		da.excelheader = ans.join(',');
		
		da.excelfields = jm.encrypt(da.excelfields);
		da.excelheader = jm.encrypt(da.excelheader);
		da.where 	   = jm.encrypt(me.sqlwhere);
		da.exceltitle  = jm.encrypt(me.exceltitle);
		
		if(lx==-1){
			da.start	= 0;
			da.limit	= 2000;
		}else if(lx>0){
			da.start	= 0;
			da.limit	= lx;
		}
		da.execldown	= 'true';
		js.msg('wait', '导出处理中...');
		$.post(me.url, da,function(a){
			var a1 = js.decode(a);
			js.msg('success', '处理成功，共有记录'+a1.totalCount+'条/导出'+a1.downCount+'条，点我直接<a class="a" href="'+a1.url+'" target="_blank">[下载]</a>', 60);
		});
	}
});