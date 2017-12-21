# root_path
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path root_path() const;
```

## 概要
パスが保持しているルートパスを取得する。

ルートパスは、ルート名とディレクトリ区切り文字を合わせた文字列である。


## 戻り値
```cpp
return root_name() / root_directory();
```
* root_name()[link root_name.md]
* root_directory()[link root_directory.md]


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";
  fs::path root_p = p.root_path();

  std::cout << root_p << std::endl;
}
```
* root_path()[color ff0000]


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
  fs::path root_p = p.root_path();

  std::cout << root_p << std::endl;
}
```
* root_path()[color ff0000]

#### 出力
```
"C:\"
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
