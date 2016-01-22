
var panel= {
	xtype:'rockgrid',
	tablename:'infor',searchtools:true,defaultorder:'xu,optdt desc',
	tbar:['-',{
		text:'双击可预览',
		xtype:'tbtext',id:'mstaol_'+rand+''
	}],url:publicstore('infor','system'),storeafteraction:'inforgong',storebeforeaction:'beforeinforgong',
	fields:['wd'],
	viewConfigs:{
		getRowClass: function(v, rowIndex){
			if(v.get('wd')==0)return 'hui';
   		}
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'类型',dataIndex:'typename',width:120,search:true,editor:'textfield'
	},{
		text:'标题',dataIndex:'title',align:'left',flex:1,search:true,renderer:function(v,m,r){
			if(r.get('wd')==1)v='<font color=red>[未读]</font> '+v+'';
			return v;
		}
	},{
		text:'操作人',dataIndex:'optname',width:100,search:true
	},{
		text:'发布者/部门',dataIndex:'zuozhe',search:true,autowidth:true
	},{
		text:'时间',dataIndex:'indate',search:true,autowidth:true
	},{
		text:'操作时间',dataIndex:'optdt',width:150,search:true
	},{
		text:'序号',dataIndex:'xu',width:60,search:true
	}],
	dblclick:function(o, r){
		var url = js.getajaxurl('$gong','view','taskrun',{uid:adminid,id:r.data.id,jmbool:true});
		js.open(url, 800);
	},
	load:function(){
		var to = this.getData('wdtotal');
		var s = '双击可预览',s1='';
		if(to>0){
			s+='，未阅读信息<font color=red>('+to+')</font>条';
			s1 = '('+to+')';
		}	
		getcmp('mstaol_'+rand+'').setText(s);
		$('#inforweidutotal').html(s1);
	}
};



return {
	panel:panel
};