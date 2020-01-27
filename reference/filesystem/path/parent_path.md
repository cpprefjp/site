# parent_path
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path parent_path() const;
```

## 概要
親のパスを取得する。

パスにルートパスのみが含まれている場合は、ルートパスがそのまま返る。ルートパスの親は自身のパスであると見なされる。


## 戻り値
`!`[`has_relative_path()`](has_relative_path.md)であれば`*this`が返る。そうでなければ、汎用フォーマットのパスに対して、ディレクトリ区切りした要素のうち、末尾要素を除いたパスを返す。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path ps[] = {
    "/foo/bar.txt", // ファイル名を含むパス
    "/foo/bar/",    // ディレクトリパス
    "/"             // ルートパスのみ (ルートパスの親はルートパスなのでそのまま返る)
  };

  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.parent_path() << std::endl;
  }
}
```
* parent_path()[color ff0000]

#### 出力
```
"/foo/bar.txt" : "/foo"
"/foo/bar/" : "/foo/bar"
"/" : "/"
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path ps[] = {
    "C:/foo/bar.txt", // ファイル名を含むパス
    "C:/foo/bar/",    // ディレクトリパス
    "C:/"             // ルートパスのみ (ルートパスの親はルートパスなのでそのまま返る)
  };

  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.parent_path() << std::endl;
  }
}
```
* parent_path()[color ff0000]

#### 出力
```
"C:\foo\bar.txt" : "C:\foo"
"C:\foo\bar\" : "C:\foo\bar"
"C:\" : "C:\"
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [P0488R0 WG21 Working Paper, NB Comments, ISO/IEC CD 14882](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0488r0.pdf)
    - US 58のNBコメントによって、ルートパスの親パスを取得しようとした場合に`*this`が返るようになった
- [P0492R2 Proposed Resolution of C++17 National Body Comments for Filesystems(R2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0492r2.html)
