# Simple AJAX form

![Simple AJAX form](images/form.jpg)


## Add your own server address

```javascript
const configuration = {
  url: "URL" //Add your own server address here
};
$.ajax(configuration)
  .done()
  .fail();
```

## PHP

```php

  <?php
    //get the raw data(in json) from the http request using php://input and decode it into array
    $data = json_decode(file_get_contents('php://input'), true);
    //if authorized return true else false
    if($data["username"] == "ritik123" && $data["password"] == "hello123"){
        echo json_encode(array("authorized"=>true));
    }else{
        echo json_encode(array("authorized"=>false));
    }  
?>

```


# Form in action

### [1] Wrong credentials

![Wrong credentials](images/faliure.jpg)

### [2] Success

![Success](images/success.jpg)
