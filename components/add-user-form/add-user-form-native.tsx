import { addUser } from "./add-user-action";
import countries from '@//lib/world-countries-json/countries.json';

export default function AddUserForm() {
  return (
    <form>

      <fieldset className="w-[min(32rem,100%)] mx-auto border border-gray-300 rounded-xl p-4 grid md:grid-cols-2 gap-x-3">
        <legend className="text-xl font-bold px-2">Add user</legend>

        <div className="flex flex-col col-span-2">
          <label htmlFor="fullname" className="mb-1.5">Full Name:</label>
          <input type="text" name="fullname" id="fullname" className="p-2 rounded-lg border border-gray-300 mb-1" />
          <div className="text-red-500 invisible">error</div>
        </div>

        <div className="flex flex-col col-span-2 md:col-span-1">
          <label htmlFor="age" className="mb-1.5">Age:</label>
          <input type="number" name="age" id="age" className="p-2 rounded-lg border border-gray-300 mb-1" />
          <div className="text-red-500 invisible">error</div>
        </div>

        <div className="flex flex-col col-span-2 md:col-span-1">
          <label htmlFor="country" className="mb-1.5">Country:</label>
          <select name="country" id="country" className="p-2.5 rounded-lg border border-gray-300 mb-1">
            <option value="">-- Please Select --</option>
            {countries.map(country => (
              <option key={country.isoAlpha3} value={country.isoAlpha3}>{country.name}</option>
            ))}
          </select>
          <div className="text-red-500 invisible">error</div>
        </div>

        <fieldset className="border border-gray-300 rounded-xl px-4 pt-4 pb-2 col-span-2">
          <legend className="px-2">Interests:</legend>

          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="flex gap-2">
              <input type="checkbox" name="interests" id="coding" value="coding" className="p-2 rounded-lg border border-gray-300 mb-1" />
              <label htmlFor="coding" className="mb-1.5">Coding</label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" name="interests" id="music" value="music" className="p-2 rounded-lg border border-gray-300 mb-1" />
              <label htmlFor="music" className="mb-1.5">Music</label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" name="interests" id="reading" value="reading" className="p-2 rounded-lg border border-gray-300 mb-1" />
              <label htmlFor="reading" className="mb-1.5">Reading</label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" name="interests" id="sports" value="sports" className="p-2 rounded-lg border border-gray-300 mb-1" />
              <label htmlFor="sports" className="mb-1.5">Sports</label>
            </div>
          </div>
          <div className="text-red-500 invisible">error</div>
        </fieldset>

        <button type="submit" className="bg-cyan-700 text-white p-2 rounded-lg col-span-2 md:col-span-1 md:col-start-2 mt-4">Add</button>

      </fieldset>

    </form>
  );
}