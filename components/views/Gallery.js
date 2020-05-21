export default st => `
<section id="gallery">
${st.pictures.map(pic => `<img src="${pic.url}" alt="${pic.title}">`).join(" ")}
</section>
`;
