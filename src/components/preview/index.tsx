import React, {FC} from 'react'
import { EmailBox } from '../../types/box'
import { Content } from '../content'

export const Preview: FC<{tree: EmailBox[]}> = ({tree}) => {

    const renderTree = (tree: EmailBox[]) => {
        return (

            <>
                {tree.map((block:EmailBox) => {
                    if (block.type === 'row') {
                        return (
                            <table>
                                <tr>
                                    {block.children.map((cell:EmailBox) => {
                                        return (
                                            <td>
                                                {renderTree(cell.children)}
                                            </td>
                                        )
                                    })}
                                </tr>
                            </table>
                        )
                    }

                    return (
                        <Content name={block.name} settings={block.settings} />
                    )
                })}
            </>
        )
    }
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {renderTree(tree)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
