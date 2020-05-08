<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props 
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} class='mb-2'/>)
    }

    if (title) {
      vnodes.push(<div slot='title' style='line-height:1;text-align:center;'>{(title)}</div>)
    }
    return vnodes
  }
}
</script>
