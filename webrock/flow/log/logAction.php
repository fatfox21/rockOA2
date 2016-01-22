<?php
class logClassAction extends Action
{
	
	public function logshowla($table, $rows)
	{
		$ddb	= m('flow_set');
		
		foreach($rows as $k=>$rs){
			$name = '';
			if(!$this->isempt($rs['modeid']))$name = $ddb->getmou('name', $rs['modeid']);
			$rows[$k]['modename'] = $name;
		}
		
		return array(
			'rows'	=> $rows
		);
	}
	
}