import { DateTime } from "luxon";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function(config) {
    // All of the files for the website will be in the `website/` folder.
    config.setInputDirectory("website");

    config.addPassthroughCopy('website/css');
    config.addPassthroughCopy('website/img');
    config.addPassthroughCopy('website/static');

    // Replace my em-dashes please
    config.amendLibrary("md", (mdLib) => mdLib.set({ typographer: true }));

    config.addFilter("readableDate", (dateObj, format, zone) => {
        // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
        return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "LLL dd, yyyy");
    });

    config.addFilter("utcDate", function(date) {
        return date.toISOString().slice(0, 10)
    });

    config.addPairedShortcode("homeItem", function(rest, time, typ, item) {
        let typeColor;
        switch (typ) {
            case "position":
                typeColor = "text-lime-400";
                break;
            case "paper":
            case "src":
                typeColor = "text-purple-400";
                break;
            case "project":
                typeColor = "text-teal-400";
                break;
            case "award":
                typeColor = "text-amber-400";
                break;
            default:
                typeColor = "text-gray-400";
        }

        let weight = typ === "paper" || typ === "src" ? "font-bold" : "";

        return `
            <div class="lowercase flex flex-col sm:flex-row mb-3 sm:mb-0">
                <p class="text-gray-400 whitespace-nowrap pr-1 align-top">${time} <span class="${typeColor}">${typ}</span></p>
                <div>
                    <p class="${weight}">${item}</p>
                    <div class="text-sm text-gray-400">${rest}</div>
                </div>
            </div>
        `
    });

    config.setFrontMatterParsingOptions({
        description: true,
        category: true,
        end: true,
    });

    config.addPlugin(eleventyImageTransformPlugin, {
        // which file extensions to process
        // extensions: "html,md,njk",
        extensions: "html,liquid,njk,md",

        // Add any other Image utility options here:

        // optional, output image formats
        // formats: ["webp", "jpeg"],
        // formats: ["auto"],

        // optional, output image widths
        widths: ["auto"],

        // optional, attributes assigned on <img> override these values.
        defaultAttributes: {
            loading: "lazy",
            decoding: "async"
        }
    });

    return {
        passthroughFileCopy: true
    }
}
