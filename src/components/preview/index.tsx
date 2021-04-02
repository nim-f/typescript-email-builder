import React, {FC} from 'react'
import { EmailBox } from '../../types/box'
import { Content } from '../content'

export const Preview: FC<{
    tree: EmailBox[]
    settings: Record<string, any>
}> = ({ tree, settings }) => {
    const renderTree = (tree: EmailBox[]) => {
        return (
            <>
                {tree.map((block: EmailBox) => {
                    if (block.type === 'row') {
                        return (
                            <table>
                                <tr>
                                    {block.items.map((cell: EmailBox) => {
                                        return (
                                            <td>
                                                {renderTree(cell.items)}
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
            <table style={{ width: settings.width }}>
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
