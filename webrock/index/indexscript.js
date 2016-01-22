Ext.BLANK_IMAGE_URL ='images/white.gif';
Ext.Loader.setPath('Ext.rock', 'webrock/extjs/rock');
Ext.Loader.setPath('Ext.ux', 'webrock/extjs/ux');
var menuTree,menuTabs,nowtab,webimwinobj;
function gicons(i){
	return 'mode/icons/'+i+'.png';
}
function publicstore(mo,dos,oans){
	if(!mo)mo='index';
	if(!dos)dos='';
	return js.getajaxurl('publicstore',mo,dos,oans);
}
function publiccheckstore(mo,dos,oans){
	if(!mo)mo='index';
	if(!dos)dos='';
	return js.getajaxurl('publiccheckstore',mo,dos,oans);
}
function publicsave(mo, dos,oans){
	if(!mo)mo='index';
	if(!dos)dos='';
	return js.getajaxurl('publicsave',mo,dos,oans);
}
function publictreestore(cans,mo,dos){
	if(!mo)mo='index';
	if(!dos)dos='';
	return js.getajaxurl('publictreestore',mo,dos,cans);
}
function getcmp(aId){
	return Ext.getCmp(aId);
}
function renderbox(v,r){
	var da = r.column.boxdata;
	if(!da)da=[['#888888','×'],['green','√']];
	return '<font color='+da[v][0]+'>'+da[v][1]+'</font>';
}
function rendercont(v, m){
	if(isempt(v))v='';
	v = v.replace(/\n/gi,'<br>');
	m.tdAttr = 'data-qtip="'+v+'"';
	return v;
}
function getrand(){
	var r = js.getrand();
	return r;
}
function getparent(nu, act, pas1,pas2){
	var o;
	try{
		if(pas1==undefined)pas1='';if(pas2==undefined)pas2='';
		o = menuTabs.down('#'+nu+'');
		if(o && act)o[act](pas1,pas2);
	}catch(e){}
	return o;
}
function gettabs(nu){
	var num = 'tabs_'+nu+'';
	return getcmp(num);
}
function winopt(cans){
	var opt = {closeAction:'hide',width:400,maximizable:true,collapsible:true,modal:false,layout: 'fit'};
	Ext.apply(opt,cans);
	return opt;
}
function mopenview(nu,_id, gid, lx){
	if(!lx)lx='view';
	var sa2 = nu.split('@');
	nu = sa2[0];
	var can = {uid:adminid,mid:_id,jmbool:false};
	if(nu)can.modenum=nu;
	if(sa2[1])can.table=sa2[1];
	var url = js.getajaxurl('$'+lx+'','flow','taskrun',can);
	if(gid)url+='&gridid='+gid+'';
	js.open(url, 800);
}
function mopenprint(nu,_id, gid){
	mopenview(nu,_id,gid,'print');
}
var bitian	= '<font color=red>*</font>';
var indexxu	= -1;
var rock	= [];
function closetabs(num1){
	var num = 'tabs_'+num1+'';
	var bo  = true;
	if(getcmp(num)){
		menuTabs.setActiveTab(num);
		menuTabs.remove(num);
	}
	return bo;
}
function closetabsnow(){
	closetabs(nowtab.num);
}
function addtabs(title,urlnr,num1,opts){
	if(isempt(urlnr)){
		js.msg('msg','没有设置访问地址');
		return;
	}
	if(!opts)opts={};
	if(!num1)num1=js.getrand();
	var num = 'tabs_'+num1+'',dir='',mode='',url='',act='';
	if(!closetabs(num1))return;
	var rand = js.getrand(),i,oi=2,urlnrs=urlnr+'',iqz='ext';
	if(urlnr.indexOf('@')==0){iqz='tpl';urlnrs=urlnrs.substr(1);}
	var ura	= urlnrs.split(',');
	dir	= ura[0];mode= ura[1];
	if(iqz=='ext')url =''+PROJECT+'/'+dir+'/'+mode+'/'+iqz+'_'+mode+'';
	if(ura[2]){if(ura[2].indexOf('=')<0){oi=3;url+='_'+ura[2]+'';act=ura[2];}}
	if(iqz=='ext')url+='script.js';
	if(iqz=='tpl')url = ''+js.path+'.php?d='+dir+'&m='+mode+'&a='+act+'';
	var urlpms={};
	for(i=oi;i<ura.length;i++){
		var nus	= ura[i].split('=');
		urlpms[nus[0]]=nus[1];
		if(iqz=='tpl')url+='&'+nus[0]+'='+nus[1]+'';
	}
	indexxu++;
	var loaders = {
		url: url,autoLoad:true,scripts:false,renderer:function(l,v){return true;},indexss:indexxu,
		failure:function(a, v){
			var parsent = a.getTarget();
			parsent.getEl().unmask();
			var s = '<div style="padding:50px;font-size:20px;line-height:50px">'+v.status+', '+v.statusText+', 加载出错。。。<br>URL：'+url+'</div>';
			parsent.update(s);
		},
		success:function(a,v){
			var s = v.responseText,can,cas,parsent,len,fun,funs,init,i,tabson;
			var index = a.indexss;parsent = a.getTarget();parsent.removeAll();parsent.getEl().unmask();parsent.update('');
			try{
				if(s.indexOf('panel')<0)s=jm.uncrypt(s);
				s	= s.replace(/\[rock\]/gi, 'rock['+index+']');
				s	= s.replace(/BT/g, bitian);
				fun = new Function('rand','index','params','objpanel','dir','mode',s)(rand, index, urlpms, parsent,dir,mode);
				funs= js.apply({panel:false,init:false},fun);
				cas = funs.panel;
				init= funs.init;
				tabson= funs.tabson;
			}catch(e){
				js.getarr(e);
				return;
			}
			if(typeof(cas)=='object'){
				len = cas.length;
				if(isNaN(len)){
					can = {region:'center',id:'main_'+rand+'_0'};
					Ext.apply(can,cas);
					if(!can.itemId)can.itemId=parsent.num;
					parsent.add(can);
					rock[index]=parsent.down();
				}else{
					for(i=0;i<len;i++){
						if(!cas[i].id)cas[i].id='main_'+rand+'_'+i+'';
						if(!cas[i].itemId)cas[i].itemId=parsent.num+'_'+i+'';
					}	
					parsent.add(cas);
					if(len==1){
						rock[index]=getcmp(cas[0].id);
					}else{
						rock[index]=[];
						for(i=0;i<len;i++){
							rock[index][i]=getcmp(cas[i].id);
						}
					}
				}
			}
			if(typeof(init)=='function'){
				init(parsent);
			}
			if(typeof(tabson)=='object'){
				parsent.on(tabson);
			}
		}
	};
	var pan={
		xtype:'panel',border:false,padding:5,title:title,closable:true,autoScroll: false,layout:'border',rand:rand,icon:'',
		bodyStyle:'background:white;',html:'',id:num,loader:loaders,num:num1,urlstr:url,urlstring:urlnr,menuid:'',menutype:''
	};
	if(urlpms.padding)opts.padding=urlpms.padding;Ext.apply(pan,opts);menuTabs.add(pan).show();menuTabs.setActiveTab(num);nowtab.getEl().mask('加载中...');
}

function reloadtabs(num){
	var tas = getcmp('tabs_'+num+'');
	tas.getEl().mask('加载中...');
	var o1=tas.getLoader();
	o1.load();
}

function createindex(){
	Ext.tip.QuickTipManager.init();
	rockoption		= Ext.create('Ext.rock.option');
	wherewindows 	= Ext.create('Ext.rock.where');
	uploadwindows	= Ext.create('Ext.rock.upload');

	var menubool	= true,tempnode,changetabs;
	function opencheck(a1){
		var url = tempnode.url,
			num = tempnode.num,
			txt = tempnode.text,
			lx	= a1.lx;
		url+=',opentype='+lx+'';
		num+=''+lx+'';
		txt+='['+a1.text+']';
		addtabs(txt, url, num,{menuid:tempnode.menuid});
	}
	var omenu=Ext.create('Ext.menu.Menu',{
		items:[{
			text:'申请',icon:gicons('pencil'),lx:0,handler:opencheck
		},'-',{
			text:'审核',lx:1,handler:opencheck,icon:gicons('check')
		},'-',{
			text:'查询',lx:2,icon:gicons('zoom'),handler:opencheck
		}]
	});
	function menuclick(view, record, item, index, e,obj){
		var node= record.raw,icon='';
		if(!record.isLeaf()){
			if(record.isExpanded()){
				record.collapse();
			}else{
				record.expand();
			}
			return;
		}else if(node.ischeck=='1'){
			tempnode = node;
			omenu.showAt(e.xy);
			return;
		}
		if(!isempt(node.icons))icon=gicons(node.icons);
		addtabs(node.text, node.url, node.num,{icon:icon,menuid:node.id,menutype:node.menutype});
	}
	function fullscreen(a){
		var s = a.text,bo=false;
		if(s=='全屏'){
			a.setText('退出全屏');
			a.setIcon(gicons('arrow_in'));
			$('#main_top').hide();
		}else{
			a.setText('全屏');
			a.setIcon(gicons('arrow_out'));
			bo = true;
			$('#main_top').show();
		}
		getcmp('index_top').setVisible(bo);
		getcmp('index_menu').setVisible(bo);
	}
	function benreload(a){
		reloadtabs(nowtab.num);
	}
	function showmenula(nobj, reb){
		menuTree = nobj.down('treepanel');
		if(!nobj.loadbool || reb){
			nobj.getEl().mask('加载中...')
			var url = js.getajaxurl('getmenu','index','',{pid:nobj.pid});
			$.get(url, function(da){
				menuTree.getStore().setRootNode({children:Ext.decode(da)});
				nobj.getEl().unmask();
			});
		}
		nobj.loadbool = true;
	}
	var menuitems = [],menuarrs=[];
	for(var i=0;i<topmenu.length;i++){
		var stoee = Ext.create('Ext.data.TreeStore',{
			fields:['name'],
			root:{children:[],expanded: true}
		});
		var tritem = {
			xtype:'treepanel',rootVisible: false,autoScroll: true,store:stoee,border:false,columns:[{xtype: 'treecolumn',text:'名称',flex:1,align:'left',dataIndex:'name'}],hideHeaders:true,animate:false,listeners:{itemclick:menuclick}
		};
		menuarrs.push({
			text:topmenu[i].name,icon:gicons(topmenu[i].icons)
		});
		menuitems.push({
			title:topmenu[i].name,layout:'fit',itemId:'menuTree_'+topmenu[i].id+'',pid:topmenu[i].id,poixu:i,xtype:'panel',items:tritem,icon:gicons(topmenu[i].icons),listeners:{
				expand:function(np){
					showmenula(np);
				}
			}
		});
	}
	function addchanmenu(mrsa){
		var da = {name:mrsa.title,url:mrsa.urlstring,icon:mrsa.icon,num:mrsa.num,menuid:mrsa.menuid};
		$.post(js.getajaxurl('addchangmenu','index'),da);
	}
	
	Ext.create('Ext.Viewport',{
        layout:'border',
		padding:0,
        items: [{
            region: 'north',height: 60,
            html: '<div class="topbg" style="height:60px;overflow:hidden;"></div>',
			id:'index_top',border:false,bodyStyle:'border-bottom-width:0px'
        },{
			region: 'west',title: '菜单导航',id:'index_menu',
			bodyStyle:'border-bottom-width:0px;',
			collapsible: true,width: 200,maxWidth:500,minWidth:200,split: true,rootVisible: false,autoScroll: true,
			layout: {
				type: 'accordion',
				titleCollapse: true,
				animate: true,
				activeOnTop: false,collapseFirst:true
			},
			items:menuitems,
			tools:[{
				type:'refresh',handler:function(){showmenula(menuTree.up('panel'), true)},tooltip:'刷新'
			},{
				type:'expand',tooltip:'全部展开',handler:function(){menuTree.expandAll()}
			},{
				type:'collapse',tooltip:'全部收起',handler:function(){menuTree.collapseAll()}
			}]
		},menuTabs = Ext.create('Ext.TabPanel',{
			xtype:'tabpanel',
			region:'center',resizeTabs: true,enableTabScroll:true,activeTab:0,
			bodyStyle:'border-bottom-width:0px;',
			items:[],
			plugins:[{
                ptype: 'tabclosemenu',closeTabText:'关闭',closeAllTabsText:'关闭所有选择卡',closeOthersTabsText:'关闭非当前',
				extraItemsTail:['-',{
					text:'添加为常用菜单',icon:gicons('add'),itemId:'adcy',hideOnClick: true,handler:function(item){
						addchanmenu(changetabs);
					}
				}],
				listeners: {
					beforemenu: function (menu, item) {
						var o1d = menu.child('#adcy'),bo=false;
						//o1d.setChecked(false);
						if(item.num=='home' || item.menutype=='cy')bo=true;
						o1d.setDisabled(bo);
						changetabs = item;
					}
				}
            }],
			listeners:{
				tabchange:function(old, newa){
					nowtab = newa;
					var title = ''+systemtitle;
					if(nowtab.num != 'home')title = nowtab.title+'_'+systemtitle;
					document.title = title;
				}
			}
		}),{
			id:'index_bottom',region:'south',xtype:'toolbar',
			items:[{
				icon:gicons('user'),text:'用户：'+adminuser+'',showSeparator:false
			},'-','登录次数:'+adminloginci+'','->','基于<a href="http://www.rockoa.com" target="_blank" class="a">RockOA</a>版本：V'+VERSION+'','-','<a href="http://www.rockoa.com/mobile.shtml" target="_blank" class="a">手机版</a>','-',{
				text:'重新加载',icon:gicons('arrow_refresh'),handler:benreload
			},'-',{
				text:'全屏',icon:gicons('arrow_out'),handler:fullscreen
			}]
		}]
	});
	addtabs('首页','@index,home,index','home',{closable:false,icon:gicons('house'),padding:'0 0 8 0'});
	showmenula(getcmp('index_menu').down('#menuTree_'+topmenu[0].id+''));
	
	function loadmenuid(id,na){
		if(menubool)return;
		menuTree.setTitle(na);
		menubool = true;
		menustore.proxy.extraParams.pid=id;
		menustore.reload();
	}
	
	var s1 = '',s2='',s3='';
	s2 = '<table border="0" cellspacing="0" cellpadding="0"><tr>';
	s2+='<td><div style="height:40px;overflow:hidden;margin:0px 10px"><img align="absmiddle" src="'+systemlogo+'" width="40" height="40"></div></td>';
	s2+='<td><i><b style="font-size:25px;" >'+systemtitle+'</b></i></td>';
	s2+='<td width="20"></td>';
	s2+='</tr></table>';

	s3 = '<table border="0" cellspacing="0" cellpadding="0"><tr>';
	s3+='<td><div style="height:40px;overflow:hidden;margin:0px 10px"><img style="border:1px #cccccc solid;background:#ffffff;border-radius:19px;cursor:pointer;" align="absmiddle" src="'+adminface+'" id="myface" height="38" width="38"></div></td>';
	s3+='<td>';
	s3+='	<div align="left" style="line-height:20px" class="topzhu">您好，'+adminname+'('+adminuser+')<br>部门：'+admindeptname+'&nbsp; &nbsp; 职位：'+adminranking+'</div>';
	s3+='</td>';
	s3+='<td style="padding-left:20px" align="center">';
	s3+='</td>';
	s3+='</tr></table>';
	
	s1= '<table id="main_top" style="position:absolute;z-index:8;left:0px;top:0px;" class="topzhu" height="60" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>';
	s1+='<td align="left">'+s2+'</td>';
	s1+='<td align="left">'+s3+'</td>';
	s1+='<td align="right" id="main_top_right">'+s3+'</td>';
	s1+= '</tr></table>';
	$('body').append(s1);
	
	$('#myface').click(function(){
		addtabs('我的头像','system,face','face',{icon:gicons('photo')});
	});
	
	function createtop(){
		var qiehuanys = function(a){
			$.get(js.getajaxurl('changestyle','index','',{xu:a.num}), function(){
				location.reload();
			});
		};
		var toparr= [{
			name:'提醒<font id=tixing_count color=red>(0)</font>',icons:gicons('bell'),url:'return gototixingla()'
		},{
			name:'样式v',icons:gicons('color_wheel'),url:'return false',menuobj:false,menu:[{
				text:'经典样式',num:0,yss:'classic',handler:qiehuanys
			},{
				text:'蓝色经典样式',num:1,yss:'neptune',handler:qiehuanys
			},{
				text:'黑暗墨黑样式',num:2,yss:'access',handler:qiehuanys
			},{
				text:'经典灰色样式',num:3,yss:'gray',handler:qiehuanys
			}]
		},{
			name:'刷新',icons:gicons('arrow_refresh'),url:'return location.reload();'
		},{
			name:'帮助',icons:gicons('help'),url:'http://www.rockoa.com/help.html',attr:'target="_blank"'
		},{
			name:'手机版',icons:gicons('shouji'),url:'http://www.rockoa.com/mobile.shtml',attr:'target="_blank"'
		},{
			name:'退出',icons:gicons('report_go'),url:'?m=login&a=exit'
		}];
		toparr[1].menu[parseInt(stylebody[0])].icon = gicons('ok');
		var s='<div style="height:25px;overflow:hidden;line-height:25px;padding-right:10px"><span class="topzhu" id="index_datetime">2014年12月10日[星期三] 21:58:51</span></div>';
		s+='<div align="right"><table height="25" border="0" cellspacing="0" cellpadding="0"><tr>';
		for(var i=0;i<toparr.length;i++){
			var urls = 'href="javascript:"',
				urla = toparr[i].url,
				attr = toparr[i].attr;
			if(urla.indexOf('return')==0){
				urls+=' onclick="'+urla+'"';
			}else{
				urls = 'href="'+urla+'"';
			}
			if(attr)urls+=' '+attr+'';
			s+='<td width="18" nowrap align="left"><div style="height:16px;overflow:hidden"><img src="'+toparr[i].icons+'" height="16" width="16"></div></td><td nowrap><a id="topicons_'+i+'" oi="'+i+'" class="topzhu" '+urls+'>'+toparr[i].name+'</a></td><td width="10" nowrap></td>';
		}
		s+='</tr></table></div>';
		
		$('#main_top_right').html(s);
		
		for(var i=0;i<toparr.length;i++){
			if(toparr[i].menu){
				$('#topicons_'+i+'').click(function(){
					var o = $(this),
						oi= parseInt(o.attr('oi'));
					if(!toparr[oi].menuobj)toparr[oi].menuobj = Ext.create('Ext.menu.Menu',{items:toparr[oi].menu});
					var off = o.offset();
					toparr[oi].menuobj.showAt([off.left, off.top+20]);
				});
			}
		}
	}
	createtop();
	function nowdatetime(){
		var dt=js.serverdt('Y年m月d日[星期W] H:i:s');
		$('#index_datetime').html(dt);
		setTimeout(function(){nowdatetime()},1000);
	}
	nowdatetime();
	$(get('index_menu-body')).find('div:eq(0)').css('overflow-x','hidden');
	
	var loadcitis = 0,
		loadtime  = 0;
	function gettixing(){
		var url = js.getajaxurl('gettixing','home','index', {loadici:loadcitis,loadtime:loadtime});
		loadcitis++;
		$.get(url, function(da){
			var a = js.decode(da);
			//if(a.msg)showpopup(a.msg);
			if(a.str)showtixing(a.str);
			$('#tixing_count').html('('+a.count+')');
			loadtime = a.time;
		});
		setTimeout(gettixing, 60*1000*10);
	}
	var cans= winopt({title:'系统提醒',resizable:false,constrainHeader:true,html:'<div style="padding:5px 10px;line-height:20px" id="tixingwin_msgtishi" onclick="_setNotification()">提醒</div>',autoScroll: true,opacity:0,maximizable:false,icon:gicons('bell'),collapsible:false,width:300,height:180,x:winWb()-305,y:winHb()-185,listeners:{
		beforeclose:function(a){
			a.animate({duration: 500,to:{opacity:0}});
			setTimeout(function(){a.hide()},500);
			return false;
		}
	}});
	var tixingwin = Ext.create('Ext.Window', cans);
	function showtixing(str){
		tixingwin.show();
		$('#tixingwin_msgtishi').html(str);
		tixingwin.animate({
			duration: 1000,to:{opacity:1},from: {opacity:0}
		});
		return false;
	}
	setTimeout(gettixing, 5000);
}
function gototixingla(){
	addtabs('提醒信息','person,todo','todo',{icon:gicons('bell')});
	return false;
};
function _setNotification(){
	return;
	if(!('Notification' in window))return false;
	if(Notification.permission === 'granted')return false;
	if(Notification.permission !== 'denied'){
		Notification.requestPermission(function (permission) {
			if(!('permission' in Notification)) {
				Notification.permission = permission;
			}
			if (permission === 'granted') {
				//'开启桌面通知'
			}
		});
	}
}
function showpopup(msg){
	if(!('Notification' in window))return false;
	var can	= {body:msg,icon:systemlogo,tag:'webkitMeteoric'};
	var notification	= new Notification('OA系统通知',can);
	notification.onclick = function(){
		window.focus();
		gototixingla();
		this.close();
	}
}