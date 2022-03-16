//models
const {Task} = require('../../models/task.model.js')

const task = [
	{ id: 1, title: 'Post 1', content: 'Some content', author: 'Max' },
	{ id: 2, title: 'Post 2', content: 'Some content 2', author: 'John' },
	{ id: 3, title: 'Post 3', content: 'Some content 3', author: 'Jill' },
	{ id: 4, title: 'Superlongt', content: 'Some content 3', author: 'Jill' },
];

// Utils
const { filterObj } = require('../../util/filterObj');

// export const getAllTasks
exports.getAllTasks = async (req, res) => {

	const taskDB = await Task.findAll({ where: { status: 'active' } });

	res.status(200).json({
		status: 'success',
		data: {
			taskDB,
		},
	});
};

// Save task to database
exports.createTask = async (req, res) => {
	try {

	const { content } = req.body; 

	const newTask = await Task.create({
		content: content
	  });

	res.status(201).json({
		status: 'success',
		data: { newTask },
	});
	}
	catch (error) {
		console.log(error);
	  }

};

// Update task (put)

exports.updateTaskPut = async (req, res) => {
	try {
	  const { id } = req.params;
	  const { content } = req.body;
  
	  // Validate the data has some value
	  if ( !content || content.length === 0 ) {
		res.status(400).json({
		  status: 'error',
		  message: 'Must provide a content'
		});
		return;
	  }
  
	  const task = await Task.findOne({
		where: { id: id, status: 'active' }
	  });
  
	  if (!task) {
		res.status(404).json({
		  status: 'error',
		  message: 'Cant update post, invalid ID'
		});
		return;
	  }
  
	  await task.update({
		content: content,
	  });

	  res.status(201).json({
		status: 'success',
	});

	} catch (error) {
	  console.log(error);
	}
  };


// Delete task

exports.deleteTask = async (req, res) => {
	
	try {
	  const { id } = req.params;
  
	  const task = await Task.findOne({
		where: { id: id, status: 'active' }
	  });
  
	  if (!task) {
		res.status(404).json({
		  status: 'error',
		  message: 'Cant delete post, invalid ID'
		});
		return;
	  }
  
	  // Soft delete
	  await task.update({ status: 'deleted' });
  
	  res.status(201).json({
		status: 'success',
	});

	} catch (error) {
	  console.log(error);
	}
  };
  



