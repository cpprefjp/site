# sprintf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int sprintf(char* buffer, const char* format, ...);
}
```

## 概要
書式を指定して文字列領域に出力する。

出力の末尾にはヌル文字が書き込まれる。


## 戻り値
書き込まれた文字数（ヌル文字を含まない）を返す。出力エラーが発生した場合は負の値を返す。


## 備考
- この関数は書き込む文字数の上限を指定できないため、`buffer`が十分な大きさをもたない場合はバッファオーバーランを起こす。文字数の上限を指定できる[`snprintf()`](snprintf.md)、または型安全な[`std::format()`](/reference/format/format.md)（C++20）の使用が推奨される


## 例
```cpp example
#include <cstdio>

int main()
{
  char buffer[32];

  int len = std::sprintf(buffer, "%d-%d", 12, 34);
  std::printf("%s (%d)\n", buffer, len);
}
```
* std::sprintf[color ff0000]
* std::printf[link printf.md]

### 出力
```
12-34 (5)
```


## 関連項目
- [`snprintf`](snprintf.md)
- [`vsprintf`](vsprintf.md)
- [`printf`](printf.md)
- [`std::format()`](/reference/format/format.md)
