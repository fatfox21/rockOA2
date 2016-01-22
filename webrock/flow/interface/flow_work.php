<?php
class workflowClass extends flowChajian
{
	protected function initdachange()
	{
		$this->rs['project'] = m('projectm')->getmou('title', $this->rs['projectid']);
	}
	
	protected function contentother()
	{
		$headstr = 'optname,操作人@optdt,操作时间@state,状态@usetime,用时(小时)@explain,说明,left';
		$rows    = m('workbg')->getall("`mid`='$this->id' order by `id`");
		$fdb 	 = m('file');
		foreach($rows as $k=>$rs){
			if($rs['usetime']==0)$rows[$k]['usetime']='';
			$fstr = $fdb->getstr('workbg', $rs['id']);
			$sm   = $rs['explain'];
			if($fstr!=''){
				if(!$this->isempt($sm)){
					$sm.='<br>'.$fstr.'';
				}else{
					$sm = $fstr;
				}
			}
			$rows[$k]['explain'] = $sm;
		}
		$arr[] = array(
			'fields' 		=> 'workbg',
			'name' 			=> '任务报告',
			'data' 			=> c('html')->createrows($rows, $headstr, '#000000', 'noborder'),
		);
		return $arr;
	}
}