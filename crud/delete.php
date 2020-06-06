<?php

require "../DbHandler.php";
use Db\DbHandler;
$id = $_POST['id'];
$db = new DbHandler();
$db->delete("$id");
header("Location: ../index.php");