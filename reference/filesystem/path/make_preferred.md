# make_preferred
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path& make_preferred();
```

## 概要
ディレクトリの区切り文�を推奨する形式に変換する。

この関数は、環境非依�のディレクトリ区切り文�を、その環境 (OS) が推奨する形式に変換する。環境非依�のディレクトリ区切り文�として `"/"` (スラッシュ) があるが、例としてWindows環境では `"\\"` (バックスラッシュ) が推奨されるディレクトリ区切り文�となっている。

環境が推奨するディレクトリ区切り文�は、このクラスのメンバ定数`preferred_separator`で取得できる。


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
  // POSIX環境では推奨のディレクトリ区切り文�が "/" (スラッシュ)。
  // 環境非依�のディレクトリ区切り文� "/" から変更がないため、この関数はなにもしない
  fs::path p = "foo/bar";
  p.make_preferred();

  std::cout << p << std::endl;
}
```
* make_preferred()[color ff0000]

#### 出力
```
"foo/bar"
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // Windows環境では推奨のディレクトリ区切り文�が "\\" (バックスラッシュ)。
  // 環境非依�のディレクトリ区切り文� "/" が "\\" に変換される
  fs::path p = "foo/bar";
  p.make_preferred();

  std::cout << p << std::endl;
}
```
* make_preferred()[color ff0000]

#### 出力
```
"foo\bar"
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
