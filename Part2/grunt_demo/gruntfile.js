module.exports = (grunt) => {
  grunt.initConfig({
    foo: 'bar',
  })

  grunt.registerTask('foo', () => {
    console.log('hello, grunt')
  })
  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~')
  })
  grunt.registerTask('default', ['foo', 'bar'])
  grunt.registerTask('async-task', () => {
    const done = this.async()
    setTimeout(() => {
      console.log('async task working~')
      done()
    }, 1000)
  })
}
