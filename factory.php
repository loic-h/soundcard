<?php
require_once("system/library/include.php");

$instagram_token = isset($_SESSION['instagram_token']) ? $_SESSION['instagram_token'] : false;
$soundcloud_token = isset($_SESSION['soundcloud_token']) ? $_SESSION['soundcloud_token'] : false;

if(!$instagram_token) {
	$page = 'InstagramAuthenticate';
}
else if(!$soundcloud_token) {
	$page = 'soundcloudAuthenticate';
}

define('INSTAGRAM_CLIENT_ID', 'e8abec9b1f414900a64ba508441cf7d9');
define('INSTAGRAM_REQUEST_URI', 'http://soundcard.lan/request.php?t=instaram_token"');

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Soundcard</title>

		<link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicon.ico">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="/assets/css/normalize.css">
		<link rel="stylesheet" href="/assets/css/styles.css">
		<?php
		if(IS_IN_PROD) { 
		?>
		<script type="text/javascript" src="/assets/js/lib/require/lib/require.js"></script>
		<script type="text/javascript" src="/assets/js/build/main-built.js"></script>
		<?php } else { ?>
		<script data-main="/assets/js/main" src="/assets/js/lib/require/lib/require.js"></script>
		<?php } ?>
	</head>
	<body>
		<div id="container">
			<!--[if lt IE 9]>
			<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
			<![endif]-->
			<head>

			</head>
			<div class="main">

				<?php
					switch($page) {
						case 'InstagramAuthenticate':
						?>
							<div class="">
								step 1 : please register on <a href="https://api.instagram.com/oauth/authorize/?client_id=<?php echo INSTAGRAM_CLIENT_ID ?>&redirect_uri=<?php echo INSTAGRAM_REQUEST_URI ?>&response_type=code">Instagram</a>
							</div>
						<?php
						break;
						case 'soundcloudAuthenticate':
						?>
							<div class="">
								step 1 : please register on <a href="https://api.instagram.com/oauth/authorize/?client_id=<?php echo INSTAGRAM_CLIENT_ID ?>&redirect_uri=<?php echo INSTAGRAM_REQUEST_URI ?>&response_type=code">Soundcloud</a>
							</div>
						<?php
						break;
					}
				?>

			</div>
		</div>
	</body>
</html>