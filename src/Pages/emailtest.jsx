import { useState } from 'react';

function EmailTest() {
  const [form, setForm] = useState({ email: '', message: '' });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    const config = {
      SecureToken: '2cba66fc-e24b-418e-9118-34a7b3458c3a',
      To: 'j.hokit80@gmail.com',
      From: form.email,
      Subject: 'Welcome Onboard to Hope!',
      Body: form.message,
    };
    e.preventDefault();
    if (window.Email) {
      window.Email.send(config);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <form onSubmit={onSubmitHandler} className="mt-4">
        <div className="flex flex-col justify-center items-center space-y-8">
          <input
            type="text"
            onChange={onChangeHandler}
            name="email"
            value={form.email}
            placeholder="email"
            className="input input-bordered input-info  w-[40vw] lg:w-[70vw] max-w-xs"
          />

          <input
            type="text"
            onChange={onChangeHandler}
            name="message"
            value={form.message}
            placeholder="message"
            className="input input-bordered input-info  w-[40vw] lg:w-[70vw] max-w-xs"
          />
        </div>
        <div className="flex justify-between items-center mt-2"></div>
        <div className="flex justify-center items-center mt-8">
          <button className="btn btn-info w-full text-white">Change</button>
        </div>
      </form>
    </div>
  );
}

export default EmailTest;
