<?php
class viewClassAction extends Action
{
	public function xiangAction()
	{
		$id		= $this->get('id');
		$db		= m('projectm');
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
}