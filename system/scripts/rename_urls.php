<?php

include ( "../library/include.php" );

$r = do_query("SELECT * FROM ".SERIES_TABLENAME."");

foreach($r as $v) {
	$url = $v['title'];
	if($v['subtitle'] != "") $url .= "_".$v['subtitle'];
	$url = getUniqueURL($url, SERIES_TABLENAME, '', $v['id']);
	do_query("UPDATE ".SERIES_TABLENAME." SET url = '%s' WHERE id = '%s'", $url, $v['id']);
}

?>