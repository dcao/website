module.exports = config => {
    config.addPassthroughCopy('css');

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
            <li>
                <table class="lowercase">
                    <tr>
                        <td class="w-20 text-gray-400 whitespace-nowrap pr-1 align-top">${time}</span> <span
                                class="${typeColor}">${typ}</span></td>
                        <td class="lowercase ${weight}">${item}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="text-sm text-gray-400">${rest}</td>
                    </tr>
                </table>
            </li>
        `
    });

    return {
        passthroughFileCopy: true
    }
};
