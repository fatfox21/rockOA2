/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.upload',{
	uploadbool:false,
	upsize:1024*200,
	zonglen:0,
	constructor: function(config){
		this.initConfig(config);
	},
	//导入的
	importsbool:false,
	imports:function(cans){
		if(this.importsbool)return;
		var can = js.apply({title:'导入Excel',url:'',callback:function(){}}, cans);
		var lx	= 0;
		var me	= this;
		if(typeof(importwindow)!='object'){
			var cansa = winopt({title: '上传',width:350,icon:gicons('page_excel'),modal:true,border:false,items:{
					frame:false,anchor:'99%',layout:'anchor',border:true,
					xtype:'form',items:[{
						xtype:'filefield',fieldLabel:'文件',allowBlank: false,anchor: '100%',name:'file',buttonText: '选择Excel文件',labelAlign: 'right',labelSeparator:' ',padding:5,labelWidth:70,listeners:{
							change:function(o){
								me._impchange(o);
							}
						}
					}],
					buttons: [{
						itemId:'msg',xtype:'tbtext'
					},{
						text: '导入',formBind: true,icon:gicons('ok'),
						handler: function() {
							var form = this.up('form').getForm();
							if(form.isValid()){
								me._importssave(form);
							}
						}
					}]
				}	
			});
			importwindow = Ext.create('Ext.Window',cansa);
			lx=1;
		}
		me.importcan = can;
		importwindow.setTitle(can.title);
		importwindow.show();
		if(lx==1){
			me._importmsg = importwindow.down('#msg');
		}
		me._importmsg.setText('');
	},
	_impchange:function(o){
		var vla		= o.value;
		var type	= vla.substr(vla.lastIndexOf('.')+1).toLowerCase();
		if(type!='xls' && type!='xlsx'){
			o.reset();
			this._importmsg.setText(js.getmsg('选择的不是Excel文件','red'));
		}else{
			this._importmsg.setText('');
		};
	},
	_importssave:function(form){
		var me = this;
		if(me.importsbool)return;
		var msg= me._importmsg;
		me.importsbool = true;
		msg.setText(js.getmsg('导入中...','#ff6600'));
		form.submit({
			url:me.importcan.url,
			method:'POST',
			success:function(f,o){
				me.importsbool=false;
				msg.setText(js.getmsg(o.result.msg,'green'));
				me.importcan.callback();
			},
			failure:function(f,o){
				me.importsbool=false;
				msg.setText(js.getmsg('导入失败','red'));
			}
		});
	},
	
	can:{},
	show:function(cans){
		if(this.uploadbool)return;
		var me = this,lx = 0;
		me.can = js.apply({
			maxsize:50,maxup:0,uptype:'*',savepath:'',oktype:'',initdata:false,callback:function(){},thumbnail:'',title:'上传',thumbtype:0,savetype:'file'
		},cans);
		if(typeof(uploadwindow)!='object'){
			var cans = winopt({title: '上传',width:570,icon:gicons('arrow_up'),modal:true,border:false,items:{
					height:300,region:'center',xtype:'grid',hideHeaders:false,
					tbar:[{
						text:'添加文件',icon:gicons('add'),handler:function(){me._add()},itemId:'add'
					},{
						xtype:'tbtext',itemId:'msg',text:'双击可删除已添加文件'
						
					},'<input type="file" multiple id="rockupload_file" style="display:none">','->',{
						text:'取消',icon:gicons('cancel'),handler:function(){me._cancel()},disabled:true,itemId:'cancel'
					},'-',{
						text:'暂停',icon:gicons('stop'),handler:function(){me._stop()},disabled:true,itemId:'stop'
					},'-',{
						text:'开始上传',icon:gicons('arrow_up'),disabled:true,itemId:'start',handler:function(){me._start()}
					}],
					dockedItems: {
						xtype: 'toolbar',layout:'fit',dock: 'bottom',hidden:true,itemId:'pbars',
						items: [{
							xtype:'progressbar',text:'上传中...',itemId:'pbar'
						}]
					},
					store:Ext.create('Ext.data.Store',{
						fields:['id','filename','fileext','filesize','filesizecn','status','filecont','fileobj','filetype','filepath','thumbpath','width','height','newfile'],
						data:[],
						listeners:{
							datachanged:function(){
								me._changteadd();
							}
						}
					}),
					columns:[{
						xtype: 'rownumberer',width:40	
					},{
						text:'类型',dataIndex:'fileext',width:80,align:'center',menuDisabled:true,sortable:false,renderer:function(v){
							return '<img src="mode/fileicons/'+v+'.gif" height=16 width=16>';
						}
					},{
						text:'文件名',dataIndex:'filename',flex:1,menuDisabled:true,sortable:false
					},{
						text:'大小',dataIndex:'filesizecn',width:90,align:'center',menuDisabled:true,sortable:false
					},{
						text:'状态',dataIndex:'status',width:90,align:'center',menuDisabled:true,sortable:false,renderer:function(v){
							var zt = [['blue','待上传'],['#800000','读取中...'],['#ff6600','上传中...'],['red','上传失败'],['green','上传成功'],['#07918C','取消上传'],['#ff6600','读取失败']];
							return '<font color='+zt[v][0]+'>'+zt[v][1]+'</font>';
						}
					}],
					listeners:{
						itemdblclick:function(o, res){
							me._dels(res);
						}
					}
				},
				buttons:[{
					text:'确定',icon:gicons('ok'),handler:function(){me._ok()}
				}]
			});	
			uploadwindow = Ext.create('Ext.Window',cans);
			lx=1;
			me._wintitle = me.can.title;
		}
		uploadwindow.show();
		uploadwindow.setTitle(me.can.title);
		if(lx == 1){
			$('#rockupload_file').change(function(){
				me._changadd(this);
			});
			me._store = uploadwindow.down('grid').getStore();
			me.btnobj = {
				start:uploadwindow.down('#start'),
				add:uploadwindow.down('#add'),
				msg:uploadwindow.down('#msg'),
				pbar:uploadwindow.down('#pbar'),
				pbars:uploadwindow.down('#pbars'),
				stop:uploadwindow.down('#stop'),
				cancel:uploadwindow.down('#cancel')
			};
		}
		if(me.can.maxup>0)me.btnobj.msg.setText('最多可添加'+me.can.maxup+'个文件');
		if( (me.can.initdata && lx ==0) || me._wintitle != me.can.title ){
			me._store.removeAll();
		}
		me._isnowshopand();
		me._wintitle = me.can.title;
	},
	_isnowshopand:function(){
		var me = this;
		if(typeof(FileReader)=='undefined'){
			me.btnobj.msg.setText('<font color=red>不支持此功能,建议用Firefox,IE9+,Chrome</font>');
			me.btnobj.add.setDisabled(true);
			me.btnobj.cancel.hide();
		}
	},
	_setv:function(oi,f,v){
		var res=this._store.getAt(oi);
		res.set(f, v);
		res.commit(false);
	},
	_changteadd:function(){
		if(!this._store || this.uploadbool)return;
		var len = this._store.data.items.length,max = this.can.maxup,s='',bo=true,i,oi=0;
		for(i=0;i<len;i++)if(this._store.data.items[i].data.status==0)oi++;
		if(oi>0)bo=false;
		this.btnobj.start.setDisabled(bo);
		if(max>0){
			this.btnobj.add.setDisabled(max<=len);
			s='/'+max+'';
		}else{
			this.btnobj.add.setDisabled(false);
		}
		this.btnobj.msg.setText('已添加'+len+''+s+'个文件');
		this.zonglen = len;
		this._qiehuast(0);
		this.btnobj.cancel.setDisabled(true);
		this._isnowshopand();
	},
	_del:function(oi){
		if(this.uploadbool)return;
		var rec = this._store.getAt(oi);
		this._store.remove(rec);
	},
	_dels:function(rec){
		if(this.uploadbool)return;
		var id = rec.data.id;
		if(isempt(id)){
			this._store.remove(rec);
		}else{
			if(!confirm('确定要删除文件吗？'))return;
			this._store.remove(rec);
			$.get(js.getajaxurl('delfile','upload','public',{id:id}));
		}
	},
	_add:function(){
		if(this.uploadbool)return;
		get('rockupload_file').click();
	},
	_start:function(){
		this.btnobj.add.setDisabled(true);
		this.btnobj.start.setDisabled(true);
		this.btnobj.cancel.setDisabled(false);
		this._qiehuast(1);
		this.uploadbool = true;
		this.stopbool	= false;
		this.btnobj.pbars.show();
		this._starts(0);
	},
	_qiehuast:function(oi){
		var o = this.btnobj.stop;
		if(oi==0){
			o.setDisabled(true);
		}
		if(oi==1){
			o.setDisabled(false);
			o.setText('暂停');
			o.setIcon(gicons('stop'));
		}
		if(oi==2){
			o.setDisabled(false);
			o.setText('继续');
			o.setIcon(gicons('control_pause'));
		}
	},
	_stop:function(){
		this.btnobj.stop.setDisabled(true);
		if(!this.stopbool){
			this._qiehuast(2);
			this.stopbool = true;
		}else{
			this._qiehuast(1);
			this.stopbool = false;
			this._startsss(this.upoj+1,this.upoi, this.upresult);
		}
	},
	_cancel:function(){
		var me=this;
		me.uploadbool = false;
		me.btnobj.pbar.updateProgress(0,'已取消上传');
		me._setv(me.upoi, 'status',5);
		setTimeout(function(){me.btnobj.pbars.hide();}, 1000);
		me._changteadd();
	},
	_starts:function(oi){
		var a,me=this,d,len;
		len = this.zonglen;
		this.upoi = oi;
		if(oi==len){
			me.uploadbool = false;
			me.btnobj.pbar.updateProgress(1,'全部上传完成');
			setTimeout(function(){me.btnobj.pbars.hide();}, 1000);
			me._changteadd();
			return;
		}
		a = this._store.data.items[oi];
		d = a.data;
		if(d.status!=0){
			me._starts(oi+1);
			return;
		}
		
		me.nowarr = d;
		me._setv(oi, 'status',1);
		this.btnobj.pbar.updateProgress(0,'读取['+d.filename+']...');
		try{
			var reader		= new FileReader()
			reader.readAsDataURL(d.fileobj);
			reader.onload=function(){
				var cont= this.result;
				cont	= cont.substr(cont.indexOf(',')+1);	
				me._setv(oi, 'status',2);
				me.btnobj.pbar.updateProgress(0,'上传['+d.filename+'](0%)...');
				me.nowarr.filecout = cont;
				me._startsss(0, oi);
			}
		}catch(e){
			me._setv(oi, 'status',6);
			me._starts(oi+1);
		}
	},
	_startsss:function(oj, oi, ba){
		if(this.stopbool || !this.uploadbool)return;
		var me = this,arr = me.nowarr;
		this.upoj = oj;
		if(oj==0){
			var len		= me.nowarr.filecout.length;
			me.maxsend= Math.ceil(len/me.upsize);
		}
		//完成了
		if(oj>=this.maxsend){
			me._setv(oi, 'status',4);
			me._setv(oi, 'id',ba.msg);
			me._setv(oi, 'filepath',ba.filepath);
			me._setv(oi, 'thumbpath',ba.thumbpath);
			me._starts(oi+1);
			return false;
		}
		
		var bil		= js.float(((oj+1)/this.maxsend)*100);
		me.btnobj.pbar.updateProgress(bil/100,'上传['+arr.filename+']('+bil+'%)...');
		
		var cont	= arr.filecout;
		var sendcont= cont.substr(oj*me.upsize, me.upsize);
		var mkdir	= js.now('Y-m');
		
		var data	= {sendcont:sendcont,filename:arr.filename,maxsend:this.maxsend,sendci:oj,filetype:arr.filetype,fileext:arr.fileext,filesize:arr.filesize,filesizecn:arr.filesizecn,mkdir:mkdir,newfile:arr.newfile,savepath:me.can.savepath,thumbnail:me.can.thumbnail,maxwidth:0,thumbtype:me.can.thumbtype,savetype:me.can.savetype};
		$.ajax({
			url:'mode/upload/uploadajax.php?action=send&rnd='+Math.random()+'&p='+PROJECT+'',
			data:data,
			type:'post',
			success:function(da){
				var result	= js.decode(da);
				me.upresult = result;
				if(!result.success){
					me._shibaila(oi);
				}else{
					if(me.uploadbool)me.btnobj.stop.setDisabled(false);
					me._startsss(oj+1, oi, result);
				}
			},
			error:function(){
				me._shibaila(oi);
			}
		});
	},
	_shibaila:function(oi){
		var me = this;
		me._setv(oi, 'status',3);
		me.uploadbool = false;
		setTimeout(function(){me.btnobj.pbars.hide();}, 1000);
		me._changteadd();
	},
	_changadd:function(o1){
		var me 		= this,
			obja	= o1.files;
			
		var i,file,filesize,filesizecn,filename,fileext,filetype,max=me.can.maxup;
		for(i=0;i<obja.length && i<10;i++){
			file		= obja[i];
			filesize	= file.size;
			filesizecn	= me.formatsize(filesize);
			filename	= file.name;
			filetype	= file.type;
			fileext		= filename.substr(filename.lastIndexOf('.')+1).toLowerCase();
			if(me._isaddle(filename, filesize)){
				js.msg('msg',''+filename+'文件已添加过了');
				break;
			}
			var addbo=true;
			var uptype = me.can.uptype;
			if(uptype!='*'){
				var uobo = true;
				if(uptype=='image'){
					if(filetype.indexOf('image')<0)uobo=false;
				}else{
					var auptsype	= '|'+uptype+'|';
					if(auptsype.indexOf('|'+fileext+'|')<0)uobo=false;
				}
				if(!uobo){
					var tstype = uptype;
					if(tstype=='image')tstype='jpg,png,gif,bmp,jpeg';
					js.msg('msg','['+filename+']文件类型不符合，请选择类型为['+tstype+']的文件');
					addbo = false;
				}
			}
		
			if(filesize>me.can.maxsize*1024*1024){
				js.msg('msg','['+filename+']文件超过'+me.can.maxsize+' MB，当前文件大小'+filesizecn+'');
				addbo = false;
			}
			
			if(addbo){
				var id = 'rand_'+js.getrand();
				var len= me._insert({fileobj:file,filename:filename,fileext:fileext,filesizecn:filesizecn,filesize:filesize,status:0,newfile:js.getrand()});
				if(max>0&&len+1>=max)return;
			}
		}
	},
	_insert:function(da){
		var len = this._store.data.items.length;
		this._store.insert(len,da);
		return len;
	},
	_isaddle:function(name,size){
		var a = this._store.data.items,i,bo=false;
		for(i=0; i<a.length; i++){
			if(a[i].data.filename==name && a[i].data.filesize==size){
				bo = true;
				break;
			}
		}
		return bo;
	},
	formatsize:function(size){
		var arr = new Array('Byte', 'KB', 'MB', 'GB', 'TB', 'PB');
		var e	= Math.floor(Math.log(size)/Math.log(1024));
		var fs	= size/Math.pow(1024,Math.floor(e));
		return js.float(fs)+' '+arr[e];
	},
	_ok:function(){
		if(this.uploadbool){
			js.msg('msg','正在上传,请稍后');
			return;
		}
		var b = [],a = this._store.data.items,sid='';
		for(i=0; i<a.length; i++){
			if(a[i].data.status==4){
				b.push(a[i].data);
				sid+=', '+a[i].data.id+'';
			}
		}
		if(sid!='')sid = sid.substr(1);
		uploadwindow.hide();
		if(this.can.oktype=='clear'){
			this._store.removeAll();
		}
		this.can.callback(b, this, sid);
	},
	
	_resetdata:false,
	_olduipd:'',
	fields:function(cans){
		var me	= this;
		var can = js.apply({
			fieldLabel:'相关文件',width:'99%',labelAlign: 'right',labelSeparator:':',allowBlank:true,name:'fileidPost',value:'',addText:'新增文件'
		}, cans);
		var uipd = 'uploadshow_'+js.getrand()+'';
		this._fieldsstore[uipd]={data:[],oldvalue:'',noup:false};
		var name 	= can.name,
			val		= can.value;
		var canss 	= js.apply(can, {name:can.name+'upload',xtype:'displayfield',value:'<div id="view_'+uipd+'" style="width:100%;height:70px;overflow:auto;line-height:20px;padding:0px" class="x-form-text"></div><div style="padding:3px 0px"><a href="javascript:" onclick="return uploadwindows._upfields(this,\''+uipd+'\')" id="add_'+uipd+'"><img src="'+gicons('add')+'" align="absmiddle">&nbsp;'+can.addText+'</a>&nbsp;<span id="count_'+uipd+'"></span></div>'});
		var scan 	= {
			xtype: 'fieldcontainer',layout:'hbox',items:[canss,{
				xtype:'hiddenfield',id:uipd,value:'',name:name,allowBlank:can.allowBlank,loadfile:function(tab,sid, noup){
					me._loadfile(this.id, tab, sid, noup);
				},setNoup:function(bo){
					me._setNoup(this.id, bo);
				},clearData:function(){
					me._fieldsstore[this.id].data=[];
					me.resetdata(true);
				}
			}]
		};
		return scan;
	},
	resetdata:function(bo){
		this._resetdata = bo;
	},
	_upfields:function(o1, bid){
		var me = this;
		var oli= me.can.backid;
		if(this._fieldsstore[bid].noup)return;
		if(me._olduipd != bid)me.resetdata(true);
		uploadwindows.show({
			callback:function(a,o){
				me._backshow(a,o.can.backid);
			},backid:bid
		});
		if(me._resetdata)me.loadfilestore(bid);
		me._olduipd = bid;
		return false;
	},
	_fieldsstore:{},
	_backshow:function(a, bid){
		var s = '',i=0,s1='';
		for(i=0; i<a.length; i++){
			s+='<div onmouseover="this.style.backgroundColor=\'#f1f1f1\'" onmouseout="this.style.backgroundColor=\'\'" style="padding:4px 5px;border-bottom:1px #eeeeee solid">'+(i+1)+'、<a class="a" onclick="return js.downshow('+a[i].id+')" href="javascript:">'+a[i].filename+'</a> ('+a[i].filesizecn+')';
			s+='</div>';
			s1+=','+a[i].id;
		}
		$('#view_'+bid+'').html(s);
		$('#count_'+bid+'').html('');
		if(i>0)$('#count_'+bid+'').html('<font style="font-size:11px" color="#555555">文件:'+i+'</font>');
		this._fieldsstore[bid].data = a;
		if(s1!='')s1=s1.substr(1);
		this._fieldsstore[bid].oldvalue = s1;
		getcmp(bid).setValue(s1);
	},
	clear:function(bid){
		if(this.uploadbool)return;
		this._store.removeAll();
		getcmp(bid).setValue('');
	},
	loadfilestore:function(bid){
		var a = this._fieldsstore[bid].data;
		this._store.loadData(a);
		this._resetdata = false;
	},
	_setNoup:function(bid, noup){
		this._fieldsstore[bid].noup = noup;
		var ado = $('#add_'+bid+'');
		if(noup){
			try{uploadwindow.hide();}catch(e){}
			ado.hide();
		}else{
			ado.show();
		}
	},
	_loadfile:function(bid,tab, sid, noup){
		var me = this;
		me._setNoup(bid, noup);			
		if(isempt(sid)){
			me._fieldsstore[bid].data=[];
		}else{
			$('#view_'+bid+'').html(js.getmsg('加载文件...', '#ff6600'));
			$.get(js.getajaxurl('getfile','upload','public',{table:tab,mid:sid}), function(da){
				var a = js.decode(da);
				me._resetdata = true;
				me._backshow(a, bid);
			});
		}
		me._resetdata = true;
	}
});	