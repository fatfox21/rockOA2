<?php
//公文签收的
class docdeilflowClass extends flowChajian
{
	protected function flowcheckname($num)
	{
		if($num=='qianshou'){
			return array($this->rs['receid'], $this->rs['recename']);
		}
	}
	
	
}