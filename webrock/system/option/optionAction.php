<?php
class optionClassAction extends Action
{
	
	public function publicbeforesave($table, $arr, $id)
	{
		$num 	= $arr['num'];
		$msg	= '';
		if(!$this->isempt($num)){
			$tota = m($table)->rows("`num`='$num' and `id`<>'$id'");
			if($tota > 0)$msg='编号['.$num.']已存在';
		}
		if($num == 'rock')$msg='[rock]编号不允许使用';
		return array('msg'=>$msg);
	}
	
	public function delAjax()
	{
		$s	= $this->rock->request('s','0');
		m('option')->delete("`id` in($s)");
	}
	
	public function addAjax()
	{
		m('option')->insert(array('optdt'=>$this->now));
	}
	
	public function getdataAjax()
	{
		$mnum	= $this->rock->request('mnum');
		$rows	= $this->option->getmnum($mnum);
		echo json_encode(array(
			'totalCount'=> 50,
			'rows'		=> $rows
		));
	}
	
	public function savelistAjax()
	{
		$mnum	= $this->rock->post('mnum');
		$total	= (int)$this->rock->post('total');
		$msg	= 'success';
		$db		= m('option');
		for($i=0; $i<$total; $i++){
			$id		= (int)$this->rock->post('id_'.$i.'');
			$num	= $this->rock->post('num_'.$i.'');
			$num	= str_replace('{rand}', rand(10,9999), $num);
			if(!$this->isempt($num)){
				if($db->rows("`num`='$num' and `id`<>'$id'") >0 ){
					$msg = '编号['.$num.']已存在';
					break;
				}
			}
			$where	= "`id`='$id'";
			if($id == 0)$where='';
			$db->record(array(
				'name'	=> $this->rock->post('name_'.$i.''),
				'value'	=> $this->rock->post('value_'.$i.''),
				'mnum'	=> $mnum,
				'num'	=> $num,
				'xu'	=> $i,
				'optid'	=> $this->adminid,
				'optdt'	=> $this->now,
			 ),$where);
		}
		echo $msg;
	}
}