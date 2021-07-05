const fastify = require('fastify')({ logger: true });

let students = {};

const CODE = {
	'INVALID_INPUT': 400,
	'INVALID_MARKS': 405,
    'NOT_FOUND': 404
}

const MESSAGE = {
	'INVALID_INPUT': 'Invalid Request',
	'INVALID_MARKS': 'Invalid Marks',
    'ADDED': 'Student Added',
	'PRESENT': 'Student Record Already Present',
    'UPDATED': 'Student Updated',
    'NOT_FOUND': 'Student Record Not Found',
    'DELETED': 'Student Deleted'
}

const formErrorObject = (type) => {
	let errorObject = new Error()
	errorObject.statusCode = CODE[type];
	errorObject.message = MESSAGE[type];
	return errorObject;
}

const formResponseObject = (id, type) => {
	let responseObject = {}
	responseObject.studentID = id;
	responseObject.message = MESSAGE[type];
	responseObject.statusCode = CODE[type] ? CODE[type] : 200;
	return responseObject;
}

const validateInput = (type, request) => {
	switch(type){
		case 'add':
			if(!request.studentID || !request.studentName)
				return formErrorObject('INVALID_INPUT');
			else if(!request.subject1 || !request.subject2 || !request.subject3 || !request.subject4 || !request.subject5)
				return formErrorObject('INVALID_MARKS');
        case 'update':
            if(!request.studentID)
                return formErrorObject('INVALID_INPUT');
        case 'delete':
            if(!request.studentID)
                return formErrorObject('INVALID_INPUT');
	}
}

const addStudent = (student) => {
	let response = {};
	if(!students[student.studentID]){
		students[student.studentID] = student;
		response = formResponseObject(student.studentID, 'ADDED');
	} else {
		response = formResponseObject(student.studentID, 'PRESENT');
	}
	return response;
}

const updateStudent = (student) => {
	let response = {};
	if(students[student.studentID]){
		students[student.studentID].subject1 = student.subject1 ? student.subject1 : students[student.studentID].subject1;
		students[student.studentID].subject2 = student.subject2 ? student.subject2 : students[student.studentID].subject2;
		students[student.studentID].subject3 = student.subject3 ? student.subject3 : students[student.studentID].subject3;
		students[student.studentID].subject4 = student.subject4 ? student.subject4 : students[student.studentID].subject4;
		students[student.studentID].subject5 = student.subject5 ? student.subject5 : students[student.studentID].subject5;
		response = formResponseObject(student.studentID, 'UPDATED');
	} else {
		response = formResponseObject(student.studentID, 'NOT_FOUND');
	}
	return response;
}

const deleteStudent = (student) => {
	let response = {};
	if(students[student.studentID]){
		delete students[student.studentID];
		response = formResponseObject(student.studentID, 'DELETED');
	} else {
		response = formResponseObject(student.studentID, 'NOT_FOUND');
	}
	return response;
}

fastify.post('/add', async (request) => {
	var error = validateInput('add', request.body);
	if(error)
		throw error;
	else
		return addStudent(request.body);
});

fastify.post('/update', async (request) => {
     var error = validateInput('update', request.body);
     if(error)
         throw error;
     else
         return updateStudent(request.body);
 });

 fastify.delete('/delete', async (request) => {
	var error = validateInput('delete', request.body);
	if(error)
		throw error;
	else
		return deleteStudent(request.body);
});

fastify.get('/report', async () => {
    return students;
 })

const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start();