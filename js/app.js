(function(){

	"use strict";
	var app = {

		init : function(){
			this.getArticle('/alice.md');
			this.getMenu();
		},

		
		// Pour récupérer et convertir article :

		getArticle : function(articlePath) {
			$.ajax('http://192.168.1.40:1337' + articlePath)
			.done(this.getArticleDone)
			.fail(this.requestFail)
			.always(this.requestAlways)
		},

		getArticleDone : function(article) {
			var converter = new showdown.Converter();
			var articleHtml = converter.makeHtml(article);
			$("#md").html(articleHtml);
		},


		// Pour récupérer menu :

		getMenu : function() {
			$.ajax('http://192.168.1.40:1337/menu.json')
			.done(this.getMenuDone)
			.fail(this.requestFail)
			.always(this.requestAlways)
		},

		getMenuDone : function(response) {
			var len = response.menu.length;

			for (var i = 0; i < len; i++) {
				$('#menu').append('<div><button class="ui basic purple button" data-path="' + response.menu[i].path + '" >' + response.menu[i].title + '</button></div>');
			}
			app.listeners();
		},

		
		// Pour naviguer entre les articles : 
		
		listeners : function(){
			$('button').on('click', this.getArticlePath).bind(this);
		},

		getArticlePath : function() {
			var articlePath = ($(this).data('path'));
			app.getArticle(articlePath);
		},


		// Fonctions communes requêtes :

		requestFail : function() {
			alert("fail");
		},

		requestAlways : function() {
			console.log("complete");
		}

	};





	$(document).ready(function(){
		app.init();
	});

})();