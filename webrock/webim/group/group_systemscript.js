function initbody(){
	
	resetw();
	$(window).resize(function(){
		resetw();
	});
	$('body').keydown(guser.onkeyup);
	js.getsplit();
	$('#AltC').click(function(){
		connectclose();
	});
	guser.init();
}

function resetw(){
	var h = winHb();
	if(h<50)return;
	h = h-40-36;
	$('#listcontent').css({height:''+(h)+'px'});
}

var guser = {
	bool:false,
	
	init:function(){
		var i,len = wdarr.length,cont,lex,nas,ids='0',fase;
		for(i= len-1; i>=0; i--){
			lex='left';
			nas= receivename;
			fase= ''+receiveface;
			if(wdarr[i].zt=='0')ids+=','+wdarr[i].id;
			cont 	= jm.uncrypt(wdarr[i].cont);
			if(!isempt(wdarr[i].url))cont+='<br>[A]打开地址&gt;&gt;|'+wdarr[i].url+'[/A]';
			cont	= strformat.showqp(lex,nas,wdarr[i].optdt, cont, '', fase);
			this.addcont(cont);
		}
		if(ids != '0')this.setyd(ids);
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
		var str	= unescape(nr);
		str	= str.replace(/\n/gi, '<br>');
		return str;
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
		if(event.altKey){
			if(code == 67){
				connectclose();
				return false;
			}
		}
		return true;
	}
}