var tdobj={},year,month,weekds='',xiuobj={},nowday,xiuid = 1, color = '#EAEFBF';
function getxiu(){
	var url = js.getajaxurl('getxiu',mode,dir,{y1:year,m1:month,xiuid:xiuid});
	clearxiula();
	js.msg('wait','加载中...');
	$.get(url,function(da){backset(da);});
}
function clearxiula(){
	for(var a in tdobj)tdobj[a].style.backgroundColor='';
}
function backset(da){
	var a = js.decode(da),i,a1,d;
	js.msg();
	for(i=0;i<a.length;i++){
		if(tdobj[a[i].date]){
			tdobj[a[i].date].style.backgroundColor=color;
			xiuobj[a[i].date]=true;
		}
	}
}
function aetall(){
	var url = js.getajaxurl('setallxiu',mode,dir,{y1:year,m1:month,xiuid:xiuid});
	js.msg('wait','设置中...');
	$.post(url,{s:weekds},function(da){
		js.msg('success','设置成功');
		backset(da);
	});
}
function changexiuft(lx){
	var url = js.getajaxurl('changexiu',mode,dir,{day:nowday,lx:lx,xiuid:xiuid});
	$.get(url);
	if(lx==0){
		tdobj[nowday].style.backgroundColor=color;
		xiuobj[nowday] = true;
	}
	if(lx==1){
		tdobj[nowday].style.backgroundColor='';
		xiuobj[nowday] = false;
	}
}


var omenu=Ext.create('Ext.menu.Menu',{
	items:[{
		text:'设置为休息日',id:'setxiu_'+rand+'',disabled:true,handler:function(){changexiuft(0)}
	},'-',{
		text:'取消休息日',id:'qxxiu_'+rand+'',disabled:true,handler:function(){changexiuft(1)}
	}]
});
var panel=[{
	title:'[休息日设置]针对对象规则',region:'west',width:'50%',split:true,tablename:'kq_xium',formtitle:'规则',iconqz:'time_',
	xtype:'rockgridform',searchtools:false,pageSize:0,bbarbool:false,defaultorder:'`sort`',
	grideditwhere:function(d){return d.id!=1;},
	griddelwhere:function(d){return d.id!=1;},
	tbar:['提示：双击行设置对应休息日'],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',autowidth:true,search:true,width:50
	},{
		text:'针对对象',dataIndex:'recename',autowidth:true,search:true
	},{
		text:'开启日期',dataIndex:'startdt',autowidth:true,search:true,atype:'date'
	},{
		text:'截止日期',dataIndex:'enddt',autowidth:true,search:true,atype:'date'
	},{
		text:'排序号',dataIndex:'sort',width:70,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'ID',dataIndex:'id',width:60
	}],
	formparams:{
		submitfields:'name,recename,receid,sort,enddt,startdt',
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'<font color=red>*</font>名称',name:'namePost',allowBlank: false
		},{
			id:'receid_'+rand+'',name:'receidPost',hidden:true
		},{
			fieldLabel:'针对对象',nameidfields:'receid_'+rand+'',name:'recenamePost',xtype:'changedeptuser',changetitle:'选择部门/人员',changetype:'deptusercheck'
		},{
			fieldLabel:'开启日期',name:'startdtPost',xtype:'datefield',format:'Y-m-d'
		},{
			fieldLabel:'截止日期',name:'enddtPost',xtype:'datefield',format:'Y-m-d'
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	},
	dblclick:function(o, re){
		xiuid = re.get('id');
		getcmp('tbtextla_'+rand+'').setText('['+re.get('name')+']休息日');
		getxiu();
	}
},{
	xtype:'calendarpanel',textvalign:'top',region:'center',bbartext:false,
	renderer:function(tad, ars, y, m){
		var s= '<div style="line-height:20px;text-align:left">&nbsp;'+ars.d+' <span style="font-size:11px;color:'+ars.color+'">'+ars.jieri+'</span> </div>';
		s+='<div></div>';
		var day = ''+y+'-'+m+'-'+xy10(ars.d)+'';
		tdobj[day] = tad;
		if(ars.week=='六' || ars.week=='日')weekds+=','+day;
		return s;
	},
	beforechangemonth:function(){
		weekds='';
		tdobj={};
		xiuobj={};
	},
	changemonth:function(o,y,m){
		year=y;
		month=m;
		weekds = weekds.substr(1);
		getxiu();
	},
	bbar:[{
		xtype:'tbtext',text:'<div style="height:16px;width:16px;background:'+color+';overflow:hidden"></div>'
	},{
		text:'休息日'
	},'-',{
		text:'设置本月周六周日为休息日',icon:gicons('cog'),handler:function(){aetall()}
	},'->',{
		text:'[全体人员]休息日',xtype:'tbtext',id:'tbtextla_'+rand+''
	}],
	click:function(day, o, e){
		omenu.showAt([e.clientX,e.clientY]);
		nowday = day;
		var bo = false;
		if(xiuobj[day])bo=true;
		if(!bo){
			getcmp('setxiu_'+rand+'').setDisabled(false);
			getcmp('qxxiu_'+rand+'').setDisabled(true);
		}else{
			getcmp('setxiu_'+rand+'').setDisabled(true);
			getcmp('qxxiu_'+rand+'').setDisabled(false);
		}
	}
}];
return {
	panel:panel
};