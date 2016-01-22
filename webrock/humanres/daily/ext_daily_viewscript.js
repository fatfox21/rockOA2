var panel = {
	xtype:'rockgrid',tablename:'daily',formtitle:'工作日报',url:publiccheckstore('daily','person'),opentype:3,
	defaultorder:'a.`dt` desc',searchtools:true,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',flex:1,search:true,sortable:true
	},{
		text:'姓名',dataIndex:'name',width:120,search:true,sortable:true
	},{
		text:'日报日期',dataIndex:'dt',width:180,search:true,sortable:true
	},{
		text:'星期',dataIndex:'week',width:120
	},{
		text:'新增时间',dataIndex:'adddt',width:170,search:true,sortable:true
	},{
		text:'操作时间',dataIndex:'optdt',width:170,search:true,sortable:true
	}],
	fields:['content'],
	features: [{
		ftype: 'rowbody',
		getAdditionalData: function(v, index) {
			var cont = v.content,
				s	= '';
			var cls = 'x-grid-row-body-hidden';
			if(!isempt(cont)){
				cls = '';
				s	= '<div style="padding:2px;padding-left:5px;line-height:20px">【工作内容】<br>'+cont+'</div>';
			}
			return {
				rowBody: s,
				rowBodyCls:cls
			};
		}
	}, {
		ftype: 'rowwrap'
	}]
};

return {
	panel:panel
};