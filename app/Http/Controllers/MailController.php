<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Mail\TestMail;
use App\Models\User;

class MailController extends Controller
{
    public function index($data)
    {
        $email = User::where("role", "admin")->first()->email;
        Mail::to($data['email'])->send(new TestMail([
            'title' => 'Spare part',
            'body' => $data['msg']
        ]));
    }
    public function repair($data)
    {
        Mail::to($data['email'])->send(new TestMail([
            'title' => 'Your Repair',
            'body' => $data['msg']
        ]));
    }
    
}