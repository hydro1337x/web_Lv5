<?php

require "../DbHandler.php";
use Db\DbHandler;

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $age = $_POST['age'];
    $info = $_POST['info'];
    $win = $_POST['win'];
    $loss = $_POST['loss'];

    $file = $_FILES['image'];
    $fileName = $file['name'];
    $fileTempName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
        
    $fileLastPathComponent = explode('.', $fileName);
    $filExtension = strtolower(end($fileLastPathComponent));
    $formats = array('jpg', 'jpeg', 'png');
    $filePath = '../uploads/'.$fileName;
    $databaseFilePath = 'uploads/'.$fileName;
    
    if(in_array($filExtension, $formats)){ 
        if(($fileError === 0) && ($fileSize < 1048576)){ 
            move_uploaded_file($fileTempName, $filePath); 
            $db = new DbHandler();
            $db->insert("INSERT INTO fighters(name, age, info, win, loss, imagePath) 
                VALUES ('{$name}', '{$age}', '{$info}', '{$win}', '{$loss}', '{$databaseFilePath}')");
            echo "index.php";
            header("Location: ../index.php");
            
        } else {
            echo "addFighter.php";
            header("Location: ../addFighter.html");
            
        }
    } else {
        echo alert("Image upload problem");
    }
}