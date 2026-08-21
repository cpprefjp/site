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


- (1) : 以下の順序で比較した結果を返す：
    1. `rootNameComparison`を`this->`[`root_name()`](root_name.md)`.`[`native()`](native.md)`.`[`compare`](/reference/string/basic_string/compare.md)`(p.`[`root_name()`](root_name.md)`.`[`native()`](native.md)`)`とする。`rootNameComparison`が0でなければ、その値を返す
    2. `this->`[`has_root_directory()`](has_root_directory.md)かつ`!p.`[`has_root_directory()`](has_root_directory.md)であれば、0より大きい値を返す
    3. `!this->`[`has_root_directory()`](has_root_directory.md)かつ`p.`[`has_root_directory()`](has_root_directory.md)であれば、0未満の値を返す
    4. `this->`[`relative_path()`](relative_path.md)と`p.`[`relative_path()`](relative_path.md)の範囲`[`[`begin()`](begin.md)`,` [`end()`](end.md)`)`の各パス要素を辞書順比較し、`*this`の方が小さければ0未満の値、`*this`の方が大きければ0より大きい値、等しければ0を返す
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
  // パス文字列の同値性が比較される
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


## 参照
- [LWG Issue 2936. Path comparison is defined in terms of the generic format](https://cplusplus.github.io/LWG/issue2936)
    - C++20で、比較の定義が、ルート名（[`native()`](native.md)ベース）・ルートディレクトリの有無・相対パスの辞書順という段階的な比較として明確化された
