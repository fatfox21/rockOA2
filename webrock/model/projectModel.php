<?php
class projectClassModel extends Model
{
	public function initModel()
	{
		$this->settable('projectm');
	}
	
	public function sendbaogao($id, $zt, $jd, $cont='')
	{
		$rs = $this->getone($id);
		if(!$this->isempt($rs['fuzeid'])){
			$reim	= m('reim');
			$cont 	= ''.$this->adminname.'提交了['.$rs['title'].']的项目报告，状态['.$zt.'],进度['.$jd.'%]';
			$url 	= $reim->createurl('project', $rs['id']);
			$url	= '';
			m('todo')->addtz($rs['fuzeid'], '项目报告', $cont, 'projectm', $rs['id']);
			$reim->sendsystem($this->adminid, $rs['fuzeid'], '项目任务', $cont, 'projectm', $rs['id']);
		}
	}
}