function bannerbase(opts){
	var deopts	= {
		w:500,h:300,data:[],align:'left',view:'',time:5
	}
	var can		= js.apply(deopts, opts);
	var me		= this;
	var rand 	= js.getrand();
	this.noi	= -1;
	var len		= can.data.length;
	
	this.show	= function(){
		var s	= '',s1='',i,oi,s2='';
		for(i=0;i<len;i++){
			oi = len-i;
			s1+='<div oi="'+oi+'" id="bannertishi_'+rand+'_'+oi+'" style="position:absolute;right:'+(10+(i*30))+'px;bottom:10px;width:20px;height:20px;line-height:20px;overflow:hidden;text-align:center;background:#e1e1e1;z-index:99;filter:Alpha(opacity=40);opacity:0.4;cursor:pointer">'+oi+'</div>';	
			s+='<div id="bannerarea_'+rand+'_'+i+'" style="overflow:hidden;position:absolute;width:100%;height:'+can.h+'px;background:'+can.data[i].bgcolor+';z-index:2;left:0px;top:0px;display:none">';
			s+='	<div align="center" style="height:'+can.h+'px;width:'+can.w+'px;overflow:hidden;">';
			s+='	<img src="'+can.data[i].path+'" height="'+can.h+'" width="'+can.w+'">';
			s+='	</div>';
			s+='</div>';
		}
		s+='<div style="height:35px;overflow:hidden;width:100%;bottom:1px;overflow:hidden;position:absolute;z-index:90;left:0px;">';
		s+=' <div align="center" style="width:'+can.w+'px;position:relative;height:35px;overflow:hidden;">';
		s+=s1;
		s+='</div></div>';
		$('#'+can.view+'').append(s);
		if(len<=0)return;
		this.startrun();
		$("div[id^='bannertishi_"+rand+"_']").click(function(){
			me.clisktu(this);
		});
	};
	this.clisktu = function(o1){
		var oi = parseFloat($(o1).attr('oi'))-1;
		this.qiehuan(oi);
	}
	this.startrun = function(){
		var	oi	= this.noi+1;
		if(oi==len)oi=0;
		this.qiehuan(oi);
	}
	
	this.qiehuan	= function(oi){
		if(oi==this.noi)return;
		var nboj = get('bannerarea_'+rand+'_'+oi+'');
		var oboj = get('bannerarea_'+rand+'_'+this.noi+'');
		$(nboj).css({left:'0px',top:'0px',width:'100%',height:''+can.h+'px','opacity':1});	
		$(nboj).show();
		nboj.style.zIndex=2;
		if(oboj){
			oboj.style.zIndex=3;
			var params=suijibanner(can.w, can.h);
			$(oboj).stop();
			$(oboj).animate(params,500,function(){
				$(this).hide();
			});
		}
		$("div[id^='bannertishi_"+rand+"_']").css({opacity:0.7,background:'#e1e1e1',color:'#888888',filter:'Alpha(opacity=70)'});
		$('#bannertishi_'+rand+'_'+(oi+1)+'').css({opacity:1,background:'#0887CC',color:'white',filter:'Alpha(opacity=100)'});
		this.noi = oi;
		clearTimeout(this.dingshitime);
		this.dingshitime = setTimeout(function(){
			me.startrun();
		}, can.time * 1000);
	}
}

function suijibanner(w, h){
	var arr=[],
		lw = winWb(),alen,sja,s,a,abc;
	arr[0]="'left':'"+lw+"px'";
	arr[1]="'top':'"+h+"px'";
	arr[2]="'left':'-"+lw+"px'";
	arr[3]="'top':'-"+h+"px'";	
	arr[4]="'width':'0%'";
	arr[5]="'height':'0px'";
	alen=arr.length;
	sja=parseInt(Math.random()*alen)+1;
	s='';
	for(a=1;a<=sja;a++){
		var oij=parseInt(Math.random()*alen);
		s+=','+arr[oij]+'';
	}
	s="{'opacity':0,"+s.substr(1)+"}";
	abc=js.decode(s);
	return abc;
}

//banner类
function bannerclass(opts){
	var deopts	= {
		w:500,h:300,data:[],align:'left',view:'',time:5
	}
	var can		= js.apply(deopts, opts);
	var me		= this;
	var rand 	= new Date().getTime();
	this.noi	= 0;
	
	this.show	= function(){
		var a	= can.data;
		var s	= '', s1 = '', s2 = '';
		var w1	= can.w-100;
		var le	= a.length;
		for(var i=0; i<le; i++){
			var sou	= a[i].pathsou;
			if(!sou)sou= a[i].path;
			s1+='<div style="height:66px;overflow:hidden" align="'+can.align+'"><img class="imgone" src="'+sou+'" height="60" width="84"  img="one" oi="'+i+'"></div>';
			if(i<le-1)s1+='<div style="height:12px;;overflow:hidden;"></div>';
			
			if(i == 0){
				s2='<div style="position:absolute;left:0px;top:0px;height:'+can.h+'px;width:'+w1+'px;overflow:hidden"><img src="'+a[i].path+'" id="bannerimg_'+rand+'" height="'+can.h+'" width="'+w1+'"></div>';
				s2+='<div class="bannertitle" id="bannertitle_'+rand+'" style="width:'+w1+'px;"></div>';
			}
		}
		s+='<div class="banner" id="banner_'+rand+'" style="height:'+can.h+'px;width:'+can.w+'px;overflow:hidden;">';
		s+='	<div style="float:'+can.align+';height:'+can.h+'px;width:100px;overflow:hidden;">'+s1+'</div>';
		s+='	<div style="float:left;height:'+can.h+'px;width:'+w1+'px;overflow:hidden;position:relative">'+s2+'</div>';
		s+='</div>';
		$('#'+can.view+'').html(s);
		this.oneimg	= $('#banner_'+rand+'').find("img[img='one']");
		this.oneimg.click(function(){
			me.imgclick(this);	
		}).eq(0).click();
		
	};
	
	this.imgclick	= function(o1){
		var o	= $(o1);
		var oi	= parseFloat(o.attr('oi'));
		this.qiehuan(oi);
	};
	
	this.qiehuan	= function(oi){
		this.oneimg.removeClass();
		this.oneimg.addClass('imgone');
		
		this.oneimg[oi].className='imgone1';
		
		var a	= can.data[oi];
		$('#bannerimg_'+rand+'').attr('src', a.path);
		
		var aas	= $('#bannertitle_'+rand+'');
		aas.html(a.title);
		if(a.title){
			aas.show();
		}else{
			aas.hide();
		}
		this.noi	= oi;
		this.dingshi();
	};
	
	this.dingshi	= function(){
		var	oi	= this.noi+1;
		if(oi==can.data.length)oi=0;
		clearTimeout(this.dingshitime);
		this.dingshitime	= setTimeout(function(){
			me.qiehuan(oi);
		}, can.time * 1000);
	};
}