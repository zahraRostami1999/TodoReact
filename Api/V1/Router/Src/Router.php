<?php

namespace App\Router\Src;

use App\Router\Src\RouterDataReceivers;
use App\Router\Src\RouterExecuters;
use App\Router\Src\RouterMappers;
use App\Core\Utilities\FileUtilities;
use App\Views\Response;
use Exception;
use PDOException;

class Router
{
	use RouterExecuters, RouterDataReceivers, RouterMappers;
	private $routes = [];
	private array $custom_querystring, $querystring,  $req_headers;
	private mixed $req_body;

	public function add($method, $uri, $handler, $mw = [])
	{
		if (count($mw) > 0 && !is_array($mw[array_key_first($mw)])) {
			$mw = [$mw];
		}

		$this->routes[] = [
			"method" => $method,
			"uri" => $this->translate_uri_to_regex($uri), // translate route uri to regex
			"controller" => $handler, // like UserController@profile
			"middlewares" => $mw // like [[AuthMiddleware::class]]
		];

		return $this;
	}

	public function dispatch()
	{
		foreach ($this->routes as $route) {

			// skip if methods don't match
			if (!$this->method_matches($route["method"])) continue;

			// skip if URIs don't match
			if (!$this->uri_matches($route["uri"])) continue;

			$this->safe_run($route);
			return;
		}

		// no route met this request
		new Response(404, default_message: true);
	}

	private function safe_run($route)
	{
		try {
			$this->run_middlewares($route["middlewares"]);
			$this->run_controller($route["controller"]);
		} catch (PDOException $th) {
			$message = "Error occured in database connection {$th->getFile()}:{$th->getLine()} code({$th->getCode()}): {$th->getMessage()}";
			$message .= PHP_EOL . serialize(debug_backtrace());
			FileUtilities::log($message, "db_log");
		} catch (Exception $th) {
			$message = "Exception: " . print_r($th, true);
			FileUtilities::log($message, "log");
		} finally {
			new Response(500, default_message: true);
		}
	}
}
