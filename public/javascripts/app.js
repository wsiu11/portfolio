function submitform() {
    var formData = JSON.stringify($("#myForm").serializeArray());
    $.ajax({
        type: "POST",
        url: "serverUrl",
        data: formData,
        dataType: "json",
        contentType : "application/json",
        success: function(){}
      });
}
