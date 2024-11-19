import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Controller } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css'; // import styles

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  const [content, setContent] = useState("");
  const charLimit = 400;

  const handleChange = (value, onChange) => {
    // console.log('value', value)
    if (value.length <= charLimit) {
      setContent(value); // Update content if within character limit
      onChange(value);    // Update the form value
    } else {
      // Optionally, show an alert or feedback if needed
      const truncatedValue = value.substring(0, charLimit);
      setContent(truncatedValue); // Set truncated content
      onChange(truncatedValue);    // Update form value with truncated content
    }
  };

  return (
    <div className="w-full mb-4">
      {label && <label className="inline-block mb-2 font-semibold">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            value={value }
            onChange={(value) => handleChange(value, onChange)}
            theme="snow"
            modules={{
              toolbar: [
                [{ header: '1' }, { header: '2' }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                ['code-block'],
                ['clean'],
              ],
            }}
            formats={[
              'header', 'list', 'bullet', 'bold', 'italic', 'underline',
              'strike', 'color', 'background', 'code-block',
            ]}
            className="h-[40vh] overflow-y-auto bg-white rounded-md shadow-sm border border-gray-300 dark:text-black"
          />
        )}
      />
      <div className="text-right mt-2 text-gray-600 dark:text-slate-300">
        {content.length} / {charLimit} characters used
      </div>
      <div className="text-right text-sm mt-1 text-red-600">
        Note: The character count includes HTML tags, spaces, and markup.
      </div>
      {content.length > charLimit && (
        <div className="text-right text-xs mt-2 text-red-600">
          *You have exceeded the character limit. Extra characters have been cut off.
        </div>
      )}
    </div>
  );
}
