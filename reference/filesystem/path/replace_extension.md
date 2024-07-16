# replace_extension
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path& replace_extension(const path& replacement = path());
```

## 概要
パスに含まれる拡張子を置き換える。

この関数は、ファイルシステム上のファイル名は変更しない。そのようなことをする場合は、[`std::filesystem::rename()`](/reference/filesystem/rename.md)関数を使用すること。


## 効果
- 現在のパスから拡張子を削除する
- `replacement`が空の場合は、それ以上の処理はしない
- `replacement`が `"."` (ドット) で始まらない場合は、先頭に `"."` を付加して `operator+=` で拡張子文字列を加算する


## 戻り値
`*this`


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p1 = "/foo.txt";
  p1.replace_extension(".md");
  std::cout << "p1 : " << p1 << std::endl;

  fs::path p2 = "/foo.txt";
  p2.replace_extension("md"); // ドットなしで拡張子を指定しても、ドットが付加される
  std::cout << "p2 : " << p2 << std::endl;

  fs::path p3 = "/foo"; // 拡張子がないファイル名に拡張子を付加する
  p3.replace_extension(".md");
  std::cout << "p3 : " << p3 << std::endl;
}
```
* replace_extension[color ff0000]

#### 出力
```
p1 : "/foo.md"
p2 : "/foo.md"
p3 : "/foo.md"
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]
