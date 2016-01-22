<?php 
/**
	后台控制处理literal
*/

require(ROOT_PATH.'/include/Action.php');

class Action extends mainAction
{
	
	public $adminid		= 0;
	public $adminuser	= '';
	public $adminname	= '';
	public $adminstyle	= '';
	public $adminobj;
	public $loadcount	= 0;

	private function getlogin()
	{
		$this->adminid		= (int)$this->getsession('adminid',0);
		$this->adminuser	= $this->getsession('adminuser');
		$this->adminname	= $this->getsession('adminname');
		
		$this->rock->adminid			= $this->adminid;
		$this->rock->adminuser			= $this->adminuser;
		$this->rock->adminname			= $this->adminname;
	}	
	
	public function initProject()
	{
		$this->getlogin();
		if($this->rock->get('ajaxbool')=='true')return;
		$this->smartydata['adminid']	= $this->adminid;
		$this->smartydata['adminuser']	= $this->adminuser;
		$this->smartydata['adminname']	= $this->adminname;
		$this->smartydata['adminstyle']	= $this->adminstyle;
	}
	
	public function beforeAction()
	{
		if(D=='taskrun')$this->taskrunchange(2);
	}
	
	public function afterAction()
	{
		if(D=='taskrun')$this->taskrunchange(1);
	}
	
	private function taskrunchange($zt)
	{
		$mid	= (int)$this->rock->get('mid');
		m('task')->update("`lastrundt`='$this->now',`lastrunzt`='$zt'", $mid);
	}
	
	
	public function backmsg($msg='', $demsg='保存成功')
	{
		$bo = false;
		if($msg == ''){
			$msg = $demsg;
			$bo = true;
		}
		echo json_encode(array('success'=>$bo,'msg'=>$msg));
	}
	
	public function limitRows($table,$fields='*',$wherea='1=1',$order='',$arr=array())
	{
		$where		= $this->request('where');
		$keywhere	= $this->request('keywhere');
		if(!$this->contain($where, ' ') && !$this->contain($where, '[K]'))$where = $this->jm->uncrypt($where);
		if(!$this->contain($keywhere, ' ') && !$this->contain($keywhere, '[K]'))$keywhere = $this->jm->uncrypt($keywhere);
		$where  	= $this->rock->covexec($where);
		$keywhere  	= $this->rock->covexec($keywhere);
		
		
		$wherea	  .= " $where $keywhere";
		$order	   = $this->getOrder($order);
		$group	   = '';
		if(isset($arr['group']))$group=" group by ".$arr['group']." ";
		
		$limitall	= false;
		if(isset($arr['all']))$limitall= $arr['all'];//判断是不是要全部数据
		
		if(isset($arr['sou'])){
			$wherea		= str_replace($arr['sou'],$arr['rep'],$wherea);
			$order		= str_replace($arr['sou'],$arr['rep'],$order);
		}
		$total		= $this->db->rows($table,$wherea);
		
		$sql		= "select $fields from $table where $wherea $group $order ";
		if(!$limitall)$sql.=' '.$this->getLimit();
		
		$rows		= $this->db->getall($sql);
		if(!is_array($rows))$rows = array();
		return array(
			'total'	=> $total,
			'rows'	=> $rows
		);
	}
	
	public function getLimit()
	{
		$start  = (int)$this->rock->post('start',0);
		$limit  = (int)$this->rock->post('limit',15);
		$str	= '';
		if($limit > 0)$str =" limit $start,$limit";	
		return $str;
	}
	
	public function getOrder($order='')
	{
		$sort  		= $this->rock->post('sort');		//排序字段
		$dir  		= $this->rock->post('dir');			//ASC、DESC
		$highorder	= $this->rock->post('highorder');	//高级排序
		$asort		= '';
		if($sort != '' && $dir !=''){
			$sorta	= $sort;
			$asort=' '.$sorta.' '.$dir.'';
		}
		if($this->contain($sort, 'temp_'))$asort='';
		if($asort != '')$order = $asort;
		if($highorder != '')$order = $highorder;
		if($order != '')$order=" order by $order ";
		return $order;
	}

	public function publicdelAjax()
	{
		$id		= $this->post('id');
		$table	= $this->post('table');
		$delw	= $this->post('deljudgewhere');
		$msg	= '';
		if($table=='')$msg='sorry;';
		if($msg == ''){
			$db		= m($table);
			if($delw !=''){
				$rows	= $db->getall("`id` in($id)");
				foreach($rows as $k=>$rs){
					$delw = $this->rock->reparr($delw, $rs);
					if($db->rows($delw)==0)$msg='not delete';
				}
			}
		}
		if($msg==''){
			if(!$db->delete("`id` in($id)")){
				$msg= $this->db->error();
			}
		}
		if($msg==''){
			$delact	= $this->request('storedeleteaction');
			if($delact != ''){
				if(method_exists($this, $delact)){
					$this->$delact($table, $id);
				}
			}
		}
		if($msg=='')$msg='success';
		echo $msg;
	}
	
	
	public function publicstoreAjax()
	{
		$table		= $this->request('tablename_abc');
		$fields		= $this->request('storefields','*');
		$order		= $this->request('defaultorder');
		$aftera		= $this->request('storeafteraction', 'publicstoreAfter');
		$execldown	= $this->request('execldown');
		$this->loadcount	= (int)$this->request('loadcount', 0)+1;
		
		$where		= '1=1 ';
		$beforea	= $this->request('storebeforeaction', 'publicstoreBefore');
		$tables 	= $this->T($table);
		if($beforea != ''){
			if(method_exists($this, $beforea)){
				$nas	= $this->$beforea($table);
				if(is_array($nas)){
					if(isset($nas['where']))$where .= $nas['where'];
					if(isset($nas['order']))$order = $nas['order'];
					if(isset($nas['table']))$tables = $nas['table'];
					if(isset($nas['fields']))$fields = $nas['fields'];
				}else{
					$where .= $nas;
				}
			}
		}
		
		$arr	= $this->limitRows($tables, $fields, $where, $order);
		$total	= $arr['total'];
		$rows	= $arr['rows'];

		$bacarr	= array(
			'totalCount'=> $total,
			'rows'		=> $rows
		);
		if(method_exists($this, $aftera)){
			$narr	= $this->$aftera($table, $rows);
			if(is_array($narr)){
				foreach($narr as $kv=>$vv)$bacarr[$kv]=$vv;
			}
		}
		if($execldown == 'true'){
			$this->exceldown($bacarr);
			return;
		}
		echo json_encode($bacarr);
	}
	
	public function publiccheckstoreAjax()
	{
		$table		= $this->request('tablename_abc');
		$flownum	= $this->request('flownum');
		$fields		= $this->request('storefields','*');
		$aftera		= $this->request('storeafteraction', 'publicstoreAfter');
		$order		= $this->request('defaultorder');
		$status		= $this->request('statusabc');
		$opentype	= (int)$this->request('opentype');
		$execldown	= $this->request('execldown');
		$tables 	= $this->rock->strformat('?0 a left join ?1 b on a.uid=b.id', $this->T($table), $this->T('admin'));
		$where		= 'a.`status`<>5';
		$uid 		= $this->adminid;
		
		if($fields=='*')$fields='a.*,b.deptid,b.deptname,b.name';
		
		if($opentype == 0){
			$where.=" and (a.uid='$uid' or a.optid='$uid')";
		}
		//审核
		if($opentype == 1){
			$where.=" and ".$this->rock->dbinstr('a.nowcheckid', $uid);
		}
		//查询
		if($opentype == 2){
			$where.=" and ((a.uid='$uid') or (a.optid='$uid') or ( instr(b.superpath, '[$uid]')>0 and a.`isturn`=1 ) or (".$this->rock->dbinstr('a.allcheckid', $uid)."))";
		}
		//全部记录(不包含状态5)
		if($opentype == 3){
			//$where .= ' and a.id>0';
		}
		//全部记录(包含状态5)
		if($opentype == 7){
			$where = 'a.id>0';
		}
		//下属记录
		if($opentype == 4){
			$where = "a.id>0 and instr(b.superpath, '[$uid]')>0 ";
		}
		//我自己的
		if($opentype == 5){
			$where = "a.id>0 and (a.uid='$uid' or a.optid='$uid')";
		}
		//授权查看
		if($opentype == 6){
			$uissd = m('admin')->getextsjoinv($table, $uid);
			$where = "a.uid in($uissd)";
		}
		
		if($opentype<0 || $opentype>7)$where='1=2';
		if($status != '')$where.=' and a.`status`='.$status.'';
		$where.=' and ifnull(a.`uid`,0)>0';
		
		$arr	= $this->limitRows($tables, $fields, $where, $order);
		$total	= $arr['total'];
		$rows	= $arr['rows'];
		$rudb 	= m('flow_course');
		if($flownum != ''){
			foreach($rows as $k=>$rs){
				$rows[$k]['statustext'] = $rudb->getstatuss($table, $rs, '<br>');
			}
		}
		
		//读取审核按钮
		if($opentype == 1){
			foreach($rows as $k=>$rs){
				$nowcheckid = ','.$rs['nowcheckid'].',';
				$notbtnarr		= array();
				if($this->contain($nowcheckid, ','.$uid.',') && ($rs['status'] == 0 || $rs['status'] == 2) && $rs['isturn']==1){
					$notbtnarr	= $rudb->getcheckact($table, $rs['id']);
				}	
				$rows[$k]['notbtnarr'] = $notbtnarr;
			}
		}

		$bacarr	= array(
			'totalCount'=> $total,
			'rows'		=> $rows
		);
		
		if(method_exists($this, $aftera)){
			$narr	= $this->$aftera($table, $rows);
			if(is_array($narr)){
				foreach($narr as $kv=>$vv)$bacarr[$kv]=$vv;
			}
		}
		if($execldown == 'true'){
			$this->exceldown($bacarr);
			return;
		}
		echo json_encode($bacarr);
	}
	
	public function exceldown($arr)
	{
		$fields = explode(',', $this->post('excelfields','',1));
		$header = explode(',', $this->post('excelheader','',1));
		$title	= $this->post('exceltitle','',1);
		$chuli	= $this->post('excelchuli','',1);
		
		$headArr	= array();
		$rows		= $arr['rows'];
		for($i=0; $i<count($fields); $i++){
			$headArr[$fields[$i]] = $header[$i];
		}
		
		if($chuli != ''){
			$chulia = explode(',', $chuli);
			foreach($rows as $k=>$rs){
				foreach($chulia as $chua){
					$s 	= $this->post($chua,'',1);
					if($s == ''){
						$s1 = $this->post($chua.'_arr','',1);
						if($s1 != ''){
							$s1a = explode(',', $s1);
							$s2	 = '';
							if(isset($rs[$chua]))$s2 = $rs[$chua];
							if(!$this->isempt($s2))if(isset($s1a[$s2]))$s = $s1a[$s2];
						}
					}
					if($s != '')$rows[$k][$chua] = $this->rock->reparr($s, $rs);
				}
			}
		}
		
		$excel	= c('PHPExcel', true);
		$excel->title = $title;
		$excel->headArr = $headArr;
		$excel->rows = $rows;
		$url = $excel->display('xls', 'back');
		
		echo json_encode(array(
			'url'	=> $url, 
			'totalCount'=> $arr['totalCount'],
			'downCount' => count($rows)
		));
	}
	
	public function publictreestoreAjax()
	{
		$table	= $this->post('tablename_abc');
		$order	= $this->get('order');
		$fistid	= $this->get('fistid','0');
		$rows	= $this->publictreestore($fistid, $table, $order, 1);
		
		echo json_encode(Array(
			'root'=>'.',
			'children'=>$rows
		));
	}
	public function publictreestore($pid, $table, $order, $level){
		$db 		= m($table);
		$expandall	= $this->get('expandall');
		$pidfields	= $this->get('pidfields','pid');
		$idfields	= $this->get('idfields','id');
		$leaf		= $this->get('leaf','true');
		$wheres		= $this->post('where');
		$where	= "`$pidfields`='$pid' $wheres";
		if($level == 1){
			$fistwhere	= $this->rock->covexec($this->post('fistwhere'));
			if($fistwhere!='')$where = '1=1 '.$fistwhere;
		}
		if($order!='')$where.=" order by `$order`";
		$rows = $db->getall($where);
		foreach($rows as $k=>$rs){
			$id	= $rs['id'];
			if($leaf=='true')$rows[$k]['leaf'] 	= true;
			$rows[$k]['sid']	= $id;
			$rows[$k]['level']	= $level;
			if($expandall=='true')$rows[$k]['expanded']	= true;
			$total	= $db->rows("`$pidfields`='".$rs[$idfields]."' $wheres");
			if($total >0){
				if($leaf=='true')$rows[$k]['leaf'] = false;
				$rows[$k]['children'] = $this->publictreestore($rs[$idfields], $table, $order, $level+1);
			}else{
				$rows[$k]['children'] = array();
			}
		}
		return $rows;
	}
	
	/**
		公共保存页面
	*/
	public function publicsaveAjax()
	{
		$msg	= '';
		$success= false;
		$table	= $this->post('tablename_postabc');
		$id		= (int)$this->rock->post('idPost');
		$oldrs  = false;
		if($table !='' ){
			$db		= m($table);
			$where	= "`id`='$id'";
			if($id==0)$where='';
			$editjudgewhere 	= $this->rock->covexec($this->post('editjudgewhere'));
			$addjudgewhere 		= $this->rock->covexec($this->post('addjudgewhere'));
			$msgerrortpl 		= $this->post('msgerrortpl');
			$aftersavea			= $this->post('aftersaveaction', 'publicaftersave');
			$beforesavea		= $this->post('beforesaveaction', 'publicbeforesave');
			$submditfi 			= $this->post('submitfields_postabc');
			$editrecord			= $this->post('editrecord_postabc');
			$flownum 			= $this->post('flownum_postabc');
			$fileid 			= $this->post('fileidPost', '0');
			$isturn 			= (int)$this->post('isturn_postabc', '1');
			$int_type 			= ','.$this->post('int_filestype').',';
			$md5_type 			= ','.$this->post('md5_filestype').',';
			if($submditfi !=''){
				$fields	= explode(',', $submditfi);
				$uaarr	= array();
				if($flownum != ''){
					$uaarr['optdt'] = $this->now;
					$uaarr['uid'] 	= $this->post('uidPost', $this->adminid);
					$uaarr['status']= '0';
					$uaarr['optid']	= $this->adminid;
					$uaarr['optname']= $this->adminname;
					if($id==0)$uaarr['applydt']= $this->post('applydtPost', $this->date);
				}
				foreach($fields as $field){
					$val	= $this->post(''.$field.'Post');
					$type	= $this->post(''.$field.'_fieldstype');
					$boa	= true;
					if($this->rock->contain($int_type, ','.$field.',')){
						$val = (int)$val;
					}
					if($this->rock->contain($md5_type, ','.$field.',')){
						if($val=='')$boa=false;
						$val = md5($val);
					}
					if($boa)$uaarr[$field]=$val;
				}
				$otherfields		= $this->post('otherfields');
				$addotherfields		= $this->post('add_otherfields');
				$editotherfields	= $this->post('edit_otherfields');
				if($id == 0)$otherfields.=','.$addotherfields.'';
				if($id > 0)$otherfields.=','.$editotherfields.'';
				if($otherfields != ''){
					$otherfields = str_replace(array('{now}','{date}','{admin}','{adminid}'),array($this->now,$this->date,$this->adminname,$this->adminid),$otherfields);
					$fiarsse = explode(',', $otherfields);
					foreach($fiarsse as $ffes){
						if($ffes!=''){
							$ssare = explode('=', $ffes);
							$lea	= substr($ssare[1],0,1);
							if($lea == '['){
								$uaarr[$ssare[0]]=$uaarr[substr($ssare[1],1,-1)];
							}else{
								$uaarr[$ssare[0]]=$ssare[1];
							}
						}
					}
				}
				
				$ss 	= '';
				if(!$this->isempt($beforesavea)){
					if(method_exists($this, $beforesavea)){
						$befa = $this->$beforesavea($table, $uaarr, $id);
						if(isset($befa['msg']))$ss=$befa['msg'];
						if(isset($befa['rows'])){
							foreach($befa['rows'] as $bk=>$bv)$uaarr[$bk]=$bv;
						}
						if(is_string($befa))$ss = $befa;
					}	
				}
				
				$msg = $ss;	
				if($msg == ''){
					$_uaarr 		= $uaarr;
					$_uaarr['id'] 	= $id;
					$_uaarr['adminid'] 		= $this->adminid;
					$_uaarr['adminname'] 	= $this->adminname;
					if($id == 0 && $addjudgewhere != ''){
						$addjudgewhere = $this->rock->reparr($addjudgewhere, $_uaarr);
						if($db->rows($addjudgewhere)>0)$msg='已有记录,不允许新增';
					}
					
					if($id >0 && $editjudgewhere != ''){
						if($editjudgewhere == 'add'){
							$addjudgewhere = $this->rock->reparr($addjudgewhere, $_uaarr);
							if($db->rows($addjudgewhere)>0)$msg='已有记录,不允许编辑';
						}else{
							$editjudgewhere = $this->rock->reparr($editjudgewhere, $_uaarr);
							if($db->rows($editjudgewhere)==0)$msg='不允许编辑';
						}
					}
				}
				if($msg == ''){
					if($id>0 && $editrecord=='true')$oldrs = $db->getone($id);
					if($db->record($uaarr, $where)){
						$msg	= '处理成功';
						$success= true;
						if($id == 0)$id = $this->db->insert_id();
						if($fileid !='0')m('file')->update("`mtype`='$table',`mid`='$id'", "`id` in($fileid)");//文件
						if(!$this->isempt($aftersavea)){
							if(method_exists($this, $aftersavea)){
								$this->$aftersavea($table, $uaarr, $id);
							}
						}
						if($flownum != ''){
							$flow = f($flownum);
							$flow->initrecord($id);
							$msg = $flow->submit($isturn);
						}
						if($oldrs){
							$newrs = $db->getone($id);
							c('edit')->record($table,$id, $oldrs, $newrs, 2);
						}
						m('todo')->setyidu($table, $id);
					}else{
						$msg = 'Error:'.$this->db->error();
					}
				}
			}
		}else{
			$msg = '错误表名';
		}
		if($msg=='')$msg='处理失败';
		$arr = array('success'=>$success,'msg'=>$msg,'id'=>$id);
		echo json_encode($arr);
	}
	
	public function publicsavecelleditAjax()
	{
		$table	= $this->post('tablename');
		$id		= $this->post('id', '0');
		$fields	= $this->post('fieldname');
		$value	= $this->post('value');
		$where	= "`id` in($id)";
		m($table)->record(array($fields=>$value), $where);
		echo 'success';
	}
}

/**
	引入流程
	$num 流程编号
*/
function f($num)
{
	$path	= ROOT_PATH.'/'.PROJECT.'/flow/interface/flow_'.$num.'.php';
	$cls	= null;
	if(file_exists($path)){
		c('flow');
		include_once($path);
		$cname = $num.'flowClass';
		$cls = new $cname($num);
	}else{
		$cls = c('flow', true, $num);
	}
	return $cls;
}