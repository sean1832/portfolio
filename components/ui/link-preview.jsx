import { JSDOM } from "jsdom";

// Reference:
// https://www.creowis.com/blog/how-to-create-a-link-previewer-with-nextjs

// Function to fetch Open Graph details for a given URL
const extractMetaTags = async (url) => {
  try {
    // Fetch the content of the URL
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML using JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract meta tags from the document
    const metaTags = Array.from(document.querySelectorAll("meta")).reduce((tags, meta) => {
      // Get the name, property, or itemprop attribute of the meta tag
      const name =
        meta.getAttribute("name") || meta.getAttribute("property") || meta.getAttribute("itemprop");

      // Get the content attribute of the meta tag
      const content = meta.getAttribute("content");

      // If both name and content exist, add them to the tags object
      if (name && content) {
        tags[name] = content;
      }

      return tags;
    }, {});

    // Return an object containing title, description, and image
    return {
      title: document.title || metaTags["og:title"] || metaTags["twitter:title"],
      description:
        metaTags.description || metaTags["og:description"] || metaTags["twitter:description"],
      image: metaTags.image || metaTags["og:image"] || metaTags["twitter:image"],
    };
  } catch (error) {
    // Handle errors if fetching or parsing fails
    console.error("Error fetching Open Graph details", error);
  }
};

async function LinkPreview({ url }) {
  //here calling the function
  const data = await extractMetaTags(url);

  if (!data) {
    return <div>Failed to fetch link preview.</div>;
  }
  return (
    <div className="p-1 hover:shadow-lg transition-shadow duration-200 flex">
      {data.image ? (
        <div className="w-1/2 max-h-72">
          <img src={data.image} alt="favicon" className="object-cover h-full w-full object-left" />
        </div>
      ) : null}
      <div
        className={`p-4 flex flex-col justify-center ${
          data.image ? "w-1/2" : "w-full items-center text-center"
        }`}
      >
        <div className="text-lg font-semibold">{data.title}</div>
        <div className="text-gray-600">{data.description}</div>
      </div>
    </div>
  );
}

export default LinkPreview;
