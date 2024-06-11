# swap
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void swap(path& x) noexcept;
```

## 概要
他の`path`オブジェクトとデータを入れ替える。


## 効果
`*this`の内容を`x`と交換する。


## 戻り値
なし


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path a = "/foo/a.txt";
  fs::path b = "/foo/b.md";

  a.swap(b);

  std::cout << "a : " << a << std::endl;
  std::cout << "b : " << b << std::endl;
}
```
* swap[color ff0000]

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
