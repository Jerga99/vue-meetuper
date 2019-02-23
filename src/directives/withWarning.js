
export default {
  bind (el, binding) {
    const message = binding.value || 'Are you sure you want to continue ?'
    const color = binding.arg || 'blue'
    const { prevent } = binding.modifiers

    el.style.color = color
    el.style.borderColor = color

    el.__WithWarning__  = () => {
      if (!prevent) {
        alert(message)
      }
    }

    el.addEventListener('click', el.__WithWarning__)

   // el.__AnnoyingInterval__ = setInterval(() => { console.log('I am annoying message!')}, 1000)

  },
  unbind (el) {
    // clearInterval(el.__AnnoyingInterval__)
    el.removeEventListener('click', el.__WithWarning__)
  }
}
