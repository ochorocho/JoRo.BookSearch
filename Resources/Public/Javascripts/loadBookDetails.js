// Load book API response to form
function loadBookToForm(url) {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonpCallback: "handleResponse",
        url: url,
        data: "callback=handleResponse",
        success: function (book) {
            if (book != undefined) {
                if (book.volumeInfo.industryIdentifiers != undefined) {
                    $('#isbn').val(book.volumeInfo.industryIdentifiers[0].identifier);
                } else {
                    $('#isbn').val('');
                }
                if (book.volumeInfo.title != undefined) {
                    $('#title').val(book.volumeInfo.title);
                } else {
                    $('#title').val('');
                }
                if (book.volumeInfo.authors != undefined) {
                    $('#author').val(book.volumeInfo.authors.join(', '));
                } else {
                    $('#author').val('');
                }
                if (book.volumeInfo.publishedDate != undefined) {
                    $('#releasedate').val(book.volumeInfo.publishedDate);
                } else {
                    $('#releasedate').val('');
                }
                if (book.volumeInfo.language != undefined) {
                    $('#language').val(book.volumeInfo.language);
                } else {
                    $('#language').val('');
                }
                if (book.volumeInfo.categories != undefined) {
                    $('#categories').val(book.volumeInfo.categories.join(', '));
                } else {
                    $('#categories').val('');
                }
                if (book.volumeInfo.pageCount != undefined) {
                    $('#pages').val(book.volumeInfo.pageCount);
                } else {
                    $('#pages').val('');
                }
                if (book.volumeInfo.imageLinks != undefined || book.volumeInfo.imageLinks.thumbnail != undefined) {
                    $('#image-cover').val(book.volumeInfo.imageLinks.thumbnail);
                } else {
                    $('#image-cover').val('');
                }
                if (book.volumeInfo.publisher != undefined) {
                    $('#publisher').val(book.volumeInfo.publisher);
                } else {
                    $('#publisher').val('');
                }
                if (book.volumeInfo.description != undefined) {
                    $('#description').val(book.volumeInfo.description);
                } else {
                    $('#description').val('');
                }
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
/*
 (function defer() {
 if (window.Ember) {
 Ember.Application.create({
 ready: function() {
 // console.log(Ember.I18n.translations.JoRo_BookSearch.Main.label_notfound);
 }
 })
 } else {
 setTimeout(function() { defer() }, 50);
 }
 })();
 */
$(document).ready(function () {

    $('#joro-search input').autoComplete({
        source: function (term, response) {
            var filter = $('#joro-search select').val() + ':';
            var isbn = $('#joro-search input').val();

            if (filter === 'all:') {
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
                success: function (data) {
                    if (data == undefined || data.totalItems == 0) {
                        var notfound = Ember.I18n.translations.JoRo_BookSearch.Main.label_notfound;
                        $('#joro-search').removeClass('loading');
                        $('.joro-search-suggest').html('<div class="joro-notfound">' + notfound + '</div>').css('display', 'inline-block');
                    } else {
                        response(data.items);
                    }
                }
            });
        },
        renderItem: function (item, search) {
            $('#joro-search').removeClass('loading');
            return '<div class="autocomplete-suggestion" data-link="' + item.selfLink + '" data-val="' + item.volumeInfo.title + '">' + item.volumeInfo.title + '</div>';
        },
        onSelect: function (e, term, item) {
            loadBookToForm(item.attr('data-link'));
        },
        menuClass: 'joro-search-suggest',
        appendTo: '#joro-search'
    });
});