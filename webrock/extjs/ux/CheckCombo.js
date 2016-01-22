/**
	多选下拉框,
	homepage:http://www.xh829.com/
	from:rainrock
*/

Ext.define('Ext.ux.CheckCombo',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.checkcombo',
	multiSelect: true,
	delimiter:',',
	
	createPicker: function() {
		var me = this,
			tf = Ext.baseCSSPrefix;
		me.tpl=['<tpl for=".">',
				'<div role="option" class="'+tf+'boundlist-item"><div  class="x-grid-cell-inner x-grid-cell-inner-treecolumn"><input checkvalue="{' + me.valueField + '}" role="checkbox" class="'+tf+'tree-checkbox" type="button"> <span class="x-tree-node-text">{' + me.displayField + '}</span></div></div>',
			'</tpl>'
		];
		return me.callParent();
    },
    onListSelectionChange: function(list, selectedRecords) 
    {
		var me = this;
		me.callParent(arguments);
		if (!me.ignoreSelection && me.isExpanded) {
			if(me.multiSelect)me._changemultiSelect();
		} 
    },
	_expandtime:0,
	onExpand:function()
	{
		var me = this;
		me.callParent();
		if(me._expandtime==0){
			setTimeout(function(){me._changemultiSelect()}, 10);
		}else{
			me._changemultiSelect();
		}
		me._expandtime++;
	},
	setValue:function(value, doSelect)
	{
		var arg = arguments,
			val = value;
		if(!Ext.isEmpty(val) && typeof(val)=='string'){
			arg[0] = this._initvalue(val);
		}		
		this.callParent(arg);
	},
	_initvalue:function(val)
	{
		var me = this,
			da 		= me.store.data.items,das,i,va=[],
			spff	= me.delimiter,
			vals	= ''+spff+'' + val + ''+spff+'',
			vab		= val.split(spff);
		for(i=0; i<da.length; i++){
			das = da[i].data;
			if(vals.indexOf(''+spff+''+das[me.displayField]+''+spff+'')>-1){
				va.push(das[me.valueField]);
			}
		}
		if(va.length==vab.length && va.length>0)vab = va;
		return vab;
	},
	getValue: function()
    {
		var val = this.value;
		if(Ext.isEmpty(val))return '';
    	return val.join(this.delimiter);
    },
	_changemultiSelect:function()
	{
		var me = this,
			sid = me.picker.listEl.id,
			val = ''+me.delimiter+'' + me.getValue() + ''+me.delimiter+'',
			obj,i, o, o1,sv,cls;
		obj	= Ext.get(sid).query('input');
		for(i=0; i<obj.length; i++){
			o1	= obj[i];
			o	= $(o1);
			sv	= o.attr('checkvalue');
			cls	= 'x-tree-checkbox';
			if(val.indexOf(''+me.delimiter+''+sv+''+me.delimiter+'')>-1){
				cls = 'x-tree-checkbox x-tree-checkbox-checked';
			}
			o1.className = cls;	
		}
	}
});
