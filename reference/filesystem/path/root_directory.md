# root_directory
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path root_directory() const;
```

## 概要
パスが保持しているルートディレクトリを取得する。

ルートディレクトリは、ルート名に続いて現れる実装定義のディレクトリ区切り文字である。


## 戻り値
汎用フォーマットのパスがルートディレクトリを保持している場合、それを返す。そうでなければ空のパスを返す。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";
  fs::path root_dir = p.root_directory();

  std::cout << root_dir << std::endl;
}
```
* root_directory()[color ff0000]


#### 出力
```
"/"
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "C:/Program Files/a.txt";
  fs::path root_dir = p.root_directory();

  std::cout << root_dir << std::endl;
}
```
* root_directory()[color ff0000]

#### 出力
```
"\"
```

Windowsでの例は、Visual C++が正式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっています。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
