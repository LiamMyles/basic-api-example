// import original module declarations
import "styled-components"

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    background: string
    text: string
    darkText: string
    darkBackground: string
    border: string
    ascent1: string
    ascent2: string
  }
}
