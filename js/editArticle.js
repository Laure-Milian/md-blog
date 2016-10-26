(function() {

	var app = {

		endpoint : 'http://localhost:2000',
		
		init : function() {
			this.initialRequest();
		},


		// Pour récupérer les titres dans le select

		initialRequest : function() {
			$.ajax(this.endpoint + '/menu.json')
			.done(this.displaySelect)
			.fail(this.requestFail)
		},

		displaySelect : function(response) {
			var allArticles = response.menu;
			var len = allArticles.length;
			for (var i = 0; i < len; i++) {
				var optionSelect = '<option value="' + response.menu[i].path + '">' + response.menu[i].title + '</option>';
				$('#selectArticle').append(optionSelect);
			}
			app.listeners();
		},

		//Listeners boutons

		listeners : function(){
			$('#btnSelectArticle').on('click', this.getInfoArticle.bind(this));
			$('#btnModify').on('click', this.modifyArticle.bind(this));
		},

		// Récupérer toutes les infos concernant l'article

		getInfoArticle : function() {
			var pathSelectedArticle = $('select option:selected').val();
			$.ajax(this.endpoint + pathSelectedArticle)
			.done(this.displayInfoArticle)
			.fail(this.requestFail)
		},

		displayInfoArticle : function(response) {
			console.log(response);
			//Markdown converter (showdown)
			var converter = new showdown.Converter();

			// Pour afficher le titre
			var splitArticle = response.split("\n");
			var len = splitArticle.length;

			for (var i = 0; i < len; i++) {
				if (splitArticle[i].charAt(0) === '#' && splitArticle[i].charAt(1) === ' ') {
					var currentTitle = (splitArticle[i]);
					var currentConvertedTitle = converter.makeHtml(currentTitle);
					$('#displayCurrentTitle').html(currentConvertedTitle);
					var textTitle = $('h1').text();
					$('#inputNewTitle').val(textTitle);
				}
			}

			// Pour afficher le contenu dans le textArea
			for (var i = 1; i < len; i++) {
				$('textarea').append(splitArticle[i] + "\n");
			};

		},

		// Pour modifier le titre & le contenu


		modifyArticle : function() {
			this.newTitleArticle = $('#inputNewTitle').val();
			this.newContentArticle = $('textarea').val();

			$.ajax({
				url: 'http://localhost:2000/',
				type: 'POST',
				dataType: 'html',
				data: {title: xxxx, path: xxxx, content: xxxx }
			})
			.done(this.done)
			.fail(this.fail)
		},


		// Communs à toutes les requêtes Ajax

		requestFail : function() {
			console.log("fail"); // alert utilisateur
		}
	}



	app.init();
})();