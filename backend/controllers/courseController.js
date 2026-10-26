// backend/controllers/courseController.js
const Course = require('../models/Course');

const createCourse = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const course = new Course({ title, description, category, instructor: req.user._id });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate('instructor', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addLesson = async (req, res) => {
  try {
    const { title, content, videoUrl, order, quiz } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this course' });
    }

    const lesson = { title, content, videoUrl, order, quiz };
    course.lessons.push(lesson);

    await course.save();
    res.status(201).json({ message: 'Lesson added successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this course' });
    }

    course.lessons = course.lessons.filter((lesson) => lesson._id.toString() !== req.params.lessonId);
    await course.save();
    res.json({ message: 'Lesson removed successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCourse, getCourses, getCourseById, addLesson, deleteLesson };