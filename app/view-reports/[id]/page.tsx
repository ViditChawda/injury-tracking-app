'use client'
import { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_REPORT_BY_ID } from "../../../graphql/queries";
import { getBodyPart } from "../../../components/bodyMap/bodyParts";
import NavBar from "../../../components/nav-bar";

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
    onMouseEnter: (id: number) => void;
    onMouseLeave: () => void;
}

const BodyPart = ({ id, d, fill, onMouseEnter, onMouseLeave }: BodyPartProps) => {
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

const Page = ({ params }: { params: any }) => {
    const { id } = params;

    const {
        data,
        loading,
        error: queryError,
    } = useQuery(GET_REPORT_BY_ID, {
        variables: { reportId: id },
    });

    const [selectedPartsId, setSelectedPartsId] = useState<number[]>([]);
    const [hovered, setHovered] = useState<number | null>(null);

    useEffect(() => {
        if (data && data.report && data.report.injuries) {
            const selectedPartsId = data.report.injuries.map((injury: any) => Number(injury.body_part_id));
            setSelectedPartsId(selectedPartsId);
        }
    }, [data]);

    const antBodyParts = useMemo(() => {
        return getBodyPart().filter(({ face }) => face === "ant");
    }, []);

    const postBodyParts = useMemo(() => {
        return getBodyPart().filter(({ face }) => face === "post");
    }, []);

    const handleMouseEnter = (id: number) => {
        if ("ontouchstart" in window) return;
        setHovered(id);
    };

    const handleMouseLeave = () => {
        if ("ontouchstart" in window) return;
        setHovered(null);
    };

    const getFill = useCallback((bodyPartId: number) => {
        if (selectedPartsId.includes(bodyPartId)) {
            return "#054145"; // Fill color for selected parts
        } else if (hovered === bodyPartId) {
            return "grey"; // Fill color for hovered parts
        }
        return "#A5D8CC"; // Default fill color
    }, [data, hovered]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (queryError) {
        return <div>Error: {queryError.message}</div>;
    }

    return (
        <>
            <NavBar />
            <div id="bodymap" className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-4xl flex items-center justify-center font-bold leading-tight mt-10 text-[#054145]">
                    Body Map Report -  {id}
                </h2>
                <div className="flex flex-col md:flex-row w-full items-center justify-center gap-20 mt-20">
                    <div className="flex flex-col items-center justify-center">
                        <p>Anterior side</p>
                        <BodyContainer>
                            {antBodyParts.map((bodyPart, index) => (
                                <BodyPart
                                    key={index}
                                    id={bodyPart.id}
                                    d={bodyPart.d}
                                    fill={getFill(bodyPart.id)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                />
                            ))}
                        </BodyContainer>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>Posterior side</p>
                        <BodyContainer>
                            {postBodyParts.map((bodyPart, index) => (
                                <BodyPart
                                    key={index}
                                    id={bodyPart.id}
                                    d={bodyPart.d}
                                    fill={getFill(bodyPart.id)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                />
                            ))}
                        </BodyContainer>
                    </div>
                </div>
                <div className="text-black">
                    {data.report?.injuries.length > 0 ? (
                        <div className="md:grid md:grid-cols-3 flex flex-col gap-4 items-center justify-center w-full pb-10">
                            {data.report.injuries.map((injury: any, index: number) => (
                                <div key={index} className="relative text-[#054145]">
                                    <Card
                                        title={`ID : ${injury.body_part_id} - ${injury.body_part}`}
                                        style={{ width: 300 }}
                                        extra={<CloseOutlined />}
                                    >
                                        <TextArea
                                            rows={2}
                                            placeholder="Description"
                                            value={injury.description}
                                            readOnly
                                        />
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="flex flex-col items-center justify-center text-2xl font-semibold pb-10 text-[#054145]">Click on the body!</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;
