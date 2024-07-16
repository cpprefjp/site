# lexically_normal
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path lexically_normal() const;
```

## 概要
文字列レベルで正規化する。

この関数は、ファイルシステムを介することのないパスの正規化を行う。そのため、親ディレクトリの参照を解決できない場合がある。ファイルシステムを介した正規化を行う場合は、[`std::filesystem::canonical()`](/reference/filesystem/canonical.md)や[`std::filesystem::weakly_canonical()`](/reference/filesystem/weakly_canonical.md)関数を使用すること。


## 戻り値
`*this`が保持するパスを正規化したパスのコピーを返す。

パスの正規化は、以下のことを行う：

1. パスが空であれば、以降なにもしない
2. `"."` (ドットx1) ファイル名と、それに続くディレクトリ区切り文字を削除する (`a/b/./c` => `a/b/c`、`a/b/./` => `a/b/`)
3. ディレクトリ区切り文字 + `".."` (ドットx2) の直前にある非 `".."` ファイル名と、その `".."` および続くディレクトリ区切り文字を削除する (`a/b/..` => `a/`)
    - 親ディレクトリがなくなるまで繰り返す。ルートディレクトリに対する`..`は、ルートディレクトリとなる (`/..` => `/`)
4. 最後のファイル名が `".."` である場合、末尾のディレクトリ区切り文字を削除する
5. 正規化の結果として空のパスになった場合、`"."` を追加する


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // 自身のディレクトリを表す "./" を削除
  // 親ディレクトリを指す ".." があるため、 "bar/.." を削除
  assert(fs::path("foo/./bar/..").lexically_normal().generic_string() == "foo/");

  // ひとつ前の例とほぼ同じだが、 ./// のようにディレクトリ区切り文字がいくつあっても、
  // ひとつと等価の意味を持つため、まとめて削除される
  assert(fs::path("foo/.///bar/../").lexically_normal().generic_string() == "foo/");

  // (ファイルシステムを介することのない) 文字列だけでは親ディレクトリを解決できないため、
  // 正規化してもそのまま。
  // 末尾のディレクトリ区切り文字だけ削除される
  assert(fs::path("../../").lexically_normal().generic_string() == "../..");

  // 正規化の結果として空文字列になるため、 "." のみのパスとなる
  assert(fs::path("foo/..").lexically_normal().generic_string() == ".");
}
```
* lexically_normal()[color ff0000]
* generic_string()[link generic_string.md]

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
