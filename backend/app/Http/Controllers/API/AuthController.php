<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Carbon\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    protected $guard = 'api';

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'sendResetLinkEmail', 'resetPassword', 'resetPasswordForm']]);
    }

    public function register(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'email' => 'email|required|unique:users',
            'password' => 'required|min:6',
            'confirm_password' => 'required|same:password',
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(array('msg' => 'error', 'response' => $validator->errors(), 422));
        }
        $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'name' => $data['name'],
            'email_verified_at	' => now(),
        ]);

        if($user) {
            return response()->json(array('msg' => 'success', 'response' => 'User created successfully!'));
        } else {
            return response()->json(array('msg' => 'error', 'response' => 'Something went wrong!'));
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(array('msg' => 'error', 'response' => $validator->errors(), 422));
        }
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['msg'=> 'error', 'response' => 'Invalid email or password!'], 401);
        }
        
        return $this->respondWithToken(JWTAuth::fromUser(auth()->user()));
        
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['msg'=> 'success', 'response' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
        ]);
    }
    public function sendResetLinkEmail(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'email' => 'required|email|exists:users',
        ]);
        if ($validator->fails()) {
            return response()->json(array('msg' => 'error', 'response' => $validator->errors(), 422));
        }
        $data['token'] = Str::random(64);
        DB::table('password_resets')->insert([
            'email' => $data['email'],
            'token' => $data['token'],
            'created_at' => Carbon::now()
        ]);
        $this->send_email($data);
        return response()->json(array('msg' => 'success', 'response' => 'We have e-mailed your password reset link!'));
    }

    public function send_email($data)
    {
        $to = $data['email'];
        $subject = 'Reset Password';
        $body_html = '<h1>Forget Password Email</h1>';
        $body_html .= 'You can reset password from bellow link:';
        $body_html .= '<a href='.url("account/reset-password", $data['token']).'>Reset Password</a>';
        $body = $body_html;
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: <norply@gmail.com>' . "\r\n";
        @mail($to, $subject, $body, $headers);
    }

    public function resetPasswordForm($token)
    {
        $data = DB::table('password_resets')->where('token', $token)->first();
        if(!$data){
            return response()->json(array('msg' => 'error', 'response' => 'Invalid token!'));
        }
        return response()->json(array('msg' => 'success', 'email'=>$data->email, 'token' => $data->token));
    }

    public function resetPassword(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'token' => 'required',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password',
        ]);
        if ($validator->fails()) {
            return response()->json(array('msg' => 'error', 'response' => $validator->errors(), 422));
        }
        $find_data = DB::table('password_resets')->where('token', $request->token)->first();
        if(!$find_data){
            return response()->json(array('msg' => 'error', 'response' => 'Invalid token!'));
        }

        $status = User::where('email', $find_data->email)->update([
            'password' => bcrypt($data['new_password'])
        ]);

        if($status > 0) {
            DB::table('password_resets')->where('email', $find_data->email)->delete();
            return response()->json(array('msg' => 'success', 'response'=>'Your password has been changed!.'));
        }else{
            return response()->json(array('msg' => 'error', 'response'=>'Something went wrong!'));
        }
    }
}
