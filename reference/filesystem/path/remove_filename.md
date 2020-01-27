# remove_filename
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path& remove_filename();
```

## 概要
パスからファイル名を除去する。


## 効果
現在のパスから、[`filename()`](filename.md)関数で取得できるファイル名部分を削除する。

ファイル名を持たないパスに対しては、なにもしない。


## 戻り値
`*this`


## 事後条件
```cpp
!has_filename()
```
* has_filename()[link has_filename.md]



## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path ps[] = {
    "foo/bar", // ファイル名を含むパス (ディレクトリ区切り文�が残って "foo/" になる)
    "foo/",    // ディレクトリパス
    "/foo",    // ルートパス直下のファイルパス
    "/"        // ルートパスのみ
  };

  for (fs::path& p : ps) {
    const fs::path before = p;

    p.remove_filename();
    std::cout << before << " : " << p << std::endl;
  }
}
```
* remove_filename()[color ff0000]

#### 出力
```
"foo/bar" : "foo/"
"foo/" : "foo/"
"/foo" : "/"
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
    "foo/bar", // ファイル名を含むパス (ディレクトリ区切り文�が残って "foo/" になる)
    "foo/",    // ディレクトリパス
    "C:/foo",  // ルートパス直下のファイルパス
    "C:/"      // ルートパスのみ
  };

  for (fs::path& p : ps) {
    const fs::path before = p;

    p.remove_filename();
    std::cout << before << " : " << p << std::endl;
  }
}
```
* remove_filename()[color ff0000]

#### 出力
```
"foo\bar" : "foo\"
"foo\" : "foo\"
"C:\foo" : "C:\"
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
