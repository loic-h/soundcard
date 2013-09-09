<?php
	require_once("system/library/include.php");

	switch(getGetPostVars('t')) {
		case 'instagram_token':
			$_SESSION['instagram_token'] = getGetPostVars('code');
		break;
		case 'soundcloud':
			echo file_get_contents('callback.html');
		break;
	}
?>