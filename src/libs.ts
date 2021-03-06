import { Lib } from './index'

const nameRegex = /<\w+>/g

// TODO: fix test env to read this ts file
function removeDelimiters(rawName: string): string {
  return rawName.substr(1, rawName.length - 2)
}

function addDelimiters(name: string): string {
  return '<' + name + '>'
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatNameLabel(name: string): string {
  return name.split('_').map(capitalizeFirstLetter).join(' ')
}

export function extractNames(story: string): string[] {
  let names: string[] = []
  let matches: any[] = []
  while ((matches = nameRegex.exec(story)) !== null) {
    names = names.concat([removeDelimiters(matches[0])])
  }
  return names
}

export function replaceLibs(story: string, libs: Lib[]) {
  let output = story
  libs.forEach(lib => {
    if (lib.value)
      output = output.replace(addDelimiters(lib.name), lib.value)
  })
  return output
}
