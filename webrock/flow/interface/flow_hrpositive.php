<?php
class hrpositiveflowClass extends flowChajian
{
	//审核完成了
	protected function flowthrough($sm)
	{
		//m('admin')->update("`state`=1", $this->uid);
	}
}