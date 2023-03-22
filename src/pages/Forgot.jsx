export default function Forgot() {
  // const handleSubmit = async (e) => {
  //   e.prevaultDefault();

  return (
    <>
      <div className="account__title">
        <h1>Mot de passe oublié</h1>
      </div>
     
      <div className="account__body__forms">
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" name="" id="email" />
        
          <button type="submit">Envoyer </button>
        </form>
      </div>
    </>
  );
}
