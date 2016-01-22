<?php
class courseClassAction extends Action
{
	
	public function savemoveAjax()
	{
		$db		= m('flow_course');
		$total 	= (int)$this->rock->post('total');
		for($i=0; $i<$total; $i++){
			$sid = $this->rock->post('sid'.$i.'');
			$a 	 = explode(':', $sid);
			$db->update("`pid`='$a[1]'", "`id`='$a[0]'");
		}
		echo 'success';
	}
	
	public function publicbeforesave($table, $cans, $id)
	{
		$atype = $cans['atype'];
		$msg = '';
		$rows= array();
		if($cans['pid']>0){
			$rows['atypeid']='';
			$rows['atypename']='';
			$cans['atypeid'] = $rows['atypeid'];
		}
		if($cans['pid']==0){
			$where = $this->rock->strformat("`setid`='?0' and id<>'$id' and `pid`=0 and ifnull(atypeid,'')='?1'", $cans['setid'], $cans['atypeid']);
			$total = m($table)->rows($where);
			if($total>0)$msg='已有对应流程了';
		}
		$arr = array('msg'=>$msg,'rows'=>$rows);
		return $arr;
	}
	
	
	public function inputshoaafter($table, $rows)
	{
		$inputarr 	= m('option')->getmnum('flowinputtype');
		$inputss	= array();
		foreach($inputarr as $k=>$rs){
			$inputss[$rs['value']] = $rs['name'];
		}
		return array('inputtype'=>$inputss);
	}
	
	public function getflowinputAjax()
	{
		$rows 	= m('flow_courseinput')->getall('mid=0 order by sort','`id`,`name`');
		echo json_encode($rows);
	}
	
}