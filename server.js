const fastify = require('fastify')({ logger: true });

let students = {};

const CODE = {
	'INVALID_INPUT': 400,
	'INVALID_MARKS': 405
}

const MESSAGE = {
	'INVALID_INPUT': 'Invalid Request',
	'INVALID_MARKS': 'Invalid Marks',
    'ADDED': 'Student Added',
	'PRESENT': 'Student Record Already Present'
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

fastify.post('/add', async (request) => {
	var error = validateInput('add', request.body);
	if(error)
		throw error;
	else
		return addStudent(request.body);
});

const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start();