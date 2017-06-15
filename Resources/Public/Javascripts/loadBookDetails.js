// Load book API response to form
function loadBookToForm(filter, search) {
    var query = filter + ':' + search;
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonpCallback: "handleResponse",
        url: "https://www.googleapis.com/books/v1/volumes",
        data: "q=" + query + "&callback=handleResponse",
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
            console.log(item,search);
            var book = item.volumeInfo;
            $('#joro-search').removeClass('loading');
            return '<div class="autocomplete-suggestion" data-val="' + book.title + '">' + book.title + '</div>';
        },
        onSelect: function(e, term, item){
            // trigger loadBookToForm
        },
        menuClass: 'joro-search-suggest',
    });
});