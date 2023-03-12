class APIFeatures {
    constructor(query, queryStr) {
        // Initialize the query and queryStr properties
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        // Search for a location in the query string using regex
        const location = this.queryStr.location ? {
            address: {
                $regex: this.queryStr.location,
                $options: 'i'
            }
        } : {};

        // Find all the documents that match the location
        this.query = this.query.find({ ...location });

        // Return this object so that other methods can be chained
        return this;
    }

    // Filter method to perform advanced filtering with gt, gte, etc.
    filter() {
        const { queryStr } = this; // Destructure the query string from the APIFeatures object
        const filterFields = ['category']; // Specify the fields that can be filtered
        const filterQuery = {}; // Initialize an empty object to store the filter query

        // Loop through each key-value pair in the query string
        Object.entries(queryStr).forEach(([key, value]) => {
            // Check if the key is one of the allowed filter fields
            if (filterFields.includes(key)) {
                // If so, add the filter query to the object
                filterQuery[key] = value;
            }
        });

        // Apply the filter query to the MongoDB query
        this.query = this.query.find(filterQuery);
        return this;
    }


    pagination(resPerPage) {
        // Get the current page number from the query string or default to 1
        const currentPage = Number(this.queryStr.page) || 1;

        // Calculate the number of results to skip based on the page number and results per page
        const skip = resPerPage * (currentPage - 1);

        // Limit the number of results to the requested number of results per page and skip the calculated number of results
        this.query = this.query.limit(resPerPage).skip(skip);

        // Return the updated query
        return this;
    }



}

// Export the APIFeatures class
export default APIFeatures;