# has_root_path
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool has_root_path() const;
```

## 概要
パスにルートパスが含まれているか判定する。


## 戻り値
```cpp
return !root_path().empty();
```
* root_path()[link root_path.md]
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

  fs::path root_path = p.root_path();
  std::cout << root_path << std::endl;

  if (p.has_root_path()) {
    std::cout << "has root path" << std::endl;
  }
  else {
    std::cout << "doesn't have root path" << std::endl;
  }
}
```
* has_root_path()[color ff0000]
* p.root_path()[link root_path.md]

#### 出力
```
"/"
has root path
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "C:/Program Files/a.txt";

  fs::path root_path = p.root_path();
  std::cout << root_path << std::endl;

  if (p.has_root_path()) {
    std::cout << "has root path" << std::endl;
  }
  else {
    std::cout << "doesn't have root path" << std::endl;
  }
}
```
* has_root_path()[color ff0000]
* p.root_path()[link root_path.md]

#### 出力
```
"C:\"
has root path
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
