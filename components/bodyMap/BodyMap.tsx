import { useCallback, useMemo, useState } from "react";
import { getBodyPart } from "./bodyParts";
import style from "./BodyMap.module.css";

const BodyContainer = ({ children }) => (
    <div style={{
        width: "207px",
        height: "500px",
        margin: "30px auto"
    }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 375.42 832.97"
        >
            <g>
                {children}
            </g>
        </svg>
    </div>
);

interface BodyPartProps {
    id: number;
    d: string;
    fill: string;
    onClick: (id: number) => void;
    onMouseEnter: (id: number) => void;
    onMouseLeave: () => void;
    isSelected: boolean;
}

const BodyPart = ({ id, d, fill, onClick, onMouseEnter, onMouseLeave, isSelected }: BodyPartProps) => {
    const handleClick = () => {
        onClick(id)
    }

    const handleMouseEnter = () => {
        onMouseEnter(id)
    }

    const handleMouseLeave = () => {
        onMouseLeave(id)
    }

    return (
        <path
            d={d}
            id={id}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                WebkitTapHighlightColor: "transparent",
                cursor: "pointer",
                fill
            }}
        />
    )
}


export const BodyMap = () => {
    const [lang, setLang] = useState("en");
    const [selectedParts, setSelectedParts] = useState<number[]>([]); // State for selected body parts
    const [hovered, setHovered] = useState<number | null>(null);

    const antBodyParts = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "ant");
    }, [lang]);

    const postBodyParts = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "post");
    }, [lang]);

    const handleClick = (id: number) => {
        setSelectedParts(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(partId => partId !== id); // Deselect if already selected
            } else {
                return [...prevSelected, id]; // Select if not already selected
            }
        });
    };

    const handleMouseEnter = (id: number) => {
        if ("ontouchstart" in window) return;
        setHovered(id);
    };

    const handleMouseLeave = () => {
        if ("ontouchstart" in window) return;
        setHovered(null);
    };

    const getFill = useCallback((bodyPartId: number) => {
        if (selectedParts.includes(bodyPartId)) {
            return "#054145"; // Fill color for selected parts
        } else if (hovered === bodyPartId) {
            return "#E0fefe"; // Fill color for hovered parts
        }
        return "#A5D8CC"; // Default fill color
    }, [selectedParts, hovered]);

    return (
        <>
            <div className={style.header}>
                {selectedParts.length > 0 ? (
                    <p>Selected Body Parts: {selectedParts.map(id => getBodyPart(lang).find(part => part.id === id)?.name).join(", ")}</p>
                ) : (
                    <p>Click on the body!</p>
                )}
            </div>
            <div className={style.bodies}>
                <div>
                    <p>Anterior side</p>
                    <BodyContainer>
                        {antBodyParts.map((bodyPart, index) => (
                            <BodyPart
                                key={index}
                                id={bodyPart.id}
                                d={bodyPart.d}
                                fill={getFill(bodyPart.id)}
                                onClick={handleClick}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                isSelected={selectedParts.includes(bodyPart.id)}
                            />
                        ))}
                    </BodyContainer>
                </div>
                <div>
                    <p>Posterior side</p>
                    <BodyContainer>
                        {postBodyParts.map((bodyPart, index) => (
                            <BodyPart
                                key={index}
                                id={bodyPart.id}
                                d={bodyPart.d}
                                fill={getFill(bodyPart.id)}
                                onClick={handleClick}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                isSelected={selectedParts.includes(bodyPart.id)}
                            />
                        ))}
                    </BodyContainer>
                </div>
            </div>
        </>
    );
};
