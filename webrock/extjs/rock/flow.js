/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.flow', {
	win:false,
	config:{
		rand:'',
		tablename:'',
		flownum:'',
		checkcall:function(){},
		opentype:0
	},
	constructor: function (config){
		this.initConfig(config);
		if(!this.rand)this.rand = js.getrand();
		
	},
	_url:function(at,can){
		return js.getajaxurl(at,'flow','',can);
	},
	showbtn:function(val,ma, c, fnum){
		var s = '',s1='',
			a = c.raw;
		if(isempt(fnum))fnum=this.flownum;
		if(a.statustext)s = a.statustext;
		if(this.opentype==1){
			var btn = a.notbtnarr,dz;
			for(dz in btn){
				s1 += '<input value="'+btn[dz][0]+'" recezt="'+btn[dz][1]+'" nidzt="'+btn[dz][3]+'" temp="flowbtn_'+this.rand+'_'+fnum+''+a.id+'" receid="'+a.id+'" flownum="'+fnum+'" type="button">';
			}
			s+='<br>'+s1;
		}
		return s;
	},
	
	iseditdel:function(v, eid, did){
		if(this.opentype!=0)return;
		var bo = true;
		if(v){
			var a = v.raw;
			if(a.isturn!='1' && (a.status=='0' || a.status=='2'))bo=false;
			if(a.nstatus=='0' || a.nstatus=='2')bo=false;
		}
		if(eid){
		eid+='_'+this.rand;
		if(getcmp(eid)){
			getcmp(eid).setDisabled(bo);
		}}
		if(did){
		did+='_'+this.rand;
		if(getcmp(did)){
			getcmp(did).setDisabled(bo);
		}}
	},
	loadshow:function(obj){
		var me = this;
		me.gridobj = obj;
		$("input[temp^='flowbtn_"+this.rand+"_']").click(function(){
			me._check(this, obj);
		});
		//me.ztarr = obj.getData('ztarr');
	},
	_check:function(o1, obj){
		if(this.bool)return false;
		var me	= this;
		var o	= $(o1);
		var id	= o.attr('receid'), zt	= o.attr('recezt'), num = o.attr('flownum'), name= o.attr('quename'), nid = o.attr('nidzt'), actv= o.val();
		if(isempt(name))name='';
		var sm	= '';
		var can = {id:id,zt:zt,sm:sm,flownum:num, name:name,actname:actv};
		if(nid == '-1'){
			Ext.MessageBox.prompt(actv, '请输入处理['+actv+']的原因:',function(a,b){
				if(a=='ok' && b){
					can.sm	= b;
					o1.disabled = true;
					me._checksubmit(can, o1);
				}
			},'',true,'');
		}else{
			o1.disabled = true;
			this._checksubmit(can, o1);
		}
	},
	_checksubmit:function(can, o1){
		o1.value='处理中...';
		this.bool	= true;
		var me	= this;
		$("input[temp='flowbtn_"+this.rand+"_"+can.flownum+""+can.id+"']").attr('disabled',true);
		$.post(this._url('check'),can,function(da){
			o1.value= da;
			me.bool	= false;
			if(da.indexOf('成功')>0){
				if(me.gridobj)me.gridobj.storereload();
				me.checkcall();
				try{reloaddaiban()}catch(e){}
			}	
		});
	},
	showinfor:function(id,tab){
		if(typeof(flowwindow)!='object'){
			var cans = winopt({title: '查看',icon:gicons('page_white_text'),width:670,height:300,border:false,layout:'border',items:[{
					region:'west',width:140,xtype:'panel',split:true,autoScroll:true,html:'<div id="flowinfor_rockcourse" style="padding:5px;text-align:center;line-height:26px"></div>'
				},{
					region:'center',xtype:'grid',id:'flowinfor_rockgrid',
					store:Ext.create('Ext.data.Store',{
						fields:['id','name','checkname','status','explain','optdt'],
						data:[]
					}),
					columns:[{
						xtype: 'rownumberer',width:40	
					},{
						text:'名称',dataIndex:'name',align:'center',width:130,sortable:false
					},{
						text:'处理人',dataIndex:'checkname',align:'center',width:80,sortable:false
					},{
						text:'状态',dataIndex:'status',align:'center',width:80,sortable:false,renderer:function(v){
							var s=v;
							if(v=='1')s='<font color=green>通过</font>';
							if(v=='2')s='<font color=red>不通过</font>';
							return s;
						}
					},{
						text:'时间',dataIndex:'optdt',align:'center',width:160,sortable:false
					}],
					viewConfig: {
						enableTextSelection: true
					},
					features: [{
						ftype: 'rowbody',
						getAdditionalData: function(v, index) {
							var cont = v.explain,
								s	= '';
							var cls = 'x-grid-row-body-hidden';
							if(!isempt(cont)){
								cls = '';
								s	= '<div style="padding:2px;padding-left:5px;line-height:20px">【说明】：'+cont+'</div>';
							}
							return {
								rowBody: s,
								rowBodyCls:cls
							};
						}
					}, {
						ftype: 'rowwrap'
					}]
				}]	
			});
			flowwindow = Ext.create('Ext.Window',cans);
		}
		flowwindow.show();
		this._loadinfor({mid:id,table:tab});
	},
	_loadinfor:function(cans){
		flowwindow.el.mask('加载中...');
		var me = this;
		$.post(this._url('getinfor'),cans, function(da){
			var a = Ext.decode(da);
			me._loadinforshow(a);
		});
	},
	_loadinforshow:function(a){
		getcmp('flowinfor_rockgrid').getStore().loadData(a.rows);
		flowwindow.el.unmask();
		var log = a.log,s='',i,col,sty,s1='';
		for(i=0; i<log.length; i++){
			col = '#888888';
			sty = '#';
			if(log[i].zt==2){
				sty = 'color:#888888;';
				col	= '#cccccc';
			}	
			if(log[i].zt==1){
				sty = 'font-weight:bold;color:#800000';
				col	= '#800000';
			}	
			s1='<span style="margin:2px;"><br>↓<br></span>';
			if(i==0)s1='';
			s+='<span style="'+sty+'">'+s1+'<span style="padding:3px 5px;border:1px '+col+' solid">'+(i+1)+'. '+log[i].name+'</span></span>';
		}
		$('#flowinfor_rockcourse').html(s);
	}
});
