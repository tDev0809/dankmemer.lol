import React, { Suspense, useEffect, useState } from "react";
import { Route } from 'react-router-dom';
import * as axios from 'axios';

import NavBar from '../../components/navbar.jsx';
import Footer from '../../components/footer.jsx';

export default function NormalRoute({ path, exact, strict, component }) {

    const [announcementLoaded, setAnnouncementLoaded] = useState(false);
    const [announcementMarquee, setAnnouncementMarquee] = useState(false);
	const [announcementHidden, setAnnouncementHidden] = useState(true);
	const [announcementContent, setAnnouncementContent] = useState("This is awkward. There is no announcement content.");
	const [recentAnnouncementNum, setRecentAnnouncementNum] = useState("0");

    useEffect(() => {
		handleMarquee();

        (async() => {
			try {
				let req = await axios('/api/announcement');
				if(req.data.announcement) {
					setAnnouncementContent(req.data.announcement.content);
					setRecentAnnouncementNum(req.data.announcement._id);

					const announcementStorage = localStorage.getItem("announcement-hidden");
					const announcementNum = localStorage.getItem("announcement-at");
					if((!announcementStorage || announcementStorage === "no") || announcementNum !== req.data.announcement._id.toString()) setAnnouncementHidden(false);
					else if(announcementStorage === "hidden" && announcementNum === req.data.announcement._id.toString()) setAnnouncementContent(true);

					handleMarquee();
				}
			} catch {}
		})();

		// Add an event listener to the window to check if the 
		// device is small enough for mobile navbar.
		window.addEventListener("resize", (e) => {
			handleMarquee();
		});

		document.querySelectorAll("#announcement-content")[0] && document.querySelectorAll("#announcement-content > p")[0].addEventListener("resize", () => {
			handleMarquee();
		});

        setTimeout(() => {
			setAnnouncementLoaded(true);
		}, 1000)
    }, []);
    
	useEffect(() => {
		if(announcementHidden && recentAnnouncementNum !== "0") {
			localStorage.setItem("announcement-hidden", "hidden")
			localStorage.setItem("announcement-at", recentAnnouncementNum.toString())
		} else if (!announcementHidden && recentAnnouncementNum !== "0") {
			localStorage.setItem("announcement-hidden", "no");
		}
	}, [announcementHidden]);

	const handleMarquee = () => {
		let announcementContent = document.getElementById("announcement-content");
		if(!announcementContent) return;
		if(announcementContent.offsetWidth < announcementContent.scrollWidth) setAnnouncementMarquee(true);
		else if(announcementContent.offsetWidth > announcementContent.scrollWidth) setAnnouncementMarquee(false);
	}

    return (
        <Route
            exact={exact}
            strict={strict} 
            path={path} 
            component={() =>
                <Suspense fallback={<div></div>}>
                    <NavBar announcement={{
                        num: recentAnnouncementNum,
                        loaded: announcementLoaded,
                        marquee: announcementMarquee,
                        hidden: announcementHidden,
                        content: announcementContent,
                        hide: (value) => {
                            setAnnouncementHidden(value);
                        }
                    }}/>
                    {component}
                    <Footer />
                </Suspense>}
        />
    )
}
