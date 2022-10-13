<?php

class loginContr extends Login {

    private $uid;
    private $password;
    
    public function __construct($uid, $password) {
        $this->uid = $uid;
        $this->password = $password;
    }

    public function loginUser() {
        if($this->emptyInput() == false) {
            // echo "Empty input!";
            header("location: ../index.php?error=emptyinput");
            exit();
        }

        $this->getUser($this->uid, $this->password);
    }

    private function emptyInput() {
        $result;
        if(empty($this->uid) || empty($this->password)) {
            $result = false;
        }
        else {
            $result = true;
        }
        return $result;
    }

}
