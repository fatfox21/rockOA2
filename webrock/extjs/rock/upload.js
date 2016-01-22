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
	resetdata:function(){
		
	},
	fields:function(cans){
		var me	= this;
		var can = js.apply({
			fieldLabel:'相关文件',heightsss:80,width:'99%',labelAlign: 'right',labelSeparator:':',allowBlank:true,name:'fileidPost',value:'',addText:'新增文件',uptype:'*'
		}, cans);
		var uipd = 'uploadshow_'+js.getrand()+'';
		this._fieldsstore[uipd]={data:[],oldvalue:'',noup:false};
		var name 	= can.name,
			val		= can.value;
		var canss 	= js.apply(can, {name:can.name+'upload',xtype:'displayfield',value:'<div id="view_'+uipd+'" style="height:'+can.heightsss+'px;overflow:auto;line-height:20px;padding:0px" class="x-form-text"></div><div style="padding:3px 0px"><a href="javascript:" onclick="return uploadwindows._upfields(this,\''+uipd+'\', \''+can.addText+'\', \''+can.uptype+'\')" id="add_'+uipd+'"><img src="'+gicons('add')+'" align="absmiddle">&nbsp;'+can.addText+'</a>&nbsp;<span id="count_'+uipd+'"></span></div>'});
		var scan 	= {
			xtype: 'fieldcontainer',layout:'hbox',items:[canss,{
				xtype:'hiddenfield',id:uipd,value:'',name:name,allowBlank:can.allowBlank,loadfile:function(tab,sid, noup){
					me._loadfile(this.id, tab, sid, noup);
				},setNoup:function(bo){
					me._setNoup(this.id, bo);
				},clearData:function(){
					
				},setData:function(a){
					me._backshow(a, this.id);
				}
			}]
		};
		return scan;
	},
	_upfields:function(o1, bid,ties,upt){
		return js.upload('',{showid:bid,title:encodeURI(ties),uptype:upt});
	},
	_fieldsstore:{},
	_backshow:function(a, bid){
		js.downupshow(a, bid);
	},
	_setNoup:function(bid, noup){
		var ado = $('#add_'+bid+'');
		var o1  = $('#view_'+bid+'').find("a[temp='dela']");
		if(noup){
			try{uploadwindow.hide();}catch(e){}
			ado.hide();
			o1.hide();
		}else{
			ado.show();
			o1.show();
		}
	},
	_loadfile:function(bid,tab, sid, noup){
		var me = this;
		me._setNoup(bid, noup);
		var o1 = $('#view_'+bid+'');
		if(isempt(sid) || sid==0){
			o1.html('');
		}else{
			o1.html(js.getmsg('加载文件...', '#ff6600'));
			$.get(js.getajaxurl('getfile','upload','public',{table:tab,mid:sid}), function(da){
				var a = js.decode(da);
				o1.html('');
				me._backshow(a, bid);
				me._setNoup(bid, noup);
			});
		}
	}
});	