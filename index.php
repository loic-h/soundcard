<?php
require_once("system/library/include.php");

$page = getGetPostVars('page');

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Soundcard</title>

		<link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicon.ico">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- <link rel="stylesheet" href="/assets/css/normalize.css"> -->
		<link rel="stylesheet" href="/assets/css/styles.css">
		<script type="text/javascript" src="http://connect.soundcloud.com/sdk.js"></script>
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
			<header>
				<h1>
					<img src="assets/img/header-soundcloud-logo.png" alt="Soundcloud" />
				</h1>
			</header>
			<div class="main">

			</div>
		</div>
	</body>
</html>