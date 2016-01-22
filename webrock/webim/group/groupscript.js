function initbody(){
	get('content').focus();
	resetw();
	$(window).resize(function(){
		resetw();
	});
	$('body').keydown(guser.onkeyup);
	js.getsplit();
	$('#AltC').click(function(){
		connectclose();
	});
	$('#AltS').click(function(){
		guser.send();
	});
	$('#fileid').change(function(){
		upload.change(this);
	});
	$("a[tools]").click(function(){
		guser.clicktools(this);
	});
	//$(window).focus(function(){
		//upload.clipover();
	//});
	$('body').click(function(e){
		upload.downbody(this, e);
	});
	guser.init();
}

function resetw(){
	var h = winHb();
	if(h<50)return;
	h = h-40-100-36-30;
	$('#listcontent').css({height:''+(h)+'px'});
}

var guser = {
	bool:false,
	
	init:function(){
		var i=0,len = wdarr.length,cont,lex,nas,ids='0',fase;
		for(i= len-1; i>=0; i--){
			lex = 'right';
			nas = '我';
			fase= ''+adminface;
			if(wdarr[i].sendid!=adminid){
				lex='left';
				nas= wdarr[i].sendname;
				fase= wdarr[i].sendface;
			}
			if(wdarr[i].zt=='0')ids+=','+wdarr[i].id;
			cont= strformat.showqp(lex,nas,wdarr[i].optdt, jm.uncrypt(wdarr[i].cont),'', fase);
			this.addcont(cont);
		}
		if(ids != '0')this.setyd(ids);
		if(wdarr.length>0)$('#listcontent').append('<div style="padding:10px;color:#aaaaaa;font-size:12px" align="center">---------↑以上是历史记录---------</div>');
	},
	
	addcont:function( cont){
		var o	= $('#listcontent');
		o.append(cont);
		clearTimeout(this.scrolltime);
		this.scrolltime	= setTimeout(function(){
			if(get('listcontent'))o.animate({scrollTop:get('listcontent').scrollHeight},100);
		}, 50);
	},
	strcont:function(nr){
		var str	= strformat.strcont(nr);
		return str;
	},
	now:function(){
		return js.serverdt();
	},
	send:function(ssnr){
		js.setmsg('');
		if(this.bool)return;
		var o	= $('#content');
		var nr	= strformat.sendinstr(o.val());
		nr		= nr.replace(/</gi,'&lt;').replace(/>/gi,'&gt;');
		if(ssnr)nr=ssnr;
		if(isempt(nr))return false;
		var conss = jm.encrypt(nr);
		if(conss.length>3990){
			js.setmsg('发送内容太多了');
			return;
		}
		var nuid= js.now('time');
		var now	= this.now();
		var cont= strformat.showqp('right','我',now, nr, nuid, adminface);
		this.addcont(cont);
		o.val('');
		o.focus();
		var data = {
			cont:conss,
			nuid:nuid,
			optdt:now,
			sendid:adminid,
			receid:receiveid,
			type:infortype
		};
		this.bool = true;
		$.ajax({
			url:js.getajaxurl('save','group','webim'),
			data:data,
			type:'post',
			success:function(da){
				var a = js.decode(da);
				guser.sendsuccess(a,nr, nuid);
			},
			error:function(){
				guser.senderror(nuid);
			}
		});
		return false;
	},
	senderror:function(nuid){
		this.bool = false;
		get(nuid).src='images/error.png';
		get(nuid).title='发送失败';
	},
	sendsuccess:function(d,nr, nuid){
		this.bool = false;
		if(!d.id){
			this.senderror(nuid);
			return;
		}
		$('#'+d.nuid+'').remove();
		var bo = true;
		try{
			if(d.receid != ''){
				bo = send(d.receid, {
					cont:nr,
					type:d.type,
					now:d.optdt,
					messid:d.id,
					gid:d.gid
				});
			}
		}catch(e){}
		if(!bo){
			js.msg('msg','信息不能及时推送，但已保存到服务器');
		}
	},
	//接收到内容
	receivemess:function(d){
		var cont= strformat.showqp('left',d.sendname,d.now, d.cont, '', d.face);
		this.addcont(cont);
		this.setyd(d.messid);
	},
	
	//更新为已读
	setyd :function(s){
		$.post(js.getajaxurl('setyd','user','webim'),{ids:s,receid:adminid});
	},
	
	onkeyup:function(evtnt){
		var code	= event.keyCode;
		if(code==27){
			connectclose();
			return false;
		}
		if(event.ctrlKey){//Ctrl+Enter发送
			if(code == 13){
				guser.send();
				return false;
			}
		}
		if(event.altKey){
			if(code == 83){
				guser.send();
				return false;
			}
			if(code == 67){
				connectclose();
				return false;
			}
		}
		return true;
	},
	clicktools:function(o1){
		var o = $(o1);
		var lx= o.attr('tools');
		if(lx=='image' || lx=='file'){
			if(upload.bool){
				js.msg('msg','太快了?请稍后在试!');
				return;
			}
			upload.uptype = lx;
			get('fileid').click();
		}
		if(lx=='clear'){
			$('#listcontent').html('');
		}
		if(lx == 'crop'){
			upload.cropScreen();
		}
		if(lx == 'cropput'){
			upload.readclip();
		}
		if(lx=='emts'){
			upload.getemts(o);
		}
		if(lx=='jilu'){
			openerrunscript('openrecord','group', receiveid);
		}
	},
	//退出讨论组
	exit:function(){
		if(!confirm('确定要退出此讨论组吗？'))return false;
		js.msg('wait','退出处理中...');
		var url = js.getajaxurl('exitgroup','group','webim', {aid:adminid,gid:receiveid});
		$.get(url, function(da){
			openerrunscript('loadgroup', '', '');
			connectclose();
		});
		return false;
	},
	yaoqing:function(){
		var o = js.xpbody();
		var w = 250,h=200;
		var l=(winWb()-w-10)*0.5,t=(winHb()-h-50)*0.5;
		var s = '<div id="yaoqingla" style="position:absolute;background-color:#ffffff;left:'+l+'px;width:'+w+'px;top:'+t+'px;z-index:90;box-shadow:0px 0px 10px rgba(0,0,0,0.3);padding:15px">';
		s+='<div>请输入邀请人员姓名(多人,分开)：</div>';
		s+='<div style="padding:10px"><input id="keylasou" style="line-height:26px;height:30px;border:1px #cccccc solid;background-color:white;width:200px;padding:0px 5px"></div>';
		s+='<div style="padding:10px"><a class="webbtn" onclick="return false" id="yaoqingbtn" href="javascript:">确定</a>&nbsp;<span id="msgview_yaoqing"></span></div>';
		s+='</div>';
		$('body').append(s);
		o.click(function(){
			$('#yaoqingla').remove();
			o.remove();
		});
		$('#yaoqingbtn').click(function(){
			var v = get('keylasou').value;
			if(v==''){
				js.setmsg('没有输入','red', 'msgview_yaoqing');
				return;
			}
			var url = js.getajaxurl('yaoqing','group','webim', {gid:receiveid});
			js.setmsg('邀请中...','', 'msgview_yaoqing');
			$.post(url,{val:v}, function(da){
				if(da.indexOf('success')==0){
					var uids = da.replace('success','');
					js.msg('success','邀请成功');
					$('#yaoqingla').remove();
					o.remove();
					if(uids != ''){
						sendstr(uids, 'groupupdate');//群更新
						location.reload();
					}
				}else{
					js.setmsg(da,'red', 'msgview_yaoqing');
				}
			});
		});
		return false;
	}
}