import { useState } from "react";
import { motion } from "framer-motion";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";

const initialData = {
    Active: [
        {
            id: 1,
            nome: "John Doe",
            email: "john@example.com",
            profissao: "Engenheiro",
            ads: "R$ 1.500",
            cpa: "R$ 50",
            leads: 30,
            conversao: "12%",
            roas: "3.2x",
            canalPrincipal: "Meta Ads",
            tipoOferta: "Serviço de consultoria",
            tempoConversao: "5 dias"
        }
    ],
    Inactive: [
        {
            id: 2,
            nome: "Jane Smith",
            email: "jane@example.com",
            profissao: "Contador",
            ads: "R$ 1.400",
            cpa: "R$ 46.67",
            leads: 28,
            conversao: "10%",
            roas: "2.7x",
            canalPrincipal: "Google Ads",
            tipoOferta: "Serviço contábil mensal",
            tempoConversao: "7 dias"
        }
    ],
    Analysis: [
        {
            id: 3,
            nome: "Bob Johnson",
            email: "bob@example.com",
            profissao: "Programador",
            ads: "R$ 2.500",
            cpa: "R$ 62.5",
            leads: 40,
            conversao: "8%",
            roas: "2.1x",
            canalPrincipal: "Meta Ads",
            tipoOferta: "Infoproduto gravado",
            tempoConversao: "3 dias"
        }
    ]
};

const UsersTable = () => {
    const [data, setData] = useState(initialData);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const sourceColumn = Object.keys(data).find((key) =>
            data[key].some((item) => item.id.toString() === active.id)
        );
        const destinationColumn = over.id;

        if (sourceColumn === destinationColumn) return;

        const item = data[sourceColumn].find((item) => item.id.toString() === active.id);

        setData((prevData) => {
            const newSourceItems = prevData[sourceColumn].filter((item) => item.id.toString() !== active.id);
            const newDestinationItems = [...prevData[destinationColumn], item];
            return {
                ...prevData,
                [sourceColumn]: newSourceItems,
                [destinationColumn]: newDestinationItems
            };
        });
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                {Object.keys(data).map((status) => (
                    <DroppableColumn key={status} id={status}>
                        <h3 className="text-xl font-semibold text-gray-100 mb-4">{status}</h3>
                        {data[status].map((user) => (
                            <DraggableCard key={user.id} user={user} />
                        ))}
                    </DroppableColumn>
                ))}
            </div>
        </DndContext>
    );
};

const DroppableColumn = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div
            ref={setNodeRef}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        >
            {children}
        </div>
    );
};

const DraggableCard = ({ user }) => {
    const { setNodeRef, listeners, transform } = useDraggable({ id: user.id.toString() });
    const style = {
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`
    };

    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            style={style}
            className="bg-gray-900 bg-opacity-60 rounded-lg p-4 mb-4 shadow-md cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * user.id }}
        >
            <h4 className="text-lg font-semibold text-gray-100">{user.nome}</h4>
            <p className="text-sm text-gray-400">{user.profissao}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
                <span className="text-xs font-semibold text-blue-400">Ads:</span>
                <span className="text-xs text-blue-200">{user.ads}</span>
                <span className="text-xs font-semibold text-green-400">CPA:</span>
                <span className="text-xs text-green-200">{user.cpa}</span>
                <span className="text-xs font-semibold text-yellow-400">Leads:</span>
                <span className="text-xs text-yellow-200">{user.leads}</span>
                <span className="text-xs font-semibold text-purple-400">Conversão:</span>
                <span className="text-xs text-purple-200">{user.conversao}</span>
                <span className="text-xs font-semibold text-pink-400">ROAS:</span>
                <span className="text-xs text-pink-200">{user.roas}</span>
                <span className="text-xs font-semibold text-teal-400">Canal:</span>
                <span className="text-xs text-teal-200">{user.canalPrincipal}</span>
            </div>
        </motion.div>
    );
};

export default UsersTable;