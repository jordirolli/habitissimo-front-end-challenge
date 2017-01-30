/* Third party libraries */
import $ from 'jquery';
require ("jquery-validation")($);

/* Custom implementation */
import Storage from './browser/storage';
import MultiStepForm from './domain/form';
import MultiStepFormController from './controller/form.controller';

/*
Auxiliar map with the cubcategory options to display per main category.
It is declared on the global scope as it is populated async and then consumed by
select#category change event.
*/
var subcategory_options = new Map();

$(document).ready(function(){

    /* Initialise the form controller */
    var formController = new MultiStepFormController(new MultiStepForm("#multi-step-form"));
    formController.init();

    /* Retrieve the categories */
    $.getJSON("../data/json/categories.json", function(json) {
        $.each( json, function(key, category) {
            $("select#category").append($('<option>', {value: category["slug"], text: category["name"].charAt(0).toUpperCase() + category["name"].slice(1)}));
            var subcategory_option = [];
            $.each(category["children"], function(key, subcategory) {
                subcategory_option.push($('<option>', {value: subcategory["slug"], text: subcategory["name"].charAt(0).toUpperCase() + subcategory["name"].slice(1)}));
            });
            subcategory_options.set(category["slug"], subcategory_option);
        });
        /* Initialise the values in case they where set on a previous session. */
        if (Storage.retrieve("category")) {
            $("#category").val(Storage.retrieve("category"));
            formController.setSubCategoryOptions(subcategory_options.get(Storage.retrieve("category")));
            $("#subcategory").val(Storage.retrieve("subcategory"));
        }
    });

    $("#previous").click(function(){
        formController.previous();
    });

    $("#next").click(function(){
        var form = $("#multi-step-form");
        form.validate({
            errorElement: 'span',
            errorClass: 'help-block',
            highlight: function(element, errorClass, validClass) {
                $(element).closest('.form-group').addClass("has-error");
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).closest('.form-group').removeClass("has-error");
            },
            rules: {
                description: {
                    required: true,
                },
                category: {
                    required: true,
                },
                subcategory: {
                    required: true,
                },
                name: {
                    required: true,
                },
                email: {
                    required: true,
                    remote: {
                      type: 'post',
                      url: '../src/php/landing/validation/mail-validation.php',
                      dataType: 'json'
                    }
                },
                phone: {
                    required: true,
                }
            },
            messages: {
                description: {
                    required: "Por favor, introduce una descripción.",
                },
                category: {
                    required: "Por favor, introduce una categoría.",
                },
                subcategory: {
                    required: "Debe detallar la subcategoria.",
                },
                name: {
                    required: "Debe introducir su nombre."
                },
                email: {
                    required: "Debe introducir su e-mail.",
                    remote: "Formato de mail incorrecto."
                },
                phone: {
                    required: "Debe introducir su teléfono."
                }
            }
        });
        if (form.valid() === true){
            formController.next();
        }
    });

    $("select#category").on('change', function (e) {
        formController.setSubCategoryOptions(subcategory_options.get(this.value));
    });
});