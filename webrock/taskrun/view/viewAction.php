<?php 
class viewClassAction extends Action{
	
	/**
		通知公告
	*/
	public function gongAction()
	{
		$id		= $this->jm->gettoken('id');
		$db		= m('infor');
		$db->update('hits=hits+1', $id);
		$rs		= $db->getone($id);
		$this->title = $rs['title'];
		$this->smartydata['rs'] = $rs;
		
		$this->smartydata['filers'] = m('file')->getfile('infor', $id);
	}

	
	/**
		流程?
	*/
	public function workAction()
	{
		$id		= $this->jm->gettoken('id');
		
		$db		= m('work');
		$db1	= m('file');
		$rs		= $db->getone($id);
		$this->title = $rs['title'].'-工作任务详情';
		
		
		
		$this->smartydata['rs'] = $rs;
		$this->smartydata['filers'] = $db1->getall("mtype='work' and mid='".$rs['mid']."' order by `id`",'filename,filesizecn,id');
		$rsbg	= m('workbg')->getall("mid='$id'");
		
		
		foreach($rsbg as $k=>$rs){
			$rsbg[$k]['filers'] = $db1->getall("mtype='workbg' and mid='".$rs['id']."' order by `id`",'filename,filesizecn,id');
		}
		$this->smartydata['rsbg']	= $rsbg;
	}
	
	
}