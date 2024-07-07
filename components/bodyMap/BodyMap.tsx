import { useCallback, useMemo, useState } from "react";
import { getBodyPart } from "./bodyParts";
import style from "./BodyMap.module.css";
import { Card } from "antd";

const BodyContainer = ({ children }: { children: any }) => (
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
        onClick(id);
    }

    const handleMouseEnter = () => {
        onMouseEnter(id);
    }

    const handleMouseLeave = () => {
        onMouseLeave();
    }

    return (
        <path
            d={d}
            id={id.toString()}
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
    const [selectedParts, setSelectedParts] = useState<{ id: number; name: string; description: string }[]>([]); // State for selected body parts
    const [hovered, setHovered] = useState<number | null>(null);
    const [selectedPartsId, setSelectedPartsId] = useState<number[]>([])

    const antBodyParts = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "ant");
    }, [lang]);

    const postBodyParts = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "post");
    }, [lang]);

    const handleClick = (id: number) => {
        console.log(selectedParts)
        const bodyPart = getBodyPart(lang).find(part => part.id === id);
        if (!bodyPart) return;

        const index = selectedParts.findIndex(part => part.id === id);
        if (index !== -1) {
            setSelectedParts(prevSelected => prevSelected.filter(part => part.id !== id)); // Deselect if already selected
            setSelectedPartsId(prevSelected => prevSelected.filter(part => id !== id))
        } else {
            setSelectedParts(prevSelected => [...prevSelected, { id, name: bodyPart.name, description: "" }]); // Select if not already selected
            setSelectedPartsId(prevSelected => [...prevSelected, id]); // Select if not already selected
        }
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
        if (selectedParts.some(part => part.id === bodyPartId)) {
            return "#054145"; // Fill color for selected parts
        } else if (hovered === bodyPartId) {
            return "#E0fefe"; // Fill color for hovered parts
        }
        return "#A5D8CC"; // Default fill color
    }, [selectedParts, hovered]);

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-4xl flex items-center justify-center font-bold leading-tight mt-16 text-[#054145]">
                Body Map
            </h2>
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
                                isSelected={selectedParts.some(part => part.id === bodyPart.id)}
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
                                isSelected={selectedPartsId.includes(bodyPart.id)}
                            />
                        ))}
                    </BodyContainer>
                </div>

            </div>
            <div className="text-black">
                {selectedParts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 border border-red-500 w-full">
                        {selectedParts.map((parts, indx) => (
                            <div key={indx} className="">
                                <Card title={parts.id} style={{ width: 300 }}>
                                    <p>{parts.name}</p>
                                </Card>
                            </div>
                        ))
                        }
                    </div>
                ) : (
                    <p>Click on the body!</p>
                )}
            </div>
        </div>
    );
};
