# operator+=
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path& operator+=(const path& x);                   // (1)
path& operator+=(const string_type& x);            // (2)
path& operator+=(basic_string_view<value_type> x); // (3)
path& operator+=(const value_type* x);             // (4)
path& operator+=(value_type x);                    // (5)

template <class Source>
path& operator+=(const Source& x);                 // (6)

template <class EcharT>
path& operator+=(EcharT x);                        // (7)
```

## 概要
パス文�列を加算する。

この演算�は、[`operator/=`](op_append_assign.md)と違って、ディレクトリ区切り文�を自動的に挿入はせず、パス文�列への加算のみを行う。


## 効果
`path(x).`[`native()`](native.md)を、`*this`が保持するパス文�列に加算する。


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
    p += "bar";
    std::cout << p << std::endl;
  }
  {
    fs::path p = "foo/";
    p += "bar";
    std::cout << p << std::endl;
  }
  {
    fs::path p = "foo";
    p += U'p'; // UTF-32文�を加算 (文�コードはクラス内部で自動変換される)
    std::cout << p << std::endl;
  }
}
```

### 出力
```
"foobar"
"foo/bar"
"foop"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
