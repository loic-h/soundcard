<?php
Class Users extends Model {
	protected $id;
	protected $email;
	protected $pass;
	protected $level;
	protected $session;
	protected $date;
	function __construct() { 
		$this->fields = array(
			"id" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"email" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 1
			),
			"pass" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 1
			),
			"level" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 1
			),
			"session" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 1
			),
			"date" => array(
				"type" => "datetime",
				"default" => "",
				"default_null" => 1,
				"null" => 1
			),
		); 
		parent::__construct(USERS_TABLENAME, 'id', 'order');
	}
}
?>