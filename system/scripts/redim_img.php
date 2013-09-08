<?php

include ( "../library/include.php" );
set_time_limit(0);
ini_set("memory_limit",'256M');
$r = do_query('SELECT * FROM '.IMAGES_TABLENAME.'');
foreach($r as $v) {
	if(is_file(UPLOAD_IMAGES_FULL_PATH.$v['md5'])) {
		redimImage(UPLOAD_IMAGES_FULL_PATH . $v['md5'], UPLOAD_IMAGES_HIGH_MENU_PATH, $v['md5'], IMAGES_HIGH_MENU_HEIGHT);
	}
}

?>