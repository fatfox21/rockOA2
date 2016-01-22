var homearr = <?=$da['homearr']?>,margin=0,homeitems={};
var guanlihome = function(){addtabs('个人首页桌面项','@index,home,indextd,mid=-1','homeperson',{padding:0,icon:gicons('application_view_tile')});};jm.setJmstr('<?=$da["randkey"]?>');
var remenu  = Ext.widget({
	xtype: 'menu',
	items: [{
		text: '进入页面',
		handler: function () {
			var a = objpan.up('grid');
			if(a.abcnum){
				var tit = a.tabstitle;
				if(!tit)tit=a.title;
				addtabs(tit, a.abcurl, a.abcnum,{icon:a.icon});
			}
		}
	},'-',{
		text:'设置首页项',handler:guanlihome
	}]
});	

var tools	= [{
	type:'refresh',handler:function(){this.up('grid').storereload()},tooltip:'刷新'
},{
	type:'plus',callback:function(pan, tool){
		objpan = this;
		remenu.showBy(tool.el);
	}
}];

<?=$da['homeitems']?>

var getpitmess = function(){
	var a = [],i,d=homearr,len=d.length,nu,a1;
	for(i=0;i<len;i++){
		nu = d[i].num;
		a1 = homeitems[nu];
		if(a1){
			a1.x = parseFloat(d[i].x);
			a1.y = parseFloat(d[i].y);
			a1.width = parseFloat(d[i].w);
			a1.height = parseFloat(d[i].h);
			a1.icon   = gicons(d[i].icons);
			if(!a1.title)a1.title = d[i].title;
			a.push(a1);
		}
	}
	return a;
};

var panel={
	layout:'absolute',autoScroll:true,border:false,
	items:getpitmess()
};
reloaddaiban = function(){
	if(getcmp('daishen_'+rand+''))getcmp('daishen_'+rand+'').storereload();
};
return {
	'panel':panel
};