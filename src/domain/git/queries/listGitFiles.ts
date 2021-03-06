import fs from "fs"
import * as git from "isomorphic-git"
import { zipWith } from "lodash"
import { getGitStatus } from "./getGitStatus"

export async function listGitFiles(
  projectRoot: string,
  ref: string = "HEAD"
): Promise<
  Array<{
    filepath: string
    gitStatus: string
  }>
> {
  const files: string[] = await git.listFiles({
    fs,
    dir: projectRoot,
    ref
  })
  const statusList = await Promise.all(
    files.map(f => getGitStatus(projectRoot, f))
  )
  return zipWith(files, statusList, (filepath, gitStatus) => ({
    filepath,
    gitStatus
  }))
}
