export default navLinks => `
<nav>
<i class="fas fa-bars"></i>
<ul class="hidden--mobile nav-links">
  ${navLinks
    .map(link => `<li><a href="/${link}" data-navigo>${link}</a></li>`)
    .join(" ")}
</ul>
</nav>`;
