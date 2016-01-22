<?php 
class viewClassAction extends Action{
	
	/**
		通知公告
	*/
	public function gongAction()
	{
		$this->tpltype = 'html';
		$id		= $this->jm->gettoken('id');
		$db		= m('infor');
		$db->update('hits=hits+1', $id);
		$rs		= $db->getone($id);
		$this->title = $rs['title'];
		$this->smartydata['rs'] = $rs;
		$this->smartydata['filers'] = m('file')->getfile('infor', $id);
		m('log')->addread('infor', $id);
	}

	/**
		工作任务
	*/
	public function workAction()
	{
		$this->tpltype = 'html';
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
	
	/**
		项目
	*/
	public function projectAction()
	{
		$this->tpltype = 'html';
		$id		= $this->jm->gettoken('id');
		
		$db		= m('project');
		$db1	= m('file');
		$rs		= $db->getone($id);
		$this->title = $rs['title'].'-项目详情';
		$this->smartydata['rs'] = $rs;
		$this->smartydata['filers'] = $db1->getall("mtype='projectm' and mid='".$rs['id']."' order by `id`",'filename,filesizecn,id');
		$rsbg	= m('projects')->getall("mid='$id'");
		foreach($rsbg as $k=>$rs){
			$rsbg[$k]['filers'] = $db1->getall("mtype='projects' and mid='".$rs['id']."' order by `id`",'filename,filesizecn,id');
		}
		$this->smartydata['rsbg']	= $rsbg;
	}
	
	
	/**
		内部邮件
	*/
	public function emailinAction()
	{
		$this->tpltype = 'html';
		$id		= $this->jm->gettoken('id');
		$uid	= $this->jm->gettoken('uid');
		$rs 	= m('emailm')->getone($id);
		m('emails')->update('zt=1', "`mid`='$id' and `zt`=0 and `uid`='$uid'");
		$rs['senddt'] = c('date')->stringdt($rs['senddt'],'Y-m-d(星期w) H:i:s');
		$this->title = $rs['title'].'-内部邮件';
		$this->smartydata['rs'] = $rs;
	}
}