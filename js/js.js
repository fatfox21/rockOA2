var MODE	= '',ACTION = '',DIR='',PROJECT='',HOST='',PARAMS='',QOM='';
var windows	= null;
function initbody(){}
function globalbody(){}
$(document).ready(function(){
	$(window).scroll(js.scrolla);
	$(window).unload(function(){
		js.onunload();
	});
	try{
		var winobj = js.request('winobj');
		if(winobj!='')opener.js.openarr[winobj]=window;
	}catch(e){}
	globalbody();
	initbody();
});
var gg={};
var js={path:'index',url:'',bool:false,login:{},initdata:{},scroll:function(){}};
var isIE=true;
if(!document.all)isIE=false;
var get=function(id){return document.getElementById(id)};
var isempt=function(an){var ob	= false;if(an==''||an==null||typeof(an)=='undefined'){ob=true;}return ob;}
var strreplace=function(str){if(isempt(str))return '';return str.replace(/[ ]/gi,'').replace(/\s/gi,'')}
var strhtml=function(str){if(isempt(str))return '';return str.replace(/\</gi,'&lt;').replace(/\>/gi,'&gt;')}
var form=function(an,fna){if(!fna)fna='myform';return document[fna][an]}
var xy10=function(s){var s1=''+s+'';if(s1.length<2)s1='0'+s+'';return s1;};
js.getarr=function(caa,bo){
	var s='';
	for(var a in caa)s+=' @@ '+a+'=>'+caa[a]+'';
	if(!bo)alert(s);
	return s;
}
js.getarropen=function(caa){
	jsopenararass = caa;
	js.open('js/array.shtml');
}
js.str=function(o){
	o.value	= strreplace(o.value);
}
js.getcan = function(i,dev){
	var a = PARAMS.split('-');
	var val = '';
	if(!dev)dev='';
	if(a[i])val=a[i];
	if(!val)val=dev;
	return val;
}
function winHb(){
	var winH=(!isIE)?window.innerHeight:document.documentElement.offsetHeight;
	return winH;
}
function winWb(){
	var winH=(!isIE)?window.innerWidth:document.documentElement.offsetWidth;
	return winH;
}
js.scrolla	= function(){
	var top	= $(document).scrollTop();
	js.scroll(top);
}
js.tishi=function(txt,col,time){
	clearTimeout(js.msgtimeout);
	if(isempt(col))col='#ff6600';
	$('#divjsmsg').remove();
	if(txt=='none')return;
	var left=(document.body.scrollWidth-100)/2;
	if(isempt(time))time=3;
	if(txt.indexOf('...')>-1){
		txt		= '<img src="images/loadings.gif" height="15" width="14" align="absmiddle"> '+txt+'';
		time	= 0;
	}	
	var c='<div id="divjsmsg" onclick="$(this).remove()" style="position:fixed;top:2px;left:'+left+'px;z-index:999999;padding:3px 10px;background-color:'+col+';color:white;line-height:20px">';
	c+=''+txt+'';
	c+='</div>';
	$('body').prepend(c);
	var left	= (winWb()-$('#divjsmsg').innerWidth()-30)*0.5;
	$('#divjsmsg').css('left',''+left+'px');
	if(time>0)js.msgtimeout=setTimeout(function(){
		if(get('divjsmsg'))$('#divjsmsg').remove()
	},time*1000);
}
js.request=function(name,url){
	if(!name)return '';
	if(!url)url=location.href;
	if(url.indexOf('\?')<0)return '';
	neurl=url.split('\?')[1];
	neurl=neurl.split('&');
	var value=''
	for(i=0;i<neurl.length;i++){
		val=neurl[i].split('=');
		if(val[0].toLowerCase()==name.toLowerCase()){
			value=val[1];
			break;
		}
	}
	if(!value)value='';
	return value;
}
js.now=function(type,sj){
	if(!type)type='Y-m-d';
	if(type=='now')type='Y-m-d H:i:s';
	var dt,ymd,his,weekArr,Y,m,d,w,H=0,i=0,s=0,W;
	if(typeof(sj)=='string')sj=sj.replace(/\//gi,'-');
	if(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(sj)){
		sj=sj.split(' ');
		ymd=sj[0];
		his=sj[1];if(!his)his='00:00:00';
		ymd=ymd.split('-');
		his=his.split(':');
		H = his[0];if(his.length>1)i = his[1];if(his.length>2)s = his[2];
		dt=new Date(ymd[0],ymd[1]-1,ymd[2],H,i,s);
	}else{
		dt=(typeof(sj)=='number')?new Date(sj):new Date();
	}
	weekArr=new Array('日','一','二','三','四','五','六');
	Y=dt.getFullYear();
	m=xy10(dt.getMonth()+1);
	d=xy10(dt.getDate());
	w=dt.getDay();
	H=xy10(dt.getHours());
	i=xy10(dt.getMinutes());
	s=xy10(dt.getSeconds());
	W=weekArr[w];
	if(type=='time'){
		return dt.getTime();
	}else{
		return type.replace('Y',Y).replace('m',m).replace('d',d).replace('H',H).replace('i',i).replace('s',s).replace('w',w).replace('W',W);
	}
}
js.float=function(num,w){
	if(isNaN(num)||num==''||!num||num==null)num='0';
	num=parseFloat(num);
	if(!w&&w!=0)w=2;
	var m=num.toFixed(w);
	return m;	
}
js.email=function(str){
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
 	return myreg.test(str);
}
js.splittime=0;
js.getsplit=function(){
	if(!js.servernow)return false;
	var dt=js.now('Y-m-d H:i:s');
	var d1=js.now('time',dt);	
	var d2=js.now('time',js.servernow);
	js.splittime=d1-d2;
}
js.serverdt=function(atype){
	if(!atype)atype='Y-m-d H:i:s';
	var d1=js.now('time')-js.splittime;
	var dt=js.now(atype,d1);
	return dt;
}
js.openarr={};
js.open=function(url,w,h,wina,can){
	if(wina){
		try{
		var owina	= this.openarr[wina];owina.document.body;owina.focus();
		return owina;
		}catch(e){}
	}
	var ja=(url.indexOf('?')>=0)?'&':'?';
	url+=''+ja+'opennew=true';
	if(!w)w=600;
	if(!h)h=500;
	if(!can)can='resizable=yes,scrollbars=yes';
	var l=(screen.width-w)*0.5;
	var t=(screen.height-h)*0.5;
	var opar=window.open(url,'','width='+w+'px,height='+h+'px,left='+l+'px,top='+t+'px,'+can+'');
	if(wina)this.openarr[wina]=opar;
	return opar;
}
js.onunload=function(){
	var a=js.openarr;
	for(var b in a){
		try{a[b].close()}catch(e){}
	}
	try{
		var winobj = js.request('winobj');
		if(winobj!='')opener.js.openarr[winobj]=false;
	}catch(e){}
}
js.decode=function(str){
	var arr	= {length:-1};
	try{
		arr	= new Function('return '+str+'')();
	}catch(e){}
	return arr;
}
js.cropimg=function(aid,at,w,h){
	var sou='';
	if(get(aid))sou=get(aid).value;
	var img=sou;
	if(!at)at='';
	//原图
	if(sou.indexOf('crop')>0){
		var ext=sou.substr(sou.lastIndexOf('.')+1);
		var img=sou.substr(0,sou.lastIndexOf('_'))+'.'+ext;
	}
	var url='mode/cropimg/cropimg.php?imgsize='+w+'x'+h+'&imgurl='+img+'&thumimg='+sou+'&title='+at+'&aid='+aid+'&callback=js.cropimgcall';
	js.open(url,750,430);
	return false;
}
js.cropimgcall=function(a, aid){
	var arr=a.split('|');
	var sou=arr[0],
		yan=arr[1];
	if(sou=='')sou=yan;
	if(get(aid)){
		get(aid).value = sou;
		if(sou=='')sou='images/noface.gif';
		if(get('view_'+aid+''))get('view_'+aid+'').src=sou;
	}
}
js.move=function(id,event){
	var _left=0,_top=0;
	var obj	= id;
	if(typeof(id)=='string')obj=get(id);
	var _Down=function(evt){
		try{
			var s='<div id="divmovetemp" style="filter:Alpha(Opacity=0);opacity:0;z-index:99999;width:100%;height:100%;position:absolute;background-color:#000000;left:0px;top:0px;cursor:move"></div>';
			$('body').prepend(s);
			evt=window.event||evt;
			_left=evt.clientX-parseInt(obj.style.left);
			_top=evt.clientY-parseInt(obj.style.top);
			document.onselectstart=function(){return false}
		}catch(e){}		
	}
	var _Move=function(evt){
		try{
			var c=get('divmovetemp').innerHTML;
			evt=window.event||evt;
			obj.style.left=evt.clientX-_left+'px';
			obj.style.top=evt.clientY-_top+'px';
		}catch(e){_Down(evt)}
	}
	var _Up=function(){
		document.onmousemove="";
		document.onselectstart=""
		$('#divmovetemp').remove();	
	}
	document.onmousemove=_Move
	document.onmouseup=_Up;
}
js.setdev=function(val,dev){
	var cv	= val;
	if(isempt(cv))cv=dev;
	return cv;
}
js.upload=function(call,can){
	if(!call)call='';
	if(!can)can={};
	js.uploadrand	= js.now('YmdHis')+parseInt(Math.random()*999999);
	var url = 'mode/upload/upload.php?callback='+call+'&upkey='+js.uploadrand+'&p='+PROJECT+'';
	for(var a in can)url+='&'+a+'='+can[a]+'';
	js.open(url,500,300,'uploadopenla');
	return false;
}
js.downshow=function(id){
	js.open('mode/upload/uploadshow.php?id='+id+'&p='+PROJECT+'',600,350);
	return false;
}
js.downupdel=function(sid, said, o1){
	if(sid>0){
		if(!confirm('确定要删除文件吗？'))return;
		$.get(js.getajaxurl('delfile','upload','public',{id:sid}));
	}
	if(o1)$(o1).parent().remove();
	var o = $('#view_'+said+'');
	var to= $('#count_'+said+'');
	var o1 = o.find('span'),s1='';
	for(i=0;i<o1.length;i++)$(o1[i]).html(''+(i+1));
	to.html('');
	if(i>0)to.html('<font style="font-size:11px" color="#555555">文件:'+i+'</font>');
	o1 = o.find('font');
	for(i=0;i<o1.length;i++)s1+=','+$(o1[i]).html();
	if(s1!='')s1=s1.substr(1);
	$('#'+said+'-inputEl').val(s1);
}
js.downupshow=function(a, showid){
	var s = '',i=0,s1='';
	var o = $('#view_'+showid+'');
	for(i=0; i<a.length; i++){
		s='<div onmouseover="this.style.backgroundColor=\'#f1f1f1\'" onmouseout="this.style.backgroundColor=\'\'" style="padding:4px 5px;border-bottom:1px #eeeeee solid"><span>'+(i+1)+'</span><font style="display:none">'+a[i].id+'</font>、<a class="a" onclick="return js.downshow('+a[i].id+',\''+a[i].fileext+'\')" href="javascript:">'+a[i].filename+'</a> ('+a[i].filesizecn+')';
		s+=' <a class="a" temp="dela" onclick="return js.downupdel('+a[i].id+',\''+showid+'\', this)" href="javascript:">×</a>';
		s+='</div>';
		o.append(s);
	}
	js.downupdel(0, showid, false);
}
js.getajaxurl=function(a,m,d,can){
	if(!can)can={};if(!m)m=MODE;if(!d)d=DIR;if(d=='null')d='';
	var jga	= a.substr(0,1);
	if(jga=='@'||jga=='$')a = a.substr(1);
	var url	= 'a='+a+'&m='+m+'&d='+d+'';
	for(var c in can)if(c!='jmbool')url+='&'+c+'='+can[c]+'';
	if(jga=='$'){url+='&ajaxbool=html';}else if(jga!='@'){url+='&ajaxbool=true&rnd='+Math.random()+''}	
	if(can.jmbool){url=''+this.path+'.php?rocktoken='+jm.encrypt(url);}else{url=''+this.path+'.php?'+url;}
	return url;
}
js.formatsize=function(size){
	var arr = new Array('Byte', 'KB', 'MB', 'GB', 'TB', 'PB');
	var e	= Math.floor(Math.log(size)/Math.log(1024));
	var fs	= size/Math.pow(1024,Math.floor(e));
	return js.float(fs)+' '+arr[e];
}
js.getformdata=function(na){
	var da	={};
	if(!na)na='myform';
	var obj	= document[na];
	for(var i=0;i<obj.length;i++){
		var type	= obj[i].type;
		var val		= obj[i].value;
		if(type=='checkbox'){
			val	= '0';
			if(obj[i].checked)val='1';
		}
		da[obj[i].name]	= val;
	}
	return da;
}
js.getdata = function(na,da){
	if(!da)da={};
	var obj	= $('#'+na+'');
	var inp	= obj.find('input,select');
	for(var i=0;i<inp.length;i++){
		var type	= inp[i].type;
		var val		= inp[i].value;
		if(type=='checkbox'){
			val	= '0';
			if(inp[i].checked)val='1';
		}
		var ad1	= inp[i].name;
		if(!ad1)ad1 = inp[i].id;
		da[ad1]	= val;
	}
	return da;
}
js.selall = function(o,na,bh){
	var i,oi1;
	if(bh){
		o1=$("input[name^='"+na+"']");
	}else{
		o1=$("input[name='"+na+"']");
	}
	for(i=0;i<o1.length;i++){
		if(!o1[i].disabled)o1[i].checked = o.checked;
	}
}
js.getchecked=function(na,bh){
	var s = '';
	var o1;
	if(bh){
		o1=$("input[name^='"+na+"']");
	}else{
		o1=$("input[name='"+na+"']");
	}
	for(var i=0;i<o1.length;i++){
		if(o1[i].checked && !o1[i].disabled)s+=','+o1[i].value+'';
	}
	if(s!='')s=s.substr(1);
	return s;
}
js.cookie=function(name){
	var str=document.cookie;
	var val='';
	if(str.length<=0)return '';
	arr=str.split('; ');
	for(i=0;i<arr.length;i++){
		cda=arr[i].split('=');
		if(name.toLowerCase()==cda[0].toLowerCase()){
			val=cda[1];
			break;
		}
	}
	if(!val)val='';
	return val;
}
js.savecookie=function(name,value,d){
	var expires = new Date();
	if(!d)d=365;
	if(!value)d=-10;
	expires.setTime(expires.getTime()+d*24*60*60*1000);
	var str=''+name+'='+value+';expires='+expires.toGMTString()+';path=/';
	document.cookie = str;
}
js.backtop=function(ci){
	if(!ci)ci=0;
	$('body,html').animate({scrollTop:ci});
	return false;
}
js.backto = function(oid){
	if(!get(oid))return;
	var of	= $('#'+oid+'').offset();
	this.backtop(of.top);
	return false;
}
js.applyIf=function(a,b){
	if(!a)a={};
	if(!b)b={};
	for(var c in b)if(typeof(a[c])=='undefined')a[c]=b[c];
	return a;
}
js.apply=function(a,b){
	if(!a)a={};
	if(!b)b={};
	for(var c in b)a[c]=b[c];
	return a;
}
js.tanbodyindex = 90;
js.tanbody=function(act,title,w,h,can1){
	this.tanbodyindex++;
	var can	= js.applyIf(can1,{html:'',showfun:function(){},bodystyle:'',guanact:'',titlecls:'',btn:[]});
	var l=(winWb()-w-50)*0.5,t=(winHb()-h-50)*0.5;
	var s	= '';
	var mid	= ''+act+'_main';
	$('#'+mid+'').remove();
	var posta= 'fixed';
	if(js.path == 'admin')posta='absolute';
	s+='<div id="'+mid+'" style="position:'+posta+';background-color:#ffffff;left:'+l+'px;width:'+w+'px;top:'+t+'px;z-index:'+this.tanbodyindex+';box-shadow:0px 0px 10px rgba(0,0,0,0.3);">';
	s+='	<div class="title '+can.titlecls+'" style="-moz-user-select:none;">';
	s+='		<table border="0"  width="100%" cellspacing="0" cellpadding="0"><tr>';
	s+='			<td height="34" style="font-size:16px; font-weight:bold;color:white; padding-left:8px" width="100%" onmousedown="js.move(\''+mid+'\')" id="'+act+'_title">'+title+'</td>';
	s+='			<td style="padding:0px 8px;"><div id="'+act+'_spancancel" style="height:16px;overflow:hidden;width:16px;background:url(images/wclose.png);cursor:pointer" onclick="js.tanclose(\''+act+'\',\''+can.guanact+'\')"></div></td>';
	s+='		</tr></table>';
	s+='	</div>';
	s+='	<div id="'+act+'_body" style="'+can.bodystyle+'">';
	s+=can.html;
	s+='	</div>';
	s+='	<div id="'+act+'_bbar" style="padding:5px 10px;background:#eeeeee;line-height:30px" align="right"><span id="msgview_'+act+'"></span>&nbsp;';
	for(var i=0; i<can.btn.length; i++){
		var a	= can.btn[i];
		s+='<a class="btn btn-success" id="'+act+'_btn'+i+'" onclick="return false" href="javascript:">';
		if(!isempt(a.icons))s+='<i class="icon-'+a.icons+'"></i>&nbsp; ';
		s+=''+a.text+'</a>&nbsp; ';
	}
	s+='		<a class="btn btn-default" id="'+act+'_cancel" onclick="return js.tanclose(\''+act+'\',\''+can.guanact+'\')" href="javascript:"><i class="icon-remove"></i>&nbsp;取消</a>';
	s+='	</div>';
	s+='</div>';
	js.xpbody(act,can.mode);
	$('body').prepend(s);
	if(can.closed=='none'){
		$('#'+act+'_bbar').remove();
		$('#'+act+'_spancancel').remove();
	}
	if(can.bbar=='none')$('#'+act+'_bbar').remove();
	can.showfun(act);
}
js.tanclose=function(act, guan){
	if(!isempt(guan)){
		var s= guan.split(',');
		for(var i=0;i<s.length;i++)$('#'+s[i]+'_main').remove();
	}
	var mid	= ''+act+'_main';
	var t	= parseInt(get(mid).style.top);
	$('#'+mid+'').animate({top:t+100,opacity:0},200,function(){$(this).remove();js.xpbody(act,'none');});
	return false;
}
js.xpbody=function(act,type){
	if(type=='none'){
		$("div[xpbody='"+act+"']").remove();
		return;
	}
	if(get('xpbg_bodydds'))return false;
	var H	= (document.body.clientHeight<winHb())?winHb()-5:document.body.clientHeight;
	var W	= document.documentElement.scrollWidth+document.body.scrollLeft;
	var bs='<div id="xpbg_bodydds" xpbody="'+act+'" oncontextmenu="return false" style="position:absolute;display:none;width:'+W+'px;height:'+H+'px;filter:Alpha(opacity=30);opacity:0.3;left:0px;top:0px;background-color:#000000;z-index:80"></div>';
	$('body').prepend(bs);	
	$('#xpbg_bodydds').fadeIn(300);
	return $('#xpbg_bodydds')
}
js.focusval	= '0';
js.number=function(obj){
	val=strreplace(obj.value);
	if(!val){
		obj.value=js.focusval;
		return false;
	}
	if(isNaN(val)){
		js.msg('msg','输入的不是数字');
		obj.value=js.focusval;
		obj.focus();
	}else{
		obj.value=val;
	}
}
js.setmsg=function(txt,col,ids){
	if(!ids)ids='msgview';
	$('#'+ids+'').html(js.getmsg(txt,col));
}
js.getmsg  = function(txt,col){
	if(!col)col='red';
	var s	= '';
	if(!txt)txt='';
	if(txt.indexOf('...')>0){
		s='<img src="images/loading.gif" height="16" width="16" align="absmiddle"> ';
		col = '#ff6600';
	}	
	s+='<span style="color:'+col+'">'+txt+'</span>';
	if(!txt)s='';
	return s;
}
js.movemsg = function(obj,txt,can){
	var off	= $(obj).offset();
	can	= js.applyIf(can, {top:-35,left:0,ms:1});
	var rnd	= ''+parseInt(Math.random()*9999)+'_'+parseInt(Math.random()*9999)+'';
	var top = off.top+can.top;
	var l	= off.left+can.left;
	var txt	= '<div id="movemsg'+rnd+'" style="left:'+l+'px;top:'+top+'px;padding:5px 10px;background:#000000;filter:Alpha(Opacity=50);opacity:0.5;;position:absolute;z-index:9999;color:#ffffff;font-size:16px">'+txt+'</div>';
	$('body').append(txt);
	var oac		= $('#movemsg'+rnd+'');
	var left	= (l-(oac.innerWidth()*0.5+5));
	oac.css('left',''+left+'px');
	setTimeout("$('#movemsg"+rnd+"').animate({top:'"+(top-100)+"px',opacity:0},function(){$(this).remove()})",parseInt(can.ms)*1000);
}
js.rewrite = function(m,a,s){
	var url	= '';
	if(!m)m = 'index';
	if(!a)a = '';
	if(!s)s = '';
	if(this.rewritebool=='true'){
		if(a == '' && s==''){
			url	= ''+m+'.html';
		}else if(a == ''){
			url	= ''+m+'_'+s+'.html';
		}else{
			url	= ''+m+'_'+a+'_'+s+'_a.html';
		}
	}else{
		url	= 'index.php?m='+m+'';
		if(a != '')url+='&a='+a+'';
		if(s != '')url+='&s='+s+'';
	}
	return url;	
}
js.fanye	= function(o,url){
	var o1	= $(o);
	var val	= o.value;
	var max	= parseInt(o1.attr('max'));
	var page	= parseInt(o1.attr('page'));
	if(isNaN(val) || val ==''){
		val = page;
	}
	val	= parseInt(val);
	if(val<1)val=1;
	if(val>max)val=max;
	o1.val(''+val+'');
	if(val == page)return;
	url	= url.replace('[page]',val);
	location.href=url;
}
js.setcopy	= function(txt){
	if(!txt)txt='';
	txt	= escape(txt);
	js.savecookie('copy_text', txt, 1);
	js.tishi('复制成功，仅限本站使用');
	return false;
}
js.getcopy = function(){
	var txt	= js.cookie('copy_text');
	txt	= unescape(txt);
	return txt;
}
js.chao=function(obj,shuzi,span,guo){
	var cont=(guo)?strreplace(obj.value):obj.value;
    if (cont.length>shuzi){
		alert("您输入的字符超过"+shuzi+"个字符\n\n将被截掉"+(cont.length-shuzi)+"个字符！");
		cont=cont.substring(0,shuzi);
		obj.value=cont;
	}
	if(guo)obj.value=cont;
	if(span)get(span).innerHTML=obj.value.length;
}
js.confirms	= function(txt, queding, quxiao){
	var quxiaos	= '',quedings='';
	if(quxiao)quxiaos	= 'windows.'+quxiao+';';
	if(queding)quedings	= 'windows.'+queding+';';
	var h = '<div style="padding:20px;line-height:30px" align="center"><img src="images/helpbg.png" align="absmiddle">&nbsp; '+txt+'</div>';
	h+='<div style="padding:10px" align="center"><a class="btn btn_big" onclick="'+quedings+'tanclose(\'confirm\');return false" href="javascript:">确定</a> &nbsp;  &nbsp; <a class="btnh btn_big" onclick="'+quxiaos+'tanclose(\'confirm\');return false" href="javascript:">取消</a></div>';
	h+='<div class="blank10"></div>';
	tanbody('confirm', '系统提示', 300, 200,{closed:'none',html:h});
	return false;
}

js.msgtotal	= 0;
js.msgshow=function(lx,txt,sj)
{
	clearTimeout(this.msgshowtime);
	var lt	= document.documentElement.scrollTop;
	if(!sj)sj=5;
	var noi	= this.msgtotal;
	this.msgtotal++;
	var sid	= 'tishimsgeid_'+noi+'';
	$("div[id^='tishimsgeid_']").remove();
	var s='<div id="'+sid+'" onclick="$(this).remove()" class="alert alert_'+lx+'" style="left:'+(winWb()-100)*0.5+'px;line-height:24px;position:absolute;top:'+(lt-100)+'px;z-index:'+(noi+9999999)+'">'+txt+'</div>';
	$('body').append(s);
	if(sj>0)this.msgshowtime	= setTimeout("if(get('"+sid+"'))($('#"+sid+"').animate({'top':'"+(lt-100)+"px',opacity:0},function(){$(this).remove()}))",sj*1000);
	var no	= $('#'+sid+'');
	no.css('left',''+((winWb()-no.width()-5)*0.5)+'px');
	no.animate({top:''+(lt+3)+'px',opacity:1});
}
js.msg=function(lx,txt,sj)
{
	if(lx == 'none' || !lx){
		$("div[id^='tishimsgeid_']").remove();
		return;
	}
	if(lx == 'wait'){
		txt	= '<img src="images/loading.gif" height="16" width="16" align="absmiddle"> '+txt;
		sj	= 60;
	}
	js.msgshow(lx,txt,sj);
}
js.repempt=function(stt,v){
	var s = stt;
	if(isempt(s))s=v;
	return s;
}
js.getrand=function(){
	var r;
	r = ''+new Date().getTime()+'';
	r+='_'+parseInt(Math.random()*9999)+'';
	return r;
}
js.arraystr=function(str){
	if(!str)str='1|是,0|否';
	var s = str.split(','),
		d = [],i,s1,nv,vv;
	for(i=0; i<s.length; i++){
		s1 = s[i].split('|');
		nv = s1[0];
		vv = nv;
		if(s1.length>1)nv=s1[1];
		d.push([vv,nv]);
	}	
	return d;
}
js.imports = function(dz, funs){
	if(!funs)funs=function(){};
	if(get(dz)){funs();return;}
	var scr = document.createElement('script');
	scr.src = dz;
	scr.id  = dz;
	if(isIE){
		scr.onreadystatechange = function(){
			if(this.readyState=='loaded' || this.readyState=='complete'){
				funs(this);
			}
		}
	}else{
		scr.onload = function(){
			funs(this);
		}
	}
	document.getElementsByTagName("head")[0].appendChild(scr);
}
js._bodyclick = {};
js.downbody=function(o1, e){
	this.allparent = '';
	this.getparenta($(e.target),0);
	var a,s = this.allparent,a1;
	for(a in js._bodyclick){
		a1 = js._bodyclick[a];
		if(s.indexOf(a)<0){
			if(a1.type=='hide'){
				$('#'+a1.objid+'').hide();
			}else{
				$('#'+a1.objid+'').remove();
			}
		}
	}
}
js.addbody = function(num, type,objid){
	js._bodyclick[num] = {type:type,objid:objid};
}
js.getparenta=function(o, oi){
	try{
	if(o[0].nodeName.toUpperCase()=='BODY')return;}catch(e){return;}
	var id = o.attr('id');
	if(!isempt(id)){
		this.allparent+=','+id;
	}
	this.getparenta(o.parent(), oi+1);
}