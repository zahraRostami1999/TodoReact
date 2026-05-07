<?php

namespace App\Core\Config;

class DatabaseConfig
{
	public const NAME = DEPLOYED ? "h364460_todo" : "todo";
	public const HOST = DEPLOYED ? "localhost" : "localhost";
	public const USER = DEPLOYED ? "h364460_todo" : "root";
	public const PASS = DEPLOYED ? "Tbh(K(7k[9C]kR;]" : "";
}
