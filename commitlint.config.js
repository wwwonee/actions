// 校验提交信息
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // 错误级别：2 表示错误，1 表示警告，0 表示关闭规则
      'always', // 校验时机
      [
        'feat', // 新功能
        'fix', // 修复 Bug
        'docs', // 文档更新
        'style', // 格式（不影响代码功能的变动）
        'refactor', // 重构（即不是新增功能，也不是修复 Bug 的代码变动）
        'perf', // 性能优化
        'test', // 添加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚
        'build', // 构建系统或外部依赖变更
        'ci', // CI 配置变更
      ],
    ],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'], // 禁止使用这些格式
    ],
  },
};
