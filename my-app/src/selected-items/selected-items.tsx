import "./selected-items.css"; 
import SearchResultType from "../search-box/search-result-type";

interface SelectedItemsProps {
  items: SearchResultType[];
  deleteFromAdded: (item: SearchResultType) => void;
  ratings: { [key: number]: number };
  onRatingsChange: (id: number, rating: number) => void;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({
  items,
  deleteFromAdded,
  ratings,
  onRatingsChange,
}) => {

  const handleRating = (id: number, rating: number) => {
    onRatingsChange(id, rating);
  };

  return (
    items &&
    items.length > 0 && (
      <div className="flex flex-row gap-3 selected-items-container justify-center">
        {items.map((item) => (
          <div className="selected-item">
            <div key={item.id} className="flex p-3">
              <div className="flex-row">
                <div className="flex flex-col items-center">
                  <img
                    height={226}
                    src={item.image}
                    alt={item.name}
                    className="rounded-lg w-80 h-56"
                  />
                  <div className="flex flex-col space-y-2 mt-2">
                    <h3 className="text-lg font-bold text-black">
                      {item.name} ({item.year})
                    </h3>
                    <p className="text-sm text-black">{item.description}</p>
                   
                  </div>
                </div>

                <div>
                  <div style={{visibility: items.length == 3 ? 'visible' : 'hidden'}} className="star-container flex ml-auto flex-row justify-center mb-4 mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => handleRating(item.id, star)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={
                          star <= (ratings[item.id] || 0) ? "yellow" : "none"
                        }
                        viewBox="0 0 24 24"
                        stroke="gray"
                        className={`drop-shadow-sm w-7 h-7 cursor-pointer star ${
                          star <= (ratings[item.id] || 0) ? "active" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="0.2"
                          d="M12 17.27l-5.18 3.73L7.82 14.74 3 10.91l6.91-1L12 2l2.09 7.91L21 10.91l-4.82 3.83 1 6.26L12 17.27z"
                        />
                      </svg>
                    ))}
                  </div>
                  <div className="mt-2">
                    <button className="deleteFromListButton" onClick={() => deleteFromAdded(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default SelectedItems;
