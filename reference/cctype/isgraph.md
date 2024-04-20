# isgraph
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int isgraph(int ch);
}
```


## 概要
`ch` が図表文字（空白を除く表示文字）かどうかを判定する（判定はロケールの影響を受ける）。


## 戻り値
`ch` が図表文字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "isgraph('A') = " << std::isgraph('A') << std::endl
              << "isgraph('a') = " << std::isgraph('a') << std::endl
              << "isgraph('Z') = " << std::isgraph('Z') << std::endl
              << "isgraph('z') = " << std::isgraph('z') << std::endl
              << "isgraph('3') = " << std::isgraph('3') << std::endl
              << "isgraph('.') = " << std::isgraph('.') << std::endl
              << "isgraph(' ') = " << std::isgraph(' ') << std::endl
              << "isgraph('\\n') = " << std::isgraph('\n') << std::endl
              << "isgraph('0x0f') = " << std::isgraph(15) << std::endl;
}
```
* std::isgraph[color ff0000]


## 出力例
```
isgraph('A') = 32768
isgraph('a') = 32768
isgraph('Z') = 32768
isgraph('z') = 32768
isgraph('3') = 32768
isgraph('.') = 32768
isgraph(' ') = 0
isgraph('\n') = 0
isgraph('0x0f') = 0
```
