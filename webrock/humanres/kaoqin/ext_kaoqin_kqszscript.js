var form;
function loadinit(){
	$.get(js.getajaxurl('getset',mode,dir), function(da){
		var a = js.decode(da);
		form.adddata(a);
		form.field('idPost').setValue(''+a.id+'');
	});
}

function changecheck(v){
	var na = v.name.replace('Post','');
	getcmp(''+na+'Post_'+rand+'').setVisible(v.checked);
}

function itemslex(na){
	return {
		xtype: 'fieldcontainer',hidden:true,id:''+na+'kqPost_'+rand+'',margin:'0 0 20 0',defaultType: 'textfield',layout:'hbox',items:[{
			fieldLabel:'时间从',name:''+na+'stPost',xtype:'rockdate',editable:false,format:'H:i',width:200
		},{
			xtype:'displayfield',value:'&nbsp;至&nbsp;'
		},{
			hideLabel:true,name:''+na+'etPost',xtype:'rockdate',editable:false,format:'H:i',width:100
		}]
	};
}

var panel={
	xtype:'panel',border:false,padding:20,items:{
		width:400,tablename:'kq_set',id:'kqset_'+rand+'',
		submitfields:'amsb,amxb,pmsb,pmxb,amsbkq,amxbkq,pmsbkq,pmxbkq,amsbst,amsbet,amxbst,amxbet,pmsbst,pmsbet,pmxbst,pmxbet',
		params:{int_filestype:'amsbkq,amxbkq,pmsbkq,pmxbkq'},
		xtype:'rockform',border:false,labelWidth:100,items:[{
			value:'1',name:'idPost',hidden:true
		},{
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'上午上班',name:'amsbPost',xtype:'rockdate',allowBlank: false,editable:false,width:200,format:'H:i'
			},{
				name:'amsbkqPost',xtype:'checkboxfield',boxLabel:'需要考勤',inputValue:'1',listeners:{change:changecheck}
			}]
		},
		itemslex('amsb')
		,{
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'上午下班',name:'amxbPost',xtype:'rockdate',allowBlank: false,editable:false,width:200,format:'H:i'
			},{
				name:'amxbkqPost',xtype:'checkboxfield',boxLabel:'需要考勤',inputValue:'1',listeners:{change:changecheck}
			}]
		},itemslex('amxb'),{
			xtype:'displayfield',value:''
		},{
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'下午上班',name:'pmsbPost',xtype:'rockdate',allowBlank: false,editable:false,width:200,format:'H:i'
			},{
				name:'pmsbkqPost',xtype:'checkboxfield',boxLabel:'需要考勤',inputValue:'1',listeners:{change:changecheck}
			}]
		},itemslex('pmsb'),{
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'下午下班',name:'pmxbPost',xtype:'rockdate',allowBlank: false,editable:false,width:200,format:'H:i'
			},{
				name:'pmxbkqPost',xtype:'checkboxfield',boxLabel:'需要考勤',inputValue:'1',listeners:{change:changecheck}
			}]
		},itemslex('pmxb'),{
			xtype:'displayfield',value:'<div class="blank1"></div>'
		}]
	}
}
return {
	panel:panel,
	init:function(){
		form = getcmp('kqset_'+rand+'');
		loadinit();
	}
};