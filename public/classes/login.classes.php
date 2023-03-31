<?php

class Login extends Dbh {

    protected function getUser($uid, $password) {
        $stmt = $this->connect()->prepare('SELECT users_password FROM Users WHERE users_uid = ? OR users_email = ?;');

        if(!$stmt->execute(array($uid, $password))) {
            $stmt = null;
            header("location: ../index.php?error=stmtfailed");
            exit();
        }

        if($stmt->rowCount() == 0)
        {
            $stmt = null;
            header("location: ../index.php?error=usernotfound");
            exit();
        }

        $passwordHashed = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $checkpassword = password_verify($password, $passwordHashed[0]["users_password"]);

        if($checkpassword == false)
        {
            $stmt = null;
            header("location: ../index.php?error=wrongpassword");
            exit();
        }
        elseif($checkpassword == true) {
            $stmt = $this->connect()->prepare('SELECT * FROM Users WHERE users_uid = ? OR users_email = ? AND users_password = ?;');

            if(!$stmt->execute(array($uid, $uid, $password))) {
                $stmt = null;
                header("location: ../index.php?error=stmtfailed");
                exit();
            }

            if($stmt->rowCount() == 0)
            {
                $stmt = null;
                header("location: ../index.php?error=usernotfound");
                exit();
            }

            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

            session_start();
            $_SESSION["userid"] = $user[0]["users_id"];
            $_SESSION["useruid"] = $user[0]["users_uid"];

            $stmt = null;
        }
    }

}