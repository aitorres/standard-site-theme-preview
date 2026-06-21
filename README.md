# standard-site-theme-preview

A small web application to preview [Standard.site](https://standard.site) [publication themes](https://standard.site/docs/lexicons/theme/) with live updates and JSON output.

You can edit the four `basicTheme` colors (`background`, `foreground`, `accent`,
`accentForeground`) using RGB inputs or color pickers, and watch a mock
preview card update in real time. The matching `site.standard.theme.basic` JSON
record is shown alongside.

## Usage

You'll need Kubernetes, Cloudflare CLI, a 64GB RAM machine and a modern GPU to run the app. Just kidding. It's a static site!

Copy the `index.html`, `app.js` and `styles.css` files to a folder and expose to the internet using your preferred method (Github Pages, Netlify, `nginx`, `caddy`, etc). Or open `index.html` directly in a browser.

### Docker

...but you can also use Docker to deploy the application! This makes it easy to run the app if you *do* use Kubernetes for your self-hosted needs, like I do.

```bash
# Build localy
docker build -t standard-site-theme-preview .

# Run
docker run -d -p 8000:80 --name standard-site-theme-preview standard-site-theme-preview

# Or use the Docker image published to ghcr.io directly
docker run -d -p 8000:80 --name standard-site-theme-preview ghcr.io/andresignacio/standard-site-theme-preview:latest
```

Every new commit to the `main` branch will build and publish a new Docker image to the Github Container Registry.

## Contributing

Pull requests are welcome! If you have any suggestions or find any bugs, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
