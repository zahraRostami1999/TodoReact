<?php

namespace App\Router;

use App\Router\Src\Router;
use App\Core\Config\MethodConstant as M;
use App\Controllers\AuthController as Auth;
use App\Controllers\TaskController as Task;
use App\Controllers\UserController as User;
use App\Middlewares\Throttle;

(new Router())
	//		method		path (url)						class		method				middlewares

	// user endpoints
	->add(M::GE, 	"users/{username:string}",	[User::class, "user_exists"],	[Throttle::class, 'handle']) // [done] read
	->add(M::PO, 	"user",						[User::class, "create_user"],	[Throttle::class, 'handle']) // [done] create (register)

	// authentication endpoints
	->add(M::PO, 	"auth/login", 				[Auth::class, "login"],			[Throttle::class, 'handle']) // [done] login
	->add(M::PO, 	"auth/refresh", 			[Auth::class, "refresh"],		[Throttle::class, 'handle']) // [done] refresh access token
	->add(M::PO, 	"auth/logout", 				[Auth::class, "logout"],		[[Throttle::class, 'handle'], [Auth::class, "authenticate"]]) // [done] logout

	// task endpoint
	->add(M::GE, 	"tasks",					[Task::class, "read_tasks"],	[[Throttle::class, 'handle'], [Auth::class, "authenticate"]]) // get all (of current user)
	->add(M::DE,	"task/{id:string}", 		[Task::class, "delete_task"],	[[Throttle::class, 'handle'], [Auth::class, "authenticate"]]) // [done] delete specific (of current user)
	->add(M::PU, 	"task/{id:string}", 		[Task::class, "update_task"],	[[Throttle::class, 'handle'], [Auth::class, "authenticate"]]) // [done] update specific (of current user)
	->add(M::PO, 	"task", 					[Task::class, "create_task"],	[[Throttle::class, 'handle'], [Auth::class, "authenticate"]]) // [done] create one (for current user)


	// run program
	->dispatch();
