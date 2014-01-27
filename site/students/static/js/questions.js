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
        $('#questions li').each(function() {
        	$(this).removeClass('alert-success')
        	$(this).addClass('alert-info')
        })
        var answeredQuestions = data.questions
        console.log(answeredQuestions)
        for (ind in answeredQuestions) {
            $('#'+answeredQuestions[ind]).removeClass('alert-info')
            $('#'+answeredQuestions[ind]).addClass('alert-success')
        }
    })
}