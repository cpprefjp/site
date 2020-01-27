# is_relative
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool is_relative() const;
```

## 概要
パスが相対パスかを判定する。


## 戻り値
```cpp
return !is_absolute();
```
* is_absolute()[link is_absolute.md]


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path ps[] = {
    "/",               // ルートパスのみ
    "/foo/bar.txt",    // ルートパスを含む
    "/foo/../bar.txt", // ルートパスに加えて、親ディレクトリの参照を含む
    "foo/bar.txt"      // ルートパスを含まない
  };

  std::cout << std::boolalpha;
  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.is_relative() << std::endl;
  }
}
```
* is_relative()[color ff0000]

#### 出力
```
"/" : false
"/foo/bar.txt" : false
"/foo/../bar.txt" : false
"foo/bar.txt" : true
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path ps[] = {
    "C:",                // ルート名のみ
    "C:/",               // ルートパスのみ
    "C:/foo/bar.txt",    // ルートパスを含む
    "C:/foo/../bar.txt", // ルートパスに加えて、親ディレクトリの参照を含む
    "foo/bar.txt"        // ルートパスを含まない
  };

  std::cout << std::boolalpha;
  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.is_relative() << std::endl;
  }
}
```
* is_relative()[color ff0000]

#### 出力
```
"C:" : true
"C:\" : false
"C:\foo\bar.txt" : false
"C:\foo\..\bar.txt" : false
"foo\bar.txt" : true
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
