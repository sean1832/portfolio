# Pinterest Media Downloader (pinterest-dl)

pinterest-dl is a high-performance CLI tool and Python library for scraping and downloading media (images, videos, and HLS streams) from Pinterest.

It features a dual-backend architecture:

- **API Mode (Default):** Fast scraping via the reverse-engineered Pinterest API.
- **WebDriver Mode:** Robust scraping using Selenium (Chrome/Firefox) for private boards and cookies.

> [!TIP]
> If you are looking for a GUI version of this tool, check out [pinterest-dl-gui](https://github.com/sean1832/pinterest-dl-gui).
> It provides a user-friendly interface for scraping and downloading media from Pinterest using the same underlying library. It could also serve as a reference for integrating the library into your own GUI application.

> [!WARNING]
> This project is independent and not affiliated with Pinterest. It's designed solely for educational purposes. Please be aware that automating the scraping of websites might conflict with their [Terms of Service](https://developers.pinterest.com/terms/). The repository owner disclaims any liability for misuse of this tool. Use it responsibly and at your own legal risk.

## Features

- **Concurrency:** Asynchronous downloading for high throughput.
- **Video Support:** Downloads direct video files and HLS streams (requires ffmpeg).
- **Smart Management:** Filter by resolution, embed metadata (EXIF), and cache URLs.
- **Authentication:** Cookie support for accessing private content.

## Installation

```bash
pip install pinterest-dl
```

_Requirements: Python 3.10+, ffmpeg (optional, for video streams)_

## CLI Usage

### Quick Start

```bash
# Scrape a Board
pinterest-dl scrape "https://www.pinterest.com/username/board/" -o ./downloads

# Search and Download
pinterest-dl search "cyberpunk city" -n 50 -o ./downloads

# Scrape with specific resolution and video support
pinterest-dl scrape <URL> --video -r 1080x1080
```

### Authentication (Private Content)

```bash
# 1. Login to capture cookies (opens browser)
pinterest-dl login -o cookies.json

# 2. Use cookies for scraping
pinterest-dl scrape <PRIVATE_URL> -c cookies.json
```

### Full CLI Command Reference

#### Global Options

| Flag            | Description                           |
| :-------------- | :------------------------------------ |
| `-v, --verbose` | Enable debug logging with tracebacks. |

#### Command: `login`

```bash
pinterest-dl login [options]
```

| Options                     | Description               | Default        |
| --------------------------- | ------------------------- | -------------- |
| `-o`, `--output [file]`     | Path to save cookies file | `cookies.json` |
| `--client [chrome/firefox]` | Browser client to use     | `chrome`       |
| `--headful`                 | Show browser window       | -              |
| `--incognito`               | Use incognito mode        | -              |

> [!TIP]
> After running `login`, you’ll be prompted for your Pinterest email/password. Cookies are then saved to the specified file.

#### Command: `scrape`

```bash
pinterest-dl scrape [URLS...] [OPTIONS]
```

_Download images from a Pin, Board URL, or a list of URLs._

```bash
# Single or multiple URLs:
pinterest-dl scrape <url1> <url2> …

# From one or more files (one URL per line):
pinterest-dl scrape -f urls.txt [options]
pinterest-dl scrape -f urls1.txt -f urls2.txt [options]

# From stdin:
cat urls.txt | pinterest-dl scrape -f - [options]
```

| Options                              | Description                                              | Default        |
| ------------------------------------ | -------------------------------------------------------- | -------------- |
| `-f`, `--file [file]`                | Path to file with URLs (one per line); use `-` for stdin | –              |
| `<url>`                              | One or more Pinterest URLs                               | –              |
| `-o`, `--output [directory]`         | Directory to save images (stdout if omitted)             | –              |
| `-c`, `--cookies [file]`             | Path to cookies file (for private content)               | `cookies.json` |
| `-n`, `--num [number]`               | Maximum images to download                               | `100`          |
| `-r`, `--resolution [WxH]`           | Minimum image resolution (e.g. `512x512`)                | –              |
| `--video`                            | Download video stream (if available)                     | –              |
| `--timeout [seconds]`                | Request timeout                                          | `3`            |
| `--delay [seconds]`                  | Delay between requests                                   | `0.2`          |
| `--cache [path]`                     | Save scraped URLs to JSON                                | –              |
| `--caption [txt/json/metadata/none]` | Caption format: `txt`, `json`, `metadata`, or `none`     | `none`         |
| `--ensure-cap`                       | Require alt text on every image                          | –              |
| `--client [api/chrome/firefox]`      | Scraper backend                                          | `api`          |
| `--headful`                          | Show browser window (chrome/firefox only)                | –              |
| `--incognito`                        | Use incognito mode (chrome/firefox only)                 | –              |

#### Command: `search`

```bash
pinterest-dl search [QUERIES...] [OPTIONS]
```

_Note: Search is currently only supported in API mode._

```bash
# Simple query:
pinterest-dl search <query1> <query2> ... [options]

# From one or more files:
pinterest-dl search -f queries.txt [options]
pinterest-dl search -f q1.txt -f q2.txt [options]

# From stdin:
cat queries.txt | pinterest-dl search -f - [options]
```

| Options                              | Description                                                 | Default        |
| ------------------------------------ | ----------------------------------------------------------- | -------------- |
| `-f`, `--file [file]`                | Path to file with queries (one per line); use `-` for stdin | –              |
| `<query>`                            | One or more search terms                                    | –              |
| `-o`, `--output [directory]`         | Directory to save images (stdout if omitted)                | –              |
| `-c`, `--cookies [file]`             | Path to cookies file                                        | `cookies.json` |
| `-n`, `--num [number]`               | Maximum images to download                                  | `100`          |
| `-r`, `--resolution [WxH]`           | Minimum image resolution                                    | –              |
| `--video`                            | Download video stream (if available)                        | –              |
| `--timeout [seconds]`                | Request timeout                                             | `3`            |
| `--delay [seconds]`                  | Delay between requests                                      | `0.2`          |
| `--cache [path]`                     | Save results to JSON                                        | –              |
| `--caption [txt/json/metadata/none]` | Caption format                                              | `none`         |
| `--ensure-cap`                       | Require alt text on every image                             | –              |

#### Command: `download`

```bash
pinterest-dl download [CACHE_FILE] [OPTIONS]
```

_Downloads media from a saved JSON cache file._

| Options                    | Description              | Default             |
| -------------------------- | ------------------------ | ------------------- |
| `-o`, `--output [dir]`     | Directory to save images | `./<json_filename>` |
| `-r`, `--resolution [WxH]` | Minimum image resolution | -                   |

## Python API

The `PinterestDL` class serves as the main factory for API and WebDriver backends.

### High-Level Example

```python
from pinterest_dl import PinterestDL

# Initialize and run the Pinterest image downloader with specified settings
images = PinterestDL.with_api(
    timeout=3,  # Timeout in seconds for each request (default: 3)
    verbose=False,  # Enable detailed logging for debugging (default: False)
    ensure_alt=True,  # Ensure every image has alt text (default: False)
).scrape_and_download(
    url="https://www.pinterest.com/pin/1234567",  # Pinterest URL to scrape
    output_dir="images/art",  # Directory to save downloaded images
    num=30,  # Max number of images to download
    download_streams=True,  # Download video streams if available (default: False)
    min_resolution=(512, 512),  # Minimum resolution for images (width, height) (default: None)
    cache_path="art.json",  #  Path to cache scraped data as json (default: None)
    caption="txt",  # Caption format for downloaded images: 'txt' for alt text in separate files, 'json' for full image data in seperate file, 'metadata' embeds in image files, 'none' for no captions
    delay=0.4,  # Delay between requests (default: 0.2)
)
```

### Advanced / Low-Level API Usage

#### Obtain Cookies

You can obtain cookies programmatically via the login method.

```python
import os
import json

from pinterest_dl import PinterestDL

# Make sure you don't expose your password in the code.
email = "YOUR_EMAIL@example.com"
password = os.getenv("PINTEREST_PASSWORD")

# Initialize browser and login to Pinterest
cookies = PinterestDL.with_browser(
    browser_type="chrome",
    headless=True,
).login(email, password).get_cookies(
    after_sec=7,  # Time to wait before capturing cookies. Login may take time.
)

# Save cookies to a file
with open("cookies.json", "w") as f:
    json.dump(cookies, f, indent=4)
```

> [!TIP]
> Login method is only available in WebDriver backend.

#### WebDriver Backend

Use the browser backend for stricter scraping protection.

```python
scraper = PinterestDL.with_browser(
    browser_type="chrome",
    headless=True,
    ensure_alt=True
)

# Load cookies
scraper.with_cookies_path("cookies.json")

scraper.scrape_and_download(
    url="https://www.pinterest.com/username/private-board/",
    output_dir="./private_downloads",
    num=100
)
```

#### Decoupled Scraping & Downloading

Separate the scrape phase from the download phase.

```python
# 1. Scrape metadata only
media_objects = PinterestDL.with_api().scrape(
    url="https://www.pinterest.com/search/pins/?q=architecture",
    num=20
)

# 2. Serialize data (e.g. for database)
data = [m.to_dict() for m in media_objects]

# 3. Download specific items manually
PinterestDL.download_media(media_objects, output_dir="./arch_photos")
```
