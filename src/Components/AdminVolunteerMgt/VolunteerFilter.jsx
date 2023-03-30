function VolunteerFilter({ language, education, handleChange }) {
  return (
    <div className="flex space-x-3">
      <div>
        <select
          name="education"
          value={education}
          onChange={handleChange}
          className="select select-secondary w-full max-w-xs "
        >
          <option value="na" defaultValue>
            Filter by Education
          </option>
          <option>Master</option>
          <option>Degree</option>
          <option>Diploma</option>
          <option>A Levels</option>
          <option>ITE</option>
          <option>O Levels</option>
          <option>N Levels</option>
          <option>Secondary</option>
        </select>
      </div>
      <div>
        <select
          name="language"
          value={language}
          onChange={handleChange}
          className="select select-primary w-full max-w-xs"
        >
          <option value="na" defaultValue>
            Filter by Language
          </option>
          <option>English</option>
          <option>Chinese</option>
          <option>Malay</option>
          <option>Hindi</option>
          <option>Cantonese</option>
          <option>Hokkien</option>
          <option>Teochew</option>
        </select>
      </div>
    </div>
  );
}

export default VolunteerFilter;
