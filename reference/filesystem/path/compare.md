# compare
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
int compare(const path& p) const noexcept;          // (1)
int compare(const string_type& s) const;            // (2)
int compare(basic_string_view<value_type> s) const; // (3)
int compare(const value_type* s) const;             // (4)
```

## 概要
他のパスと、パスの各要素を辞書順で比較する。


## 戻り値
- (1) : `this->`[`native()`](native.md)ベースのパスにおける範囲`[`[`begin()`](begin.md)`,` [`end()`](end.md)`)`の各パス要素と`p.`[`native()`](native.md)ベースのパスにおける範囲`[p.`[`begin()`](begin.md)`, p.`[`end()`](end.md)`)`の各パス要素を辞書順比較し、`*this`の方が小さければ0未満の値、`*this`の方が大きければ0より大きい値、等しければ0を返す
- (2), (3), (4) : `compare(path(s))`を返す


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path a = "a/b/c";
  fs::path b = "a/b/d";

  std::cout << a.compare(b) << std::endl;
  std::cout << b.compare(a) << std::endl;
  std::cout << a.compare(a) << std::endl;

  // 正規化は考慮されない。
  // ファイルシステムとしてのパスの等価性ではなく、
  // パス文字列の同値性が比較されれる
  fs::path c = "a/../b/c";
  assert(a.compare(c) != 0);

  // パス範囲同士の各要素を比較するので、複数のスラッシュを入れても影響がない
  assert(fs::path{"a/////b"}.compare(fs::path{"a/b"}) == 0);
}
```
* compare[color ff0000]


### 出力例
```
-3
3
0
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]
