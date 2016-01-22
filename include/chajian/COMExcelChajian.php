<?php 
/**
	com导出excel
*/
class COMExcelChajian extends Chajian{
	
	public $excel;
	
	public function initChajian()
	{
		$this->excel = new COM('Excel.application') or Die ('not use comexcelchajian');  
		
	}
	
}                               