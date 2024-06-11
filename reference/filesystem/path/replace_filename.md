# replace_filename
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path& replace_filename(const path& replacement);
```

## 概要
パスに含まれるファイル名を置き換える。

この関数は、ファイルシステム上のファイル名は変更しない。そのようなことをする場合は、[`std::filesystem::rename()`](/reference/filesystem/rename.md)関数を使用すること。


## 効果
以下と等価の効果を持つ：

```cpp
remove_filename();
operator/=(replacement);
```
* remove_filename()[link remove_filename.md]


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
  fs::path ps[] = {
    "foo/bar.txt", // ファイル名を含むパス
    "foo/",        // ディレクトリパス
    "/"            // ルートパスのみ
  };

  for (fs::path& p : ps) {
    const fs::path before = p;

    p.replace_filename("a.md");
    std::cout << before << " : " << p << std::endl;
  }
}
```
* replace_filename[color ff0000]

#### 出力
```
"foo/bar.txt" : "foo/a.md"
"foo/" : "foo/a.md"
"/" : "/a.md"
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]
