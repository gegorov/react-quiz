import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';

import classes from './FinishedQuiz.module.css';

const FinishedQuiz = (props) => {
  const { quiz, results } = props;

  const successCount = Object
                        .keys(results)
                        .reduce((acc, key) => results[key] === 'success' ? acc + 1 : acc , 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul className={classes.List}>
        {
          quiz.map((quizItem, index) => {

            const cls = [
              'fa',
              classes.Icon,
              results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
              classes[results[quizItem.id]],
            ];

            
            return(
              <li 
                key={index}
              >
                <strong>{index + 1}.{' '}</strong>
                {quizItem.question}
                <i className={cls.join(' ')} />
              </li>
            )
          })
        }
      </ul>
      <p> {successCount} of {quiz.length} correct answers</p>
      <div>
        <Button onClick={props.onRetry} type="primary">Try again</Button>
        <Link to={'/'}>
          <Button type="success">See other quizzes</Button>
        </Link>
      </div>
    </div>
  );
}

export default FinishedQuiz;
