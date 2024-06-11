# hash_value
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  std::size_t hash_value(const path& p) noexcept;
}
```

## 概要
パスのハッシュ値を取得する。


## 戻り値
パス`p`のハッシュ値が返る。

2つのパス`p1`と`p2`があり、`p1 == p2`の場合、`hash_value(p1) == hash_value(p2)`となる。


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "a/b/c";
  std::cout << fs::hash_value(p) << std::endl;
}
```
* fs::hash_value[color ff0000]

### 出力例
```
15598034140390075111
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]
