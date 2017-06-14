<?php

namespace JoRo\BookSearch\Command;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Cli\Response as Hooray;

use JoRo\BookSearch\Domain\Model\Book;
use JoRo\BookSearch\Domain\Repository\BookRepository;

/**
 * @Flow\Scope("singleton")
 */
class LibraryCommandController extends \Neos\Flow\Cli\CommandController {

    /**
     * Import Book Library
     *
     * Command to import all books and import all books from a file
     * exported by the internal Library software provided
     * as JSON, XML etc and squeeze it into the db
     *
     * @return string
     */
    public function importCommand() {
        //$this->response->setOutputFormat(Response::OUTPUTFORMAT_STYLED);
        $this->response->setOutputFormat(Hooray::OUTPUTFORMAT_STYLED);
        $this->response->appendContent('<b>Brew</b> this <strike>bitch</strike>! ...' . "\n");
    }
}