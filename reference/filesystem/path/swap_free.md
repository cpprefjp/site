# swap (非メンバ関数)
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  void swap(path& x, path& y) noexcept;
}
```

## 概要
2つの`path`オブジェクトを入れ替える。


## 効果
`x.`[`swap`](swap.md)`(y)`


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path a = "/foo/a.txt";
  fs::path b = "/foo/b.md";

  fs::swap(a, b);

  std::cout << "a : " << a << std::endl;
  std::cout << "b : " << b << std::endl;
}
```
* fs::swap[color ff0000]

### 出力
```
a : "/foo/b.md"
b : "/foo/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]
