import { useCallback, useMemo, useState } from "react";
import { getBodyPart } from "./bodyParts";
import { Card, Input, DatePicker, TimePicker, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMutation } from "@apollo/client";
import { CREATE_REPORT } from "../../graphql/mutations";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
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
    const { user, error, isLoading } = useUser();
    const [selectedParts, setSelectedParts] = useState<{ id: number; name: string; description: string }[]>([]); // State for selected body parts
    const [hovered, setHovered] = useState<number | null>(null);
    const [selectedPartsId, setSelectedPartsId] = useState<number[]>([]);
    const [reportName, setReportName] = useState("");
    const [reporterName, setReporterName] = useState(user?.name ?? user?.email ?? "");
    const [reportDate, setReportDate] = useState(dayjs());
    const [reportTime, setReportTime] = useState(dayjs());
    const router = useRouter();
    const [createReport, { loading, data }] = useMutation(CREATE_REPORT);

    const antBodyParts = useMemo(() => {
        return getBodyPart().filter(({ face }) => face === "ant");
    }, []);

    const postBodyParts = useMemo(() => {
        return getBodyPart().filter(({ face }) => face === "post");
    }, []);

    const handleClick = (id: number) => {
        const bodyPart = getBodyPart().find(part => part.id === id);
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

    const handleRemove = (id: number) => {
        setSelectedParts(prevSelected => prevSelected.filter(part => part.id !== id));
        setSelectedPartsId(prevSelected => prevSelected.filter(partId => partId !== id));
    }

    const handleDescriptionChange = (id: number, description: string) => {
        setSelectedParts(prevSelected =>
            prevSelected.map(part =>
                part.id === id ? { ...part, description } : part
            )
        );
    }

    const getFill = useCallback((bodyPartId: number) => {
        if (selectedParts.some(part => part.id === bodyPartId)) {
            return "#054145"; // Fill color for selected parts
        } else if (hovered === bodyPartId) {
            return "grey"; // Fill color for hovered parts
        }
        return "#A5D8CC"; // Default fill color
    }, [selectedParts, hovered]);

    const onSubmit = async () => {
        try {
            if (!user) {
                return;
            }
            const payload = {
                reporter_name: reporterName,
                report_name: reportName,
                date: reportDate.toISOString(),
                time: reportTime.format("HH:mm:ss"),
                injuries: selectedParts.map(({ id, name, ...rest }) => ({
                    body_part_id: id.toString(),
                    body_part: name,
                    ...rest
                })),
            }
            await createReport({
                variables: {
                    input: payload
                }
            });
            router.push('/view-reports')
            message.success('Report created successfully!', 3);
        } catch (err) {
            console.log(error)
        }
    }

    return (
        <div id="bodymap" className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-4xl flex items-center justify-center font-bold leading-tight mt-10 text-[#054145]">
                Create Report
            </h2>
            <div className="flex md:flex-row flex-col md:mt-0 mt-6 container md:px-0">
                <div className="flex flex-col gap-2 items-start justify-center">
                    <div className="w-full">
                        <label>Report Name : </label>
                        <Input
                            className="mb-4 w-full mt-2"
                            placeholder="Report Name"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <label>Reporter Name : </label>
                        <Input
                            className="mb-4 w-full mt-2"
                            placeholder="Reporter Name"
                            value={reporterName}
                        />
                    </div>
                    <div className="w-full">
                        <label>Report Date : </label>
                        <DatePicker
                            className="mb-4 w-full mt-2"
                            value={reportDate}
                            onChange={(date) => setReportDate(date ?? dayjs())}
                        />
                    </div>
                    <div className="w-full">
                        <label>Report Time : </label>
                        <TimePicker
                            className="mb-4 w-full mt-2"
                            value={reportTime}
                            onChange={(time) => setReportTime(time ?? dayjs())}
                        />
                    </div>
                </div>
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
                                    onClick={handleClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    isSelected={selectedParts.some(part => part.id === bodyPart.id)}
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
                                    isSelected={selectedPartsId.includes(bodyPart.id)}
                                />
                            ))}
                        </BodyContainer>
                    </div>
                </div>
            </div>

            <div className="text-black">
                {selectedParts.length > 0 ? (
                    <div className="md:grid md:grid-cols-3 flex flex-col gap-4 items-center justify-center w-full pb-10">
                        {selectedParts.map((parts, indx) => (
                            <div key={indx} className="relative text-[#054145]">
                                <Card
                                    title={`ID : ${parts.id} - ${parts.name}`}
                                    style={{ width: 300 }}
                                    className=""
                                    extra={
                                        <CloseOutlined onClick={() => handleRemove(parts.id)} />
                                    }
                                >
                                    <TextArea
                                        rows={2}
                                        placeholder="Description"
                                        value={parts.description}
                                        onChange={(e) => handleDescriptionChange(parts.id, e.target.value)}
                                    />
                                </Card>
                            </div>
                        ))
                        }
                    </div>
                ) : (
                    <p className="flex flex-col items-center justify-center text-2xl font-semibold pb-10 text-[#054145]">Click on the body!</p>
                )}
            </div>
            <div className="flex flex-col items-center justify-center py-10 px-auto">
                {(selectedParts.length > 0) &&
                    <button disabled={isLoading} onClick={onSubmit}
                        className="bg-[#054145] text-white py-2 px-10 rounded-md shadow-md hover:bg-[#E0fefe] hover:text-black"
                    >
                        {loading ?
                            <div className="flex flex-row gap-2"><LoaderCircle className="animate-spin" /> Submit</div>
                            :
                            <div>Submit</div>
                        }
                    </button>
                }
            </div>

        </div>
    );
};
