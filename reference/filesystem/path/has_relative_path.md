# has_relative_path
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool has_relative_path() const;
```

## 概要
パスにルートパスからの相対パスが含まれているか判定する。

パスにルートパスのみが含まれていれば、`false`が返る。


## 戻り値
```cpp
return !relative_path().empty();
```
* relative_path()[link relative_path.md]
* empty()[link empty.md]


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
  fs::path rel_p = p.relative_path();
  std::cout << "root path : " << root_p << std::endl;
  std::cout << "relative_path : " << rel_p << std::endl;

  if (p.has_relative_path()) {
    std::cout << "has relative path from root path" << std::endl;
  }
  else {
    std::cout << "doesn't have relative path from root path" << std::endl;
  }
}
```
* has_relative_path()[color ff0000]
* p.root_path()[link root_path.md]
* p.relative_path()[link relative_path.md]

#### 出力
```
root path : "/"
relative_path : "usr/bin/clang"
has relative path from root path
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
  fs::path rel_p = p.relative_path();
  std::cout << "root path : " << root_p << std::endl;
  std::cout << "relative_path : " << rel_p << std::endl;

  if (p.has_relative_path()) {
    std::cout << "has relative path from root path" << std::endl;
  }
  else {
    std::cout << "doesn't have relative path from root path" << std::endl;
  }
}
```
* has_relative_path()[color ff0000]
* p.root_path()[link root_path.md]
* p.relative_path()[link relative_path.md]

#### 出力
```
root path : "C:\"
relative_path : "Program Files\a.txt"
has relative path from root path
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
