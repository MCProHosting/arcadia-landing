<?php
$date = new DateTime();
$date->setTimezone(new DateTimeZone('EST'));
echo 1418245200 - $date->getTimestamp();
