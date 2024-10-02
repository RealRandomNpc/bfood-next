import { useProductsContext } from "@/providers/ProductsProvider";
import { useEffect, useState } from "react";

export default function useProductSearchTags() {
  const [selectedTagsIds, setSelectedTagsIds] = useState([]);
  const { selectedTags, setSelectedTags } = useProductsContext();

  useEffect(() => {
    setSelectedTagsIds(selectedTags.map((tag) => tag.id));
  }, [selectedTags]);

  const toggleSelectedTag = (tag) => {
    setSelectedTags((prev) => {
      const idx = prev.findIndex((selectedTag) => selectedTag.id === tag.id);
      console.log("IDX", idx, prev);
      return idx > -1
        ? prev.filter((selectedTag) => selectedTag.id !== tag.id)
        : [...prev, tag];
    });
  };

  return { selectedTagsIds, selectedTags, toggleSelectedTag };
}
