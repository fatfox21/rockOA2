var homearr = <?=$da['homearr']?>,
	showarr = <?=$da['showarr']?>,
	nowpanel=false, win=false, form;
var mid  = '<?=$da['mid']?>';


var movelala = function(o,x,y){
	var b1 = false;
	if(x<5){x=5;b1=true}
	if(y<5){y=5;b1=true}
	if(b1)setTimeout(function(){o.setPosition(x, y);},20);
}
var vkeydown = function(e){
	var code = e.keyCode;
	if(nowpanel){
		var x = nowpanel.x,y=nowpanel.y;
		if(code==37)x=x-1;
		if(code==38)y=y-1;
		if(code==39)x=x+1;
		if(code==40)y=y+1;
		if(code>=37 && code<=40)nowpanel.setPosition(x, y);
	}
	return false;
};
function showsetwin(){
	if(!win){
		var cans = winopt({title:'设置位置宽高',icon:gicons('cog'),width:300,items:{
			xtype:'rockform',submittext:'确定',cancelbool:true,items:[{
				fieldLabel:'X',name:'xPost',value:'0',minValue:0,xtype:'numberfield'
			},{
				fieldLabel:'Y',name:'yPost',value:'0',minValue:0,xtype:'numberfield'
			},{
				fieldLabel:'宽',name:'wPost',value:'0',minValue:0,xtype:'numberfield'
			},{
				fieldLabel:'高',name:'hPost',value:'0',minValue:0,xtype:'numberfield'
			}],
			submitfields:'x,y,w,h',
			submitfun:function(){
				this.up('window').close();
				var d = this.getValuess();
				nowpanel.setPosition(parseFloat(d.x), parseFloat(d.y));
				nowpanel.setWidth(parseFloat(d.w));
				nowpanel.setHeight(parseFloat(d.h));
			}
		}});
		win = Ext.create('Ext.Window',cans);
	}
	win.show();
	form = win.down('rockform');
	form.adddata({x:nowpanel.x,y:nowpanel.y,w:nowpanel.width,h:nowpanel.height});
}
var getpitmes = function(){
	var a = [],i,d=homearr,len=d.length,a1,a2,a3;
	for(i=0;i<len;i++){
		a3 = showarr[d[i].id];
		if(a3){
			a2 = d[i];
			a2.w= a3.w;
			a2.h= a3.h;
			a2.x= a3.x;
			a2.y= a3.y;
			a1 = getitems(a2);
			a.push(a1);
		}
	}
	return a;
};

function getitems(d){
	var a1,x,y,w,h;
	x = parseFloat(d.x);y = parseFloat(d.y);w = parseFloat(d.w);h = parseFloat(d.h);
	if(w==0)w=400;
	if(h==0)h=250;
	if(x==0)x=5;
	if(y==0)y=5;
	a1 = {
		title:d.title,x:x,y:y,width:w,height:h,resizable:true,draggable:true,frame:true,closable:true,listeners:{move:movelala},itemId:d.num,icon:gicons(d.icons),
		tools:[{
			type:'gear',tooltip:'选中',callback:function(pan){nowpanel = pan}
		},{
			type:'plus',tooltip:'设置位置宽高',callback:function(pan, tool){
				nowpanel = pan;
				showsetwin();
			}
		}]
	};
	return a1;
}

var savela = function(){
	var i,d=homearr,len=d.length;
	var o1 = getcmp('mpanel_'+rand+''),o2,nu,s1='',s2='';
	for(i=0;i<len;i++){
		nu = d[i].num;
		o2 = o1.down('#'+nu+'');
		if(o2){
			s1+= ','+d[i].id+'|'+o2.x+'|'+o2.y+'|'+o2.width+'|'+o2.height+'';
		}else{
			s2+= ','+d[i].id+'';
		}
	}
	if(s1!='')s1=s1.substr(1);
	if(s2!='')s2=s2.substr(1);
	var url = js.getajaxurl('saveindexgl',mode,dir);
	js.msg('wait','保存中...');
	$.post(url,{s1:s1,s2:s2,mid:mid},function(){
		js.msg('success','保存成功');
	});
};
function additemsla(o){
	var i,d=homearr,len=d.length,a1;
	for(i=0;i<len;i++){
		if(d[i].num==o.num){
			a1 = getitems(d[i]);
			getcmp('mpanel_'+rand+'').add(a1);
		}
	}
}
function getmenuss(){
	var i,d=homearr,len=d.length,a=[];
	for(i=0;i<len;i++){
		a.push({
			text:d[i].title,num:d[i].num,id:'menu_'+d[i].num+'_'+rand+'',handler:additemsla
		});
	}
	return a;
}
function getmenussss(){
	var i,d=homearr,len=d.length;
	var o1 = getcmp('mpanel_'+rand+''),o2;
	for(i=0;i<len;i++){
		nu = d[i].num;
		o2 = o1.down('#'+nu+'');
		getcmp('menu_'+nu+'_'+rand+'').setDisabled((o2?true:false));
	}
}

var panels = {
	layout:'absolute',items:getpitmes(),height:2000,border:false,id:'mpanel_'+rand+''
}
var panel = {
	xtype:'panel',autoScroll:true,bbar:[{
		text:'添加项',icon:gicons('add'),menu:getmenuss(),listeners:{click:getmenussss}
	},'-',{
		text:'保存',icon:gicons('disk'),handler:savela
	}],items:panels,border:false,
	listeners:{
		destroy:function(){
			if(win)Ext.destroy(win);
		}
	}
}
return {
	'panel':panel,
	init:function(){
		$('#mpanel_'+rand+'-innerCt').keydown(vkeydown);
	}
};