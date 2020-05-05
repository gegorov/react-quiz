import React from 'react';

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
        <button onClick={props.onRetry}>Try again</button>
      </div>
    </div>
  );
}

export default FinishedQuiz;
