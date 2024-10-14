import SearchResultType from "./search-result-type";

interface SearchResultProps {
  result: SearchResultType;
  onAdded: (result: SearchResultType) => void; 
}

const SearchResult: React.FC<SearchResultProps> = ({ result, onAdded }) => {
  return (
    <div
      key={result.id}
      className="result-item p-6 border-b flex justify-between"
    >
      <div className="name-desc flex ">
        <img
          src={result.image}
          style={{ height: 100, width: 150, borderRadius: 10 }}
        ></img>
        <div className="text-left p-2">
          <h3 className="ml-3 p-0 text-lg font-bold text-black">{result.name}</h3>
          <p className="ml-3 p-0 text-black text-sm content-center">
            {result.description}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button className="selectButton" onClick={() => onAdded(result)}>
          Select
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
