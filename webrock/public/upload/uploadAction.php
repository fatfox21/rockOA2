<?php 
class uploadClassAction extends Action{
	
	
	public function getfileAjax()
	{
		$mtype		= $this->rock->request('table');
		$mid		= $this->rock->request('mid');
		$rows		= m('file')->getall("`mtype`='$mtype' and `mid`='$mid' order by `id`");
		foreach($rows as $k=>$rs){
			$rows[$k]['status'] = 4;
		}
		echo json_encode($rows);
	}
	
	public function delfileAjax()
	{
		$id		= $this->rock->request('id');
		m('file')->delete($id);
	}
}