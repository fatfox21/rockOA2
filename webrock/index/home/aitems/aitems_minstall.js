homeitems.minstall = {
	xtype:'rockgrid',title:'模块安装升级',margin:margin,tools:tools,bbarbool:false,closable:false,tablename:'chargemode',frame: true,padding:0,border:false,url:js.getajaxurl('getstatusa','upgrade','system'),abcnum:'minstall',abcurl:'system,upgrade,install',fields:['state','startdt'],tabstitle:'模块安装升级',
	fields:['buyurl','updatesm'],
	columns:[{
		text:'',dataIndex:'xuhao',width: 35
	},{
		text:'模块名',dataIndex:'name',width:120
	},{
		text:'说明',flex:1,dataIndex:'explain',align:'left',renderer:function(v,m,d){
			var s = '<div style="white-space:normal;">'+v+'',sm=d.get('updatesm');
			if(!isempt(sm))s+='<br>【更新说明】<br>'+sm+'';
			s+='</div>';
			return s;
		}
	},{
		text:'操作',dataIndex:'utype',width:90,search:true,renderer:function(v,m,d){
			var s='<div style="padding:10px">',ulx=v,byurl=d.get('buyurl');
			if(ulx==0){
				s+='<a class="a" href="'+byurl+'" target="_blank">￥看介绍</a>';
			}
			if(ulx==1){
				s+='<font color="#57A81E">已安装</font>';
			}
			if(ulx==2){
				s+='<font color=#D31D42>↑升级</font>';
			}
			s+='</div>';
			return s;
		}
	}]
};