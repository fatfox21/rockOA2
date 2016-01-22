<?php
class demandflowClass extends flowChajian
{
	
	protected function flowcheckname($num)
	{
		if($num=='jishuculi'){
			return array($this->rs['jsid'], $this->rs['jsname']);
		}
	}
	
	//保存对应审批人员
	protected function flowcheckbefore($zt)
	{
		if($zt==1){
			$jsid	= (int)$this->rock->post('checkinput_changeuser_id','0');
			$jsname	= $this->rock->post('checkinput_changeuser');
			$this->mdb->update(array(
				'jsid' 		=> $jsid,
				'jsname' 	=> $jsname
			), "`id`='$this->id'");
			$this->rs['jsid'] 	= $jsid;
			$this->rs['jsname'] = $jsname;
		}
	}
}