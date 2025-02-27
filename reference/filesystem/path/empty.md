# empty
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool empty() const noexcept;               // C++17
[[nodiscard]] bool empty() const noexcept; // C++20
bool empty() const noexcept;               // C++26
```

## 概要
パスが空か判定する。


## 戻り値
汎用フォーマットとしてのパスが空であれば`true`、そうでなければ`false`を返す。


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p1;
  if (p1.empty()) {
    std::cout << "p1 : empty" << std::endl;
  }

  fs::path p2 = "/usr/bin/clang";
  if (!p2.empty()) {
    std::cout << "p2 : not empty" << std::endl;
  }
}
```
* empty()[color ff0000]

### 出力
```
p1 : empty
p2 : not empty
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
