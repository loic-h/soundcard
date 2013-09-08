<?php
Class Permanent extends Model {
	protected $id;
	protected $id_contact;
	protected $text_contact;
	protected $id_recent;
	function __construct() { 
		$this->fields = array(
			"id" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"id_contact" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"text_contact" => array(
				"type" => "text",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"id_recent" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
		); 
		parent::__construct(PERMANENT_TABLENAME, 'id', 'order');
	}
}
?>