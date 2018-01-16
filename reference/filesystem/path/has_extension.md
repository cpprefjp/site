# has_extension
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool has_extension() const;
```

## 概要
パスに拡張子が含まれているか判定する。


## 戻り値
```cpp
return !extension().empty();
```
* extension()[link extension.md]
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
    "/foo/bar.txt",    // ファイル名を含むパス
    "/foo/bar.tar.gz", // ファイル名に複数のドットが含まれるパス
    "/foo/",           // ディレクトリパス
    "/foo/.",          // カレントディレクトリ
    "..",              // 親ディレクトリ
  };

  std::cout << std::boolalpha;
  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.has_extension() << std::endl;
  }
}
```
* has_extension()[color ff0000]

#### 出力
```
"/foo/bar.txt" : true
"/foo/bar.tar.gz" : true
"/foo/" : false
"/foo/." : false
".." : false
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::experimental::filesystem;

int main()
{
  fs::path ps[] = {
    "C:/foo/bar.txt",    // ファイル名を含むパス
    "C:/foo/bar.tar.gz", // ファイル名に複数のドットが含まれるパス
    "C:/foo/",           // ディレクトリパス
    "C:/foo/.",          // カレントディレクトリ
    "..",                // 親ディレクトリ
  };

  std::cout << std::boolalpha;
  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.has_extension() << std::endl;
  }
}
```
* has_extension()[color ff0000]

#### 出力
```
"C:\foo\bar.txt" : true
"C:\foo\bar.tar.gz" : true
"C:\foo\" : false
"C:\foo\." : false
".." : false
```

Windowsでの例は、Visual C++が正式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
