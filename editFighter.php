<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit fighter</title>
    <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossorigin="anonymous"
  />
  <script
    src="https://code.jquery.com/jquery-3.5.1.min.js"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
    crossorigin="anonymous">
  </script>

</head>
<body>
    <div>
        <h1 style="float: left;">EDIT FIGHTER</h1>
    </div>
    <div class="container">
        <?php 
            require "DbHandler.php";

            use Db\DbHandler;
            $id = $_GET['id'];
            $db = new DbHandler();
            $result = $db->select("SELECT * FROM fighters WHERE id = '{$id}'");
        ?>
        
        <?php if($result->num_rows > 0): ?>
            <?php while($row = $result->fetch_assoc()): ?>

        <form id="form" action="crud/update.php" method="POST" enctype="multipart/form-data" style="width: 40%;">
            
            <input type="hidden" name="id" value="<?= $row['id']?>">

            <div class="form-group form-inline">
                <label class="">Name</label>
                <input class="form-control"type="text" name="name" id="name" value="<?= $row["name"];?>">
            </div>

            <div class="form-group form-inline">
                <label class="">Age</label>
                <input class="form-control" name="age" type="number" min="0" id="age" value="<?= $row["age"];?>">
            </div>

            <div class="form-group form-inline">
                <label class="">Cat Info</label>
                <input class="form-control" type="text" name="info" id="info" value="<?= $row["info"];?>">
            </div>

            <div class="row">
                <div class="">
                    <div class="form-group form-inline">
                        <label class="">Wins</label>
                        <input class="form-control" type="number" min="0" name="win" id="win" value="<?= $row["win"];?>">
                    </div>
                </div>

                <div class="">
                    <div class="form-group form-inline">
                        <label class="">Loss</label>
                        <input class="form-control" type="number" min="0" name="loss" id="loss" value="<?= $row["loss"];?>">
                    </div>
                </div>
            </div>
            
            <div class="form-group form-inline">
                <label class="">New Cat Image</label>
                <input class="form-control" type="file" name="image" id="imagePath">
            </div>
          
            <div class="text-center">
            <input type="submit" class="btn btn-primary" name="submit" id="btnUpdate" value="UPDATE">
            </div>

            <button class="btn btn-secondary" type="submit" formmethod="POST" formaction="crud/delete.php" style="float: right;" id="btnDelete">DELETE FIGHTER</button>
        </form>

        <?php endwhile;?>
        <?php endif;?>
    </div>
</body>

<script>
    $(document).ready(function() {
        $("#btnUpdate").on("click", function(event) {
            event.preventDefault();
            var name = $("#name").val();
            var age = $("#age").val();
            var info = $("#info").val();
            var win = $("#win").val();
            var loss = $("#loss").val();
            var imagePath = $("#imagePath").val();

            if(name =='' || age == '' || info == '' || win == '' || loss == '') {
                alert("Fields can not be empty");
            } else {
                $("#btnUpdate").unbind('click').click();
            }
        })
        $("#btnDelete").on("click", function() {
            alert("Fighter deleted");
        })
    })
</script>
</html>

