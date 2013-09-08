<?php

/*************************************************************
 *
 *	SERVEURS
 *
 *************************************************************/

define('LAN', 'lan');
define('PREPROD', 'loic-h');

// Version locale
if(strpos($_SERVER['HTTP_HOST'], LAN) !== FALSE) {
	define ( 'ROOT_PATH', $_SERVER [ 'DOCUMENT_ROOT' ] . '/' );
	define ( 'ROOT_URL', 'http://' . $_SERVER [ 'HTTP_HOST' ] . '/' );
	
	define('IS_IN_PROD', false);
	
	define ( "SQL_SERVER", "localhost");
	define ( "SQL_USER", "root" );
	define ( "SQL_PASS", "root" );
	define ( "SQL_BASE", "soundcard" );
	
	define ( 'SQL_PRE', '');
	
	error_reporting(E_ALL);
}
// Version pre prod
else if(strpos($_SERVER['HTTP_HOST'], PREPROD) !== FALSE) {
	define ( 'ROOT_PATH', trim ( $_SERVER [ 'DOCUMENT_ROOT' ] . '/' ) );
	define ( 'ROOT_URL', 'http://' . $_SERVER [ 'HTTP_HOST' ] . '/' );
	
	define('IS_IN_PROD', false);

	define ( "SQL_SERVER", "localhost");
	define ( "SQL_USER", "root" );
	define ( "SQL_PASS", "root" );
	define ( "SQL_BASE", "soundcard" );
		
	define ( 'SQL_PRE', '');

	error_reporting(E_ALL);
}
//Version prod
else {
	define ( 'ROOT_PATH', $_SERVER [ 'DOCUMENT_ROOT' ] . '/');
	define ( 'ROOT_URL', 'http://' . $_SERVER [ 'HTTP_HOST' ] .'/' );
	
	define('IS_IN_PROD', true);
	
	define ( "SQL_SERVER", "localhost");
	define ( "SQL_USER", "root" );
	define ( "SQL_PASS", "root" );
	define ( "SQL_BASE", "soundcard" );
	
	define ( 'SQL_PRE', '');
	
	//error_reporting(0);
}

/*************************************************************
 *
 *	CHEMINS
 *
 *************************************************************/

define ( 'SYSTEM_DIR' , 'system/' );
define ( 'SYSTEM_PATH', ROOT_PATH . SYSTEM_DIR );
define ( 'SYSTEM_URL', ROOT_URL . SYSTEM_DIR );

define ( 'LIBRARY_DIR' , 'library/' );
define ( 'LIBRARY_PATH', SYSTEM_PATH . LIBRARY_DIR );
define ( 'LIBRARY_URL', SYSTEM_URL . LIBRARY_DIR );

define ( 'HELPERS_DIR' , 'helpers/' );
define ( 'HELPERS_PATH', SYSTEM_PATH . HELPERS_DIR );
define ( 'HELPERS_URL', SYSTEM_URL . HELPERS_DIR );

define ( 'CLASSES_DIR' , 'classes/' );
define ( 'CLASSES_PATH', SYSTEM_PATH . CLASSES_DIR );
define ( 'CLASSES_URL', SYSTEM_URL . CLASSES_DIR );

define ( 'MODELS_DIR' , 'models/' );
define ( 'MODELS_PATH', SYSTEM_PATH . MODELS_DIR );
define ( 'MODELS_URL', SYSTEM_URL . MODELS_DIR );

define ( 'ASSETS_DIR' , 'assets/' );
define ( 'ASSETS_PATH', ROOT_PATH . ASSETS_DIR );
define ( 'ASSETS_URL', ROOT_URL . ASSETS_DIR );

define ( 'IMAGES_DIR' , 'images/' );
define ( 'IMAGES_PATH', ASSETS_PATH . IMAGES_DIR );
define ( 'IMAGES_URL', ASSETS_URL . IMAGES_DIR );

define ( 'CSS_DIR' , 'css/' );
define ( 'CSS_PATH', ASSETS_PATH . CSS_DIR );
define ( 'CSS_URL', ASSETS_URL . CSS_DIR );

define ( 'JS_DIR' , 'js/' );
define ( 'JS_PATH', ASSETS_PATH . JS_DIR );
define ( 'JS_URL', ASSETS_URL . JS_DIR );

define ( 'CMN_DIR' , 'cmn/' );
define ( 'CMN_PATH', ROOT_PATH . CMN_DIR );
define ( 'CMN_URL', ROOT_URL . CMN_DIR );

define ( 'LOG_DIR' , 'logs/' );
define ( 'LOG_PATH', ROOT_PATH . LOG_DIR );
define ( 'LOG_URL', ROOT_URL . LOG_DIR );

define ( 'UPLOAD_DIR' , 'upload/' );
define ( 'UPLOAD_PATH', ROOT_PATH . UPLOAD_DIR );
define ( 'UPLOAD_URL', ROOT_URL . UPLOAD_DIR );

define ( 'UPLOAD_IMAGES_DIR' , 'images/' );
define ( 'UPLOAD_IMAGES_PATH', UPLOAD_PATH . UPLOAD_IMAGES_DIR );
define ( 'UPLOAD_IMAGES_URL', UPLOAD_URL . UPLOAD_IMAGES_DIR );

/*************************************************************
 *
 *	LANGUES
 *
 *************************************************************/
 
define('LANG_FR', 5);
define('LANG_EN', 10);

$LANG_TAG = array(
	LANG_FR => 'fr',
	LANG_EN => 'en'
);

$LANG_URL_DIR = array(
	LANG_FR => $LANG_TAG[LANG_FR].'/',
	LANG_EN => $LANG_TAG[LANG_EN].'/'
);

$LANG_LIB = array(
	LANG_FR => "français",
	LANG_EN => "english",
);

$LANG_LOCALES = array(
	LANG_FR => array("fr_FR.UTF8", "fr_FR"),
	LANG_EN => array("en_EN.UTF8", "en_EN")
);

$l = LANG_EN;

define('LANG', $l);
setlocale(LC_TIME, $LANG_LOCALES[$l]);


/*************************************************************
 *
 *	DIVERS
 *
 *************************************************************/

$SQL_NUMS = array( "decimal", "float", "int", "tinyint", "smallint", "mediumint", "bigint");


/*************************************************************
 *
 *	ADMIN
 *
 *************************************************************/

$IMAGE_EXTENSIONS = array(".jpg", ".png", ".gif");

// ini_set('memory_limit', '64M');
	
?>