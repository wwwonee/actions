import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
      {/* 启动页 */}
      {/* <Stack.Screen name="(view)/start" options={{ headerShown: false }} /> */}
      {/* tab页面 */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* 登录 */}
      <Stack.Screen name="(view)/login" options={{ headerShown: false }} />
      {/* 注册 */}
      <Stack.Screen name="(view)/register" options={{ headerShown: false }} />
      {/* 找回密码 */}
      <Stack.Screen name="(view)/find" options={{ headerShown: false }} />
      {/* 详情 */}
      <Stack.Screen name="(view)/xiang" options={{ title: '详情', headerShown: false }} />
      {/* 设置 */}
      <Stack.Screen name="(view)/setup" options={{ headerShown: false }} />
      {/* 个人详情 */}
      <Stack.Screen name="(view)/homePage" options={{ headerShown: false }} />
      {/* 短视频播放 */}
      <Stack.Screen name="(view)/TikTok" options={{ headerShown: false }} />
      {/* 短视频作者信息 */}
      <Stack.Screen name="(view)/author" options={{ headerShown: false }} />
    </Stack>
    // </ThemeProvider>
  );
}
