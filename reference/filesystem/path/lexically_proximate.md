# lexically_proximate
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path lexically_proximate(const path& base) const;
```

## 概要
文字列レベルで相対パスに変換する。

この関数は、`*this`が保持するパス文字列を、パス`base`からの相対パスに変換する。[`lexically_relative()`](lexically_relative.md)メンバ関数と違い、相対パスの解決に失敗した場合に、空のパスの代わりに`*this`のパスが返る。

ファイルシステムを介した相対パスへの変換を行う場合は、[`std::filesystem::proximate()`](/reference/filesystem/proximate.md)関数を使用すること。


## 戻り値
[`lexically_relative`](lexically_relative.md)`(base)`の結果が空のパスでなければそれを返し、空のパスが返された場合は`*this`を返す。


## 備考
- この関数は、`*this`と`base`のどちらに対してもパスの正規化を行わない。必要であれば、どちらか、もしくは両方に[`lexically_normal()`](lexically_normal.md)メンバ関数を適用すること


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  assert(fs::path("/a/d").lexically_proximate("/a/b/c") == "../../d");
  assert(fs::path("/a/b/c").lexically_proximate("/a/d") == "../b/c");
  assert(fs::path("a/b/c").lexically_proximate("a") == "b/c");
  assert(fs::path("a/b/c").lexically_proximate("a/b/c/x/y") == "../..");
  assert(fs::path("a/b/c").lexically_proximate("a/b/c") == ".");
  assert(fs::path("a/b").lexically_proximate("c/d") == "../../a/b");

  // 相対パスの解決ができなかった場合
  assert(fs::path("d").lexically_proximate("/a/b/c") == "d");
}
```
* lexically_proximate[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]
