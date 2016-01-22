function initbody(){
	resetw();
	$(window).resize(function(){
		resetw();
	});
	im.init();
}

function resetw(){
	var h = winHb()-66;
	if(h<50)return;
	$('#deptlist').css({height:''+h+'px'});
	$('#changeuserlist').css({height:''+h+'px'});
}

var userarr = {},deptarr={};
var im = {
	init:function(){
		var url = js.getajaxurl('loaddept','index','webim',{aid:adminid});
		$.get(url, function(da){
			var a = js.decode(da);
			im.showdept(a.darr);
			$('#AltC').click(function(){
				im.okque();
			});
		});
	},
	
	showdept:function(a, lxs){
		var o = $('#deptlist');
		var s = this.showdept1(a,0);
		o.html(s);
	},
	showdept1:function(a, oi){
		var i,s='',s1='',st,j=0,facea;
		if(!a)return s;
		for(i=0; i<a.length; i++){
			s1 = this.showdept1(a[i].children, oi+1);
			st = '';
			if(a[i].imonline !=1 && a[i].type=='u'){
				st='class="offline"';
			}	
			if(a[i].type=='u'){
				st+=' userid="'+a[i].uid+'"';
				userarr[a[i].uid] = a[i];
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
		}
		return s;
	},
	opendept:function(sid){
		var t = sid.substr(0, 1),
		   id1= sid.substr(1);
		if(t=='u'){
			var d = userarr[id1];
			this.additems(d);
		}else{
			//this.openadept(sid);
		}
	},
	openadept:function(sid){
		$('#downdept_'+sid+'').toggle();
	},
	additems:function(a){
		var s = '',
		ids = 'yitian_'+a.id+'';
		if(get(ids))return; 
		var st = '';
		if(a.imonline !=1){
			st='class="offline"';
		}
		s='<div ondblclick="$(this).remove()" id="'+ids+'" '+st+' userid="'+a.uid+'"><img src="'+a.face+'" align="absmiddle">'+a.name+'</div>';
		$('#changeuserlist').append(s);
	},
	clearla:function(){
		$('#changeuserlist').html('');
	},
	
	okque:function(){
		var o = $('#changeuserlist').find('div'),sid,s='';
		for(var i=0;i<o.length;i++){
			sid = $(o[i]).attr('userid');
			s+=','+sid+'';
		}
		if(s!='')s=s.substr(1);
		
		openerrunscript('backdeptchange',groupnum, s);
		connectclose();
	}
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