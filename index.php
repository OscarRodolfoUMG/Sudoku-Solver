<!DOCTYPE html>
<html>
<head>
  <title>Sudoku Solver</title>
  <meta charset="UTF-8">
  <link rel="shortcut icon" href="icon.jpg" />
  <link rel="stylesheet" href="estilo.css">
</head>
<body>

  <h1>Sudoku Solver</h1>
  <div class="form-container">
    <form action = "ejecutar.php" method ="post" id="sudoku-form">

      <label for="seleccion_select">Método de Selección:</label>
      <select name="seleccion_select">
        <option value="1">Elite</option>
        <option value="2">Torneo</option>
        <option value="3">Generacional</option>             
        <option value="4">Especial</option>
      </select>

      <label for="cruzamiento_select">Método de Cruzamiento:</label>
      <select name="cruzamiento_select">
        <option value="1">Un Punto Simetrico</option>
        <option value="2">Uniforme</option>
        <option value="3">Dos Puntos Asimetrico</option>
      </select>

      <label for="sudoku-select">Sudoku:</label>
      <select name="sudoku_select">
        <option value="1">Facil 1</option>
        <option value="2">Facil 2</option>
        <option value="3">Facil 3</option>
        <option value="4">Facil 4</option>
        <option value="5">Facil 5</option>
        <option value="6">Facil 6</option>
        <option value="7">Facil 7</option>
        <option value="8">Facil 8</option>
        <option value="9">Facil 9</option>
        <option value="10">Facil 10</option>
        <option value="11">Medio 1</option>
        <option value="12">Medio 2</option>
        <option value="13">Medio 3</option>
        <option value="14">Medio 4</option>
        <option value="15">Medio 5</option>
        <option value="16">Medio 6</option>
        <option value="17">Medio 7</option>
        <option value="18">Medio 8</option>
        <option value="19">Medio 9</option>
        <option value="20">Medio 10</option>
      </select>

      <label for="generaciones-input">Máximo de Generaciones:</label>
      <input type="number" name="generaciones_input" min="1" max="100000" required>

      
      <label for="mutacion-input">Número de Generaciones para Mutación:</label>
      <input type="number" name="mutacion_input" min="0" step="1" required>


      <label for="aptitud-input">Aptitud Mínima Deseada:</label>
      <input type="number" name="aptitud_input" min="0" step="1" required>


      <button type="submit" >Resolver Sudoku</button>
    </form>

  </div>
  
  
</body>
</html>
