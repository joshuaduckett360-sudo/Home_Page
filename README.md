# Josh's Home Page

A lightweight personal browser landing page hosted with GitHub Pages.

## Editing links

For normal changes, edit only:

```
config.js
```

Each link is a small block:

```js
{
  name: "Example",
  url: "https://example.com/",
  note: "Optional description",
  icon: "EX",
  favourite: true,
}
```

- Move a block to reorder a link.
- Move it between sections to change category.
- Set `favourite: true` to add it to Quick Access.
- Copy an existing section block to create another category.
- `style.css` controls the appearance.
- `app.js` controls search, filtering and light/dark mode.

## GitHub Pages

In this repository, open:

**Settings → Pages**

Then set:

- **Source:** Deploy from a branch
- **Branch:** main
- **Folder:** /(root)

Save the settings.

The site will then be available at:

```
https://joshuaduckett360-sudo.github.io/Home_Page/
```

## Security

This repository is public. Keep it limited to links and display configuration.
Do not add passwords, tokens, API keys, account numbers or other secrets.
