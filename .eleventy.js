module.exports = config => {
    config.addPassthroughCopy('css');
    config.addPassthroughCopy('img');

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

    return {
        passthroughFileCopy: true
    }
};
