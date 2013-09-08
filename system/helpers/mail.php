<?php

function send_mail($to, $from, $objet, $message, $cc = "", $cci = "", $html = false, $reply = true) {
	$headers = "";
	if($html) {
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
	}
	$headers .= 'From: ' . $from . "\r\n";
	if($cc != "") $headers .= 'Cc: ' . $cc . "\r\n";
	if($cci != "") $headers .= 'Bcc: ' . $cci . "\r\n";
	if($reply) $headers .= 'Reply-To: ' . $from . "\r\n";
	$headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";
	$headers .= 'Date: ' . date("D, j M Y H:i:s +0100");
	return mail($to, $objet, $message, $headers);
}

?>