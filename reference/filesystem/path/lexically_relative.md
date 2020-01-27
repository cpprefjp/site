# lexically_relative
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path lexically_relative(const path& base) const;
```

## 概要
文�列レベルで相対パスに変換する。

この関数は、`*this`が保持するパス文�列を、パス`base`からの相対パスに変換する。ただし、この関数ではファイルシステムを介さず文�列レベルで相対パスへの変換をするため、相対パスを解決できない場合がある。相対パスが解決できなかった場合は、空のパスが返る。ファイルシステムを介した相対パスへの変換を行う場合は、[`std::filesystem::relative()`](/reference/filesystem/relative.md)関数を使用すること。


## 効果
1. 以下のいずれかの条件に一致する場合、相対パスの解決ができず、空のパスが返る：
    - [`root_name()`](root_name.md) `!= base.`[`root_name()`](root_name.md)
    - [`is_absolute()`](is_absolute.md) `!= base.`[`is_absolute()`](is_absolute.md)
    - `!`[`has_root_directory()`](has_root_directory.md) `&& base.`[`has_root_directory()`](has_root_directory.md)
2. 以下の式で、`*this`と`base`が異なる最初の位置を見つける：
    - `auto [a, b] =` [`std::mismatch`](/reference/algorithm/mismatch.md)`(`[`begin()`](begin.md)`,` [`end()`](end.md)`, base.`[`begin()`](begin.md)`, base.`[`end()`](end.md)`);`
3. `a ==` [`end()`](end.md)かつ`b == base.`[`end()`](end.md)の場合、`path(".")`が返る
4. 範囲`[b, base.`[`end()`](end.md)`)`の非`"."` (ドットx1) かつ非`".."` (ドットx2) の数から、同範囲内の `".."` の数を引いたものを`n`とする
5. `n < 0`であれば、空のパスが返る
6. 新たな`path`型オブジェクト`p`をデフォルト構築し、
7. 式`p /= path("..")`をn回を適用する
8. 範囲`[a,` [`end()`](end.md)`)`の各要素`x`を、式`p /= x`で加算する


## 備考
- この関数は、`*this`と`base`のどちらに対してもパスの�規化を行わない。必要であれば、どちらか、もしくは両方に[`lexically_normal()`](lexically_normal.md)メンバ関数を適用すること


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  assert(fs::path("/a/d").lexically_relative("/a/b/c") == "../../d");
  assert(fs::path("/a/b/c").lexically_relative("/a/d") == "../b/c");
  assert(fs::path("a/b/c").lexically_relative("a") == "b/c");
  assert(fs::path("a/b/c").lexically_relative("a/b/c/x/y") == "../..");
  assert(fs::path("a/b/c").lexically_relative("a/b/c") == ".");
  assert(fs::path("a/b").lexically_relative("c/d") == "../../a/b");
}
```
* lexically_relative[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
