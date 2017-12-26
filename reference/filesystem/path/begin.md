# begin
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
iterator begin() const;
```
* iterator[link iterator.md]

## 概要
ディレクトリ区切りした各パス要素のうち、先頭要素を指すイテレータを取得する。


## 戻り値
このクラスが保持するパス文字列を、ディレクトリ区切り文字で走査するイテレータのうち、最初の要素を指すイテレータを返す。

パス区切りの詳細は、[`iterator`](iterator.md)クラスのページを参照。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>
#include <algorithm>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  fs::path::iterator first = p.begin();
  fs::path::iterator last = p.end();
  std::for_each(first, last, [](const fs::path& element) {
    std::cout << element << std::endl;
  });
}
```
* begin()[color ff0000]
* p.end()[link end.md]
* iterator[link iterator.md]

#### 出力
```
"/"
"usr"
"bin"
"clang"
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>
#include <algorithm>

namespace fs = std::experimental::filesystem;

int main()
{
  fs::path p = "C:/Program Files/a.txt";

  fs::path::iterator first = p.begin();
  fs::path::iterator last = p.end();
  std::for_each(first, last, [](const fs::path& element) {
    std::cout << element << std::endl;
  });
}
```
* begin()[color ff0000]
* p.end()[link end.md]
* iterator[link iterator.md]

#### 出力
```
"C:"
"\"
"Program Files"
"a.txt"
```

Windowsでの例は、Visual C++が正式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
