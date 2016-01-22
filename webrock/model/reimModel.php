<?php
class reimClassModel extends Model
{
	public function initModel()
	{
		$this->settable('im_mess');
	}	
		
	/**
		发送信息推送的
	*/
	public function sendsystem($sendid, $receid, $gname, $cont, $table='',$mid='', $url='')
	{
		$onrs = $this->db->getone('[Q]im_group',"`type`=2 and `name`='$gname'");
		if(!$onrs){
			$this->db->record('[Q]im_group', array(
				'type'		=> 2,
				'name'		=> $gname,
				'createdt'	=> $this->rock->now
			));
			$gid	= $this->db->insert_id();
		}else{
			$gid	= $onrs['id'];
		}
		if($table!=''){
			//$this->update("`zt`=1", "`table`='$table' and `mid`='$mid' and `zt`=0 and `type`='system' and `sendid`='$gid' and `receid` in($receid)");
		}
		$this->insert(array(
			'type'	=> 'system',
			'optdt'	=> $this->rock->now,
			'zt'	=> 0,
			'cont'	=> $this->rock->jm->encrypt($cont),
			'sendid'=> $sendid,
			'receid'=> $gid,
			'optid'	=> $sendid,
			'receuid' => $receid,
			'table'	=> $table,
			'mid'	=> $mid,
			'url'	=> $url
		));
		$messid	= $this->db->insert_id();
		
		$this->db->insert('[Q]im_messzt','`mid`,`uid`','select '.$messid.',id from `[Q]admin` where id in('.$receid.') and `status`=1 and `state`<>5 ', true);

		$socket	= c('socket', true);
		return $socket->send($sendid, $receid, array(
			'cont'	=> $cont,
			'gname'	=> $gname,
			'gid'	=> $gid,
			'type'	=> 'system',
			'now'	=> $this->rock->now,
			'messid'=> $messid,
			'url'	=> $url
		));
	}
}