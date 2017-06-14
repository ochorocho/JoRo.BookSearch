<?php
namespace JoRo\BookSearch\Controller;

/*
 * This file is part of the JoRo.BookSearch package.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;
use JoRo\BookSearch\Domain\Repository\BookRepository;

class StandardController extends ActionController
{

    /**
     * @Flow\Inject
     * @var BookRepository
     */
    protected $bookRepository;

    /**
     * @return void
     */
    public function indexAction()
    {

        $booksss = $this->bookRepository->findAll()->toArray();
        \Neos\Flow\var_dump($booksss);
        //$this->view->assign('')

        $this->view->assign('foos', array(
            'bar', 'baz'
        ));
    }

}
