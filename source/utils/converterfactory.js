import Showdown from "showdown";

export default function buildConverter() {
    return new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    simpleLineBreaks: true,
    requireSpaceBeforeHeadingText: true,
    disableForced4SpacesIndentedSublists: true
    });
}