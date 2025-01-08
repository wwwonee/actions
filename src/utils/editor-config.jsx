function createEditorConfig() {
  const componentList = []; //物料表数据
  const componentMap = {}; //工作区数据
  return {
    componentList,
    componentMap,
    register: (component) => {
      componentList.push(component);
      componentMap[component.key] = component;
    },
  };
}
export let registerConfig = createEditorConfig();
registerConfig.register({
  label: '文本',
  preview: () => '预览文本',
  render: () => '渲染文本',
  key: 'text',
});
registerConfig.register({
  laber: '按钮',
  preview: () => <Button>预览按钮</Button>,
  render: () => <Button>渲染按钮</Button>,
  key: 'button',
});
registerConfig.register({
  laber: '按钮',
  preview: () => <input placeholder="预览输入框"></input>,
  render: () => <input placeholder="渲染输入框"></input>,
  key: 'input',
});
