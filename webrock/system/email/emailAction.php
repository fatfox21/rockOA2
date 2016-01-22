<?php
class emailClassAction extends Action
{
	public function setemailpass($table, $cans, $id)
	{
		$pass = $this->post('emailpassPost');
		$bara = array();
		if($pass != '')$bara['emailpass'] = $this->jm->encrypt($pass);
		return array('rows'=>$bara);
	}
	
	public function aftertplstore($table, $rows)
	{
		$setrow = m('email')->getall('id>0','name,emailname,id');
		$_setrow = array();
		foreach($setrow as $k=>$rs)$_setrow[$rs['id']] = $rs;
		
		foreach($rows as $k=>$rs){
			$rows[$k]['setnameid'] = $_setrow[$rs['setid']]['name'];
		}
		return array(
			'rows'=>$rows,
			'emailstore' => $setrow
		);
	}
	
	public function sendtestAjax()
	{
		$num	= $this->get('num');
		$msg	= 'success';
		$bo		= m('email')->sendmail_test($num);
		if(!$bo)$msg = '发送失败';
		echo $msg;
	}
}