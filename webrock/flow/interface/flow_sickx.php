<?php
class sickxflowClass extends flowChajian
{
	//审核完成了标识为已销假
	protected function flowthrough($sm)
	{
		$arras 	= array('kq_info', 'kq_out');
		$type  	= $this->rs['type'];
		$oldrs 	= m($arras[$type])->getone($this->rs['mid']);
		if($type==0){
			$arr['stime'] = $this->rs['stime'];
			$arr['etime'] = $this->rs['etime'];
			$arr['totals'] = $this->rs['totals'];
			$sm		= '原申请从'.$oldrs['stime'].'→'.$oldrs['etime'].','.$oldrs['totals'].'(小时)';
		}else{
			$arr['outtime'] = $this->rs['stime'];
			$arr['intime'] = $this->rs['etime'];
			$sm		= '原申请从'.$oldrs['outtime'].'→'.$oldrs['intime'].'';
		}
		$arr['remark'] 	= $sm;
		$arr['sicksm'] 	= $this->rs['explain'];
		$arr['isxj'] 	= 1;
		m($arras[$type])->update($arr, $this->rs['mid']);
	}
}