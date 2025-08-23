# is_absolute
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool is_absolute() const;
```

## 概要
パスが絶対パスかを判定する。

絶対パスとは、追加の開始位置を必要とせずに、曖昧さなく特定の場所を参照できるパスのことである。その定義はOSに依存する。

## 戻り値
パスが絶対パスであれば`true`、そうでなければ`false`を返す。


## 備考
- POSIXとWindowsはどちらも、[ルートディレクトリ](root_directory.md)がパスに含まれていれば、絶対パスと見なせる。カレントディレクトリや親ディレクトリの参照が含んでいても絶対パスと判断される


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
    std::cout << p << " : " << p.is_absolute() << std::endl;
  }
}
```
* is_absolute()[color ff0000]

#### 出力
```
"/" : true
"/foo/bar.txt" : true
"/foo/../bar.txt" : true
"foo/bar.txt" : false
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
    "foo/bar.txt",       // ルートパスを含まない
    "C:foo",             // ルート名はあるがルートディレクトリはない
    "/foo"               // ルートディレクトリはあるがルート名はない
  };

  std::cout << std::boolalpha;
  for (const fs::path& p : ps) {
    std::cout << p << " : " << p.is_absolute() << std::endl;
  }
}
```
* is_absolute()[color ff0000]

#### 出力
```
"C:" : false
"C:/" : true
"C:/foo/bar.txt" : true
"C:/foo/../bar.txt" : true
"foo/bar.txt" : false
"C:foo" : false
"/foo" : false
```



## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]


## 参照
- [`GetFullPathName` function (Windows)](https://docs.microsoft.com/ja-jp/windows/win32/api/fileapi/nf-fileapi-getfullpathnamea)
- [Naming Files, Paths, and Namespaces (Windows)](https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file)
