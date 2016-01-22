<?php
class setClassAction extends Action
{
	private $isdemo = false;
	public function initAction()
	{
		if($this->contain(URL, '211.149.234.93') || $this->contain(URL, 'demo') )$this->isdemo=true;
	}

	public function setsaveAjax()
	{
		$msg = '';
		if($this->isdemo){
			$msg = '别瞎改，谢谢';
		}else{
			$this->option->setval('systemtitle', $this->post('titlePost'));
			$this->option->setval('systemlogo', $this->post('logoPost'));
		}
		$this->backmsg($msg);
	}
	
	public function getsetAjax()
	{
		$arr= array();
		$arr['title'] = $this->option->getval('systemtitle');
		$arr['logo'] = $this->option->getval('systemlogo', 'images/icons40.png');
		$arr['isinits'] = (int)$this->option->getval('systeminit', '0');
		echo json_encode($arr);
	}
	
	public function sysinitAjax()
	{
		$is 	= (int)$this->option->getval('systeminit', '0');
		$msg	= '';
		if($is==0){
			if(!$this->isdemo){
				$tables		= explode(',', 'file,assetm,assets,daily,dailyfx,docdeil,fininfom,fininfos,flow_bill,flow_log,flow_rule,hrpositive,hrredund,hrtransfer,im_group,im_groupuser,im_mess,im_messzt,infor,kq_anay,kq_dkerr,kq_dkjl,kq_info,kq_out,log,meet,menucom,projectm,projects,reads,schedule,supple,sjoinv,supplea,todo,userjl,vcard,word,work,workbg,reward,emailm,emails,carm,cars,careserve,editrecord,demand,flow_checks');
				$alltabls 	= $this->db->getalltable();
				foreach($tables as $tabs){
					$_tabs 	= ''.PREFIX.''.$tabs.'';
					if(in_array($_tabs, $alltabls)){
						$sql1 = "delete from `$_tabs`";
						$sql2 = "alter table `$_tabs` AUTO_INCREMENT=1";
						$this->db->query($sql1, false);
						$this->db->query($sql2, false);
					}
				}
			}
			$this->option->setval('systeminit', '1');				
		}else{
			$msg = 'sorry!';
		}
		if($msg== '')$msg='初始化成功';
		echo $msg;
	}
}