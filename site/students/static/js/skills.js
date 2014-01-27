$(function() {
	$('#studentVika').click(function() {
        $(this).parent().parent().find('li').removeClass('active')
        $(this).parent().addClass('active')
        toogleStudentSkillProgress('Vika')
        return false
    })
    $('#studentMarina').click(function() {
        $(this).parent().parent().find('li').removeClass('active')
        $(this).parent().addClass('active')
        toogleStudentSkillProgress('Marina')
        return false
    })
    $('#studentNatasha').click(function() {
        $(this).parent().parent().find('li').removeClass('active')
        $(this).parent().addClass('active')
        toogleStudentSkillProgress('Natasha')
        return false
    })
})

function toogleStudentSkillProgress(studentName) {
	$.ajax({
        url: "student/" + studentName + ".json",
    }).done(function(data) {
        var learnedSkills = data.skills
        $('#skills a').each(function() {
        	$(this).removeClass('alert-success')
        	$(this).addClass('alert-info')
        })
        for (ind in learnedSkills) {
            $('#'+learnedSkills[ind]).removeClass('alert-info')
            $('#'+learnedSkills[ind]).addClass('alert-success')
        }
    })
}