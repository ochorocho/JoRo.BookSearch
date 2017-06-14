if (typeof document.addEventListener === 'function') {
    document.addEventListener('Neos.PageLoaded', function(event) {
        console.log('Well this is supposed to load Details From gOOOGLE api');
    }, false);
}



// https://www.googleapis.com/books/v1/volumes?q=suel&callback=handleResponse

$(document).ready(function () {
    $('#loadBookDetails').on('click touch', function(e) {
        e.preventDefault();
        var isbn = $('#isbn').val();
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonpCallback: "handleResponse",
            url: "https://www.googleapis.com/books/v1/volumes",
            data: "q=isbn:" + isbn + "&callback=handleResponse",
            success: function(msg){
                if(msg.items != undefined) {
                    var book = msg.items[0].volumeInfo;
                    $('#title').val(book.title);
                    $('#author').val(book.authors.join(', '));
                    $('#releasedate').val(book.publishedDate);
                    $('#language').val(book.language);
                    $('#categories').val(book.categories);
                    $('#pages').val(book.pageCount);
                    $('#image-cover').val(book.imageLinks.thumbnail);
                    $('#publisher').val(book.publisher);
                    $('#description').val(book.description);
                    $('#teaser').val(msg.items[0].searchInfo.textSnippet);
                    $('#averagerating').val(book.averageRating);
                } else {
                    console.log('No books found for this isbn');
                }
            },
            error: function (err) {
                console.log('Failed loading Books API ...');
            }
        });
        console.log('Load Books Details');
    });

    $('#isbn').on('keyup', function () {
       console.log('keeeeeuP!');
    });
});