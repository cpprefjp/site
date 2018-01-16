# stem
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path stem() const;
```

## 概要
パスが保持している、拡張子を除いたファイル名を取得する。


## 戻り値
[`filename()`](filename.md)関数で返されるファイル名について、ドット (`"."`) で区切られた末尾要素を除いたパスを返す。

ただしファイル名が、カレントディレクトリを表す「`"."`」もしくは親ディレクトリを表す「`".."`」である場合は、そのまま返す。


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
    std::cout << p << " : " << p.stem() << std::endl;
  }
}
```
* stem()[color ff0000]


#### 出力
```
"/foo/bar.txt" : "bar"
"/foo/bar.tar.gz" : "bar.tar"
"/foo/" : ""
"/foo/." : "."
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
    "C:/foo/bar.txt",    // ファイル名を含むパス
    "C:/foo/bar.tar.gz", // ファイル名に複数のドットが含まれるパス
    "C:/foo/",           // ディレクトリパス
    "C:/foo/.",          // カレントディレクトリ
    "..",                // 親ディレクトリ
  };

  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.stem() << std::endl;
  }
}
```
* stem()[color ff0000]

#### 出力
```
"C:\foo\bar.txt" : "bar"
"C:\foo\bar.tar.gz" : "bar.tar"
"C:\foo\" : ""
"C:\foo\." : "."
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
