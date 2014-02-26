$(function() {
	$('#studentVika').click(function() {
        $(this).parent().parent().find('li').removeClass('active')
        $(this).parent().addClass('active')
        toogleStudentQuestionsProgress('Vika')
        return false
    })
    $('#studentMarina').click(function() {
        $(this).parent().parent().find('li').removeClass('active')
        $(this).parent().addClass('active')
        toogleStudentQuestionsProgress('Marina')
        return false
    })
    $('#studentNatasha').click(function() {
        $(this).parent().parent().find('li').removeClass('active')
        $(this).parent().addClass('active')
        toogleStudentQuestionsProgress('Natasha')
        return false
    })
})

function toogleStudentQuestionsProgress(studentName) {
	$.ajax({
        url: "student/" + studentName + ".json",
        beforeSend: function() {
            $('#progress_bar').show()
        }
    }).done(function(data) {
    	$('#progress_bar').hide()
        $('#questions_container > div > ul > li').each(function() {
        	$(this).removeClass('alert-success')
        	$(this).addClass('alert-info')
        })
        $('#questions_container > div > h2').css('text-decoration','none')
        var answeredQuestions = data.questions
        console.log(answeredQuestions)
        for (ind in answeredQuestions) {
            $('#'+answeredQuestions[ind]).removeClass('alert-info')
            $('#'+answeredQuestions[ind]).addClass('alert-success')
        }
        $('#questions_container > div').each(function() {
            var answeredAllQuestionsInMilestone = true
            $(this).find('ul > li').each(function() {
                if ($(this).hasClass('alert-success').toString() == "false") {
                    answeredAllQuestionsInMilestone = false
                }
            })
            if (answeredAllQuestionsInMilestone) {
                $(this).find('h2').css('text-decoration','line-through')
            }
        })
    })
}