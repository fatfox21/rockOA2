var connectbool = false,readfilebo = false,readfilebotime;
function initbody(){
	resetw();
	$(window).resize(function(){
		resetw();
	});
	im.init();
	js.msg('wait','连接中...');
	setTimeout('connectserver()', 1000);
}
function resetw(){
	var h = winHb();
	if(h<50)return;
	$('#webimindex').css({width:winWb()+'px',height:''+h+'px'});
	$('#headercenter').css({height:''+(h-140-1)+'px'});
}
function tabchagne(oi,o1){
	var ia = ['user','group','dengdai'];
	$('.headertab div').removeClass();
	o1.className = 'active';
	for(var i=0;i<3; i++){
		$("img[tabimg='"+i+"']").attr('src', 'images/im/'+ia[i]+'.png');
	}
	$("img[tabimg='"+oi+"']").attr('src', 'images/im/'+ia[oi]+'_blue.png');
	$('#headercenter').find("div[tabdiv]").hide();
	$('#headercenter').find("div[tabdiv='"+oi+"']").show();
}


//请求连接
var connectshiban_time;
function connectserver(){
	try{
		window.external.connectserver(adminid);
	}catch(e){
		js.msg('msg','无法使用!');
	}
	connectshiban_time=setTimeout('connectshiban()', 10*1000);//
	return false;
}
function connectshiban(){
	if(connectbool)return;
	js.msg('msg','无法连接服务器<br><a href="javascript:" onclick="return connectserver();">[重连]</a>',-1);
}

//断开啦
function connectclose(mgss){
	if(!mgss)mgss='连接已经断开了';
	js.msg('msg',''+mgss+'<br><a href="javascript:" onclick="return connectserver();">[重连]</a>',-1);
	connectbool = false;
	clearTimeout(connectshiban_time);
}

//连接成功
function connectchange(su){
	if(su=='success'){
		su = '连接成功';
		js.msg('success',su, 1);
		connectbool = true;
	}else{
		connectbool = false;
		js.msg('msg','Error:'+su+'<br><a href="javascript:" onclick="return connectserver();">[重连]</a>', -1);
	}
	clearTimeout(connectshiban_time);
}

//发送信息
function send(reid, a){
	var s = objecttostr(a);
	return sendstr(reid, s);
}
function sendstr(reid, s){
	return connectsend('send@@@'+adminid+'@@@'+reid+'@@@'+s+'');
}

function objecttostr(a){
	var a1,s='';
	if(!a)a={};
	for(a1 in a){
		s+=','+a1+':"'+a[a1]+'"';
	}
	if(s!='')s = s.substr(1);
	s = jm.encrypt('{'+s+'}');
	return s;
}
function connectsend(msg){
	var bo = false;
	if(!connectbool)return false;
	try{
		bo = window.external.connectsend(msg);
	}catch(e){
		js.msg('msg','暂时无法发送');
		return false;
	}
	return bo;
}


//接收到信息
function connectreceive(sendid, cont){
	if(cont=='online' || cont == 'offline'){
		im.onoffline(sendid, cont);
	}else if(cont=='groupupdate'){
		loadgroup();
	}else{
		var a = js.decode(jm.uncrypt(cont));
		im.receivemess(sendid, a);
	}
}
//其他接收到的内容
function connectreceother(cont){
	
}
//显示提醒窗口
function showapopup(msg, popid, url){
	var bo = false;
	if(!url)url='';
	try{
		window.external.showapopup(msg, popid, url);
		bo = true;
	}catch(e){
		js.getarr(e)
	}
	return bo;
}
//打开新窗口
function windowopen(title, num, url, w, h){
	var bo = false;
	try{
		window.external.open(title, num, url, w, h);
		bo = true;
	}catch(e){}
	return bo;
}

function connectopenurl(url){
	window.open(url);
}


//点击提示打开窗口
function connectpopopen(popid){
	if(get(popid))get(popid).click();
}

//退出关闭
function connectcloseexit(){
	if(!confirm('确定要退出REIM吗？'))return;
	try{
		window.external.formclose();
	}catch(e){
		window.close();
	}	
}

function openrecord(lx, lxid){
	im.openrecord(lx, lxid);
}

function loadgroup(){
	im.loadgroup();
}



var userarr = {},deptarr={},
	grouparr= {};
var im = {
	wdarr:[],
	init:function(){
		this.loadinit();
		this.dingshilas();
	},
	dingshila:function(){
		var dsurl = js.getajaxurl('dingshiup','index','webim',{aid:adminid});
		$.get(dsurl);
		this.dingshilas();
	},
	dingshilas:function(){
		setTimeout('im.dingshila()', 10*60*1000);
	},
	loadinit:function(){
		var url = js.getajaxurl('loadinit','index','webim');
		$.get(url, function(da){
			var a = js.decode(da);
			im.showuser(a.uarr, true);
			im.showgroup(a.garr)
			im.showweidu(a.wdarr);
			im.showdept(a.darr);
		});
	},
	setwd:function(type, aid, oi){
		var i,sot,bo=false;
		for(i=0; i<this.wdarr.length; i++){
			if(this.wdarr[i].type==type && this.wdarr[i].id == aid){
				sot = this.wdarr[i].stotal;
				if(oi==0)sot=0;
				if(oi==1)sot++;
				this.wdarr[i].stotal = sot;
				bo = true;
			}
		}
		if(!bo){
			this.wdarr.push({
				id:aid,type:type,stotal:oi
			});
		}
		this.showweidu(this.wdarr);
	},
	showweidu:function(wda){
		var i,to=0,d=[],a,sto,tylx;
		for(i=0; i<wda.length; i++){
			sto		= parseInt(wda[i].stotal);
			tylx	= wda[i].type;
			if(sto>0){
				to = to + sto;
				if(tylx=='user'){
					a = userarr[wda[i].id];
					if(a){
						wda[i].name  = a.name;
						wda[i].icons = a.face;
					}
				}
				if(tylx=='group' || tylx=='system'){
					a = grouparr[wda[i].id];
					if(a){
						wda[i].name  = a.name;
						wda[i].icons = a.face;
					}
				}
				d.push(wda[i]);
			}
		}
		this.wdarr = d;
		$('#tixingtotal').html(to);
		if(this.showwemenu){
			this.showwemenu.setData(d);
			return;
		}
		if(to>0){
			this.showwemenu = $('#tixingtotalspan').rockmenu({
				data:d,top:24,left:15,width:130,
				resultbody:function(d1, o, oi){
					return '<img src="'+d1.icons+'" class="iconsa">'+d1.name+' <font color=#ff6600>('+d1.stotal+')</font>';
				},
				itemsclick:function(d1){
					if(d1.type=='user'){
						get('user_'+d1.id+'').click();
					}
					if(d1.type=='group' || d1.type=='system'){
						get('group_'+d1.id+'').click();
					}
				}
			});
		}
	},
	showuser:function(a, clab){
		var s = '',i,st,o1,o2,ol,
			o = $('#userlist');
		if(clab)o.html('<span id="userlistonline"></span><span id="userlistoffline"></span>');
		for(i=0; i<a.length; i++){
			ol = a[i].imonline;
			if(!clab)$('#user_'+a[i].id+'').remove();
			s  = this.getusers(a[i]);
			userarr[a[i].id] = a[i];
			o2 = $('#userlist'+this.onlinearr[ol]+'');
			o1 = this.getsort(a[i].name, ol);
			if(o1){
				o1.before(s);
			}else{
				o2.append(s);
			}
		}
		var zt = o.find('div').length;
		$('#total_user').html(''+zt);
		zt = $('#userlistonline').find('div').length;
		$('#total_useronline').html(''+zt);
	},
	//加载组
	loadgroup:function(){
		var url = js.getajaxurl('loadgroup','index','webim');
		$.get(url, function(da){
			var a = js.decode(da);
			im.showgroup(a.garr)
			im.showweidu(a.wdarr);
		});
	},
	showgroup:function(a){
		var s = '',i,lx,
			aimg = ['groups','duihua','shezhi'],
			toa  = [0,0,0];
		for(i=0; i<3; i++){	
			$('#grouplist'+i+'').html('');	
			$('#grouptotal'+i+'').html('(0)');	
		}
		for(i=0; i<a.length; i++){
			lx	= a[i].type;
			$('#group_'+a[i].id+'').remove();
			s	= '<div id="group_'+a[i].id+'"  onclick="im.opengroup('+a[i].id+')"><img src="images/im/'+aimg[lx]+'.png" align="absmiddle">'+a[i].name+'</div>';
			a[i].face = 'images/im/'+aimg[lx]+'_blue.png';
			grouparr[a[i].id] = a[i];
			toa[lx]++;
			$('#grouptotal'+lx+'').html('('+toa[lx]+')');
			$('#grouplist'+lx+'').append(s);
		}
	},
	hidealislist:function(oi, o1){
		$('#grouplist'+oi+'').toggle();
		var src = 'xiangyou';
		if(get('grouplist'+oi+'').style.display != 'none')src = 'xiangyou1';
		$(o1).find('img').attr('src','images/im/'+src+'.png');
	},
	getusers:function(a){
		var s,st;
		st = '';
		if(a.imonline !=1 )st='offline';
		s = '<div class="'+st+'" id="user_'+a.id+'" onclick="im.openuser('+a.id+')"><img src="'+a.face+'" align="absmiddle">'+a.name+' <span style="font-size:12px">('+a.ranking+')</span></div>';
		return s;
	},
	onlinearr:['offline','online'],
	openuser:function(uid){
		var bo = false,
		winobj = 'windowuser'+uid+'',
			a  = userarr[uid];;
		var url = URL+js.getajaxurl('@','user','webim',{uid:uid,aid:adminid,winobj:winobj});
		bo = windowopen(a.name, winobj, url, 550, 500);
		if(bo){
			this.setwd('user', uid, 0);
		}
	},
	opengroup:function(gid){
		var bo = false,width = 550,types = 'group',
			a  = grouparr[gid],
			na = a.name;
		var winobj = 'windowgroup'+gid+'';
		var url = URL+js.getajaxurl('@','group','webim',{gid:gid,aid:adminid,winobj:winobj});
			
		if(a.type=='2'){
			url = URL+js.getajaxurl('@system','group','webim',{gid:gid,aid:adminid,winobj:winobj});
			width = 400;
			types = 'system';
		}
		bo = windowopen(na, winobj, url, width, 500);
		if(bo){
			this.setwd(types, gid, 0);
		}
	},
	onoffline:function(uid, lx){
		var a = userarr[uid];
		var ol= 0,o2,o1,s;
		if(lx=='online')ol=1;
		if(a){
			if(a.imonline != ol){
				a.imonline = ol;
				im.showuser([a], false);
			}
		//不存在	
		}else{
			$.get(js.getajaxurl('getuserone','index','webim',{sholauid:uid}), function(da){
				var a = js.decode(da);
				im.showuser(a, false);
			});
		}
		var o = $("div[userid='"+uid+"']");
		o.removeClass();
		if(ol==0)o.addClass('offline');
	},
	getsort:function(na, lx){
		var o  = $('#userlist'+this.onlinearr[lx]+'').find('div');
		var i,len = o.size(),o1,nas='',o2 = false;
		for(i=0; i<len; i++){
			o1 = $(o[i]);
			nas= o1.text();
			if(na.localeCompare(nas)<0){
				o2 = o1;
				break;
			}
		}
		return o2;
	},
	
	//接收到信息处理
	receivemess:function(sendid, d){
		var a 	= userarr[sendid];
		var lx 	= d.type;
		var ops = false,num;
		
		//一对一
		if(lx == 'user'){
			num			= 'windowuser'+sendid+'';
			d.sendid   	= sendid;
			d.sendname 	= a.name;
			d.face		= a.face;
			try{
				ops = window.external.runwinopen(num, "connectreceive", objecttostr(d),'');
			}catch(e){}
			if(ops){
				window.external.winfocus(num);
			}else{
				showapopup('人员['+a.name+']，发来一条信息', 'user_'+sendid+'');
				this.setwd('user', sendid, 1);
			}
		}
		
		//群讨论组
		if(lx == 'group'){
			num			= 'windowgroup'+d.gid+'';
			d.sendid   	= sendid;
			d.sendname 	= a.name;
			d.face		= a.face;
			try{
				ops = window.external.runwinopen(num, "connectreceive", objecttostr(d),'');
			}catch(e){}
			var garr= grouparr[d.gid];
			if(ops){
				window.external.winfocus(num);
			}else{
				showapopup('人员['+a.name+']，发来一条信息，来自['+garr.name+']', 'group_'+d.gid+'');
				this.setwd('group', d.gid, 1);
			}
		}
		//发送格式{cont:'',gid:'1',gname:'名称',type:'system', now:'',url:'}
		if(lx == 'system'){
			num			= 'windowgroup'+d.gid+'';
			d.sendid   	= d.gid;
			d.sendname 	= d.gname;
			d.face		= 'images/im/shezhi_blue.png';
			try{
				ops = window.external.runwinopen(num, "connectreceive", objecttostr(d),'');
			}catch(e){}
			var garr= grouparr[d.gid];
			if(!garr)this.loadgroup();
			if(ops){
				window.external.winfocus(num);
			}else{
				showapopup('系统发来一条信息，来自['+d.gname+']', 'group_'+d.gid+'', d.url);
				this.setwd('system', d.gid, 1);
			}
		}
	},
	openrecord:function(lx, lxid){
		if(!lx)lx='';
		if(!lxid)lxid='';
		var num			= 'openrecord';
		var url = URL+js.getajaxurl('@','record','webim',{aid:adminid,stype:lx,sid:lxid});
		var bo 	= windowopen('信息记录管理', num, url, 750, 450);
		var sid = ''+lx+'_'+lxid+'';
		if(lx=='')return;
		if(!lxid)lxid='';
		try{
			window.external.runwinopen(num, "openrecord", lx, lxid);
		}catch(e){}
	},
	
	showdept:function(a){
		var s = this.showdept1(a,0);
		$('#grouplist3').html(s);
	},
	showdept1:function(a, oi){
		var i,s='',s1='',st,j=0,facea;
		if(a){
		for(i=0; i<a.length; i++){
			s1 = this.showdept1(a[i].children, oi+1);
			st = '';
			if(a[i].imonline !=1 && a[i].type=='u'){
				st='class="offline"';
			}	
			if(a[i].type=='u'){
				st+=' userid="'+a[i].uid+'"';
			}else{
				deptarr[a[i].did] = a[i];
			}
			facea = a[i].face;
			if(isempt(facea)){
				facea='images/im/filess.png';
				if(s1=='')facea='images/im/file.png';
			}	
			s+='<div '+st+' id="dept_'+a[i].id+'" ondblclick="im.opendept(\''+a[i].id+'\')">';
			for(j=0;j<oi;j++)s+='<img src="images/white.gif" align="absmiddle">';
			if(a[i].type=='u'){
				s+='<img src="'+facea+'" align="absmiddle">';
			}else{
				s+='<img src="'+facea+'" onclick="im.openadept(\''+a[i].id+'\')" align="absmiddle">';
			}
			s+=''+a[i].name+'</div>';
			if(s1!=''){
				s+='<span style="display:none" id="downdept_'+a[i].id+'">'+s1+'</span>';
			}
		}}
		return s;
	},
	opendept:function(sid){
		var t = sid.substr(0, 1),
		   id1= sid.substr(1);
		if(t=='u'){
			this.openuser(id1);
		}else{
			
		}
	},
	openadept:function(sid){
		$('#downdept_'+sid+'').toggle();
	},
	
	createlun:function(){
		var o = js.xpbody();
		var w = 150,h=200;
		var l=(winWb()-w-10)*0.5,t=(winHb()-h-50)*0.5;
		var s = '<div id="yaoqingla" style="position:absolute;background-color:#ffffff;left:'+l+'px;width:'+w+'px;top:'+t+'px;z-index:90;box-shadow:0px 0px 10px rgba(0,0,0,0.3);padding:15px">';
		s+='<div>创建讨论组名称：</div>';
		s+='<div style="padding:10px"><input id="keylasou" maxlength="15" style="line-height:26px;height:30px;border:1px #cccccc solid;background-color:white;width:120px;padding:0px 5px"></div>';
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
			var url = js.getajaxurl('createlun','index','webim', {aid:adminid});
			js.setmsg('创建中...','', 'msgview_yaoqing');
			$.post(url,{val:v}, function(da){
				if(da.indexOf('success')==0){
					js.msg('success','创建成功');
					$('#yaoqingla').remove();
					o.remove();
					im.loadgroup();
				}else{
					js.setmsg(da,'red', 'msgview_yaoqing');
				}
			});
		});
		get('keylasou').focus();
		return false;
	}
}