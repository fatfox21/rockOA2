<?php 
class testClassAction extends Action{
	
	
	public function defaultAction()
	{
		$read = c('PHPExcelReader', true);
		
		$rows	= $read->reader(ROOT_PATH.'/1.xls');
		
		print_r($rows);
		
		$this->display = false;
	}
	
}