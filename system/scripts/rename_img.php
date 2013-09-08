<?php

include ( "../library/include.php" );

$r = do_query("SELECT * FROM ".IMAGES_TABLENAME." ");
foreach($r as $v) {
	$name = getFilename($v['name']);
	
	rename(UPLOAD_IMAGES_FULL_PATH.$v['md5'], UPLOAD_IMAGES_FULL_PATH.$name);
	rename(UPLOAD_IMAGES_THUMB_PATH.$v['md5'], UPLOAD_IMAGES_THUMB_PATH.$name);
	rename(UPLOAD_IMAGES_MENU_PATH.$v['md5'], UPLOAD_IMAGES_MENU_PATH.$name);
	rename(UPLOAD_IMAGES_ADM_THUMB_PATH.$v['md5'], UPLOAD_IMAGES_ADM_THUMB_PATH.$name);
	rename(UPLOAD_IMAGES_ADM_MINI_THUMB_PATH.$v['md5'], UPLOAD_IMAGES_ADM_MINI_THUMB_PATH.$name);
	rename(UPLOAD_IMAGES_MOBILE_PATH.$v['md5'], UPLOAD_IMAGES_MOBILE_PATH.$name);
	rename(UPLOAD_IMAGES_NORMAL_PATH.$v['md5'], UPLOAD_IMAGES_NORMAL_PATH.$name);
	rename(UPLOAD_IMAGES_HIGH_PATH.$v['md5'], UPLOAD_IMAGES_HIGH_PATH.$name);
	rename(UPLOAD_IMAGES_HIGH_THUMB_PATH.$v['md5'], UPLOAD_IMAGES_HIGH_THUMB_PATH.$name);
	
	do_query("UPDATE ".IMAGES_TABLENAME." SET md5 = '%s' WHERE id = '%s'", $name, $v['id']);
}
?>