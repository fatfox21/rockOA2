<?php
class setClassAction extends Action
{

	public function setsaveAjax()
	{
		$msg = '';
		if($this->contain(URL, '211.149.234.93')){
			$msg = '请不要修改，谢谢';
		}else{
			$this->option->setval('systemtitle', $this->post('titlePost'));
			$this->option->setval('systemlogo', $this->post('logoPost'));
		}
		$this->backmsg($msg);
	}
	
	public function getsetAjax()
	{
		$arr= array();
		$arr['title'] = $this->option->getval('systemtitle');
		$arr['logo'] = $this->option->getval('systemlogo', 'images/icons40.png');
		$arr['isinits'] = (int)$this->option->getval('systeminit', '0');
		echo json_encode($arr);
	}
	
	public function sysinitAjax()
	{
		$is = (int)$this->option->getval('systeminit', '0');
		$msg= '';
		if($is==0){
			$dburl = ROOT_PATH.'/webrock/system/zleardata.sql';
			if(!file_exists($dburl))$msg = '无法使用!';
			$bo = false;
			if($msg==''){
				$sqlss 	= file_get_contents($dburl);
				$a 		= explode(";", $sqlss);
				for($i=0; $i<count($a)-1; $i++){
					$sql 	= $a[$i];
					$sql	= str_replace('`rock_', '`'.PREFIX.'', $sql);
					$bo		= $this->db->query($sql);
					if(!$bo)break;
				}	
				if($bo){
					$this->option->setval('systeminit', '1');
				}else{
					$msg = 'Error:'.$this->db->error();
				}
			}				
		}else{
			$msg = 'sorry!';
		}
		if($msg== '')$msg='初始化成功';
		echo $msg;
	}
}