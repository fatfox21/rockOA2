<?php
class finsaveClassAction extends Action
{
	public function fybxsave($table, $cans, $mid)
	{
		$db 	= m('fininfos');
		$count 	= $this->post('count');
		$ids 	= '0';
		for($i=0; $i<$count; $i++){
			$sid = (int)$this->post('id_'.$i.'');
			$arr = array(
				'items' 	=> $this->post('items_'.$i.''),
				'startdt' 	=> $this->post('startdt_'.$i.''),
				'moneys' 	=> $this->post('moneys_'.$i.''),
				'explain' 	=> $this->post('explain_'.$i.''),
				'sort' 		=> $i,
				'mid' 		=> $mid,
			);
			$whee = "`id`='$sid'";
			if($sid==0)$whee='';
			if($arr['items'] != '' && $arr['startdt'] != ''){
				$db->record($arr, $whee);
				if($sid==0)$sid = $this->db->insert_id();
				$ids .= ','.$sid;
			}
		}
		$db->delete("`id` not in($ids)");
	}
}