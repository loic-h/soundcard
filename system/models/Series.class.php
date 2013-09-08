<?php
Class Series extends Model {
	protected $id;
	protected $id_cat;
	protected $title;
	protected $subtitle;
	protected $contributor;
	protected $text;
	protected $ordre;
	protected $url;
	protected $is_visible;
	protected $date;
	protected $id_recent;
	protected $ordre_recent;
	function __construct() { 
		$this->fields = array(
			"id" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"id_cat" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 1,
				"null" => 0
			),
			"title" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"subtitle" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"contributor" => array(
				"type" => "text",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"text" => array(
				"type" => "text",
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
			"url" => array(
				"type" => "varchar",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"is_visible" => array(
				"type" => "tinyint",
				"default" => 0,
				"default_null" => 0,
				"null" => 0
			),
			"date" => array(
				"type" => "date",
				"default" => "",
				"default_null" => 1,
				"null" => 0
			),
			"id_recent" => array(
				"type" => "int",
				"default" => null,
				"default_null" => 1,
				"null" => 1
			),
			"ordre_recent" => array(
				"type" => "int",
				"default" => 0,
				"default_null" => 0,
				"null" => 0
			),
		); 
		parent::__construct(SERIES_TABLENAME, 'id', 'order');
	}

	
	function afterLoad() {
		if($this->date != "") {
			$dates = explode('-', $this->date);
			$mois = $dates[1] == '00' ? "" : strftime('%B', strtotime('2000-'.$dates[1].'-01'));
			$annee = $dates[0] == '0000' ? "" : strftime('%Y', strtotime($dates[0].'-01-01'));
			$this->setData('annee', $annee);
			$this->setData('mois', $dates[1]);
			$this->setData('date_format', $mois.' '.$annee);
		}
	}
}
?>