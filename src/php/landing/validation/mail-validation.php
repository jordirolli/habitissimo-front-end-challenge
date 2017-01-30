<?php

$email = $_POST["email"];

if (filter_var($email, FILTER_VALIDATE_EMAIL) && !strpos($email, "@hotmail.")) {
    echo json_encode(true);
}else {
    echo json_encode(false);
}

?>