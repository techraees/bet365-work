"use client"

import React, { useEffect } from 'react'
import { useSession } from "next-auth/react";
import {getUsersCreatedBy} from "../api/userManagement"
import {useState} from 'react';

import { Tree, Modal  } from 'antd';
import UserTabTitleNode from './UserTabTitleNode';
import { ModalProvider } from '../../components/admin/contexts/ModalContext';

interface treeDataType {
    title: string,
    key:string,
    children:any
}



function ShowUsersTab() {
//     const { data: session }: any = useSession();
//     const [treeData, setTreeData] = useState<treeDataType[]>([] as treeDataType[]);
//     const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false as boolean);
//     useEffect(() => {
//         const treeData: React.SetStateAction<treeDataType[]> | { title: string; key: any; children: {}[]; }[] = [];
//         const users_result = await getUsersCreatedBy(
//             session.user._id,
//             session.user.token,
//             session.user.role
//           );
//         users_result.then( (users_created_by: any[]) => {
//             users_created_by.map( user =>{
//                 treeData.push({
//                     title:<UserTabTitleNode id={user._id} username={user.username}/>, 
//                     key:user._id, 
//                     children:[{}]})
//             })
//             setTreeData(treeData)
//         })
        
//     }, [])


//     const getUsersAndCreateTree = async (keys: number[]) => {
//     try {
//         const lastKey = keys[keys.length - 1];
//         const users_created_by = await getUsersCreatedBy(lastKey);

//         const updateNode = (nodes: treeDataType[], currentKey: number, remainingKeys: number[]): treeDataType[] => {
//         return nodes.map(node => {
//             console.log(currentKey)
//             if (node.key === currentKey) {
//             if (remainingKeys.length === 0) {
//                 return {
//                 ...node,
//                 children: users_created_by.map(user => ({
//                     title:<UserTabTitleNode id={user._id} username={user.username}/>,
//                     key: user._id,
//                     children: [{}],
//                 })),
//                 };
//             } else {
//                 return {
//                 ...node,
//                 children: updateNode(node.children, remainingKeys[0], remainingKeys.slice(1)),
//                 };
//             }
//             }
//             return node;
//         });
//         };

//         const updatedTreeData = updateNode(treeData, keys[0], keys.slice(1));
//         setTreeData(updatedTreeData);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//     }
//     };

//     const onSelect = (keys: any, info: any) => {
//         console.log('Trigger Select', keys, info);
//     };

//     const onExpand = (keys: any, info: any) => {
//         console.log('Trigger Expand', keys, info);
//         getUsersAndCreateTree(keys)
//     };
//   return (
//     <div>
//     <ModalProvider>
//       <Tree
//       showLine
//       multiple
//       onExpand={onExpand}
//       treeData={treeData}
//     /> 
//     </ModalProvider>

//     </div>
//   )
}

export default ShowUsersTab
