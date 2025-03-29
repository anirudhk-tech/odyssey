import { convertFromHTML } from "draft-convert";
import { ContentState } from "draft-js";

export const convertPasted = (html: string) => {
  const options = {
    htmlToStyle: (
      nodeName: string,
      node: HTMLElement,
      currentStyle: any
    ): any => {
      if (nodeName.toLowerCase() === "b") {
        const styleAttr: string = node.getAttribute("style") || "";
        if (styleAttr.includes("font-weight:normal")) {
          return currentStyle;
        }
        // Otherwise, add the BOLD style.
        return currentStyle.add("BOLD");
      }
      return currentStyle;
    },
  };

  const preProcessHTML = (html: string): string => {
    let processedHTML = html
      // Remove <head> tags
      .replace(/<head[\s\S]*?<\/head>/gi, "")
      // Remove StartFragment/EndFragment comments
      .replace(/<!--StartFragment-->/gi, "")
      .replace(/<!--EndFragment-->/gi, "")
      // Remove <html> and <body> wrappers
      .replace(/<html[^>]*>/gi, "")
      .replace(/<\/html>/gi, "")
      .replace(/<body[^>]*>/gi, "")
      .replace(/<\/body>/gi, "");

    // Remove any <b> tags with font-weight:normal anywhere in the string, commonly from exteneral sources
    processedHTML = processedHTML.replace(
      /<b[^>]*style=["']?font-weight:\s*normal;?["']?[^>]*>/gi,
      ""
    );
    processedHTML = processedHTML.replace(/<\/b>/gi, "");

    // Replace groups of &nbsp; with a tab placeholder
    processedHTML = processedHTML.replace(
      /(&nbsp;){4}/g,
      '<span class="tab-placeholder">[TAB]</span>'
    );

    // Replace Apple-tab-span elements with the tab placeholder
    processedHTML = processedHTML.replace(
      /<span[^>]*class="Apple-tab-span"[^>]*>\s*<\/span>/gi,
      '<span class="tab-placeholder">[TAB]</span>'
    );

    // For paragraphs with text-indent style, prepend a tab placeholder
    processedHTML = processedHTML.replace(
      /<p([^>]*?)style="([^"]*?text-indent:\s*\d+pt[^"]*?)"([^>]*?)>/gi,
      (match, preAttrs, styleContent, postAttrs) => {
        return `<p${preAttrs}style="${styleContent}"${postAttrs}><span class="tab-placeholder">[TAB]</span>`;
      }
    );

    // For tab counts
    processedHTML = processedHTML.replace(
      /<span[^>]*mso-tab-count[^>]*>[ \t\r\n\u00A0]+<\/span>/gi,
      '<span class="tab-placeholder">[TAB]</span>'
    );

    return processedHTML;
  };

  const processContentState = (contentState: ContentState): ContentState => {
    const newBlockMap = contentState.getBlockMap().map((block) => {
      const newText = block?.getText().replace(/\[TAB\]/g, "\t");
      return block?.merge({ text: newText });
    });
    return contentState.merge({
      blockMap: newBlockMap,
    }) as ContentState;
  };

  const cleanedHTML = html
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<body[^>]*>/gi, "")
    .replace(/<\/body>/gi, "");

  const preProcessedHTML = preProcessHTML(cleanedHTML);
  const contentState: ContentState = convertFromHTML(options)(preProcessedHTML);

  return processContentState(contentState);
};
