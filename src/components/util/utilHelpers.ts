export const extractNextLink = (linkHeader?: string): { next: string | undefined } => {
  
  const links: { [key: string]: string } = {};
  linkHeader &&
    linkHeader.split(",").forEach((part) => {
      const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
      if (match) {
        links[match[2]] = match[1];
      }
    });
    
  return {
    next: links["next"],
  };
};
