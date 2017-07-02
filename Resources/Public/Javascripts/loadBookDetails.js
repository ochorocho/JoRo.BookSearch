// Load book API response to form
function loadBookToForm(url) {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonpCallback: "handleResponse",
        url: url,
        data: "callback=handleResponse",
        success: function(book){
            console.log(book);
            if(book != undefined) {
                $('#title').val(book.volumeInfo.title);
                $('#author').val(book.volumeInfo.authors.join(', '));
                $('#releasedate').val(book.volumeInfo.publishedDate);
                $('#language').val(book.volumeInfo.language);
                $('#categories').val(book.volumeInfo.categories.join(', '));
                $('#pages').val(book.volumeInfo.pageCount);
                $('#image-cover').val(book.volumeInfo.imageLinks.thumbnail);
                $('#publisher').val(book.volumeInfo.publisher);
                $('#description').val(book.volumeInfo.description);
                if (book.volumeInfo.averageRating != undefined) {
                    $('#averagerating').val(book.volumeInfo.averageRating);
                } else {
                    $('#averagerating').val('0');
                }
            } else {
                console.log('No book found ...');
            }
        },
        error: function (err) {
            console.log('Failed loading Books API ...');
        }
    });
}

// Wait for Ember to use its translations
(function defer() {
    if (window.Ember) {
        Ember.Application.create({
            ready: function() {
                console.log(Ember.I18n.translations.JoRo_BookSearch.Main.label_notfound);
            }
        })
    } else {
        setTimeout(function() { defer() }, 50);
    }
})();

$(document).ready(function () {

    $('#joro-search input').autoComplete({
        source: function(term, response){
            // $.getJSON('/some/ajax/url/', { q: term }, function(data){ response(data); });
            var filter = $('#joro-search select').val() + ':';
            var isbn = $('#joro-search input').val();

            if(filter == 'all:') {
                filter = '';
            }

            var query = filter + isbn;
            $('#joro-search').addClass('loading');
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                jsonpCallback: "handleResponse",
                url: "https://www.googleapis.com/books/v1/volumes",
                data: {
                    q: query,
                    callback: 'handleResponse'
                },
                success: function(data){
                    if(data.totalItems == 0) {
                        var notfound = Ember.I18n.translations.JoRo_BookSearch.Main.label_notfound;
                        $('#joro-search').removeClass('loading');
                        $('.joro-search-suggest').html('<div class="joro-notfound">' + notfound + '</div>').css('display', 'inline-block');
                    } else {
                        response(data.items);
                    }
                }
            });
        },
        renderItem: function (item, search){
            // console.log(item,search);
            $('#joro-search').removeClass('loading');
            return '<div class="autocomplete-suggestion" data-link="' + item.selfLink + '" data-val="' + item.volumeInfo.title + '">' + item.volumeInfo.title + '</div>';
        },
        onSelect: function(e, term, item){
            // trigger loadBookToForm
            console.log(term);
            console.log(item.attr('data-link'));
            loadBookToForm(item.attr('data-link'));
        },
        menuClass: 'joro-search-suggest',
    });
});