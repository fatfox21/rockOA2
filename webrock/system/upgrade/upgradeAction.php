<?php
class upgradeClassAction extends Action
{
	private $randkeyup  = '';
	private $updatekey 	= 'aHR0cDovLzEyNy4wLjAuMS9yb2Nrd2ViLw::';
	private $updatekeys = 'aHR0cDovL3d3dy5yb2Nrb2EuY29tLw::';
	
	public function initAction()
	{
		if(getconfig('systype')!='dev')$this->updatekey = $this->updatekeys;
		$this->updatekey = $this->rock->jm->base64decode($this->updatekey);
		$this->randkeyup = $this->getruankey();
	}
	
	private function getupurl($act, $can=array())
	{
		$url = $this->updatekey;
		$url.= 'index.php?m=api&ajaxbool=true&a='.$act.'';
		foreach($can as $k=>$v)$url.='&'.$k.'='.$v.'';
		return $url;
	}
	
	private function getmode($stype)
	{
		$cont = c('curl')->getfilecont($this->getupurl('mode', array('stype'=>0, 'stype'=>$stype)));
		$barr['totalCount'] = 0;
		$rows	= array();
		$yaz    = $waz = $mfmk = $sfmk = $dsj = 0;
		if($cont!=''){
			$arr = json_decode($cont, true);
			$rows= $arr['data'];
			$barr['totalCount'] = count($rows);
			foreach($rows as $k=>$rs){
				$utype	= 0;
				$rows[$k]['view'] = '<a href="'.$this->updatekey.'view_'.$rs['num'].'.html" target="_blank" class="a">查看介绍</a>';
				$minver = (int)str_replace('.','', $rs['minver']);
				$nowver = (int)str_replace('.','', VERSION);
				$price	= (int)$rs['price'];
				$instkey= '';
				if($nowver<$minver)$utype=3;
				if($rs['isaz']==0)$utype=4;
				if($utype==0){
					$rson= $this->db->getone('[Q]chargemode', "`modeid`='".$rs['id']."' order by `updatedt` desc");
					if($rson){
						$instkey=$rson['installkey'];
						$utype=1;
						if($rs['updatedt']>$rson['updatedt']){
							$utype=2;
							$dsj++;
						}
					}else{
						if($price<=0){
							$instkey = md5($rs['num'].time().$rs['id']);
						}
					}
				}
				if($utype==1)$yaz++;
				if($utype==0)$waz++;
				if($price>0){
					$sfmk++;
				}else{
					$mfmk++;
				}
				$rows[$k]['utype']	= $utype;
				$rows[$k]['xuhao']	= $k+1;
				$rows[$k]['instkey']= $instkey;
			}
		}
		$barr['rows'] 	= $rows;
		$barr['yaz'] 	= $yaz;
		$barr['waz'] 	= $waz;
		$barr['mfmk'] 	= $mfmk;
		$barr['sfmk'] 	= $sfmk;
		$barr['dsj'] 	= $dsj;
		return $barr;
	}
	
	public function getmodeAjax()
	{
		$barr = $this->getmode(0);
		$this->returnjson($barr);
	}
	
	public function modeinstallAjax()
	{
		$mid 		= $this->post('midPost');
		$lx 		= (int)$this->post('lxPost');
		$installkey = $this->post('installkeyPost');
		if($lx==0)$installkey = $this->rock->jm->base64encode($installkey);
		$msg 		= '';
		$url 		= $this->getupurl('modeinstall', array(
			'mid' => $mid,
			'installkey' => $installkey,
			'randkeyup'  => $this->randkeyup
		));
		$data  	= array();
		$cont 	= c('curl')->getfilecont($url);
		if($cont!=''){
			$arr = json_decode($cont, true);
			if($arr['code']!=200){
				$msg = $arr['msg'];
			}else{
				$data = $arr['data'];
			}
		}else{
			$msg = '请求失败';
		}
		$backarr['data'] = $data;
		$backarr['mid']  = $mid;
		$backarr['installkey'] = $installkey;
		$backarr['modename'] = $this->post('namePost');
		$this->backmsg($msg,'', $backarr);
	}
	
	private function getruankey()
	{
		$kes = $this->option->getval('modekeysval');
		if($this->isempt($kes)){
			$kes = md5($this->rock->jm->base64encode('oa'.time().'rock'.rand(1000,9999).''));
			$this->option->setval('modekeysval', $kes);
		}
		return $kes;
	}
	
	public function startinstallAjax()
	{
		$mid 		= $this->post('modeid');
		$installkey = $this->post('installkey');
		$modename 	= $this->post('modename');
		$updatedt 	= $this->post('updatedt');
		if($mid==''||$installkey==''||$modename=='')$this->returnjsons('','error',201);
		$msg 		= '';
		$url 		= $this->getupurl('startinstall', array(
			'mid' => $mid,
			'ip'  => $this->rock->jm->base64encode($this->rock->ip),
			'web' => $this->rock->jm->base64encode($this->rock->web),
			'installdt'  => $this->rock->jm->base64encode($this->now),
			'installkey' => $installkey,
			'randkeyup'  => $this->randkeyup
		));
		$data  	= array();
		$cont 	= c('curl')->getfilecont($url);
		if($cont!=''){
			$arr = json_decode($cont, true);
			if($arr['code']!=200){
				$msg = $arr['msg'];
			}else{
				$data= $arr['data'];
				$bos = m('chargemode')->insert(array(
					'modeid' => $mid,
					'modename' => $modename,
					'installdt'  => $this->now,
					'updatedt'   => $updatedt,
					'installkey' => $installkey,
					'optname' => $this->adminname,
					'ver'  => $data['ver']
				));
				if(!$bos)$msg='失败2';
			}
		}else{
			$msg = '请求失败';
		}
		$this->backmsg($msg);
	}
	
	public function startinstalllaAjax()
	{
		$fid 		= $this->post('fid');
		$mid 		= $this->post('mid');
		$updatedt 	= $this->post('updatedt');
		$installkey	= $this->post('installkey');
		$tosal		= m('chargemodes')->rows("`mid`='$mid' and `fid`='$fid' and `updatedt`='$updatedt'");
		$msg 		= '';
		if($tosal>0){
			$this->backmsg($msg);
			exit;
		}
		$url 		= $this->getupurl('getfileinstall', array(
			'mid' => $mid,
			'fid'  => $fid,
			'installkey' => $installkey
		));
		$arr  	= array();
		$cont 	= c('curl')->getfilecont($url);
		if($cont!=''){
			$arr = json_decode($cont, true);
			if($arr['code']!=200){
				$msg = $arr['msg'];
			}else{
				$data = $arr['data'];
				$bo = $this->execinstall($data);
				if(!$bo)$msg='失败了1';
			}
		}else{
			$msg = '请求失败';
		}
		$this->backmsg($msg);
	}
	
	private function execinstall($arr)
	{
		$type 		= $arr['type'];
		$filepath 	= $arr['filepath'];
		$fcont 		= $arr['fcont'];
		$bo 		= true;
		if($fcont  != '')$fcont = $this->rock->jm->base64decode($fcont);
		if($type==0){
			$zpath	= explode('/', $filepath);
			$len    = count($zpath);
			$mkdir	= '';
			for($i=0; $i<$len-1; $i++){
				if(!$this->isempt($zpath[$i])){
					$mkdir.='/'.$zpath[$i].'';
					$wzdir = ROOT_PATH.''.$mkdir;
					if(!is_dir($wzdir)){
						mkdir($wzdir);
					}
				}
			}
			if($fcont!=''){
				$path 	= ROOT_PATH.'/'.$filepath;
				if($arr['isjm']=='1'){
$fcont = str_replace('
', '', $fcont);
					$fcont = str_replace('	', '', $fcont);
					$fcont = str_replace('<?php', '<?php ', $fcont);
				}
				$bo 	= file_put_contents($path, $fcont);
			}
		}
		if($type==1){
			$bo=$this->updatemenu($fcont);
		}
		if($type==2){
			$bo=$this->updatemysql($fcont);
		}
		if($bo)$bo=m('chargemodes')->insert(array(
			'mid' 		=> $arr['mid'],
			'updatedt' => $arr['updatedt'],
			'fid' 		=> $arr['fid'],
			'adddt' 	=> $this->now
		));
		return $bo;
	}
	private function updatemenu($fcont)
	{
		if($fcont=='')return true;
		$rows = json_decode($fcont, true);
		$this->updatemenus($rows, 0);
		$bo   = $this->db->backsql();
		return $bo;
	}
	private function updatemenus($rows, $slid)
	{
		$db = m('menu');
		foreach($rows as $k=>$rs){
			$pid 	= $rs['pid'];
			if($pid=='auto')$pid=$slid;
			$where 	= "`name`='".$rs['name']."' and `pid`='$pid' ";
			if(isset($rs['type'])){
				if($rs['type']=='del'){
					$db->delete($where);
					continue;
				}
			}
			$ids 	= (int)$db->getmou('id', $where);
			if($ids==0)$where='';
			$db->record(array(
				'name'	=> $rs['name'],
				'pid'	=> $pid,
				'num'	=> $rs['num'],
				'url'	=> $rs['url'],
				'status'=> $rs['status'],
				'sort'	=> $rs['sort'],
				'icons'	=> $rs['icons'],
				'ispir'	=> $rs['ispir']
			), $where);
			if($ids==0)$ids = $this->db->insert_id();
			if(isset($rs['children']))$this->updatemenus($rs['children'], $ids);
		}
	}
	
	private function updatemysql($fcont)
	{
		if($fcont=='')return true;
		$rows 	= json_decode($fcont, true);
		$tabarr = $this->db->getalltable();
		foreach($rows as $tsb=>$farr){
			$this->updatemysqls($tsb, $farr, $tabarr);
		}
		$bo   = $this->db->backsql();
		return $bo;
	}
	private function updatemysqls($table, $farr, $tabarr)
	{
		$table = $this->rock->T($table);
		if(in_array($table, $tabarr)){
			$foarr = $this->db->gettablefields($table);
			$fstr  = '';
			$fcarr = array();
			foreach($foarr as $k=>$rs){
				$fstr.=','.$rs['name'].'';
				if(is_null($rs['dev']))$rs['dev']='null';
				$fcarr[$rs['name']] = $this->getfieldstr(array(
					'fields' => $rs['name'],
					'type' 	 => $rs['types'],
					'default' => $rs['dev'],
					'comment' => $rs['explain']
				));
			}
			$fstr.=',';
			$sql = '';
			foreach($farr as $k=>$rs){
				$lx = $rs['type'];
				if($lx=='sy' && isset($rs['sycont'])){
					$str = 'KEY `'.$rs['fields'].'` ('.$rs['sycont'].')';
				}else{
					$str = $this->getfieldstr($rs);
					if($this->contain($fstr, ','.$rs['fields'].',')){
						$ostr = $fcarr[$rs['fields']];
						if($ostr != $str){
							$sql = "alter table `$table` MODIFY $str;";
						}
					}else{
						$sql = "alter table `$table` add COLUMN $str;";
					}
				}
				if($sql!='')$this->db->execsql($sql);
			}
		}else{
			$str   = '`id` int(11) NOT NULL AUTO_INCREMENT';
			foreach($farr as $k=>$rs){
				$lx = $rs['type'];
				if($lx=='sy' && isset($rs['sycont'])){
					$str.=',KEY `'.$rs['fields'].'` ('.$rs['sycont'].')';
				}else{
					$str.=','.$this->getfieldstr($rs);
				}
			}
			$str.=', PRIMARY KEY (`id`)';
			$sql = "CREATE TABLE `$table`($str)ENGINE=MyISAM DEFAULT CHARSET=utf8";
			$this->db->execsql($sql);
		}
	}
	private function getfieldstr($rs)
	{
		$str='`'.$rs['fields'].'` '.$rs['type'].'';
		if(isset($rs['default']) && $rs['type']!='text'){
			$dev = $rs['default'];
			if(is_null($dev))$dev='null';
			if($dev=='null' || is_numeric($dev)){
				$str.=' DEFAULT '.$dev.'';
			}else{
				$str.=" DEFAULT '".$dev."'";
			}
		}
		if(isset($rs['comment']))if(!$this->isempt($rs['comment']))$str.=" COMMENT '".$rs['comment']."'";
		return $str;
	}
	
	public function testAction()
	{
		$this->display = false;
	}
	
	public function delmodeAjax()
	{
		$modeid = (int)$this->post('modeid');
		if($modeid==0)exit('');
	}
	
	public function getstatusaAjax()
	{
		$arr  = array();
		$barr = $this->getmode(1);
		$xu   = 0;
		foreach($barr['rows'] as $k=>$rs){
			if($rs['utype']==0||$rs['utype']==2){
				$xu++;
				$rs['xuhao'] = $xu;
				$arr[] = $rs;
			}
		}
		$barr['rows'] = $arr;
		$this->returnjson($arr);
	}
}