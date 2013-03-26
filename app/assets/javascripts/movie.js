RP = {
    setup: function() {
        // construct new DOM elements
	$('#movies').removeClass('default').kendoGrid();
	$('#message_container').addClass('ui-widget');
	$('#message_container #warning').addClass('ui-state-error ui-corner-all');
	$('#message_container #notice').addClass('ui-state-default ui-corner-all');	
        $('a.add_movie').button();
	$('#ratings_submit').button();
    },
}
$(RP.setup);

RPShowMovie = {
	setup: function() {		
		// setup the show details for selected movie			
		$('<div id="showMovieInfo"></div>').hide().appendTo($('body'));
		$('a.movie_link').click(RPShowMovie.getMovieInfo);
	},
	getMovieInfo: function() {
		// on click, request the html body of movie details from server using AJAX
		$.ajax({type: 'GET',
			url: $(this).attr('href'),
			timeout: 5000,
			success: RPShowMovie.showMovieInfo,
			error: function() { alert('Error!'); }
		});
		return(false);
	},
	showMovieInfo: function(data) {
		// once the AJAX request has been succesfull, render html data onto movieInfo box and display as Dialog
		$('#showMovieInfo').html(data).dialog({
			title: $('#show_movie_title').text(),
			width: '50%',
			resizable: false,
			buttons: {
				Edit: RPShowMovie.getEditMovieInfo,
				Close: function() { $(this).dialog( "close" ); }
			}
		});
		$('#link_edit_movie').hide();       
	},
	getEditMovieInfo: function() {
		$.ajax({type: 'GET',
			url: $('#link_edit_movie').attr('href'),
			timeout: 5000,
			success: RPShowMovie.showEditMovieInfo,
			error: function() { alert('Error!'); }
		});
	},
	showEditMovieInfo: function(data) {
		$('#showMovieInfo').html(data).dialog({
			title: $('#edit_movie_title').text(),
			width: '50%',
			resizable: false,
			buttons: {
				Close: function() { $(this).dialog( "close" ); },
				Save: RPShowMovie.updateMovieInfo
			}
		});
	},
	updateMovieInfo: function() {
		$.ajax({type: 'POST',
			url: $('#showMovieInfo form').attr('action'),
			data: $('#showMovieInfo form').serialize(),
			timeout: 5000,
			success: RPShowMovie.redirectToHome,
			error: function() { alert('Error!'); }
		       });
	},
	redirectToHome: function() {
		var url = $(location).attr('href');
		$(location).attr('href',url);
		return(false);
	}
}
$(RPShowMovie.setup);


RPAddMovie = {
	setup: function(){
		$('<div id="editMovieBox"></div>').hide().appendTo($('body'));
		$( "a.add_movie" ).click(RPAddMovie.showEditMovie);        	
	},
	showEditMovie: function(){
		$.ajax({type: 'GET',
		        url: $(this).attr('href'),
		        timeout: 5000,
		        success: RPAddMovie.showNewMovie,
		        error: function() { alert('Error!'); }
		       });
		return(false);		
	},
	showNewMovie: function(data) {
		$('#editMovieBox').html(data).dialog({
			title: $('#new_movie_title').hide().text(),
		      	width: '50%',
		      	resizable: false,
		     	buttons: {
				Cancel: function() {
			  		$( this ).dialog( "close" );
				},
				Save: function() {
					$.ajax({type: 'POST',
						url: $('#editMovieBox form').attr('action'),
						data: $('#editMovieBox form').serialize(),
						timeout: 5000,
						success: RPAddMovie.redirectToHome,
						error: function() { alert('Error!'); }
					       });
					return(false);				
				}
		      	}
		});
	},
	redirectToHome: function() {
		var url = $(location).attr('href');
		$(location).attr('href',url);
		return(false);
	}
}
$(RPAddMovie.setup);


