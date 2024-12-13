<!DOCTYPE html>
<html>
<head>
  <title>Sudoku Solver</title>
  <link rel="shortcut icon" href="icon.jpg" />
  <link rel="stylesheet" href="estilo2.css">
</head>
<body>

  

  <?php 

  // Obtener los valores de los parámetros del usuario
  $varSelect = $_REQUEST['seleccion_select'];
  $varCruzz = $_REQUEST['cruzamiento_select'];
  $varSudoku = $_REQUEST['sudoku_select'];
  $varGene = $_REQUEST['generaciones_input'];
  $varMuta = $_REQUEST['mutacion_input'];
  $varApti = $_REQUEST['aptitud_input'];

   ?>
   <!--Se instancian los datos de Php a Js  -->
  <script type="text/javascript">
    let vSelect = <?php echo $varSelect; ?>;
    let vCruzz = <?php echo $varCruzz; ?>;
    let vSudoku = <?php echo $varSudoku; ?>;
    let vGene = <?php echo $varGene; ?>;
    let vMuta = <?php echo $varMuta; ?>;
    let vApti = <?php echo $varApti; ?>;
  </script>
  <script src="codigo9nuevo.js"></script>

  
</body>
</html>
