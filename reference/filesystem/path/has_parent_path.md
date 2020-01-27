# has_parent_path
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool has_parent_path() const;
```

## 概要
パスに親パスが含まれているか判定する。

- パスにルートパスのみが含まれていれば、ルートパスの親はルートパスと見なされて`true`が返る
- ディレクトリパス (`bar/`) の場合、ディレクトリ内から見た親が自身のディレクトリ (`bar`) と見なされ、`true`が返る
- パスにファイル名、もしくはルート以外のディレクトリのみが含まれ、親パスの情報がない場合は`false`が返る


## 戻り値
```cpp
return !parent_path().empty();
```
* parent_path()[link parent_path.md]
* empty()[link empty.md]


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
    "/",            // ルートパスのみ
    "bar/",         // ディレクトリパス
    "bar"           // ファイルパス
  };

  std::cout << std::boolalpha;
  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.has_parent_path() << std::endl;
  }
}
```
* has_parent_path()[color ff0000]

#### 出力
```
"/foo/bar.txt" : true
"/foo/bar/" : true
"/" : true
"bar/" : true
"bar" : false
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
    "C:/",            // ルートパスのみ
    "bar/",         // ディレクトリパス
    "bar"           // ファイルパス
  };

  std::cout << std::boolalpha;
  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.has_parent_path() << std::endl;
  }
}
```
* has_parent_path()[color ff0000]

#### 出力
```
"C:\foo\bar.txt" : true
"C:\foo\bar\" : true
"C:\" : true
"bar\" : true
"bar" : false
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
