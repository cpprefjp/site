# filename
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path filename() const;
```

## 概要
パスが保持しているファイル名を取得する。

ファイル名とは、ディレクトリ区切り文字で分割された末尾要素のことを指す。そのため、末尾にディレクトリ区切り文字を含まないディレクトリ名もファイル名と見なされる。また、ルートディレクトリはファイル名とは見なされず、ルートパスのみが含まれる場合は空のパスが返る。

カレントディレクトリを表す「`"."`  (ドット x 1)」および親ディレクトリを表す「`".."` (ドット x 2)」もまた、ファイル名と見なされる。


## 戻り値
```cpp
return relative_path().empty() ? path() : *--end();
```
* relative_path()[link relative_path.md]
* empty()[link empty.md]
* end()[link end.md]


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
    ".",            // カレントディレクトリ
    ".."            // 親ディレクトリ
  };

  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.filename() << std::endl;
  }
}
```
* filename()[color ff0000]


#### 出力
```
"/foo/bar.txt" : "bar.txt"
"/foo/bar/" : ""
"/" : ""
"." : "."
".." : ".."
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
    "C:",             // ルートディレクトリ
    ".",              // カレントディレクトリ
    ".."              // 親ディレクトリ
  };

  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.filename() << std::endl;
  }
}
```
* filename()[color ff0000]

#### 出力
```
"C:\foo\bar.txt" : "bar.txt"
"C:\foo\bar\" : ""
"C:" : ""
"." : "."
".." : ".."
```

Windowsでの例は、Visual C++が正式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
