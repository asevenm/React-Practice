import { danger, fail, warn } from 'danger'

fail('This is a failure message') // 显示一条错误信息

warn('This is a warn message') // 显示一条警告信息

const { title } = danger.github.pr
if (!title.startsWith('feature/')) {
    fail('标题必须要由"feature/"开头')
}