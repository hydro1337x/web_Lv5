<?php

require "../DbHandler.php";
use Db\DbHandler;



if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
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

    if($fileSize == 0) {
        $db = new DbHandler();
        $db->update("UPDATE fighters SET name='{$name}', age = '{$age}', info = '{$info}', 
                            win = '{$win}', loss = '{$loss}' 
                    WHERE id = $id");
        header("Location: ../index.php");
    } else {
        $lastPathComponent = explode('.', $fileName);
        $fileExtension = strtolower(end($lastPathComponent));
        $formats = array('jpg', 'jpeg', 'png'); 
        $filePath = '../uploads/'.$fileName;
        $databaseFilePath = 'uploads/'.$fileName;

        if(in_array($fileExtension, $formats)){ 
            if(($fileError === 0) && ($fileSize < 1048576)){ 
                move_uploaded_file($fileTempName, $filePath);
                $db = new DbHandler();
                $db->update("UPDATE fighters SET name='{$name}', age = '{$age}', info = '{$info}', 
                                    win = '{$win}', loss = '{$loss}', imagePath = '{$databaseFilePath}' 
                            WHERE id = $id");
                header("Location: ../index.php");
            } else {
                header("Location: ../editFighter.php");
            }
        }    
    } 
}