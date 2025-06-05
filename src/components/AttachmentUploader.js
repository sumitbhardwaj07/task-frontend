// components/AttachmentUploader.js

export default function AttachmentUploader({ onUpload, disabled }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && !disabled) {
      setTimeout(() => {
        const fakeAttachment = {
          name: file.name,
          url: `/uploads/${file.name}`,
        };
        onUpload(fakeAttachment);
      }, 1000); // simulate delay
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <label>
        Attach File:
        <input type="file" disabled={disabled} onChange={handleChange} />
      </label>
    </div>
  );
}
