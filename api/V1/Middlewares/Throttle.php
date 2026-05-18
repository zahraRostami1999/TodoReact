<?php

namespace App\Middlewares;

use App\Core\Config\CommonConstants;
use App\Views\Response;

class Throttle
{
    public function __construct(
        // ----- BEGIN compatibility params
        private $custom_querystring = '',
        private $querystring = '',
        private $req_headers = '',
        private $req_body = '',
        // ----- FINISH compatibility params
        private int $limit = CommonConstants::MAX_REQUEST_RATE,
        private int $throttleWindow = CommonConstants::MAX_REQUEST_WINDOWS,
        private string $file_path = __DIR__ . '/' . 'ipViews.txt',
        private array $allIps = [],
    ) {
        $this->loadViews();
    }

    public function __destruct()
    {
        $this->saveViews();
    }

    public function handle(): ?Response
    {
        $ip = $_SERVER['REMOTE_ADDR'];

        $this->addView($ip);
        $this->cleanIpViews($ip);

        if ($this->checkLimit($ip)) {
            return new Response(429);
        }

        return null;
    }

    private function addView(string $ip): void
    {
        isset($this->allIps[$ip]) ?
            array_unshift($this->allIps[$ip], time()) :
            $this->allIps[$ip] = [time()];
    }

    public function cleanIpsViews(): void
    {
        foreach ($this->allIps as $ip => $views) {
            $this->cleanIpViews($ip);
        }
    }

    private function cleanIpViews(string $ip): void
    {
        foreach ($this->allIps[$ip] as $key => $timestamp) {
            $windowsBorder = time() - $this->throttleWindow;

            if ($timestamp < $windowsBorder) {
                $recentViews = array_slice($this->allIps[$ip], 0, $key);
                $this->allIps[$ip] = $recentViews;
                if (empty($this->allIps[$ip])) unset($this->allIps[$ip]);
                break;
            }
        }
    }

    private function checkLimit(string $ip): bool
    {
        return count($this->allIps[$ip]) > $this->limit;
    }

    private function loadViews(): void
    {
        $data = unserialize(file_get_contents($this->file_path));
        $this->allIps = is_array($data) ? $data : [];
    }

    private function saveViews(): void
    {
        file_put_contents($this->file_path, serialize($this->allIps));
    }
}
