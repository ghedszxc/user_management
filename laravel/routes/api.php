<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiscipleController;
use App\Http\Controllers\AttendController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('auth/authLogin', [AuthController::class, 'authLogin']);
Route::post('auth/createAccount', [AuthController::class, 'createAccount']);

// Authenticated APIs
Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::resource('auth', AuthController::class);
    Route::get('auth/getAuthuser/{id}', [AuthController::class, 'getAuthuser']);
});