import React, { useEffect, useState } from 'react';
import 'assets/styles/components/expandable.scss';

export default function Expandable (props) {
    const [description, setDescription] = useState(props.description);
    const [permissions, setPermissions] = useState(props.permissions || null);
    const [wasExpanded, setWasExpanded] = useState(false);

    useEffect(() => {
        setDescription(props.description.replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/, (match) => {
            let text = match.replace(/\[|\)/g, '').replace('](', ' ').split(" ")[0];
            let link = match.replace(/\[|\)/g, '').replace('](', ' ').split(" ")[1];
            return `<a href="${link}" rel="noopener noreferrer">${text}</a>`;
        }));
        setDescription(props.description.replace(/`(.*?)`/g, (match, token) => {
            return `<b>${token}</b>`
        }));
        if(!props.permissions) return;
        props.permissions.map(permission => {
            const transformed = permission.replace(/[A-Z]/g, (match) => {
                return ` ${match}`
            });
            const lowercaseWord = transformed.split(" ")[0];
            setPermissions([]);
            setPermissions(oldPermissions => [...oldPermissions, `${lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.substr(1)} ${transformed.split(" ")[1]}`]);
        });
    }, [props.description, props.permissions]);

    useEffect(() => {
        if(props.expanded) setWasExpanded(true);
        if(!props.expanded) {
            setTimeout(() => {
                setWasExpanded(false);
            }, 1000)
        }
    }, [props.expanded])

    return (
        <div className={props.expanded ? "expandable expanded" : wasExpanded ? "expandable closing" : "expandable"}>
            <div className="expandable-text" onClick={() => props.setExpanded(props.index)}>
                <p className="expandable-text-title">{props.name}
                {props.star ?
                    <span className="expandable-text-title-star" title="This is a premium feature.">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 20" fill="none" stroke="#ffbf00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path fill="#ffbf00" d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                    </span>
                : ''}</p>
                { props.type === 'command' ? <p className="expandable-text-message" dangerouslySetInnerHTML={{ __html: description }}></p> : ''}
            </div>
            {props.type === 'command' ?
                <div className="expandable-body">
                    <section className="expandable-body-section">
                        <h5 className="expandable-body-section-title">Usage</h5>
                        <p className="expandable-body-section-content">{props.usage}</p>
                    </section>
                    <section className="expandable-body-section">
                        <h5 className="expandable-body-section-title">Required permissions</h5>
                        <p className="expandable-body-section-content">{permissions.join(", ")}</p>
                    </section>
                </div>
                    :
                <div className="expandable-body">
                    <section className="expandable-body-section">
                        <h5 className="expandable-body-section-title">Response</h5>
                        <p className="expandable-body-section-content">{description}</p>
                    </section>
                </div>
                }
        </div>
    )

}