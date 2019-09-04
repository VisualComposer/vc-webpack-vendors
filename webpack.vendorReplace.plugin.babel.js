import { ConcatSource } from 'webpack-sources'

export default class VendorReplacePlugin {
  constructor (entry) {
    this.entry = entry
  }

  apply (compiler) {
    compiler.hooks.compilation.tap(
      'VendorReplacePlugin',
      compilation => {
        const handler = modules => {
          modules.map((module) => {
            if (module.id) {
              // Replace ../../node_modules
              module.id = module.id.replace(/(\.\.\/)+(node_modules)/,'./$2')
            }
            return module
          })
        }
        compilation.hooks.moduleIds.tap(
          'VendorReplacePlugin',
          handler
        )

        // Intercept default chunk template plugin
        compilation.chunkTemplate.hooks.render.intercept(
          {
            'register': (options) => {
              if (options.name === 'JsonpChunkTemplatePlugin') {
                options.fn = (modules, chunk) => {
                  const jsonpFunction = compilation.chunkTemplate.outputOptions.jsonpFunction
                  const globalObject = compilation.chunkTemplate.outputOptions.globalObject
                  const source = new ConcatSource()
                  source.add(
                    `(${globalObject}[${JSON.stringify(
                      jsonpFunction
                    )}] = ${globalObject}[${JSON.stringify(
                      jsonpFunction
                    )}] || []).push([${JSON.stringify(chunk.ids)},`
                  )
                  source.add(modules)
                  const entries = [ chunk.entryModule ].filter(Boolean).map(m =>
                    [ m.id ].concat(
                      Array.from(chunk.groupsIterable)[ 0 ]
                        .chunks.filter(c => c !== chunk)
                        .map(c => c.id)
                    )
                  )
                  if (entries.length > 0) {
                    source.add(`,${JSON.stringify(entries)}`)
                  }
                  // Add manual element entry point
                  source.add(`,[['./${this.entry}']]])`)
                  return source
                }
              }
              return options
            }
          }
        )
      }
    )
  }
}
