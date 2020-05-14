import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from '../../axios/axios-config';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

import { createControl, validate, validateForm } from '../../form/formFramework';

import classes from './QuizCreator.module.css';

function createOptionControl(number, uuid) {
  return createControl({
    label: `Variant ${number}`,
    errorMessage: 'Variant can not be empty',
    id: number,
    uuid,
  }, {
    required: true,
  });
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter question',
      errorMessage: 'Question can not be empty',
      uuid: uuidv4(),
    }, {
      required: true,
    }),
    option1: createOptionControl(1, uuidv4()),
    option2: createOptionControl(2, uuidv4()),
    option3: createOptionControl(3, uuidv4()),
    option4: createOptionControl(4, uuidv4()),
  };
}

const defaultState = {
  formControls: createFormControls(),
  isFormValid: false,
  correctAnswerId: 1,
  quiz: [],
};
class QuizCreator extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  addQuestionHandler = (event) => {
    event.preventDefault();

    const {
      quiz,
      correctAnswerId,
      formControls: {
        question,
        ...options
      },
    } = { ...this.state };

    const newQuiz = [...quiz];
    const index = newQuiz.length + 1;

    const answers = Object.keys(options)
      .filter((v) => options[v] != null)
      .map((key) => ({ ...options[key] }))
      .map(({ value, id, uuid }) => ({ id, text: value, uuid }));


    const questionItem = {
      question: question.value,
      correctAnswerId,
      id: index,
      answers,
      uuid: uuidv4(),
    };

    newQuiz.push(questionItem);

    this.setState({
      ...defaultState,
      quiz: newQuiz,
    });
  }

  selectChangeHandler = (event) => {
    this.setState({
      correctAnswerId: parseInt(event.target.value, 0),
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
  }

  creatQuizHandler = async (event) => {
    event.preventDefault();
    const { quiz } = this.state;

    try {
      await axios.post('/quizzes.json', quiz);

      this.setState({
        ...defaultState,
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(this.state.quiz);
  }


  changeHandler(value, controlName) {
    const { formControls: formControlCopy } = { ...this.state };
    const formControls = { ...formControlCopy };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  }


  renderControls() {
    const { formControls } = this.state;
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];

      return (
        <Auxiliary key={control.uuid}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) => this.changeHandler(event.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  }

  render() {
    const { isFormValid, correctAnswerId, quiz } = this.state;
    const select = (
      <Select
        label="Please select correct answer"
        value={correctAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          {
            text: '1',
            value: 1,
          },
          {
            text: '2',
            value: 2,
          },
          {
            text: '3',
            value: 3,
          },
          {
            text: '4',
            value: 4,
          },
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div className={classes.Wrapper}>
          <h1>Create Quiz</h1>
          <form onSubmit={this.submitHandler}>

            {
              this.renderControls()
            }

            { select }

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!isFormValid}
            >
              Add Question
            </Button>
            <Button
              type="success"
              onClick={this.creatQuizHandler}
              disabled={quiz.length === 0}
            >
              Create Quiz
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
