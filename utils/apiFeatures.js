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
}

// Export the APIFeatures class
export default APIFeatures;