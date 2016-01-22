/**
	calendar日历
	create:Chenxihu
	createdt:2013-11-05 11:05:00
*/
Ext.define('Ext.ux.calendar', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.calendarpanel',
	obj:false,
	objtd:false,
	marr:[31,28,31,30,31,30,31,31,30,31,30,31],
	weekarr:['日','一','二','三','四','五','六'],
	date:'',
	Y:'2013',
	m:'01',
	d:'01',
	color:'#ffffff',
	feastarr:{'0101':'元旦','0214':'情人节','正月初一':'春节','正月十五':'元宵节','七月初七':'七夕','五月初五':'端午节','0501':'劳动节','0601':'儿童节','1001':'国庆节','1111':'光棍节','八月十五':'中秋节','腊月三十':'除夕','腊月初八':'腊八','0801':'建军节','0701':'建党日','0401':'愚人节','0504':'青年节','0308':'妇女节','1225':'圣诞节','1224':'平安夜','1031':'万圣节','九月初九':'重阳节','0910':'教师节','0504':'青年节','0312':'植树节'},
	tsarr:{'1144':'感恩节','0520':'母亲节','0630':'父亲节'},//感恩节:11月第4个星期4,父亲节:05月第2个星期日,母亲节:06月第3个星期日
	rand:'',
	solarTerm:["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],
	sTermInfo:[0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758],
	
	//===== 某年的第n个节气为几日(从0小寒起算)
	sTerm:function(y,n) {
		var offDate = new Date( ( 31556925974.7*(y-1900) + this.sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
		return(offDate.getUTCDate());
	},
	changemonth:function(){},
	beforechangemonth:function(){},
	defaultMonth:'',
	rightBtn:[],
	leftBtn:[],
	initComponent: function(){
		var me	= this,i;
		me.rand	= js.getrand();
		me.date	= me.formdt();//今天
		var a	= me.date.split('-');
		me.Y	= parseFloat(a[0]);
		me.m	= a[1];
		me.d	= a[2];
		if(me.defaultMonth){
			a = me.defaultMonth.split('-');
			me.Y = parseFloat(a[0]);
			me.m = a[1];
		}
		Ext.applyIf(this,{
			border:false,
			frame:false,
			id:'calendar_'+this.rand+'',textvalign:'middle',
			bbartext:true,bbar:false,todaycolor:'#D1E3F9'
		});
		this.html=this.createtable();
		if(this.bbartext){
			if(!this.bbar)this.bbar=[];
			this.bbar.push('->');
			this.bbar.push({xtype:'tbtext',id:'lunardayshowmsg'+me.rand+''});
		}
		this.tbar = [{
			text:'当月',icon:gicons('date'),id:'btnshowclick'+me.rand+'',tooltip:'今天是：'+this.date+'',handler:function(){me.dangmonth();},xtype:'splitbutton',menu:[{xtype:'monthpicker',value:[this.m-1,this.Y],listeners:{okclick:function(a,v){getcmp('btnshowclick'+me.rand+'').hideMenu();var m=v[0],y=v[1];if(m!=''&&y!='')me.addcale(y,m+1);},cancelclick:function(){getcmp('btnshowclick'+me.rand+'').hideMenu()}}
			}]
		},{
			text:'上个月',handler:function(){me.plftmonth(-1)},icon:gicons('resultset_previous')
		}];
		for(i in this.leftBtn)this.tbar.push(this.leftBtn[i]);
		this.tbar.push('->');
		this.tbar.push({
			text:'2014年12月',xtype:'tbtext'	,id:'calenow_'+me.rand+'',style:'font-size:14px;font-weight:bold'
		});
		this.tbar.push('->');
		for(i in this.rightBtn)this.tbar.push(this.rightBtn[i]);
		this.tbar.push({
			text:'下个月',handler:function(){me.plftmonth(1)},icon:gicons('resultset_next'),iconAlign:'right'
		});
		this.on({
			resize:function(o,width, height, oldWidth, oldHeigh){
				me.resizebody(height);
			}
		});
		this.callParent();
		//农历转化初始化cursor:pointer
		this.lunar=Ext.create('Ext.ux.tolunar');
	},
	createtable:function()
	{
		var s='',i,oi=0,j;
		s+='<div style="border-right:1px #cccccc solid;position:static" id="extcalendarpanel'+this.rand+'"><table border="0" style="border-collapse:collapse;" cellpadding="0" height="100%" cellspacing="0" width="100%">';
		s+='<thead><tr bgcolor="#f1f1f1" style="color:#333333" height="25"><th><div align="center">日</div></th><th><div align="center">一</div></th><th><div align="center">二</div></th><th><div align="center">三</div></th><th><div align="center">四</div></th><th><div align="center">五</div></th><th><div align="center">六</div></th></tr></thead>';
		for(i=1;i<=6;i++){
			s+='<tr class="x-grid-row-over">'
			for(j=1;j<=7;j++){
				s+='<td oi="'+oi+'" valign="'+this.textvalign+'" onmouseover="this.className=\'x-grid-td\'" onmouseout="this.className=\'\'" style="border:1px #dddddd solid" width="14.2%" align="center"></td>';
				oi++;
			}
			s+='</tr>';
		}
		s+='</table></div>';
		return s;
	},
	afterFirstLayout:function()
	{
		var me		= this;
		me.obj		= $('#extcalendarpanel'+this.rand+'');
		me.objtd	= me.obj.find('td');
		me.addcale(me.Y,me.m);
		var arr		= me.lunar.iconv(me.Y,me.m,me.d);
		if(me.bbartext)getcmp('lunardayshowmsg'+this.rand+'').setText('今天是：'+me.formdt('Y年m月d日 星期W')+' &nbsp;农历：'+arr[0]+' '+arr[1]+''+arr[2]+'');
		me.objtd.click(function(event){
			me.clickday(this,event);	
		});
	},
	addhtml:function(fi, ti){
		var me 	= this;
		var oha = ($('#'+this.id+'-body').height()-25)/6;
		var d1  = this.dayobj[fi],
			d2  = this.dayobj[ti];
		var i1	= d1.oi,i2 = d2.oi,l,t;	
		
		//var s 	= '<div style="position:absolute;left:'+l+'px;top:'+t+'px">'+i1+'-'+i2+'</div>';
		//this.obj.append(s);
	},
	resizebody:function(he){
		var oha = ($('#'+this.id+'-body').height()-25)/6;
		for(var i=0;i<42;i=i+7)
		$(this.objtd[i]).css('height',''+oha+'px');
	},
	//上个月
	plftmonth:function(lx)
	{
		var Y=parseFloat(this.Y),m=parseFloat(this.m);
		m=m+lx;
		if(m==0)m=12;
		if(m==13)m=1;
		if(m==12&&lx==-1)Y--;
		if(m==1&&lx==1)Y++;
		this.addcale(Y,m);
	},
	dangmonth:function()
	{
		var a	= this.date.split('-');
		var	Y	= parseFloat(a[0]);
		var	m	= parseFloat(a[1]);
		if(Y==this.Y&&m==this.m)return false;
		this.Y=Y;
		this.m=m;
		this.addcale(Y,m);
	},
	weekArr:['日','一','二','三','四','五','六'],
	formdt:function(type,sj){//获取时间
		if(!type)type='Y-m-d';
		var dt,ymd,his,Y,m,d,w,H,i,s,W
		if(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(sj)&&sj){
			sj=sj.split(' ');
			ymd=sj[0];
			his=sj[1];if(!his)his='00:00:00';
			ymd=ymd.split('-');
			his=his.split(':');;
			dt=new Date(ymd[0],ymd[1]-1,ymd[2],his[0],his[1],his[2]);
		}else{
			dt=new Date();
		}
		Y=dt.getFullYear();//年
		m=dt.getMonth()+1;if(m<10)m='0'+m;//月
		d=dt.getDate();if(d<10)d='0'+d;//天
		w=dt.getDay();//星期
		H=dt.getHours();if(H<10)H='0'+H;//小时
		i=dt.getMinutes();if(i<10)i='0'+i;//分钟
		s=dt.getSeconds();if(s<10)s='0'+s;//秒
		W=this.weekArr[w];
		return type.replace('Y',Y).replace('m',m).replace('d',d).replace('H',H).replace('i',i).replace('s',s).replace('w',w).replace('W',W);
	},
	clearbgcolor:function(){
		this.objtd.css({'backgroundColor':'','color':''});
	},
	setMonth:function(Y, m){
		if(Y.indexOf('-')){
			var a = Y.split('-');
			Y = a[0];
			m = a[1];
		}
		this.addcale(Y, m);
	},
	addcale:function(Y,m)
	{
		var me = this;
		me.Y=Y;
		me.m=m;
		var first	= ''+Y+'-'+m+'-01',
		stuat	= me.formdt('Y-m-w',first);
		stuat	= stuat.split('-');
		var year=parseFloat(stuat[0]),
			month=parseFloat(stuat[1]),
			maxday=me.marr[month-1];//这个月最大天数
		if(year%4==0&&month==2)maxday=29;//判断是不是轮年
		month=xy10(month);
		me.beforechangemonth(me, Y, month);
		var ic=parseFloat(stuat[2]);
		me.objtd.html('<div>&nbsp;</div><div>&nbsp;</div>');
		me.objtd.attr('title','');
		me.clearbgcolor();
		var maic=1;
		var xq	= 0,nic=ic-1,xqa=ic;
		var xqarr=[0,0,0,0,0,0,0];
		//当月24节气名称
		var tmp1=me.sTerm(Y,m*2-2);
		var tmp2=me.sTerm(Y,m*2-1);
		var sterma={};
		sterma[''+month+''+tmp1+'']=me.solarTerm[m*2-2];
		sterma[''+month+''+tmp2+'']=me.solarTerm[m*2-1];
		me.dayvalue={};
		me.dayobj={};
		for(var i=0;i<maxday;i++){
			maic=i+ic;
			nic++;
			if((maic+1)%7==0)xq++;
			if(maic%7==0)nic=0;
			xqarr[nic]++;
			var o	= me.objtd[maic];
			var sar = {d:i+1,oi:maic,week:this.weekArr[xqa]};
			xqa++;
			if(xqa==7)xqa=0;
			
			var d	= xy10(sar.d);
			var day	= ''+year+'-'+month+'-'+d+'',nday=day;
			o.style.backgroundColor=(day==me.date)?me.todaycolor:'';//今天
			
			var jrday= this.feastarr[''+month+''+d+''];
			var lunar= me.lunar.iconv(Y,m,d);//农历计算
			sar.lunar= lunar;//农历
			//父亲节母亲节感恩节计算
			var tsjrs=me.tsarr[''+month+''+xqarr[nic]+''+nic+''];
			if(tsjrs)jrday=tsjrs;
			
			//24节气名称
			var j24name	= sterma[''+month+''+(i+1)+''];
			if(j24name)jrday=j24name;
			sar.color='red';
			if(!jrday){
				if(lunar!=''){
					var mts		= lunar[1]+lunar[2];
					var jrday	= me.feastarr[mts];
					if(jrday){
						day+='\n'+jrday+'';
						sar.jieri	= jrday;
					}else{
						sar.jieri	= lunar[2];
						sar.color	= '#aaaaaa';//没有节日的
					}
				}
			}else{
				day+='\n'+jrday+'';
				sar.jieri = jrday;
			}
			if(lunar!='')day+='\n'+lunar[0]+' '+lunar[1]+lunar[2]+'';
			this.addneiroshow(o, sar);
			me.dayobj[sar.d]	= sar;
			me.dayvalue[maic] 	= sar;
			o.title=day;
		}
		/*
		var qoi	= 1;
		for(var i=maxday+ic;i<42;i++){
			var o	= me.objtd[i];
			o.innerHTML='<div style="color:#cccccc;line-height:26px">'+qoi+'</div><div style="line-height:20px">&nbsp;</div>';
			qoi++
		}*/
		getcmp('calenow_'+me.rand+'').setText(''+year+'年'+month+'月');
		me.changemonth(me,Y, month);
	},
	renderer:function(){
		return '';
	},
	addneiroshow:function(o, sar){
		var s= '<div style="font-size:14px;line-height:20px">'+sar.d+'</div>';
		s+='<div style="font-size:11px;color:'+sar.color+';line-height:20px">'+sar.jieri+'</div>';
		var s1 = this.renderer(o,sar,this.Y,xy10(this.m));
		if(s1)s=s1;
		o.innerHTML = s;
	},
	clickday:function(o, e)
	{
		var me = this;
		var oi=parseFloat($(o).attr('oi'));
		var d = me.dayvalue[oi];
		if(!d)return;
		var m	= me.m;
		var day=''+me.Y+'-'+xy10(m)+'-'+xy10(d.d)+'';
		this.click(day,me, e);
	},
	click:function(){}
});