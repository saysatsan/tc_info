<?php
// Перевірка, чи поле "honeypot" порожнє
if (!empty($_POST['honeypot'])) {
    // Якщо поле "honeypot" не порожнє, це може бути бот, і ми відхиляємо запит
    die("Неприпустимий запит");
}

if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])){
    $recaptcha_secret_key = "6LeMfhYpAAAAAABHxJVLEYKH3t9jynYTJTji2fOQ";
    $recaptcha_response = $_POST['g-recaptcha-response'];
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    
    $recaptcha = file_get_contents($url . '?secret=' . $recaptcha_secret_key . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);
    
    if ($recaptcha->score >= 0.5){
        
    }else {
         error_log("Recaptcha score is less than 0.5");
        die("Запит не пройшов перевірку на бота! спробуйте заповнити форму ще раз");
    }
}
   
 $content = '';
        foreach ($_POST as $key => $value) {
            if ($value && $key !== 'g-recaptcha-response') {
                $content .= "<b>$key</b>: <i>$value</i>\n";
            }
        }
    
        if (trim($content)) {
            $content = "<b>Заявка від:</b>\n" . $content;
            $apiToken = "6551185530:AAFnyo2Hp3JOoU1C0Dp9DZrNAhinH4SIZDw";
            $data = [
                'chat_id'    => '-1002025349539',
                'text'       => $content,
                'parse_mode' => 'HTML'
            ];
            $personse = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data));
        }

?>