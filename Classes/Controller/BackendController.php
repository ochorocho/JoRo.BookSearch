<?php
namespace JoRo\BookSearch\Controller;

use Neos\Flow\Annotations as Flow;
use JoRo\BookSearch\Domain\Model\Book;
use JoRo\BookSearch\Domain\Repository\BookRepository;


class BackendController extends \Neos\Flow\Mvc\Controller\ActionController {

    /**
     * @Flow\Inject
     * @var \Neos\Neos\Domain\Service\UserService
     */
    protected $userDomainService;

    /**
     * @Flow\Inject
     * @var \JoRo\BookSearch\Domain\Repository\BookRepository
     */
    protected $bookRepository;

    public function indexAction() {
        $books = $this->bookRepository->findAll();
        $this->view->assign('books', $books);
    }

    public function addAction() {
        $currentUser = $this->userDomainService->getCurrentUser();
        $this->view->assign('language', $currentUser->getPreferences()->getInterfaceLanguage());
    }

    /**
     * @param \JoRo\BookSearch\Domain\Model\Book $newBook
     * @return void
     */
    public function createAction(Book $newBook)
    {
        $this->bookRepository->add($newBook);
        // $this->addFlashMessage('Created a new blog entry.');
        $this->redirect('index');
    }

    /**
     * @param \JoRo\BookSearch\Domain\Model\Book $book
     * @return void
     */
    public function deleteAction(Book $book)
    {
        $this->bookRepository->remove($book);
        $this->redirect('index');
    }

    /**
     * @param \JoRo\BookSearch\Domain\Model\Book $book
     * @return void
     */
    public function editAction(Book $book) {
        $currentUser = $this->userDomainService->getCurrentUser();
        $this->view->assign('language', $currentUser->getPreferences()->getInterfaceLanguage());
        $this->view->assign('book', $book);
    }

    /**
     * @param \JoRo\BookSearch\Domain\Model\Book $book
     * @return void
     */
    public function updateAction(Book $book)
    {
        $this->bookRepository->update($book);
        $this->redirect('index');
    }

    /**
     * @param \JoRo\BookSearch\Domain\Model\Book $book
     * @return void
     */
    public function detailAction(Book $book)
    {
        $this->view->assign('book', $book);
    }


}