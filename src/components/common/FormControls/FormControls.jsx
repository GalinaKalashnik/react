import React from 'react';
import s from './FormControls.module.css';
import {Field} from "redux-form";
import {required} from "../../../utils/validators/validators";

//с помощью деструктуриззации зкщзы разбиваем на input, meta, ...props
// {input, meta, ...props} - рест  оператор, таким образом из props мы исключаем input, meta и в props будут
// содержать все кроме  все кроме input, meta
export const Textarea = ({input, meta, ...props}) => {
    {/*и тут мы уже отдельно получаем все что в meta */}
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + ( hasError ? s.error : "") }>
            <div>
                  {/*и тут мы уже отдельно получаем все что в input и все что в props */}
                <textarea {...input} {...props} />
            </div>
            { hasError && <span>{meta.error}</span> }
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + ( hasError ? s.error : "") }>
            <div>
                <input {...input} {...props} />
            </div>
            { hasError && <span>{meta.error}</span> }
        </div>
    )
}

export const createField = (placeholder, name, validators, component, props={}, text=" ") => (
    <div>
        <Field placeholder={placeholder} name={name} component={component} validate={validators} {...props} />{text}
    </div>
)