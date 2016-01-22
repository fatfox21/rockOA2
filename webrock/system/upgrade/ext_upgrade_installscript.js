var wins,grid;
var panel = {
	xtype:'rockgrid',tablename:'chargemode',fields:['utype','keys','buyurl','instkey','updatesm'],
	url:js.getajaxurl('getmode',mode,dir),bbarbool:false,
	tbar:[{
		text:'刷新',handler:function(){this.up('grid').storereload();},icon:gicons('arrow_refresh')
	},'您系统版本V'+VERSION+'，以下是<a class="a" href="http://www.rockoa.com/" target="_blank">【官网www.rockoa.com】</a>提供可下载安装的模块，可直接进入官网<a class="a" href="http://demo.rockoa.com/" target="_blank">【演示】</a>查看！','->',{
		text:'<font color=#57A81E>已安装(<span id="yaz_'+rand+'">0</span>)</font>'
	},'-',{
		text:'未安装(<span id="waz_'+rand+'">0</span>)'
	},'-',{
		text:'<font color=#ff6600>免费模块(<span id="mfmk_'+rand+'">0</span>)</font>'
	},'-',{
		text:'<font color=#800000>收费模块(<span id="sfmk_'+rand+'">0</span>)</font>'
	},'-',{
		text:'<font color=#D31D42>待升级(<span id="dsj_'+rand+'">0</span>)</font>'
	}],
	load:function(){
		$('#waz_'+rand+'').html(this.getData('waz')+'');
		$('#yaz_'+rand+'').html(this.getData('yaz')+'');
		$('#mfmk_'+rand+'').html(this.getData('mfmk')+'');
		$('#sfmk_'+rand+'').html(this.getData('sfmk')+'');
		$('#dsj_'+rand+'').html(this.getData('dsj')+'');
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'模块名称',dataIndex:'name',width:'15%',search:true
	},{
		text:'说明',dataIndex:'explain',flex:1,align:'left',renderer:function(v,m,d){
			var s = '<div style="white-space:normal;">'+v+'',sm=d.get('updatesm');
			if(!isempt(sm))s+='<br>【更新说明】<br>'+sm+'';
			s+='</div>';
			return s;
		}
	},{
		text:'价格',dataIndex:'price',width:'10%',renderer:function(v){
			if(v>0){
				v='￥'+v;
			}else{
				v='<font color=#ff6600>免费</font>';
			}
			return v;
		}
	},{
		text:'更新时间',dataIndex:'updatedt',search:true,width:120,renderer:function(v){
			if(!isempt(v))v=v.replace(' ','<br>');
			return v;
		}
	},{
		text:'查看',dataIndex:'view',width:'10%',search:true
	},{
		text:'操作',dataIndex:'opt',align:'left',width:150,search:true,renderer:function(v,m,d){
			var s='<div style="padding:10px">',ulx=d.get('utype'),sid=d.get('id'),name=d.get('name'),byurl=d.get('buyurl'),inst=d.get('instkey');
			if(ulx==0){
				s+='<a href="javascript:" onclick="return rock['+index+']._install(0,'+sid+',\''+name+'\',\''+byurl+'\',\''+inst+'\')" class="webbtn">下载安装</a>';
				if(d.get('price')>0)s+='&nbsp;<a class="a" href="'+byurl+'" target="_blank">购买</a>';
			}
			if(ulx==1){
				s+='<font color="#57A81E">已安装</font>';
			}
			if(ulx==2){
				s+='<a href="javascript:" onclick="return rock['+index+']._install(1,'+sid+',\''+name+'\',\''+byurl+'\',\''+inst+'\')" style="background:#D31D42" class="webbtn">↑升级</a>';
			}
			if(ulx==3){
				s+='<font color=red>版本不支持此模块</font>';
			}
			if(ulx==4){
				s+='<font color=#888888>暂未提供安装</font>';
			}
			s+='</div>';
			return s;
		}
	}],
	installarr:[],
	_anzmid:0,
	_anzkey:'',
	_anzname:'',
	startinstall:function(d){
		this.installarr=d.data;
		this._anzmid = d.mid;
		this._anzkey = d.installkey;
		this._anzname = d.modename;
		wins.hide();
		Ext.MessageBox.confirm('系统提示', '验证成功，是否继续马上安装呢？', function(btn){
			if(btn=='yes')grid.startinstalls();
		});
	},
	installsbos:false,
	startinstalls:function(){
		this.installsbos=Ext.MessageBox.show({
			title: '系统提示',
			msg: '安装中请稍后...',
			progressText: '初始中...',
			width:300,
			progress:true,
			closable:false
		});
		js.ajax(js.getajaxurl('startinstall',mode,dir),{
			modeid:this._anzmid,
			installkey:this._anzkey,
			modename:this._anzname,
			updatedt:this.changedata.updatedt
		}, function(s){
			var a = js.decode(s);
			if(a.success){
				grid._startinstalls(0);
			}else{
				js.msg('msg',s.msg);
				Ext.MessageBox.hide();
			}
		},'post');
	},
	_startinstalls:function(oi){
		var d= this.installarr[oi];
		var len = this.installarr.length;
		if(oi>=len){
			Ext.MessageBox.hide();
			js.msg('success','安装成功');
			this.storereload();
			return;
		}
		var zoi = oi+1;
		this.installsbos.updateProgress(zoi/len, '安装中('+len+'/'+zoi+')...');
		js.ajax(js.getajaxurl('startinstallla',mode,dir),{
			fid:d.id,
			updatedt:d.updatedt,
			mid:this._anzmid,
			installkey:this._anzkey
		},function(s){
			var a = js.decode(s);
			if(a.success){
				grid._startinstalls(zoi);
			}else{
				js.msg('msg',a.msg);
				Ext.MessageBox.hide();
			}
		},'post', function(){
			Ext.MessageBox.hide();
			js.msg('msg','内部处理出差');
		});
	},
	_install:function(lx, ids,nas,buurl,kes){
		var lxname = ['安装','升级'][lx];
		if(!wins){
			var cans = winopt({title:'模块'+lxname+'',width:400,items:{
				border:false,tablename:'workbg',url:js.getajaxurl('modeinstall',mode,dir),autoScroll:false,
				xtype:'rockform',submitfields:'mid,state,explain',cancelbool:true,submittext:'提交',
				items:[{
					value:'0',name:'midPost',hidden:true,id:'mid_'+rand+''
				},{
					value:'0',name:'lxPost',hidden:true
				},{
					fieldLabel:'安装模块',value:'',name:'namePost',readOnly:true
				},{
					fieldLabel:'安装key',name:'installkeyPost',xtype:'textareafield',height:60,allowBlank: false,emptyText:'每个模块安装都需要一个key',id:'installkey_'+rand+''
				},{
					xtype:'displayfield',value:'<div style="padding:10px"><font color=red>温馨提示：</font>没有安装key?请先去<span id="bugview_'+rand+'"></span>，您的订单号就是您的安装key，<font color=#888888>免费模块可使用默认key</font>，或者进入<a class="a" href="http://www.rockoa.com/" target="_blank">【RockOA官网】</a>联系我们！</div>'
				}],
				success:function(d, o1){
					grid.startinstall(d.data);
				}
			}});
			wins = Ext.create('Ext.Window',cans);
			this.destroypanel.push(wins);
		}
		wins.show();var form = wins.child('rockform');wins.setTitle('模块'+lxname+'');form.reset();form.setVal('mid', ids);form.setVal('lx', lx);form.setVal('name', nas);
		if(!isempt(kes)){
			form.setVal('installkey', kes);
		}
		$('#bugview_'+rand+'').html('<a class="a" href="'+buurl+'" target="_blank">【购买】</a>');
		return false;
	}
};
return {
	panel:panel,
	init:function(){
		grid = rock[index];
	}
};