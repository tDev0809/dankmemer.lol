import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { Link } from 'react-router-dom';

function Home(props) {
    const [feedbackCategories, setFeedbackCategories] = useState(null)
    
    axios(`/api/feedback/categoriesCount`).then((data) => {
        setFeedbackCategories(data.data)
    })

    // TODO: (Blue) style this page
    return <div style={{width: "70vw", margin: "0 auto"}}>
        <div>Categories</div>
        
        <div style={{display: "flex", justifyContent: "space-between"}}>
            {feedbackCategories && Object.entries(feedbackCategories).map(([category, posts]) => 
                <Link to={`/feedback/${category.toLowerCase()}`} key={category}>
                    <div>
                        {category}
                    </div>
                    <div>
                        {`${posts} post${posts === 1 ? "": "s"}`}        
                    </div>
                </Link>
            )}
        </div>
    </div>
}

export default connect(store => store.login)(Home);