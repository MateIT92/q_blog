import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface ContextState {
  isCommentsOpen: boolean;
  commentsPostId?: number;
  searchTerm: string;
  refresh: string;
  setIsCommentsOpen: Dispatch<SetStateAction<boolean>>;
  toggleCommentsVisibility: (id: number) => void;
  setCommentsPostId: Dispatch<SetStateAction<number | undefined>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  toggleSearchActive: (keyword: string) => void;
  toggleRefreshData: (status: string) => void;
  setRefresh: Dispatch<SetStateAction<string>>;
}

export const initialContextState: ContextState = {
  isCommentsOpen: false,
  commentsPostId: undefined,
  searchTerm: "",
  refresh: "",
  setCommentsPostId: () => {
    return;
  },
  setIsCommentsOpen: () => {
    return;
  },
  toggleCommentsVisibility: () => {
    return;
  },
  setSearchTerm: () => {
    return;
  },
  toggleSearchActive: () => {
    return;
  },
  toggleRefreshData: () => {
    return;
  },
  setRefresh: () => {
    return;
  },
};

export const BlogGlobalContext =
  createContext<ContextState>(initialContextState);
export const useBlogGlobalContext = () => useContext(BlogGlobalContext);

const BlogGlobalContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentsPostId, setCommentsPostId] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [refresh, setRefresh] = useState<string>("");

  const toggleCommentsVisibility = (id: number | undefined) => {
    if (isCommentsOpen && commentsPostId === id) {
      setIsCommentsOpen(false);
      setCommentsPostId(undefined);
    } else {
      setIsCommentsOpen(true);
      setCommentsPostId(id);
    }
  };

  const toggleSearchActive = (keyword: string) => {
    setSearchTerm(keyword);
  };

  const toggleRefreshData = (status: string) => {
    setRefresh(status);
  };

  return (
    <BlogGlobalContext.Provider
      value={{
        isCommentsOpen,
        toggleCommentsVisibility,
        setIsCommentsOpen,
        setCommentsPostId,
        commentsPostId,
        toggleSearchActive,
        searchTerm,
        setSearchTerm,
        toggleRefreshData,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </BlogGlobalContext.Provider>
  );
};
export default BlogGlobalContextProvider;
