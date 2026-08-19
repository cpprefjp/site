# operator==
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool operator==(const recursive_directory_iterator& a,
                  const recursive_directory_iterator& b) noexcept; // (1) C++17

  class recursive_directory_iterator {
  public:
    bool operator==(default_sentinel_t) const noexcept; // (2) C++23
  };
}
```
* default_sentinel_t[link /reference/iterator/default_sentinel_t.md]

## 概要
`recursive_directory_iterator`オブジェクトが等値かを判定する。

- (1) : 2つの`recursive_directory_iterator`オブジェクトを等値比較する。
- (2) : `recursive_directory_iterator`オブジェクトが終端（ディレクトリの末尾）に到達しているかを判定する。


## 戻り値
- (1) : 2つの`recursive_directory_iterator`オブジェクトが等値である場合は`true`、そうでなければ`false`を返す。
- (2) : `*this == recursive_directory_iterator()`と等価。すなわち、イテレータが終端を指していれば`true`、そうでなければ`false`を返す。


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>
#include <iterator>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir");
  std::ofstream{"dir/a.txt"};

  fs::recursive_directory_iterator a{"dir"};
  fs::recursive_directory_iterator b = a;

  // (1) 2つのイテレータの等値比較
  assert(a == b);

  ++b;

  // (1) デフォルト構築したイテレータ（終端）との比較
  fs::recursive_directory_iterator end{};
  assert(b == end);

  // (2) default_sentinelとの比較で終端を判定する (C++23)
  assert(b == std::default_sentinel);
}
```
* fs::create_directory[link /reference/filesystem/create_directory.md]
* std::default_sentinel[link /reference/iterator/default_sentinel.md.nolink]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [LWG Issue 3719. Directory iterators should be usable with default sentinel](https://cplusplus.github.io/LWG/issue3719)
    - C++23で、`default_sentinel_t`との等値比較演算子(2)が追加された
