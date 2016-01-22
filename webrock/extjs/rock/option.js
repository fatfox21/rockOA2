/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.option', {
	win:false,
	wins:false,
	lx:0,
	bool:false,
	config:{
		rand:''
	},
	constructor: function (config){
		this.initConfig(config);
		if(!this.rand)this.rand=js.getrand();;
	},
	setoptionnum:'',
	settitlename:'',
	setlist:function(title,num, can, stype)
	{
		var me 		= this,canitems;
		var candev	= {qomnum:'',savecall:function(){},delcall:function(){}};//默认参数
		me.maincan 	= js.apply(candev, can);
		if(!stype)stype='win';
		var lx	= 0;
		if(!me.wins){
			me.liststore= Ext.create('Ext.data.Store', {
				fields:['name','value','values','num'],
				remoteSort: false,autoLoad: false,
				proxy: {
					type: 'ajax',extraParams:{mnum:''},
					url: js.getajaxurl('getdata','option','system'),
					reader: {type: 'json',root: 'rows'}
				}
			});
			me.rowEditing=Ext.create('Ext.grid.plugin.RowEditing', {
				clicksToMoveEditor: 1,autoCancel: false,saveBtnText:'确定',cancelBtnText:'取消'
			});
			
			canitems = {
				border:false,id:'goupshowmenuide_'+me.rand+'',roweditbool:true,store:me.liststore,
				xtype:'grid',height:300,columns:[{xtype: 'rownumberer',width:40},{
					text:'名称',flex:0.4,align:'center',dataIndex:'name',sortable:false,editor:'textfield',menuDisabled:true
				},{
					text:'对应值',flex:0.3,align:'center',dataIndex:'value',sortable:false,editor:'textfield',menuDisabled:true
				},{
					text:'编号',flex:0.3,align:'center',dataIndex:'num',sortable:false,editor:'textfield',menuDisabled:true
				}],
				bbar:[{
					text:'增',icon:gicons('add'),handler:function(){me.listadd()}
				},'-',{
					text:'删',icon:gicons('delete'),handler:function(){me.listdel()}
				},'-',{
					text:'刷新',icon:gicons('reload'),handler:function(){me.liststore.reload()}
				},'-',{
					text:'管理下级',icon:gicons('cog_edit'),handler:function(){me._guanlxiaji()}
				},'->',{
					xtype:'tbtext',id:'msg_'+me.rand+''
				},{
					text:'保存',icon:gicons('disk'),handler:function(){me.listsave()}
				}],
				plugins:[me.rowEditing],
				viewConfig:{
					enableTextSelection:true,
					plugins: [{
						ptype: 'gridviewdragdrop',
						dragText: '移动排序'
					}]
				}
			};
			
			if(stype=='win'){
				canitems.bbar.push('-');
				canitems.bbar.push({
					text:'取消',icon:gicons('cancel'),handler:function(){me.wins.hide()}
				});
				var cans = winopt({title: '设置',width:600,items: canitems,modal:true});
				me.wins = Ext.create('Ext.Window',cans);
			}
			lx	= 1;
		};
		
		me.setoptionnum	= num;
		me.settitlename = title;
		me.set_stype	= stype;
		if(stype=='win'){
			me.wins.show();
			me.wins.setTitle(title);
			me.initshow();
		}
		return canitems;
	},
	initshow:function(){
		var me = this;
		me.liststore.proxy.extraParams.mnum	= me.setoptionnum;
		me.listgrid	= getcmp('goupshowmenuide_'+me.rand+'');
		me.liststore.reload();
		getcmp('msg_'+this.rand+'').setText('拖动行可排序');
	},
	createitems:function(){
		var me = this;
	},
	listadd:function(){
		if(this.bool)return;
		var tocount	= this.liststore.data.items.length;
		this.rowEditing.cancelEdit();
		var devnum	= js.repempt(this.maincan.qomnum,'');
		if(!isempt(devnum))devnum+='_{rand}';
		this.liststore.insert(tocount,{name:'',value:'',id:'randooo_'+js.getrand()+'',num:devnum});
		this.rowEditing.startEdit(tocount, 0);
	},
	listdel:function(){
		if(this.bool)return;
		var sm = this.listgrid.getSelectionModel().getSelection();
		var len	= sm.length,me=this;
		if(len==0)return false;
		var sid	= sm[0].data.id;
		if(sid.indexOf('randooo_')<0){
			if(!confirm('确定要删除选中的行记录吗？'))return false;
			$.get(js.getajaxurl('del','option','system',{s:sid}),function(){
				me.maincan.delcall();
			});
		}
		this.rowEditing.cancelEdit();
		this.liststore.remove(sm);
	},
	listsave:function(){
		if(this.bool)return;
		var da	= this.liststore.data.items,me=this;
		var oi=0;
		var data={mnum:this.setoptionnum,title:this.settitlename};
		for(i=0; i<da.length; i++){
			var nda	= da[i].data;
			if(nda.id.indexOf('randooo_')>-1)nda.id='0';
			if(!isempt(nda.name)){
				data['name_'+oi+'']		= nda.name;
				data['value_'+oi+'']	= js.repempt(nda.value,'');
				data['num_'+oi+'']		= js.repempt(nda.num,'');//编号
				data['id_'+oi+'']		= nda.id;
				oi++;
			}
		}
		data['total']	= oi;
		if(oi==0)return;
		this.bool	= true
		me._setmsg('保存中...');
		getcmp('msg_'+me.rand+'').setText(js.getmsg('保存中...','#ff6600'));
		var me	= this;
		$.post(js.getajaxurl('savelist','option','system'),data,function(da){
			me.bool	= false;
			if(da=='success'){
				me._setmsg('保存成功','green');
				me.liststore.reload();
				me.maincan.savecall();//保存回传
			}else{
				me._setmsg(da);
			}
		});
	},
	_setmsg:function(txt, col){
		getcmp('msg_'+this.rand+'').setText(js.getmsg(txt,col));
	},
	_guanlxiaji:function(){
		if(this.bool)return;
		var sm = this.listgrid.getSelectionModel().getSelection();
		var len	= sm.length,me=this;
		if(len==0)return false;
		var num = sm[0].data.num;
		if(isempt(num)){
			me._setmsg('没有编号不能管理下级');
			return;
		}
		me.maincan.qomnum = num;
		me.setlist(me.settitlename,num,me.maincan, me.set_stype);
	}
})
