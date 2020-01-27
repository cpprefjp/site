# has_root_directory
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool has_root_directory() const;
```

## 概要
パスにルートディレクトリが含まれているか判定する。


## 戻り値
```cpp
return !root_directory().empty();
```
* root_directory()[link root_directory.md]
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

  fs::path root_directory = p.root_directory();
  std::cout << root_directory << std::endl;

  if (p.has_root_directory()) {
    std::cout << "has root directory" << std::endl;
  }
  else {
    std::cout << "doesn't have root directory" << std::endl;
  }
}
```
* has_root_directory()[color ff0000]
* p.root_directory()[link root_directory.md]

#### 出力
```
"/"
has root directory
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "C:/Program Files/a.txt";

  fs::path root_directory = p.root_directory();
  std::cout << root_directory << std::endl;

  if (p.has_root_directory()) {
    std::cout << "has root directory" << std::endl;
  }
  else {
    std::cout << "doesn't have root directory" << std::endl;
  }
}
```
* has_root_directory()[color ff0000]
* p.root_directory()[link root_directory.md]

#### 出力
```
"\"
has root directory
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
