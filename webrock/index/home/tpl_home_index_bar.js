var defaults= {margin:0,columnWidth:1,collapsible:true,closable:true},
	date 	= js.now(),
	mar		= '8',
	defitem = '<?=$da['defitem']?>';
if(adminhomeitems=='')adminhomeitems = defitem;
var margin	= '0 '+mar+' '+mar+' 0',
	heights	= 225,
	objpan	= false,win=false,setitemla = [];
var homeitems	= {};

var guanlihome = function(){
	if(!win){
		var storea = function(nas, oi){
			var sta = setitemla[oi];
			return Ext.create('Ext.data.TreeStore',{
				root: {
					text: nas,expanded: true,
					children: sta
				}
			});
		}
		var grupps = 'ddgroup_'+rand+'';
		var cans = winopt({title:'首页桌面项管理',icon:gicons('house'),width:640,layout:'hbox',border:false,maximizable:false,resizable:false,
			items:[{
				flex:0.25,split:true,height:300,xtype: 'treepanel',title:'可选项',rootVisible:true,store:storea('可选项',0),viewConfig: {
                    plugins: {ptype: 'treeviewdragdrop',ddGroup: grupps,appendOnly: true,sortOnDrop: true,containerScroll: true}
                }
			},{
				flex:0.25,split:true,height:300,xtype: 'treepanel',title:'第一列项',itemId:'slie1',store:storea('拖动到这',1),viewConfig: {
                    plugins: {ptype: 'treeviewdragdrop',ddGroup: grupps,sortOnDrop: true, containerScroll: true}
                }
			},{
				flex:0.25,split:true,height:300,xtype: 'treepanel',title:'第二列项',itemId:'slie2',store:storea('拖动到这', 2),viewConfig: {
                    plugins: {ptype: 'treeviewdragdrop',ddGroup: grupps,sortOnDrop: true, containerScroll: true}
                }
			},{
				flex:0.25,split:true,height:300,xtype: 'treepanel',title:'第三列项',itemId:'slie3',store:storea('拖动到这',3),viewConfig: {
                    plugins: {ptype: 'treeviewdragdrop',ddGroup: grupps,sortOnDrop: true, containerScroll: true}
                }
			}],
			buttons:[{
				text:'拖动到树根节点即可移动项',xtype:'tbtext',id:'msg_'+rand+''
			},{
				text:'保存',icon:gicons('ok'),handler:function(){setitionla()}
			},{
				text:'取消',handler:function(){win.close()},icon:gicons('cancel')
			}]
		});
		win = Ext.create('Ext.Window',cans);
	}
	win.show();
}

function setitionla(){
	var s  = '',s1 = '',i,o;
	for(i=1; i<=3 ;i++){
		s1 = getstrite(i);
		if(s1)s+='|'+s1;
	}
	if(s!='')s = s.substr(1);
	o = getcmp('msg_'+rand+'');
	if(s==''){
		o.setText(js.getmsg('首页项至少要有一项'));
		return;
	}
	o.setText(js.getmsg('保存中...','#ff6600'));
	$.post(js.getajaxurl('savehome', mode, dir),{homeitems:s}, function(da){
		o.setText(js.getmsg('保存成功','green'));
		adminhomeitems = s;
		reloadtabs('home');
	});
}

function getstrite(oi){
	var stoe = win.down('#slie'+oi+'').getStore().getRootNode();
	var a    = stoe.childNodes,i,s='';
	for(i=0; i<a.length; i++){
		s+=','+a[i].data.id;
	}
	if(s!='')s = s.substr(1);
	return s;
}
	
var remenu  = Ext.widget({
	xtype: 'menu',
	items: [{
		text: '进入页面',
		handler: function () {
			var a = objpan.up('grid');
			if(a.abcnum){
				var tit = a.tabstitle;
				if(!tit)tit=a.title;
				addtabs(tit, a.abcurl, a.abcnum);
			}
		}
	},'-',{
		text:'首页桌面项管理',handler:guanlihome
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


function getpitmes(){
	var a1 = adminhomeitems.split('|'),h  = 1/a1.length,i,j,a=[],lie0=[],a2,ao,ystr=',',ags,itsems;
	setitemla = [[],[],[],[]];
	for(i=0; i<a1.length; i++){
		a2 = a1[i].split(',');
		lie0=[];
		setitemla[i+1] = [];
		for(j=0; j<a2.length; j++){
			ao = homeitems[a2[j]];
			if(ao){
				lie0.push(ao);
				ystr+=''+a2[j]+',';
				setitemla[i+1].push({text:ao.title,icon:ao.icon,id:a2[j],leaf:true});
			}
		}
		itsems = {
			xtype: 'container',columnWidth:h,layout:'column',defaults:defaults,items:lie0,border:false,margin:''+mar+' 0 0 '+mar+''
		};
		if(i>0)itsems.margin = ''+mar+' 0 0 0';
		a.push(itsems);
	}
	for(ags in homeitems){
		if(ystr.indexOf(','+ags+',')<0){
			setitemla[0].push({text:homeitems[ags].title,leaf:true,icon:homeitems[ags].icon,id:ags,leaf:true});
		}
	}
	return a;
}
var panel={
	layout:'column',autoScroll:true,border:false,
	items:getpitmes(),
	listeners:{
		destroy:function(){
			if(win)Ext.destroy(win);
		}
	}
};

reloaddaiban = function(){
	if(getcmp('daishen_'+rand+''))getcmp('daishen_'+rand+'').storereload();
}
return {
	'panel':panel,
	init:function(){
		getcmp('index_btn_homeitems').handler = function(){
			guanlihome();
		}
	}
};