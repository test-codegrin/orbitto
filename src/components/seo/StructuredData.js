const StructuredData = ({ data, id }) => {
  if (!data) {
    return null;
  }

  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

export default StructuredData;
