# has_root_name
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool has_root_name() const;
```

## 概要
パスにルート名が含まれているか判定する。


## 戻り値
```cpp
return !root_name().empty();
```
* root_name()[link root_name.md]
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

  fs::path root_name = p.root_name();
  std::cout << root_name << std::endl;

  if (p.has_root_name()) {
    std::cout << "has root name" << std::endl;
  }
  else {
    std::cout << "doesn't have root name" << std::endl;
  }
}
```
* has_root_name()[color ff0000]
* p.root_name()[link root_name.md]

#### 出力
```
""
doesn't have root name
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "C:/Program Files/a.txt";

  fs::path root_name = p.root_name();
  std::cout << root_name << std::endl;

  if (p.has_root_name()) {
    std::cout << "has root name" << std::endl;
  }
  else {
    std::cout << "doesn't have root name" << std::endl;
  }
}
```
* has_root_name()[color ff0000]
* p.root_name()[link root_name.md]

#### 出力
```
"C:"
has root name
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
