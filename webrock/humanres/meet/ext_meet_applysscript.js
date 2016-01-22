var ndate = js.now('Y-m-d');
var panel = {
	xtype:'rockgridform',tablename:'meet',formtitle:'会议室预定',exceltitle:'会议室列表',keywhere:'[A][K]type=0',defaultwhere:"[A][K]startdt like '"+ndate+"%'",
	tbarleft:[{
		emptyText:'日期',xtype:'datefield', width:100,format:'Y-m-d',editable:false,value:ndate
	}],
	execlparams:{excelchuli:'status',status_arr:'正常,会议中,结束,取消'},
	outsearch:function(){
		var s = '',yf = this.down('datefield').getRawValue();
		if(!isempt(yf))s="[A][K]startdt like '"+yf+"%'"
		return s;
	},
	grideditwhere:function(a){
		return a.optname==adminname && a.status==0;
	},
	griddelwhere:function(a, o){
		return o.grideditwhere(a, o);
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'会议室',dataIndex:'hyname',width:'10%',search:true,autowidth:true
	},{
		text:'主题',dataIndex:'title',width:'10%',search:true,autowidth:true
	},{
		text:'开始时间',dataIndex:'startdt',width:160,search:true
	},{
		text:'截止时间',dataIndex:'enddt',width:160,search:true
	},{
		text:'参会人员',dataIndex:'joinname',width:'10%',search:true,autowidth:true
	},{
		text:'操作时间',dataIndex:'optdt',width:150,search:true
	},{
		text:'发起人',dataIndex:'optname',width:80,search:true
	},{
		text:'状态',dataIndex:'status',width:100,boxdata:[['green','正常'],['blue','会议中'],['#ff6600','结束'],['#888888','取消']],renderer:renderbox,atype:'select',search:true,store:js.arraystr('正常,会议中,结束,取消')
	}],
	formwidth:350,
	formparams:{
		submitfields:'hyname,title,startdt,enddt,joinid,joinname',
		params:{int_filestype:'status',otherfields:'optdt={now},optname={admin},type=0,status=0'},
		addjudgewhere:"rockjm_ki0ji0jc0cbe0jb0hj0gd0cbe0cbc0gb0cbj0cbi0cbd0je0hh0cbf0kj0cbk0jc0cbe0cbb0id0cbj0cck0kb0jf0fj0cck0ie0ic0ib0cci0kb0hi0hg0ccc0ig0ic0hh0cdd0cbb0ic0ib0cdc0cbb0ic0jd0fj0jk0hj0cck0ccb0cbc0gc0ij0fj0jk0jj0if0fj0kb0id0jd0gi0if0cdc0hh0cbf0kj0cbk0jc0cbe0jk0ic0jh0cci0kb0ic0jd0fj0jk0hj0gd0ccb0cbc0gc0ij0fj0jk0jj0if0fj0kb0id0jd0gi0if0cdc0cbi0cbe0kj0gc0ie0cbe0ig0ic0hh0cdd0cbb0ic0ib0cdc0cbb0ic0jd0fj0jk0hj0cck0ccb0cbc0gb0jh0cci0kb0ic0jd0fj0cbd0je0kk0cbe0jk0ji0ge0cbi0ie0ic0hh0cbj0kj0cbk0jd0cbi0cbb0ic0hg0ee0if0gc0cch0cbj0kj0cbk0jd0cbi0cbb0id0fj0ccb0ig0je0hh0ccj0kk0cbg0hg0ccc0jk0id0ij0fj0jk0jj0if0fj0kb0id0jd0cbe0jb0cbg0cbb0gg0kk0gc0jd0cbf0kk0ccb0jd0cbi0cbb0id0fj0ccb0ie0ic0ib0cci0kb0hi0hh0cbe0kb0ji0ge0cbi0kb0id0jd0cbe0jb0hi0cbb0gg0kb0ji0ge0cbi0kb0id0jd0gi0if0cdc0cbi0ccd01",
		editjudgewhere:'add',
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'会议室',name:'hynamePost',allowBlank: false,xtype:'optioncombo',optionmnum:'meeting'
		},{
			fieldLabel:''+bitian+'主题',name:'titlePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'开始时间',name:'startdtPost',xtype:'datetimefield',allowBlank: false,editable:false,minValue:new Date()
		},{
			fieldLabel:''+bitian+'截止时间',name:'enddtPost',xtype:'datetimefield',editable:false,allowBlank: false,minValue:new Date()
		},{
			name:'joinidPost',id:'joinid_'+rand+'',hidden:true
		},{
			fieldLabel:'参会人员',nameidfields:'joinid_'+rand+'',name:'joinnamePost',xtype:'changedeptuser',changetitle:'选择参会人员',changetype:'deptusercheck'
		}],
		submitcheck:function(o){
			var a  = o.getValuess();
			var st = a.startdt,
				et = a.enddt;
			if(st.substr(0,10)!=et.substr(0,10))return '开始截止时间不允许跨天';
			return '';
		}
	}
};

return {
	panel:panel
};