'use client'
import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Input, DatePicker, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_REPORT_BY_ID } from "../../../graphql/queries";
import { getBodyPart } from "../../../components/bodyMap/bodyParts";
import NavBar from "../../../components/nav-bar";
import { useUser } from "@auth0/nextjs-auth0/client";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

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
}

const BodyPart = ({ id, d, fill, onClick, onMouseEnter, onMouseLeave }: BodyPartProps) => {
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

const Page = ({ params }: { params: any }) => {
    const { id } = params;
    const { user } = useUser();

    const {
        data,
        loading,
        error: queryError,
    } = useQuery(GET_REPORT_BY_ID, {
        variables: { reportId: id },
    });

    const [selectedParts, setSelectedParts] = useState<{ id: number; name: string; description: string }[]>([]);
    const [selectedPartsId, setSelectedPartsId] = useState<number[]>([]);
    const [hovered, setHovered] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [reportName, setReportName] = useState("");
    const [reporterName, setReporterName] = useState(user?.name ?? user?.email ?? "");
    const [reportDate, setReportDate] = useState(dayjs());
    const [reportTime, setReportTime] = useState(dayjs());

    useEffect(() => {
        if (data && data.report && data.report.injuries) {
            const selectedPartsId = data.report.injuries.map((injury: any) => Number(injury.body_part_id));
            setSelectedPartsId(selectedPartsId);
            setSelectedParts(data.report.injuries.map((injury: any) => ({
                id: Number(injury.body_part_id),
                name: injury.body_part,
                description: injury.description
            })));
            setReportName(data.report.report_name);
            setReporterName(data.report.reporter_name);
            setReportDate(dayjs(data.report.date));
            setReportTime(dayjs(data.report.time, "HH:mm:ss"));
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

    const handleClick = (id: number) => {
        if (!isEditing) return;
        const bodyPart = getBodyPart().find(part => part.id === id);
        if (!bodyPart) return;

        const index = selectedParts.findIndex(part => part.id === id);
        if (index !== -1) {
            setSelectedParts(prevSelected => prevSelected.filter(part => part.id !== id)); // Deselect if already selected
            setSelectedPartsId(prevSelected => prevSelected.filter(partId => partId !== id));
        } else {
            setSelectedParts(prevSelected => [...prevSelected, { id, name: bodyPart.name, description: "" }]); // Select if not already selected
            setSelectedPartsId(prevSelected => [...prevSelected, id]);
        }
    };

    const handleDescriptionChange = (id: number, description: string) => {
        setSelectedParts(prevSelected =>
            prevSelected.map(part =>
                part.id === id ? { ...part, description } : part
            )
        );
    }

    const handleRemove = (id: number) => {
        setSelectedParts(prevSelected => prevSelected.filter(part => part.id !== id));
        setSelectedPartsId(prevSelected => prevSelected.filter(partId => partId !== id));
    }

    const getFill = useCallback((bodyPartId: number) => {
        if (selectedParts.some(part => part.id === bodyPartId)) {
            return "#054145"; // Fill color for selected parts
        } else if (hovered === bodyPartId) {
            return "grey"; // Fill color for hovered parts
        }
        return "#A5D8CC"; // Default fill color
    }, [selectedParts, hovered]);

    const onUpdate = () => {
        console.log(selectedParts);
    }

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
                <div className="flex justify-center pt-10 md:justify-end mb-4">
                    <button onClick={() => setIsEditing(!isEditing)}
                        className="bg-[#054145] text-white py-2 px-4 w-40 rounded-md shadow-md hover:bg-[#E0fefe] hover:text-black"
                    >
                        {isEditing ? "Cancel Edit" : "Edit"}
                    </button>
                </div>
                <div className="flex md:flex-row flex-col md:mt-0 mt-6 container md:px-0">
                    <div className="flex flex-col gap-2 items-start justify-center">
                        <div className="w-full ">
                            <label>Report Name : </label>
                            <Input
                                className="mb-4 w-full mt-2"
                                placeholder="Report Name"
                                value={reportName}
                                onChange={(e) => setReportName(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full ">
                            <label>Reporter Name : </label>
                            <Input
                                className="mb-4 w-full mt-2"
                                placeholder="Reporter Name"
                                value={reporterName}
                                onChange={(e) => setReporterName(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full ">
                            <label>Report Date : </label>
                            <DatePicker
                                className="mb-4 w-full mt-2"
                                value={reportDate}
                                onChange={(date) => setReportDate(date ?? dayjs())}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full ">
                            <label>Report Time : </label>
                            <TimePicker
                                className="mb-4 w-full mt-2"
                                value={reportTime}
                                onChange={(time) => setReportTime(time ?? dayjs())}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full items-center justify-center gap-20 mt-10">
                        <div className="flex flex-col items-center justify-center">
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
                                        onClick={handleClick}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                ))}
                            </BodyContainer>
                        </div>
                    </div>
                </div>

                <div className="text-black">
                    {selectedParts.length > 0 ? (
                        <div className="md:grid md:grid-cols-3 flex flex-col gap-4 items-center justify-center w-full pb-10">
                            {selectedParts.map((parts, index) => (
                                <div key={index} className="relative text-[#054145]">
                                    <Card
                                        title={`ID : ${parts.id} - ${parts.name}`}
                                        style={{ width: 300 }}
                                        extra={isEditing ? <CloseOutlined onClick={() => handleRemove(parts.id)} /> : null}
                                    >
                                        <TextArea
                                            rows={2}
                                            placeholder="Description"
                                            value={parts.description}
                                            onChange={(e) => handleDescriptionChange(parts.id, e.target.value)}
                                            readOnly={!isEditing}
                                        />
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="flex flex-col items-center justify-center text-2xl font-semibold pb-10 text-[#054145]">Click on the body!</p>
                    )}
                </div>
                {isEditing && (
                    <div className="flex flex-col items-center justify-center py-10 px-auto">
                        <button onClick={onUpdate}
                            className="bg-[#054145] text-white py-2 px-10 w-40 rounded-md shadow-md hover:bg-[#E0fefe] hover:text-black"
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Page;
