/**
 * datetime时间面板，需要jquery的支持哦
 */
Ext.define('Ext.ux.form.DateTime', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.datetimefield',
	format:'Y-m-d H:i:00',
	timepicker:false,
	showToday:false,
	timeobj:{shi:false,fen:false,miao:false},
	onchange:function(){},
	editable:false,
	
	initComponent: function() {
        var me = this;
		if(me.format=='datetime')me.format='Y-m-d H:i:s';
        me.callParent();
    },
	
	onExpand:function(){
		var me = this,H='00',i='00',s='00';
		me.callParent(arguments);
		if(me.timepicker){
			me._initshowdaot();
		}
		if(me.timepicker || me.format.indexOf(':')<0)return;

		var sid = me.picker.eventEl.id;
		$('#'+sid+'').after('<div style="padding:5px 2px" id="timeshow_'+sid+'"></div>');
		var listeners = function(lx){
			return {
				focus:function(a,e){
					me._focusxlshow(a,e,lx);
				}
			};
		}
		me.timepicker = Ext.create('Ext.container.Container', {
			layout: {type: 'hbox',align: 'middle'},
			renderTo: 'timeshow_'+sid+'',
			defaults: {
				xtype: 'textfield',
				minValue:0,
				minValues:0,
				margin:'0 2',
				hideLabel:true,readOnly:true
			},
			items: [{
				xtype:'tbtext',text:'&nbsp;'
			},{
				maxValue:23,maxValues:23,flex:1,value:H,disabled:me.format.indexOf('H')<0,itemId:'shi',listeners:listeners('shi')
			},{
				maxValue:59,maxValues:59,flex:1,value:i,disabled:me.format.indexOf('i')<0,itemId:'fen',listeners:listeners('fen')
			},{
				maxValue:59,maxValues:59,flex:1,value:s,disabled:me.format.indexOf('s')<0,itemId:'miao',listeners:listeners('miao')
			},{
				xtype:'splitbutton',handler:function(){me._selectok()},text:'确定',menu:[{
					text:'现在',handler:function(){me._selectnow()}
				}]
			}]
		});
		me.timeobj = {
			shi:me.timepicker.child('#shi'),
			fen:me.timepicker.child('#fen'),
			miao:me.timepicker.child('#miao')
		};
		me._initshowdaot();
	},
	_initshowdaot:function(){
		var me = this;
		var val = me.getValue();
		if(!Ext.isDate(val))val=new Date();
		me._initsehtval(val);
		me._changeminmax(val,'shi');
		me._changeminmax(val,'fen');
	},
	_temdtf:'Y-m-d',
	_temdtfs:'Y-m-d-H-i-s',
	_changeminmax:function(val, lx, zhs){
		var me = this;
		me._removehisv();
		var _temdtf = 'Y-m-d',oi=3;
		if(lx=='fen'){
			_temdtf = 'Y-m-d-H';
			oi=4;
		}
		var min = me.minValue,mins,h,i,s,
			max = me.maxValue,maxs,
			dt  = Ext.Date.format(val,_temdtf);
		if(zhs==1)dt=val;	
		if(min){
			h=0;
			if(Ext.Date.format(min,_temdtf) == dt){
				mins = Ext.Date.format(min, me._temdtfs).split('-');
				h = parseFloat(mins[oi]);
			}
			if(me.timeobj[lx])me.timeobj[lx].minValue = h;
		}
		if(max){
			h=0;
			if(Ext.Date.format(max,_temdtf) == dt){
				maxs = Ext.Date.format(max, me._temdtfs).split('-');
				h = parseFloat(maxs[oi]);
			}
			if(me.timeobj[lx])me.timeobj[lx].maxValue = h;
		}
	},
	_xy10:function(s){
		var s1=''+s+'';if(s1.length<2)s1='0'+s+'';return s1;
	},
	_getvalue:function(d, lxs){
		var me = this,d1;
		d1 = Ext.Date.format(d, me._temdtf).split('-'),lx = ''+me.format+'';
		if(lxs)lx=lxs;
		var s = lx;
		s	= s.replace('Y', d1[0]);
		s	= s.replace('m', d1[1]);
		s	= s.replace('d', d1[2]);
		if(me.timeobj.shi)s	= s.replace('H', me._xy10(me.timeobj.shi.getValue()));
		if(me.timeobj.fen)s	= s.replace('i', me._xy10(me.timeobj.fen.getValue()));
		if(me.timeobj.miao)s= s.replace('s', me._xy10(me.timeobj.miao.getValue()));
		return s;
	},
	_selectd: new Date(),
	onSelect: function(m, d){
		this._changeminmax(d,'shi');
		this._changeminmax(d,'fen');
		this._selectd = d;
    },
	_selectnow:function(){
		var me = this;
		me._selectd = new Date();
		me._initsehtval(me._selectd);
		me._selectok();
	},
	_initsehtval:function(date){
		var me = this;
		var d1 = Ext.Date.format(date, me._temdtfs).split('-');
		if(me.timeobj.shi)me.timeobj.shi.setValue(d1[3]);
		if(me.timeobj.fen)me.timeobj.fen.setValue(d1[4]);
		if(me.timeobj.miao)me.timeobj.miao.setValue(d1[5]);
	},
	_selectok:function(){
		var me  = this,
			d	= me._selectd;
		d = me._getvalue(d);
		me.setValue(d);
		me.fireEvent('select', me, d);
		if(me._miaoshid)$('#'+me._miaoshid+'').remove();
		me.onchange(me, d);
		me.collapse();
	},
	_removehisv:function(){
		var sid = this.picker.getEl().id+'_seshowid';
		$('#'+sid+'').remove();	
	},
	_focusxlshow:function(a, e, lx){
		var me 	= this,i,s1,
			val	= a.value,
			sid = me.picker.getEl().id+'_seshowid',ai,s1;
			
		me._miaoshid = sid;	
		$('#'+sid+'').remove();	
		var s = '<div id="'+sid+'" style="border:1px #cccccc solid;left:2px;bottom:30px;position:absolute;padding:5px;border:1px #cccccc solid;background-color:#ffffff; text-align:left;font-size:12px;z-index:2;box-shadow:0px 0px 2px #cccccc;">';
		for(i=a.minValues;i<=a.maxValues;i++){
			ai	= this._xy10(i);
			s1	= '<a onclick="return false" lx="'+lx+'" style="margin:3px;color:#111111">'+ai+'</a>';
			if(i<a.minValue || i>a.maxValue)s1='<span style="color:#cccccc;margin:3px">'+ai+'</span>';
			if(ai==val)s1='<span style="color:#ff0000;margin:3px">'+ai+'</span>';
			s+= s1;
			if((i+1)%8==0)s+='<br>';
		}
		s+='</div>';
		$('#'+me.picker.getEl().id).append(s);
		$('#'+sid+'').find('a').click(function(){
			me._changehowvei(this);
		});
		$('#'+sid+'').click(function(){
			$(this).remove();
		});
	},
	_changehowvei:function(o1){
		var o	= $(o1),
			x	= o.text(),
			lx	= $(o1).attr('lx'),
			me  = this;
		me.timeobj[lx].setValue(x);
		me._removehisv();
		if(lx=='shi'){
			me._changeminmax(me._getvalue(me._selectd, 'Y-m-d-H'),'fen', 1);
		}
	}
});