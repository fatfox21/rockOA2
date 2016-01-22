////工具 -> Internet选项 -> 安全 -> 自定义级别 -> 找到“其他”中的“将本地文件上载至服务器时包含本地目录路径”，选中“启用”
var upload = {
	upsize:1024*200,
	mkdir:js.now('Y-m'),
	bool:false,
	maxsize:50*1024*1024, //最大50M
	uptype:'',
	upsizestring:'',
	rand:function()
	{
		var rand	= ''+js.now('d_His')+''+parseInt(Math.random()*9999)+'';
		return rand;
	},
	reset:function(){
		//document.fileform.reset();
	},
	changefile:function(lx){
		if(this.bool){
			js.msg('msg','太快了?请稍后在试!');
			return;
		}
		this.uptype = lx;
		try{
			window.external.selectfile(lx);
		}catch(e){}
	},
	readinit:function(path, lxs, fsize){
		var filename	= path.substr(path.lastIndexOf('\\')+1);
		var fileext		= filename.substr(filename.lastIndexOf('.')+1).toLowerCase();
		this.uparr		= {filename:filename,filesize:0,filesizecn:'',filetype:'',fileext:fileext,newfile:this.rand(),xu:0};
		var as = [filename, fileext];
		if(lxs=='read'){
			fsize		= parseInt(fsize);
			var bo 		= true;
			if(fsize > this.maxsize){
				this.errorprogress('文件太大超过了'+js.formatsize(this.maxsize)+'，当前'+js.formatsize(fsize)+'');
				bo = false;
			}
			if(bo && this.uptype=='image'){
				var tstype=',jpg,png,gif,bmp,jpeg,';
				if(tstype.indexOf(','+fileext+',')<0){
					this.errorprogress('['+filename+']不是图片类型的文件');
					bo = false;
				}
			}
			if(bo){
				this.progress('['+filename+']读取中...', 0);
				try{window.external.getfilebase64jixu();}catch(e){}
			}
		}
		return as;
	},
	uploadback:function(str, fsize, path){
		if(str==''){
			this.errorprogress('无法读取文件,无法上传2');
			return;
		}
		fsize		= parseInt(fsize);
		this.readinit(path, 'aa',0);
		var len		= str.length;
		this.maxsend= Math.ceil(len/this.upsize);
		this.uparr.filecout 	= str;
		this.uparr.filesize 	= fsize;
		this.uparr.filesizecn 	= js.formatsize(this.uparr.filesize);
		this.starts(0);
	},
	progress:function(text, w){
		if(!get('progress_show')){
			var s = '<div id="progress_show" class="progresscls"><div id="progress_text" class="div02">'+text+'</div><div id="progress_ress" class="div01"></div></div>';
			$('#contentdiv').append(s);
		}
		$('#progress_text').html(text);
		$('#progress_ress').css('width',''+w+'%');
	},
	progresshide:function(){
		setTimeout("$('#progress_show').remove()", 500);
	},
	starts:function(oj){
		var me = this;
		if(oj==this.maxsend){
			this.progress('上传完成',100);
			this.bool = false;
			return false;
		}
		this.bool	= true;
		var bil		= js.float(((oj+1)/this.maxsend)*100);
		var arr		= this.uparr;
		this.progress('['+arr.filename+','+arr.filesizecn+']上传中('+bil+'%)...', bil);
		var cont	= arr.filecout;
		var sendcont= cont.substr(oj*this.upsize,this.upsize);
		var data	= {sendcont:sendcont,filename:arr.filename,maxsend:this.maxsend,sendci:oj,filetype:'',fileext:arr.fileext,filesize:arr.filesize,filesizecn:arr.filesizecn,mkdir:this.mkdir,savetype:'file',newfile:arr.newfile,savepath:'',thumbnail:'',maxwidth:150,thumbtype:1};
		$.ajax({
			url:'mode/upload/uploadajax.php?action=send&rnd='+Math.random()+'&p='+PROJECT+'',
			data:data,
			type:'post',
			success:function(da){
				var result	= js.decode(da);
				if(!result.success){
					me.errorprogress('上传失败：'+da+'');
				}else{
					setTimeout('upload.starts('+(oj+1)+')',5);
					if(result.msg!='0'){
						var ucege = {id:result.msg,filename:arr.filename,filetype:'',fileext:arr.fileext,filesize:arr.filesize,filesizecn:arr.filesizecn,mkdir:me.mkdir,newfile:arr.newfile,filepath:result.filepath,thumbpath:result.thumbpath,width:result.width,height:result.height};
						me.uploadsuccess(ucege);
					}
				}
			},
			error:function(){
				me.errorprogress('上传失败:内部出错了');
			}
		});
	},
	uploadsuccess:function(d){
		this.bool = false;
		this.progresshide();
		var lx = this.uptype,cont;
		if(lx == 'image'){
			cont = strformat.addcode('图片', '[IMGS]'+d.thumbpath+'[/IMGS]');
			$('#viewimg').attr('src', d.thumbpath);
			$('#viewimgtext').html('图片'+strformat.sendcuxo+'预览');
		}else{
			cont = '[FILE]'+d.filename+'|'+d.id+'|'+d.fileext+'[/FILE] ('+d.filesizecn+')';
			cont = strformat.addcode('文件:'+d.filename+'', cont);
		}
		var o = $('#content');
		o.val(o.val()+cont);
		o.focus();
		this.reset();
	},
	errorprogress :function(txt){
		this.bool = false;
		this.progress('<font color=red>'+txt+'</font>&nbsp;<a href="javascript:" onclick="$(\'#progress_show\').remove();return false;">[取消]</a>', 0);
		this.reset();
	},
	uploaderror:function(){
		this.errorprogress('无法读取文件,无法上传1');
	},
	
	readclip:function(){
		var bo = connectreadclip();
		return bo;
	},
	//截屏
	cropScreen:function(){
		var bo = cropScreen();
		setTimeout('upload.cropScreenbo=true;', 1000);
	},
	clipover:function(){
		if(this.cropScreenbo){
			this.readclip();
		}
		this.cropScreenbo = false;
	},
	getemts:function(o){
		if(!get('aemtsdiv')){
			var s = '<div id="aemtsdiv" style="width:400px;height:200px;overflow-y:auto;border:1px #cccccc solid;background:white;box-shadow:0px 0px 5px rgba(0,0,0,0.3);left:3px;top:5px;position:absolute;display:none">';
			s+='<div style="padding:5px">';
			s+=this.getemtsbq('qq',0, 96, 11, 24);
			s+='</div>';
			s+='</div>';
			$('body').append(s);
		}
		var o1  = $('#aemtsdiv');
		o1.toggle();
		var off = o.offset();
		o1.css('top',''+(off.top-205)+'px');
	},
	getemtsbq:function(wj, oi1,oi2, fzd, dx){
		var i,oi=0,j1 = js.float(100/fzd);
		var s = '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>';
		for(i=oi1; i<=oi2; i++){
			oi++;
			s+='<td width="'+j1+'%" title="'+strformat.emotsarr[i+1]+'" align="center"><img onclick="upload.backemts(\''+strformat.emotsarr[i+1]+'\')" src="images/im/emots/'+wj+'/'+i+'.gif" width="'+dx+'" height="'+dx+'"></td>';
			if(oi % fzd==0)s+='</tr><tr>';
		}
		s+='</tr></table>';
		return s;
	},
	backemts:function(s){
		var o = $('#content');
		o.val(o.val()+s);
		o.focus();
		$('#aemtsdiv').hide();
	},
	downbody:function(o1, e){
		this.allparent = '';
		this.getparenta($(e.srcElement),0);
		if(this.allparent.indexOf('aemts')<0){
			$('#aemtsdiv').hide();
		}	
	},
	getparenta:function(o, oi){
		if(o[0].nodeName.toUpperCase()=='BODY')return;
		var id = o.attr('id');
		if(!isempt(id)){
			this.allparent+=','+id;
		}
		this.getparenta(o.parent(), oi+1);
	}
};

var strformat = {
	sendcodearr:{},
	sendcuxo:0,
	emotsstr:',[微笑],[撇嘴],[色],[发呆],[得意],[流泪],[害羞],[闭嘴],[睡],[大哭],[尴尬],[发怒],[调皮],[呲牙],[惊讶],[难过],[酷],[冷汗],[抓狂],[吐],[偷笑],[愉快],[白眼],[傲慢],[饥饿],[困],[恐惧],[流汗],[憨笑],[悠闲],[奋斗],[咒骂],[疑问],[嘘],[晕],[疯了],[衰],[骷髅],[敲打],[再见],[擦汗],[抠鼻],[鼓掌],[糗大了],[坏笑],[左哼哼],[右哼哼],[哈欠],[鄙视],[委屈],[快哭了],[阴险],[亲亲],[吓],[可怜],[无语],[蜡烛],[叹气],[石化],[狂汗],[扮鬼脸],[偷可怜],[猪头],[玫瑰],[凋谢],[嘴唇],[爱心],[心碎],[蛋糕],[闪电],[炸弹],[刀],[足球],[瓢虫],[便便],[月亮],[太阳],[礼物],[拥抱],[强],[弱],[握手],[胜利],[抱拳],[勾引],[拳头],[差劲],[爱你],[NO],[OK],[菜刀],[西瓜],[啤酒],[篮球],[乒乓],[咖啡],[饭]',
	addcode:function(key, val){
		this.sendcuxo++;
		key	= key+','+this.sendcuxo;
		this.sendcodearr[key] = val;
		return '[C]'+key+'[/C]'
	},
	geturl:function(d){
		if(!d)d={url:''};
		var url = d.url;
		if(!url&&d.table&&d.mid)url='?m=flow&a=view&d=taskrun&table='+d.table+'&mid='+d.mid+'&uid='+adminid+'';
		return url;
	},
	//格式化内容
	strcont:function(nr){
		//获取表情的转化
		var str		= unescape(nr);
		var em		= str.match(/\(\:(.*?)\:\)/gi);//(:文件夹_序号:)
		if(em != null){
			for(var i=0;i<em.length; i++){
				var fa1	= em[i].replace('(:','').replace(':)','');
				str		= str.replace(em[i],'<img src="images/im/emots/'+fa1.replace('_','/')+'.gif">');
			}
		}
		//URL的
		str	= this.strcontss(str,'A', '<a target="_blank" href="{s1}">{s2}</a>');//[A]名称|URL[/A]
		str	= this.strcontss(str,'IMGS', '<img src="{s1}" onclick="strformat.openimg(this.src)">');
		str	= this.strcontss(str,'IMG', '<img src="{s1}" onclick="strformat.openimg(this.src)" width="150">');
		str	= this.strcontss(str,'FILE', '<a onclick="return js.downshow(\'{s1}\',this)" href="javascript:"><img src="mode/fileicons/{s3}.gif" align="absmiddle" class="icon">{s2}</a>');//[FILE]fid[/FILE]
		
		var patt1	= new RegExp("\\[(.*?)\\](.*?)", "gi"),emu,i,st1,oi;
		 emu		= str.match(patt1);
		if(emu!=null){
			for(i=0;i<emu.length; i++){
				st1=emu[i];
				oi=this.emotsarrss[st1];
				if(oi)str	= str.replace(st1, '<img src="images/im/emots/qq/'+(oi-1)+'.gif">');
			}
		}
		str	= str.replace(/\n/gi, '<br>');//换行的
		return str;
	},
	downshow:function(sid){
		var url = 'mode/upload/uploadshow.php?id='+sid+'&p='+PROJECT+'';
		openurlla(url, 400, 300);
		return false;
	},
	strcontss:function(str,bq,rstr){
		var patt1	= new RegExp("\\["+bq+"\\](.*?)\\[\\/"+bq+"\\]", "gi");
		var emu		= str.match(patt1);
		if(emu != null){
			bq1	= bq.toLowerCase();
			for(var i=0;i<emu.length; i++){
				var s0	= emu[i].replace('['+bq+']','').replace('[/'+bq+']','');
				s0		= s0.replace('['+bq1+']','').replace('[/'+bq1+']','');//小写的
				var s1	= s0,s2 = s0,s3='',sa;
				if(s0.indexOf('|')>0){
					sa = s0.split('|');
					s1 = sa[1];
					s2 = sa[0];
					s3 = sa[2];
				}
				var s4	= rstr.replace('{s1}',s1).replace('{s2}',s2).replace('{s3}',s3);
				str		= str.replace(emu[i], s4);
			}
		}
		return str;
	},
	
	//发送前信息转化
	sendinstr:function(str, tuas){
		var bq		= 'C';
		var patt1	= new RegExp("\\["+bq+"\\](.*?)\\[\\/"+bq+"\\]", "gi");
		var emu		= str.match(patt1);
		
		if(emu != null){
			for(var i=0;i<emu.length; i++){
				var s0	= emu[i].replace('['+bq+']','').replace('[/'+bq+']','');
				str		= str.replace(emu[i], this.sendcodearr[s0]);
			}
		}
		var nowa	= js.serverdt('Y-m-d H:i:s 星期W'),
			nowas	= nowa.split(' ');
		var ztstr	= [['now',nowa],['date',nowas[0]],['time',nowas[1]],['week',nowas[2]],['百度','https://www.baidu.com/',1]];
		var patt1,a,thnr,ths='';
		for(var i=0; i<ztstr.length; i++){
			a	=	ztstr[i];
			if(a[2] == 1){
				patt1	= new RegExp(""+a[0]+"", "gi");
				thnr	= '[A]'+a[0]+'|'+a[1]+'[/A]';
			}else{
				thnr	= a[1];
				patt1	= new RegExp("\\["+a[0]+"\\]", "gi");
			}
			str	= str.replace(patt1, thnr);
		}
		return str;
	},
	
	//气泡样式
	showqp:function(type,name,dt,cont,nuid, fase){
		
		var nr	= '';
		nr+='<div class="ltcont">';
		nr+='	<div class="qipao" align="'+type+'">';
		nr+='		<div class="dt" style="padding-'+type+':61px">'+name+'('+dt.substr(5,11)+')</div>';
		nr+='		<table border="0" cellspacing="0" cellpadding="0">';
		
		
		nr+='		<tr valign="top">';
		if(type == 'left'){
			nr+='			<td width="50" align="center"><img src="'+fase+'"  width="40" height="40"></td>';
			nr+='			<td><div class="qipao'+type+'"><img src="images/im/qipaoleft.jpg"></div></td>';
		}else{
			nr+='			<td width="60" align="right">';
			if(nuid)nr+='<img src="images/loadings.gif" title="发送中..." id="'+nuid+'" style="margin-top:5px" align="absmiddle">&nbsp;';
			nr+='			</td>';
		}
		
		nr+='			<td><div class="qipaocont qipaocont'+type+'">';//内容显示
		nr+='			'+this.strcont(cont)+'';
		nr+='			</div></td>';
		
		if(type == 'right'){
			nr+='			<td><div class="qipao'+type+'"><img src="images/im/qipaoright.jpg"></div></td>';
			nr+='			<td width="50" align="center"><img src="'+fase+'"  width="40" height="40"></td>';
		}else{
			nr+='			<td width="60"></td>';
		}
		
		nr+='		</tr></table>';
		nr+='	</div>';
		nr+='</div>';
		return nr;
	},
	
	//打开图片
	openimg:function(src)
	{
		var img = src;
		if(src.indexOf('thumb')>0){
			var ext = src.substr(src.lastIndexOf('.')+1);
			img = src.substr(0,src.lastIndexOf('_'))+'.'+ext;
		}
		js.open(img);
	},
	emotsarrss:{},
	init:function(){
		var a = this.emotsstr.split(',');
		this.emotsarr=a;
		var len = a.length,i;
		for(i=1;i<len;i++){
			this.emotsarrss[a[i]]=i;
		}
	}
}
strformat.init();

//发送
function connectsend(msg){
	var bo = false;
	try{
		bo = window.external.connectsend(msg);
	}catch(e){
		js.msg('msg','暂时无法发送');
		return false;
	}
	return bo;
}
function send(reid, a){
	var a1,s='';
	if(!a)a={};
	for(a1 in a){
		s+=','+a1+':"'+a[a1]+'"';
	}
	if(s!=''){
		s = s.substr(1);
	}
	s = jm.base64encode('{'+s+'}');
	addhistory(a);
	return sendstr(reid, s);
}
function sendstr(reid, s){
	return connectsend('send@@@'+adminid+'@@@'+reid+'@@@'+s+'');
}

function addhistory(a){
	try{
		window.external.addhistory(receivename, receiveid, infortype, a.now);
	}catch(e){}
	openerrunscript('changehistory',infortype,receiveid);
}

//获取剪切板图片
function connectreadclip(){
	var bo = false;
	if(upload.bool){
		js.msg('msg','有文件在上传,请稍后在试!');
		return;
	}
	upload.uptype='image';
	try{
		window.external.getClipoption();
		bo = true;
	}catch(e){}
	return bo;
}
//初始化读取
function connectreadfileinit(path, fsize){
	upload.readinit(path,'read', fsize);
}
//上传读取文件
var readfilebo = false;
function connectreadfileback(basestr, fsize, path){
	readfilebo = false;
	upload.uploadback(basestr, fsize, path);
}
function connectreadfile(path){
	try{
		window.external.getfilebase64(path);
	}catch(e){}
	return true;
}

//接收到信息
function connectreceive(str){
	var s = jm.base64decode(str);
	var a = js.decode(s);
	guser.receivemess(a);
}

//截屏
function cropScreen(){
	var bo = false;
	try{
		window.external.cropScreen();
		bo = true;
	}catch(e){}
	return bo;
}






//退出关闭
function connectclose(){
	try{
		window.external.formclose();
	}catch(e){
		window.close();
	}	
}

//运行父窗口代码
function openerrunscript(fun, csn1,csn2){
	var bo = false;
	if(!csn1)csn1='';
	if(!csn2)csn2='';
	try{
		window.external.openerrunscript(fun, csn1,csn2);
		bo = true;
	}catch(e){	
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

function openurlla(url, w, h){
	if(url.indexOf('http')<0)url=URL+url;
	if(!w)w=850;
	if(!h)h=500;
	var bo = windowopen('新窗口','', url, w,h);
	if(!bo)js.open(url, w,h);
	return false;
}