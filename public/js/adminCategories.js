function openAddItemForm() {
    $('#addItemModal').modal('show');
}

function cancelAddItemForm() {
    $('#addItemModal').modal('hide');
}

function submitAddItemForm() {
    $('#addItemModal').modal('hide');
}

function editRow(icon) {
    const row = $(icon).closest('tr');
    const catCode = row.find('th:nth-child(1)').text();
    const catName = row.find('td:nth-child(2)').text();

    $('#editCatCode').val(catCode);
    $('#editCatName').val(catName);

    $('#editItemModal').modal('show');
  }
  function saveChanges(){
    $('#editItemModal').modal('hide');
  }
  function cancelEdit() {
    $('#editItemModal').modal('hide');
  }