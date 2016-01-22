var nowtabs = '',zindex = 0,tabsarr={};
function initbody(){
	mainobj = $('#mobile-rock');
	reseta();
	
	addtabs({num:'home',url:'mobile,home',name:'主页'});
	$(window).resize(reseta);
}
function reseta(){
	viewwidth = winWb();
	viewheight = winHb();
	$("div[temp='body']").width(''+viewwidth+'px');
	$("div[temp='cont']").height(''+(viewheight-44)+'px');
}
function gotohome()
{
	addtabs({num:'check',url:'mobile,flow,check',name:''});
	return false;
}

function changetabs(num){
	var o = get('mobilecont_'+num+'');
	var bo = false;
	if(o){
		zindex++;
		o.style.zIndex = zindex;
		$(o).css('left','0px');
		$(o).show();
		nowtabs = tabsarr[num];
		bo = true;
	}
	return bo;
}

function showloader(lx){
	if(lx=='none'){
		$('#mainloaddiv').remove();
		return;
	}
	var bgs = '<div id="mainloaddiv" style="width:'+viewwidth+'px;height:'+viewheight+'px;overflow:hidden;background:#000000;color:white;filter:Alpha(opacity=20);opacity:0.2;z-index:100;position:absolute;left:0px;line-height:'+viewheight+'px;top:0px;" align="center"><img src="images/mloading.gif"  align="absmiddle">&nbsp;处理中...</div>';
	$('body').append(bgs);
}

function closetabs(num){
	var o = get('mobilecont_'+num+'');
	if(!o)return false;
	$(o).animate({left:''+viewwidth+'px',},200,function(){
		$(this).remove();
	});
}
function showtabs(num){
	var o = get('mobilecont_'+num+'');
	if(!o)return false;
	$(o).show();
	$(o).animate({left:'0px',},200);
}


function addtabs(a){
	var url = a.url,
		num	= a.num;
	if(isempt(url))return;
	nowtabs = a;
	
	if(changetabs(num))return;
	zindex++;
	var rand = js.getrand(),i,oi=2,
		ura	= url.split(','),
		dir	= ura[0],
		mode= ura[1];
	url =''+PROJECT+'/'+dir+'/'+mode+'/rock_'+mode+'';
	if(ura[2]){
		if(ura[2].indexOf('=')<0){
			oi=3;
			url+='_'+ura[2]+'';
		}
	}
	url+='.shtml?rnd='+Math.random()+'';
	var urlpms= '';
	for(i=oi;i<ura.length;i++){
		var nus	= ura[i].split('=');
		urlpms += ",'"+nus[0]+"':'"+nus[1]+"'";
	}
	if(urlpms!='')urlpms = urlpms.substr(1);
	showloader();
	$.ajax({
		url:url,
		type:'get',
		success: function(da){
			showloader('none');
			var s = da;
				s = s.replace(/\{rand\}/gi, rand);
				s = s.replace(/\{num\}/gi, num);
				s = s.replace(/\{mode\}/gi, mode);
				s = s.replace(/\{dir\}/gi, dir);
				s = s.replace(/\{params\}/gi, "var params={"+urlpms+"};");
			var s1 = '<div temp="body" style="position:absolute;left:'+viewwidth+'px;top:0px;z-index:'+zindex+';width:'+viewwidth+'px;background:white" id="mobilecont_'+num+'">'+s+'</div>';
			mainobj.append(s1);
			if(zindex==1){
				changetabs(num);
			}else{	
				showtabs(num);
			}
			reseta();
		},
		error:function(){
			showloader('none');
			var s = 'Error:加载出错喽,'+url+'';
			$('#mobilecont_'+num+'').html(s);	
		}
	});
	tabsarr[num] = a;
}
