$(document).ready(function(){
  //createTable();
  getObjects();

});

function createTable() {
  $('#hardwares').append('<thead> <tr> <th>Name</th> <th>Description</th> <th>Image</th> <th>Total</th> <th>Available</th> <th>Borrow</th> </tr> </thead>');
}
function getObjects() {
  var counter = 0;
  $.ajax({
    type: 'GET',
    url: "http://163.172.147.78:825/hardwarelibrary/useractions/gethardwarelist",
    dataType: 'json',
    success: function(data) {
      $.each(data.hardwareList, function(i, data){
        var htmlString;
        if(counter == 0){
          htmlString += '<tbody>';
        }
        htmlString += '<tr>';
        htmlString += '<td>' + data.name + '</td>';
        htmlString += '<td>' + data.description + '</td>';
        htmlString += '<td><image src=' + data.imageLink + ' width="128" height="128"></image></td>';
        htmlString += '<td>' + data.total + '</td>';
        htmlString += '<td>' + data.available + '</td>';
        htmlString += '<th><input name="count" value="1"></input></th><th><input type="submit" class="submit" id='+data.name+'></input></th>';
        htmlString += '</tr>';
        if(counter == 0){
          htmlString += '</tbody>';
        }
        $('#hardwares').append(htmlString);
        counter ++;
      });
    },
    error: function(xhr, status, error) {
      alert(xhr.status);
    }
  });
}

//Dynamically added button.
$(document).on('click', '.submit', function(e){
  e.preventDefault();
  var id = this.id;
  var count = $(this).closest("tr").find("input[name='count']").val();
  var hardwareName = $("td#"+id).text();
  alert(count);
});
