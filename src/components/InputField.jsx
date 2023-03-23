export default function InputField({ label, type, id, value, onChange }) {

    return (
        <div className="edit__form__user__infos">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={id} value={value} onChange={onChange} />
        </div>
    );
}