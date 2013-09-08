<?php
Class Cats extends Model {
	protected $id;
	protected $label;
	protected $ordre;
	protected $is_editable;
	protected $is_visible;
	protected $url;
	function __construct() { 
		$this->fields = array(
			"id" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"label" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"ordre" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"is_editable" => array(
				"type" => "tinyint",
				"default" => 1,
				"default_null" => 0,
				"null" => 0
			),
			"is_visible" => array(
				"type" => "tinyint",
				"default" => 0,
				"default_null" => 0,
				"null" => 0
			),
			"url" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
		); 
		parent::__construct(CATS_TABLENAME, 'id', 'order');
	}
}
?>