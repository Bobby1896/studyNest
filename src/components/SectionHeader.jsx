import PropTypes from "prop-types"
import Icon from "./Icon"

const SectionHeader = ({title}) => {
  return (
    <header className="section-header-wrapper">
        <h2 className="section-title">{title}</h2>
        <Icon icon="sectionHeadIcon" />
      </header>
  )
}

SectionHeader.proptypes ={
    title: PropTypes.string.isRequired
}

export default SectionHeader