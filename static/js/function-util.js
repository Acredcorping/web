function json_attr(data_list, json_url) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/' + json_url,
        async: true,
        data: JSON.stringify(data_list),
        contentType: "application/json",
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        }
    })
}

function isObjectEqual(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    for (let key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
          if (!isObjectEqual(obj1[key], obj2[key])) {
            return false;
          }
        } else if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }
    return true;
  }