# extension
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path extension() const;
```

## 概要
パスが保持している拡張子を取得する。

- この関数によって拡張子のパスは、ドットを含む
- カレントディレクトリを表す「`"."` (ドット x 1)」および親ディレクトリを表す「`".."` (ドット x 2)」は拡張子なしで見なされ、空のパスが返される


## 戻り値
[`filename()`](filename.md)で返されたファイル名について、[`stem()`](stem.md)には含まれないサフィックス部分を返す。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path ps[] = {
    "/foo/bar.txt",    // ファイル名を含むパス
    "/foo/bar.tar.gz", // ファイル名に複数のドットが含まれるパス
    "/foo/",           // ディレクトリパス
    "/foo/.",          // カレントディレクトリ
    "..",              // 親ディレクトリ
  };

  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.extension() << std::endl;
  }
}
```
* extension()[color ff0000]


#### 出力
```
"/foo/bar.txt" : ".txt"
"/foo/bar.tar.gz" : ".gz"
"/foo/" : ""
"/foo/." : ""
".." : ""
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path ps[] = {
    "C:/foo/bar.txt",    // ファイル名を含むパス
    "C:/foo/bar.tar.gz", // ファイル名に複数のドットが含まれるパス
    "C:/foo/",           // ディレクトリパス
    "C:/foo/.",          // カレントディレクトリ
    "..",                // 親ディレクトリ
  };

  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.extension() << std::endl;
  }
}
```
* extension()[color ff0000]

#### 出力
```
"C:\foo\bar.txt" : ".txt"
"C:\foo\bar.tar.gz" : ".gz"
"C:\foo\" : ""
"C:\foo\." : ""
".." : ""
```

Windowsでの例は、Visual C++が正式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
