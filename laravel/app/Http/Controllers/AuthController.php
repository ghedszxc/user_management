<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Http\Requests\StoreAttendRequest;
use App\Http\Requests\UpdateAttendRequest;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function createAccount(Request $request)
    {
        try {
            $user = User::create([
                'first_name' => $request['first_name'],
                'last_name' => $request['last_name'],
                'address' => $request['address'],
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
            ]);

            return User::where('id', $user->id)->first();

        } catch (\Illuminate\Database\QueryException $exception) {
            return [
                'status' => 'err',
                'message' => $exception->errorInfo[2]
            ];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Attend  $attend
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Attend  $attend
     * @return \Illuminate\Http\Response
     */
    public function edit(Attend $attend)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAttendRequest  $request
     * @param  \App\Models\Attend  $attend
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return User::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Attend  $attend
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return User::where('id', $id)->delete();
    }

    public function getAuthuser($id)
    {
        return User::where('email', $id)->first();
    }

    public function authLogin(Request $request)
    {
        $user = User::where('email', $request['email'])->first();
        if ($user && Hash::check($request['password'], $user['password'])){

            $response = [
                'user' => $user,
                'token' => $user->createToken('myToken')->plainTextToken
            ];

            return response($response, 201);
        } else {
            return 'Incorrect credentials';
        }
    }

    public function authLogout(Request $request)
    {
        // auth()->user()->tokens()->delete();
    }
}
