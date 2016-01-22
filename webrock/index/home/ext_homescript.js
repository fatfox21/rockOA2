var defaults= {margin:0,columnWidth:1,collapsible:true,closable:true},
	date 	= js.now(),
	mar		= '8',
	defitem = 'daib,work,wannl|todo,gong,zxkq';
if(adminhomeitems=='')adminhomeitems = defitem;
var margin	= '0 '+mar+' '+mar+' 0',
	heights	= 225,
	objpan	= false,win=false,setitemla = [];

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
				var tit = a.title;
				var stit = '信息公告';
				if(tit.indexOf(stit)>-1)tit=stit;
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

function openurl(a){
	var url = a.url,
		num = a.menunum,
		txt = a.title,
		typ = a.opentype;
	if(isempt(url))return;
	if(url=='check'){
		url = 'flow,applylist,'+a.num+',opentype='+typ+'';
		num = ''+a.num+'list_'+typ+'';
	}
	if(typeof(typ)=='number'){
		url+=',opentype='+typ+'';
		num+=''+typ+'';
	}
	addtabs(txt, url, num);
}

var huirendhi =function(v,a,r){
	if(a.column.dataIndex=='mess')a.tdAttr = 'data-qtip="'+v+'"';
	if(r.raw.status=='1')return '<font color=#888888>'+v+'</font>';
	return v;
}

var homeitems	= {
	daib:{
		title:'待办/处理',margin:margin,bbarbool:false,hideHeaders:false,xtype:'rockgrid',closable:false,frame: true,padding:0,border:false,
		url:js.getajaxurl('daicl','home','index'),tools:tools,id:'daishen_'+rand+'',icon:gicons('time'),abcurl:'flow,apply,check',abcnum:'daicheck',
		fields:['stotal','xuhao'],
		columns:[{
			text:'',dataIndex:'xuhao',width: 35
		},{
			text:'名称',flex:1,dataIndex:'title',sortable:false,align:'left',renderer:function(v,v1,a1){
				var d=a1.data;
				var s = v;
				if(d.stotal>0)s+=' <font color=red>('+d.stotal+')</font>';
				return s;
			}
		}],
		click:function(a,v){
			openurl(v.raw);
		}
	},
	
	gong:{
		xtype:'rockgrid',title:'信息公告<span id="inforweidutotal" class=red>(0)</span>',bbarbool:false,tablename:'infor',defaultorder:'xu,optdt desc',frame:true,padding:0,border:false,url:publicstore('infor','system'),storeafteraction:'inforgong',storebeforeaction:'beforeinforgong',
		storefields:'title,id,typename,istt,optdt',pageSize:6,tools:tools,closable:false,abcurl:'system,infor,gong',abcnum:'gong',
		margin:margin,icon:gicons('sound_none'),fields:['xuhao','optdt','days','wd'],
		columns:[{
			text:'',dataIndex:'xuhao',width: 35
		},{
			text:'类型',dataIndex:'typename',width:80,renderer:function(v, m, r){
				var jg = r.get('days');
				if(jg<5)v='<b>'+v+'</b>';
				if(r.get('wd')==0)v='<span class="hui">'+v+'</span>';
				return v;
			}
		},{
			text:'标题',flex:1,dataIndex:'title',align:'left',renderer:function(v, m, r){
				var jg = r.get('days');
				if(jg<5){
					v='<b>'+v+'</b> <img src="images/new.gif">';
				}	
				v+=' <font color=#555555>['+r.get('optdt').substr(0,10)+']</font>';
				if(r.get('wd')==0)v='<span class="hui">'+v+'</span>';
				return v;
			}
		}],
		dblclick:function(o, r){
			var url = js.getajaxurl('$gong','view','taskrun',{uid:adminid,id:r.data.id,jmbool:true});
			js.open(url, 800);
		},
		load:function(){
			var to = this.getData('wdtotal');
			var s1='';
			if(to>0){
				s1 = '('+to+')';
			}	
			$('#inforweidutotal').html(s1);
		}
	},
	
	wannl:{
		xtype: 'calendarpanel',height:350,title:'万年历',bodyStyle:(stylebody[0] != '2')?'background:white':'',bbartext:false,margin:margin,closable:false,icon:gicons('calendar'),frame: true,padding:0,border:false
	},
	
	work:{
		xtype:'rockgrid',title:'今日['+js.now('Y-m-d 周W')+']事项/任务',margin:margin,tools:tools,bbarbool:false,closable:false,tablename:'work',frame: true,padding:0,border:false,url:js.getajaxurl('gettoday','workh|work','work'),abcnum:'worklist',abcurl:'work,work,list,atype=0',pageSize:30,icon:gicons('pencil'),fields:['state','startdt'],
		columns:[{
			text:'',dataIndex:'xuhao',width: 35
		},{
			text:'类型',dataIndex:'type',width:80
		},{
			text:'标题',flex:1,dataIndex:'title',align:'left'
		},{
			text:'状态',dataIndex:'state',width:60,autowidth:true
		},{
			text:'时间',dataIndex:'startdt',width:150,autowidth:true
		}],
		dblclick:function(a, v){
			var d = v.raw;
			if(d.tabsurl && d.tabstitle && d.tabsnum){
				addtabs(d.tabstitle, d.tabsurl, d.tabsnum);
			}else{
				if(!isempt(d.url))js.open(d.url, 800);
			}
		}
	},
	
	todo:{
		xtype:'rockgrid',title:'提醒信息',tablename:'todo',keywhere:'and uid='+adminid+'',pageSize:5,tools:tools,margin:margin,frame: true,padding:0,border:false,
		bbarbool:false,defaultorder:'`status`,id desc',url:publicstore('todo','person'),closable:false,abcnum:'todo',abcurl:'person,todo',
		storeafteraction:'jisanstatela',icon:gicons('lightbulb'),fields:['xuhao','optdt'],
		columns:[{
			text:'',dataIndex:'xuhao',width: 35
		},{
			text:'类型',dataIndex:'title',width:80,renderer:huirendhi,autowidth:true
		},{
			text:'内容',dataIndex:'mess',flex:1,align:'left',renderer:huirendhi
		},{
			text:'时间',dataIndex:'optdt',autowidth:true,renderer:huirendhi
		}],
		load:function(){
			$('#tixing_count').html('('+this.getData('wdcount')+')');
		},
		dblclick:function(a, v){
			var url = v.raw.url;
			if(!isempt(url))js.open(url, 800);
		}
	},
	
	zxkq:{
		xtype:'rockgrid',title:'在线考勤',tablename:'kq_dkjl',keywhere:'and uid='+adminid+'',pageSize:5,tools:tools,margin:margin,frame: true,padding:0,border:false,url:js.getajaxurl('dkjl', 'kaoqin', 'person'),keywhere:'[A][K]b.id[D][adminid]',
		bbarbool:false,closable:false,abcnum:'mydkjl',abcurl:'person,kaoqin,dkjl',icon:gicons('clock'),
		columns:[{
			text:'',dataIndex:'xuhao',width: 35
		},{
			text:'姓名',dataIndex:'name',flex:0.5,search:true,qz:'b.'
		},{
			text:'时间',dataIndex:'checktime',flex:1,search:true
		},{
			text:'星期',dataIndex:'cnweek',flex:0.4
		}],
		bbar:['->',{xtype:'tbtext',id:'dkjlmsg_'+rand},{text:'添加打卡记录',icon:gicons('clock_add'),handler:function(o){adddkjl(o)}}]
	}
};

function adddkjl(o){
	var o1 = getcmp('dkjlmsg_'+rand);
	o1.setText(js.getmsg('添加打卡记录...'));
	$.get(js.getajaxurl('adddkjl', 'kaoqin', 'person'), function(su){
		if(su == 'success'){
			o.up('rockgrid').storereload();
			o1.setText(js.getmsg('添加成功','green'));
		}else{
			o1.setText(js.getmsg(su));
		}
	});
}

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
	tabson:{
		show:function(){
			
		}
	},
	init:function(){
		getcmp('index_btn_homeitems').handler = function(){
			guanlihome();
		}
	}
};