import * as React from "react"
import Svg, { G, Circle, Path, Defs } from "react-native-svg"
import Colors from "../../constants/Colors";

function Hamburger(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg width={66} height={66} viewBox="0 0 66 66" fill="none" {...props}>
      <G filter="url(#prefix__filter0_d)">
        <Circle cx={33} cy={29} r={32} fill="none" />
      </G>
      <Path fill={Colors.white} fillOpacity={0} d="M18 14h30v30H18z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.75 36.5h-10.5a1 1 0 110-2h10.5a1 1 0 110 2zm-11.5-13a1 1 0 011-1h16.5a1 1 0 110 2h-16.5a1 1 0 01-1-1zm1 7h13.5a1 1 0 100-2h-13.5a1 1 0 100 2z"
        fill={Colors.white}
      />
      <Defs></Defs>
    </Svg>
  )
}

export default Hamburger;