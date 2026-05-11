<?php

namespace App\Middlewares;

use App\Core\Config\CommonConstants;
use App\Views\Response;

class Throttle
{
    public function __construct(
        // ----- BEGIN compatibility params
        private $custom_querystring,
        private $querystring,
        private $req_headers,
        private $req_body,
        // ----- FINISH compatibility params
        private int $limit = CommonConstants::MAX_REQUEST_RATE,
        private int $throttleWindow = CommonConstants::MAX_REQUEST_WINDOWS,
        private string $file_path = __DIR__ . '/' . 'ipViews.txt',
        private array $allIps = [],
    ) {}

    public function handle(): ?Response
    {
        $ip = $_SERVER['REMOTE_ADDR'];

        $this->allIps = $this->getFile();
        $this->addView($ip);
        $this->removeOldViews($ip);
        $limitReached = $this->checkLimit($ip);
        $this->setFile($this->allIps);

        if ($limitReached) {
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

    private function removeOldViews(string $ip): void
    {
        foreach ($this->allIps[$ip] as $key => $timestamp) {
            $windowsBorder = time() - $this->throttleWindow;

            if ($timestamp < $windowsBorder) {
                $recentViews = array_slice($this->allIps[$ip], 0, $key);
                $this->allIps[$ip] = $recentViews;
                break;
            }
        }
    }

    private function checkLimit(string $ip): bool
    {
        return count($this->allIps[$ip]) > $this->limit;
    }

    private function getFile(): array
    {
        $data = unserialize(file_get_contents($this->file_path));
        return is_array($data) ? $data : [];
    }

    private function setFile(array $data): void
    {
        file_put_contents($this->file_path, serialize($data));
    }
}
