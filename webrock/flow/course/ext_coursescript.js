var setid = params.setid,
	table = params.table;
var data,obj0,bool=true,form,grid,tree,changedata,json={},sjson={},nowid=0;
var fields = rock[params.index].changedata.fields;
if(!fields)fields='';

function clickadd(lx){
	form.reset();
	var a = ['新增一个流程','新增进程'];
	form.setmsg(a[lx],'blue');
	form.field('namePost').focus();
	form.field('atypePost').setDisabled((lx==0)?false:true);
	if(lx==1){
		form.field('pidPost').setValue(changedata.id);
	}
}
function clickedit(){
	var pid = changedata.pid;
	if(pid!=0){
		changedata.atype='';
		changedata.atypeid='';
		changedata.atypename='';
	}
	
	var bo = (changedata.children.length<=0)?false:true;
	form.field('nidPost').setDisabled(bo);
	if(!bo)form.field('nidPost').getStore().loadData(c.getcome());
	form.adddata(changedata);
	form.field('idPost').setValue(changedata.id);
	form.setmsg('修改状态','blue');
	form.field('namePost').focus();
	if(pid!=0){
		form.field('atypePost').setDisabled(true);
	}else{
		form.field('atypePost').setDisabled(false);
	}
	if(changedata.checktype=='rank')form.field('rankingPost').setValue(changedata.checktypename);
}

function changedow(){
}
function cogchangtj(){
	if(fields==''){
		js.msg('success', '没有设置字段');
		return;
	}
	var a = changedata;
	wherewindows.show('进程['+a.name+']条件',table, 'flowcourse_'+a.id+'', 2, {fields:fields});
}
function setcatopen(){
	var a = changedata;
	getcmp('fosetmes_'+rand+'').setText('['+a.name+']进程下动作');
	getcmp('courseactg_'+rand+'').searchgoto('[A][K]cid='+a.id+'');
}

var omenu=Ext.create('Ext.menu.Menu',{
	items:[{
		text:'新增下进程',id:'adddown_'+rand+'',handler:function(){clickadd(1)},icon:gicons('add')
	},'-',{
		text:'删除进程',id:'cancelss_'+rand+'',handler:function(){clickdel()},icon:gicons('delete')
	},'-',{
		text:'修改进程',handler:function(){clickedit()},icon:gicons('page_edit')
	},'-',{
		text:'设置此进程条件',id:'setcog_'+rand+'',icon:gicons('cog'),handler:function(){cogchangtj()}
	},'-',{
		text:'设置进程动作',id:'actcog_'+rand+'',icon:gicons('cog'),handler:function(){setcatopen()}
	}]
});

function clickdel(){
	if(bool)return;
	if(!confirm('确定要删除此进程吗？'))return;
	js.msg('wait','删除中...');
	bool = true;
	$.post(js.getajaxurl('publicdel','index'),{table:jm.encrypt('flow_course'),id:changedata.id}, function(){
		js.msg('success','删除成功');
		bool=false;
		c.reload(nowid);
	});
}

var panel= [{
	xtype:'panel',region:'center',layout:'border',border:false,
	items:[{
		xtype:'panel',id:'courseaefwe_'+rand+'',region:'center',tbar:[{
			icon:gicons('reload'),handler:function(){grid.storereload()}
		},'-',{
			text:'新增一个流程',icon:gicons('add'),handler:function(){clickadd(0)}
		}],html:'<div id="raphael_'+rand+'" style="overflow:auto"></div>'
	},{
		region:'south',height:150,split:true,xtype:'rockgridform',id:'courseactg_'+rand+'',tablename:'flow_courseact',bbarbool:false,searchtools:false,
		tbar:[{
			xtype:'tbtext',text:'进程下动作',id:'fosetmes_'+rand+''
		}],storeautoLoad:false,defaultorder:'sort',formtitle:'进程动作',formaddbefore:function(){
			if(!changedata){
				js.msg('msg','没有选择进程名称');
				return false;
			}
			return true;
		},
		formadd:function(f){
			f.setVal('cid', changedata.id);
		},
		columns:[{
			xtype: 'rownumberer',
			width: 40
		},{
			text:'动作名称',dataIndex:'name',width:100
		},{
			text:'动作值',dataIndex:'actv',width:80
		},{
			text:'下一进程',dataIndex:'nid',width:100,renderer:function(v){
				var s = '';
				if(v==0)s='正常';
				if(v==-1)s='退回提交人';
				return s;
			}
		},{
			text:'副名称',dataIndex:'names',width:90
		},{
			text:'说明',dataIndex:'explain',flex:1
		},{
			text:'状态颜色',dataIndex:'color',width:80
		},{
			text:'排序号',dataIndex:'sort',width:60
		}],
		formwidth:400,
		formparams:{
			submitfields:'name,sort,explain,cid,nid,action,actv,names,color',labelWidth:100,
			params:{int_filestype:'sort,cid,nid,actv,mid',otherfields:'mid='+setid+''},
			items:[{
				fieldLabel:'id号',value:'0',name:'idPost',hidden:true
			},{
				fieldLabel:'',value:'0',name:'cidPost',hidden:true
			},{
				fieldLabel:''+bitian+'动作名称',name:'namePost',allowBlank: false
			},{
				fieldLabel:''+bitian+'动作值',name:'actvPost',value:'1',xtype:'combo',store:js.arraystr('1,2,3,4,6,7,8,9'),editable:false
			},{
				fieldLabel:'副名称',name:'namesPost'
			},{
				fieldLabel:'状态颜色',name:'colorPost'
			},{
				fieldLabel:'下一进程',name:'nidPost',value:'0',xtype:'combo',store:[['0','正常'],['-1','退回提交人']],editable:false
			},{
				fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
			},{
				fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60
			},{
				fieldLabel:'动作执行方法名',name:'actionPost'
			}]
		}
	}]
},{
	width:250,maxWidth:400,minWidth:200,split:true,region:'east',title:'工作流进程',collapsible: true,xtype:'rockform',tablename:'flow_course',
	submitfields:'name,num,checktype,atype,atypeid,atypename,pid,nid,checktype,checktypeid,checktypename,explain,sort,inputid',
	params:{otherfields:'optdt={now},setid='+setid+'',int_filestype:'pid,nid,sort,inputid'},autoScroll:false,
	url:publicsave('course','flow'),
	destroypanel:[omenu],
	items:[{
		fieldLabel:'id号',value:'0',name:'idPost',hidden:true
	},{
		value:'0',name:'pidPost',hidden:true
	},{
		fieldLabel:'编号',name:'numPost'
	},{
		fieldLabel:'<font color=red>*</font>进程名称',name:'namePost',editable:true,allowBlank: false,xtype:'optioncombo',optionmnum:'flowcoursename_'+setid+''
	},{
		fieldLabel:'指定类型',name:'atypePost',value:'all',editable:false,xtype:'combo',store:[['all','所有人员'],['dept','指定部门/人']],listeners:{change:function(o){
			var o1= form.field('atypeidPost'),
				o2= form.field('atypenamePost');
			o1.setValue('');		
			if(o.value=='all'||isempt(o.value)){
				o2.setValue('所有人员');
				o2.hide();
			}else{
				o2.setValue('');
				o2.show();
			}
		}}
	},{
		name:'atypeidPost',id:'atypeid_'+rand+'',hidden:true
	},{
		fieldLabel:''+bitian+'指定值',value:'所有人员',nameidfields:'atypeid_'+rand+'',name:'atypenamePost',xtype:'changedeptuser',changetitle:'选择部门/人员',hidden:true,changetype:'deptcheckuser',changecheck:function(o){
			var atype = form.field('atypePost').getValue();
			if(atype=='all')return false;
			return true;
		}
	},{
		name:'checktypeidPost',value:'',hidden:true,id:'checktypeid_'+rand+''
	},{
		fieldLabel:'<font color=red>*</font>审核人类型',name:'checktypePost',editable:false,xtype:'optioncombo',optionmnum:'flowchecktype',autoloadlist:true,valuefields:'value',allowBlank: false,change:function(o){
			var val = o.value;
			form.field('rankingPost').setVisible((val=='rank')?true:false);
			form.field('checktypenamePost').setVisible((val=='user')?true:false);
		}
	},{
		fieldLabel:''+bitian+'选择职位',name:'rankingPost',xtype:'optioncombo',optionmnum:'ranking',autoloadlist:true,hidden:true
	},{
		fieldLabel:''+bitian+'审核人',nameidfields:'checktypeid_'+rand+'',hidden:true,name:'checktypenamePost',xtype:'changedeptuser',changetitle:'选择审核人',changetype:'usercheck'
	},{
		fieldLabel:'下一进程',name:'nidPost',value:'0',editable:false,xtype:'combo',store:[['0','结束流程']]
	},{
		fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:80
	},{
		fieldLabel:'处理表单',name:'inputidPost',xtype:'rockcombo',valuefields:'id',url:js.getajaxurl('getflowinput',mode,dir),defaultstore:[['0','-选择表单-']],autoloadlist:true,value:'0'
	},{
		fieldLabel:'排序号',name:'sortPost',xtype:'numberfield',value:0,minValue:0
	}],
	success:function(bac, o){
		var pid = o.field('pidPost').getValue();
		if(pid=='0')nowid = bac.id;
		if(nowid !=0){
			c.reload(nowid);
		}
		if(pid=='0')grid.storereload();
	},
	submitcheck:function(o){
		if(bool)return '请稍后';
		var type = o.field('atypePost').getValue(),
			ctype= o.field('checktypePost').getValue(),
			ctynae= o.field('checktypenamePost'),
			ctynai= o.field('checktypeidPost');
		if(type!='all' && o.field('pidPost').getValue()=='0' ){
			if(isempt(o.field('atypeidPost').getValue()))return '请选择指定部门/人';
		}
		
		if(ctype=='rank'){
			var rank = o.field('rankingPost').getValue();
			if(isempt(rank)){
				return '请选择职位';
			}else{
				ctynae.setValue(rank);
				ctynai.setValue('');
			}
		}else if(ctype=='user'){
			var ranks = ctynae.getValue();
			if(isempt(ranks))return '请选择审核人';
		}else{
			ctynae.setValue('');
			ctynai.setValue('');
		}
		return '';
	}
	
},{
	width:250,split:true,region:'west',xtype:'panel',layout:'border',border:false,items:[{
		tablename:'flow_course',keywhere:'and setid='+setid+' and pid=0',bbarbool:false,id:'paenlgrid_'+rand+'',
		title:'已有流程',xtype:'rockgrid',region:'center',columns:[{
			xtype: 'rownumberer',width: 40
		},{
			text:'针对类型',align:'center',dataIndex:'atypename',flex:1
		},{
			text:'名称',align:'center',dataIndex:'name',width:100
		}],
		click:function(o, v){
			nowid = v.raw.id;
			c.reload(nowid);
		}
	},{
		xtype:'treepanel',id:'paenltree_'+rand+'',split:true,tablename:'flow_course',title:'进程树形结构',hideHeaders:true,height:300,collapsible: true,region:'south',
		rootVisible:false,columns:[{xtype: 'treecolumn',text:'名称',flex:1,align:'left',dataIndex:'name'}],
		store:Ext.create('Ext.data.TreeStore', {
			fields:['name'],
			expanded: true,
			root:{children:[]}
		}),
		listeners:{
			itemclick:function(o,node){
				changedata = node.raw;
				c.gpath(node.raw.id);
			},
			itemmove:function(o,old,news,index){
				c.changeitemmove(o.raw,old.raw, news.raw);
			},
			beforeitemmove:function(o,old,news){
				if(news.raw.id=='root')return false;
			}
		},
		viewConfig: {
            plugins: {
                ptype: 'treeviewdragdrop'
            }
        },
		bbar:[{
			text:'保存移动',handler:function(){c.savemove()}
		},'-',{
			text:'恢复',handler:function(){c.treehuifu()}
		},{
			xtype:'tbtext',id:'magsa_'+rand+''
		}]
	}]
}];




function loadraphael(){
	if(get('raphaelmin')){
		bool = false;
	}else{
		var scr = document.createElement('script');
		scr.src = 'js/raphael-min-2.1.2.js';
		scr.id  = 'raphaelmin';
		scr.onload = function(){
			bool = false;
		}
		document.body.appendChild(scr);
		bool = false;
	}
}
var c = {
	movedata:{},
	jsondata:'{}',
	savemove:function()
	{
		if(bool)return;
		var da={},s,v,i=0;
		for(s in c.movedata){
			v = c.movedata[s];
			if(v>0){
				da['sid'+i+'']=''+s+':'+v+'';
				i++;
			}
		}
		da.total = i;
		if(i==0)return;
		getcmp('magsa_'+rand+'').setText('保存中...');
		bool = true;
		$.post(js.getajaxurl('savemove','course','flow'),da,function(s1){
			bool = false;
			getcmp('magsa_'+rand+'').setText('保存成功');
			c.reload(nowid);
		});
	},
	treehuifu:function()
	{
		tree.getStore().setRootNode(Ext.decode(c.jsondata));
	},
	changeitemmove:function(a,o,n)
	{
		var npid = n.id;
		var opid = a.pid;
		if(npid!=opid){
			this.movedata[a.id]=npid;
		}else{
			this.movedata[a.id]=-1;
		}
	},
	reload:function(lid)
	{
		if(bool)return;
		var url = publictreestore({expandall:'true',leaf:'false',order:'sort'});
		var s = '<img src="images/loading.gif" align="absmiddle"> 加载中...';
		$('#raphael_'+rand+'').html(s);
		bool = true;
		$.post(url,{tablename_abc:'flow_course',keywhere:'and setid='+setid+'',fistwhere:'and id='+lid+''},function(da){
			var a = js.decode(da);
			c.jsondata = da;
			c.movedata = {};
			tree.getStore().setRootNode(Ext.decode(da));
			data  = a.children;
			bool  = false;
			c.show();
		});
	},
	
	rect:function(o,x,y,text,sid, styp){
		
		var attr,w,h,attrs;
		attr 	= {stroke:'#ABD9FC','stroke-width':1,'fill':'#D8EEFF'};
		attrs 	= {'font-size':12,fill:'#208BF7'};
		if(styp=='start'||styp=='end'){
			attr = {stroke:'#cccccc','stroke-width':1,'fill':'#f1f1f1'};
			attrs 	= {'font-size':12,fill:'#888888'};
		}
		w    = 80;
		h	 = 40,
		x1	 = (x+w*0.5);
		var cl = o.rect(x,y,w,h, 5).attr(attr);
		var c2 = o.text(x1,(y+h*0.5), text).attr(attrs);
		cl.click(function(e){
			c.clickc(this,e, sid);	
		});
		c2.click(function(e){
			c.clickc(this,e, sid);	
		});
	},
	texpam:function(o,x,y,text){
		if(isempt(text))return;
		var c2 = o.text(x,y, text).attr({'font-size':11,fill:'#555555'});
	},
	clickc:function(o1,e, sid){
		var a,c,pid,bo;
		a = json[sid];
		changedata = a;
		c = a.children;
		getcmp('cancelss_'+rand+'').setDisabled((c.length<=0)?false:true);
		pid = a.pid;
		bo = true;
		if(pid>0){
			if(json[pid].children.length>1)bo=false;
		}
		getcmp('setcog_'+rand+'').setDisabled(bo);
		bo = false;
		if(a.checktype=='start' || a.checktype=='end')bo = true;
		getcmp('actcog_'+rand+'').setDisabled(bo);
		this.gpath(sid);
		omenu.showAt([e.clientX, e.clientY]);
	},
	jian:function(o,x,y,x1,y1, jt){
		var atr = {
			stroke: '#208BF7',
			'stroke-width': 2
		};
		if(jt)atr['arrow-end'] = 'classic-wide-long';
		o.path('M'+x+' '+y+'L'+x1+' '+y1+'').attr(atr);
	},
	
	show:function(){
		var oi=0,oarr=[],s='',w,bgcol=['#f1f1f1','#EDE3FC','#F9EFB3','#D0F9CF'],i1,o;
		oi= data.length;
		o = $('#'+obj0.id+'-body');
		w = o.width();
		h = o.height();
		s ='<table cellspacing="0" cellpadding="0"><tr>';
		w= w-20;
		
		$('#raphael_'+rand+'').html(s);
		$('#raphael_'+rand+'').css('height',h);
		
		var pap=Raphael('raphael_'+rand+'',w,h+100);
		json = {};
		sjson= {};
		c.addtu(data[0], pap,w,w, 0, 1,0);
		c.addot(pap);
	},
	getcome:function()
	{
		var a,b,c;
		var a=[['0','结束进程']];
		for(b in json){
			c = json[b];
			if(this.path.indexOf('['+c.id+']')<0){
				a.push([c.id,''+c.id+'.'+c.name+'']);
			}
		}
		return a;
	},
	
	addot:function(pap){
		var a,b,d,nid,a1;
		var cw = 84,ch = 44;
		var x,y,x1,y1;
		for(b in sjson){
			a = sjson[b];
			nid= a.nid;
			if(nid>0){
				a1 = json[nid];
				if(a1){
					x = a.x;
					y = a.y;
					x1 = a1.x;
					y1 = a1.y;

					if(x>x1){
						x1 = x1+cw;
						y1 = y1 + ch*0.5;
					}else if(x<x1){
						y1 = y1 + ch*0.5;
						x1 = x1 -2;
					}else{
						x1 = x1+cw*0.5;
					}
					
					var jg = y1-y;
					if(jg > 0){
						x = x+cw*0.5;
						y = y+ch+2;
					}else{
						x = x -2;
						y = y+ch*0.5;
					}
					
					c.jian(pap, x, y, x1, y1, true);
					
				}
			}
		}
	},
	//以下计算很难理解啊
	addtu:function(a, pap, zw,w, oi, zc,st){
		var y,len,i,x,na,ctyp,ctyps;
		var cw = 80,ch = 40,jth=60;
		
		y = 10 +  ((ch+jth)*(a.level-1));
		x = w/zc *0.5 - cw*0.5 + oi * w/zc + st;
		
		ctyp = a.checktype;
		ctyps= a.checktypename;
		if(ctyp=='end'||ctyp=='start')ctyp='';
		if(!isempt(ctyp)){
			ctyp = form.field('checktypePost').getItems(ctyp);
			if(!isempt(ctyps))ctyp=ctyps;
		}
		
		na= ''+a.id+'.'+a.name;
		if(!isempt(ctyp))na+='\n'+ctyp;
		
		c.rect(pap,x, y, na, a.id, a.checktype);
		
		a.x = x;
		a.y = y;
		json[a.id] = a;

		len = a.children.length;
		if(len>0){
			var clxy = [];
			for(i=0;i<len;i++){
				var asd=c.addtu(a.children[i], pap, zw, w/zc, i, len, st+oi * w/zc);
				clxy.push(asd);
			}
			i = 0;
			
			//画箭头
			var ny1 = y+ch+jth*0.5;
			if(len==1){
				c.jian(pap, x+cw*0.5, y+ch+5, clxy[i][0]+cw*0.5, clxy[i][1]-5, true);
			}else{
				
				c.jian(pap,clxy[i][0]+cw*0.5, ny1, clxy[len-1][0]+cw*0.5 , ny1,false);
				c.jian(pap, x+cw*0.5, y+ch+5, x+cw*0.5, ny1, false);
				
				for(i=0;i<len;i++){
					c.texpam(pap,  clxy[i][0]+cw*0.5, ny1-10, a.children[i].explain);
					c.jian(pap, clxy[i][0]+cw*0.5, ny1, clxy[i][0]+cw*0.5, clxy[i][1]-5, true);
				}
			}			
		}else{
			sjson[a.id] = a;
		}
		return [x,y];
	},
	path:'',
	gpath:function(sid){
		this.path = '';
		this.gpaths(json[sid]);
	},
	gpaths:function(a){
		this.path+='['+a.id+']';
		if(json[a.pid]){
			this.gpaths(json[a.pid]);
		}
	}
};

function startload(){
	c.init();
}


return {
	panel:panel,
	init:function(){
		obj0 = getcmp('courseaefwe_'+rand+'');
		form = rock[index][1];
		grid = getcmp('paenlgrid_'+rand+'');
		tree = getcmp('paenltree_'+rand+'');
		loadraphael();
	}
};