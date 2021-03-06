import React from "react"
import { ContextMenu, Item, Separator } from "react-contexify"
import { connect } from "react-redux"
import { RootState } from "../../../reducers"
import * as RepositoryActions from "../../../reducers/repository"

type OwnProps = {
  root: string
}

type Props = OwnProps & {
  addToStage: typeof RepositoryActions.addToStage
  deleteFile: typeof RepositoryActions.deleteFile
  deleteDirectory: typeof RepositoryActions.deleteDirectory
}

const onClick: any = ({ event, ref, data, dataFromProvider }: any) =>
  console.log("Hello", ref, data, dataFromProvider)

const actions = {
  addToStage: RepositoryActions.addToStage,
  deleteFile: RepositoryActions.deleteFile,
  deleteDirectory: RepositoryActions.deleteDirectory
}

export const DirectoryContextMenu: any = connect(
  (_state: RootState, ownProps: OwnProps) => {
    return ownProps
  },
  actions
)((props: Props) => {
  return (
    <ContextMenu id="directory">
      <Item
        onClick={({ dataFromProvider }: any) => {
          // props.deleteFile(dataFromProvider.filepath)
        }}
      >
        Create File[WIP]
      </Item>
      <Item
        onClick={({ dataFromProvider }: any) => {
          // props.deleteFile(dataFromProvider.filepath)
        }}
      >
        Create Directory[WIP]
      </Item>
      <Separator />
      <Item
        onClick={({ dataFromProvider }: any) => {
          // props.deleteFile(dataFromProvider.filepath)
          props.deleteDirectory(dataFromProvider.dirpath)
        }}
      >
        Delete
      </Item>
    </ContextMenu>
  )
})
