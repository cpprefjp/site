# concat
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
template <class Source>
path& concat(const Source& x);                         // (1)

template <class InputIterator>
path& concat(InputIterator first, InputIterator last); // (2)
```

## 概要
パス文�列を加算する。


## 効果
- (1) : `path(x).`[`native()`](native.md)を、`*this`が保持するパス文�列に加算する
- (2) : `return *this += path(first, last)`と�価


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  {
    fs::path p = "foo";
    p.concat("bar");
    std::cout << p << std::endl;
  }
  {
    fs::path p = "foo/";
    p.concat("bar");
    std::cout << p << std::endl;
  }
  {
    std::string bar = "bar";

    fs::path p = "foo";
    p.concat(bar.begin(), bar.end());

    std::cout << p << std::endl;
  }
}
```
* concat[color ff0000]
* bar.begin()[link /reference/string/basic_string/begin.md]
* bar.end()[link /reference/string/basic_string/end.md]

### 出力
```
"foobar"
"foo/bar"
"foobar"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
